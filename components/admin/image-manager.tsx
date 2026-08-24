"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import type { AdminPutterEditorMessages } from "@/lib/admin-i18n";
import type { AdminImageInput } from "@/lib/images/paths";

const MAX_IMAGES = 12;
const MAX_FILE_BYTES = 12 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PENDING_UPLOADS_STORAGE_KEY = "admin_pending_cloudinary_uploads";
const STALE_UPLOAD_AGE_MS = 24 * 60 * 60 * 1000;

interface SignatureResponse {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  storageKey: string;
  signature: string;
}

interface SignatureBatchResponse {
  uploads?: SignatureResponse[];
}

interface UploadResponse {
  secure_url?: string;
  public_id?: string;
  width?: number;
  height?: number;
}

interface CleanupResponse {
  deleted?: string[];
  retained?: string[];
}

interface PendingUploadRecord {
  storageKey: string;
  createdAt: number;
}

function readPendingUploads(): PendingUploadRecord[] {
  try {
    const value = JSON.parse(localStorage.getItem(PENDING_UPLOADS_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is PendingUploadRecord => typeof item?.storageKey === "string" && typeof item?.createdAt === "number");
  } catch {
    return [];
  }
}

function writePendingUploads(records: PendingUploadRecord[]) {
  try {
    if (records.length) localStorage.setItem(PENDING_UPLOADS_STORAGE_KEY, JSON.stringify(records));
    else localStorage.removeItem(PENDING_UPLOADS_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private browsing; in-page cleanup still runs.
  }
}

function rememberPendingUpload(storageKey: string) {
  const records = readPendingUploads().filter((record) => record.storageKey !== storageKey);
  writePendingUploads([...records, { storageKey, createdAt: Date.now() }]);
}

function forgetPendingUploads(storageKeys: string[]) {
  const forgotten = new Set(storageKeys);
  writePendingUploads(readPendingUploads().filter((record) => !forgotten.has(record.storageKey)));
}

function keyFor(image: AdminImageInput) {
  return image.storageKey || image.src;
}

function formatMessage(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((message, [key, value]) => message.replace(`{${key}}`, String(value)), template);
}

interface AdminImageManagerProps {
  initialImages?: AdminImageInput[];
  labels: AdminPutterEditorMessages["photography"];
  saveResult: { status: "idle" | "error" | "success"; message: string };
}

export function AdminImageManager({ initialImages = [], labels, saveResult }: AdminImageManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingKeysRef = useRef(new Set<string>());
  const cleanupInFlightRef = useRef(new Set<string>());
  const submittingRef = useRef(false);
  const [images, setImages] = useState<AdminImageInput[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [queued, setQueued] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState("");

  const cleanupUploads = useCallback(async (storageKeys: string[]) => {
    const keys = [...new Set(storageKeys)].filter((key) => !cleanupInFlightRef.current.has(key));
    if (!keys.length) return;
    keys.forEach((key) => cleanupInFlightRef.current.add(key));
    try {
      for (let index = 0; index < keys.length; index += MAX_IMAGES) {
        const batch = keys.slice(index, index + MAX_IMAGES);
        const response = await fetch("/api/admin/cloudinary/cleanup", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ storageKeys: batch }),
          keepalive: true,
        });
        const result = await response.json().catch(() => ({})) as CleanupResponse;
        const completed = [...(result.deleted ?? []), ...(result.retained ?? [])];
        if (response.ok || completed.length) {
          completed.forEach((key) => pendingKeysRef.current.delete(key));
          forgetPendingUploads(completed);
        }
      }
    } catch {
      // Persisted keys are retried on a later admin visit if the request is interrupted.
    } finally {
      keys.forEach((key) => cleanupInFlightRef.current.delete(key));
    }
  }, []);

  useEffect(() => {
    const staleKeys = readPendingUploads()
      .filter((record) => Date.now() - record.createdAt >= STALE_UPLOAD_AGE_MS)
      .map((record) => record.storageKey);
    void cleanupUploads(staleKeys);

    const form = inputRef.current?.form;
    const markSubmitting = () => { submittingRef.current = true; };
    const cleanCurrentUploads = () => {
      if (!submittingRef.current) void cleanupUploads([...pendingKeysRef.current]);
    };
    form?.addEventListener("submit", markSubmitting);
    window.addEventListener("pagehide", cleanCurrentUploads);
    return () => {
      form?.removeEventListener("submit", markSubmitting);
      window.removeEventListener("pagehide", cleanCurrentUploads);
      cleanCurrentUploads();
    };
  }, [cleanupUploads]);

  useEffect(() => {
    if (saveResult.status === "error") submittingRef.current = false;
  }, [saveResult]);

  async function uploadFiles(files: File[]) {
    setMessage("");
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return setMessage(formatMessage(labels.limitError, { max: MAX_IMAGES }));
    const accepted = files.slice(0, remaining);
    const invalid = accepted.find((file) => !ACCEPTED_TYPES.has(file.type) || file.size > MAX_FILE_BYTES);
    if (invalid) return setMessage(formatMessage(labels.fileError, { name: invalid.name }));
    if (!accepted.length) return;

    setUploading(true);
    setCompleted(0);
    setQueued(accepted.length);
    const uploaded: AdminImageInput[] = [];
    let preparedKeys: string[] = [];
    try {
      const signatureResponse = await fetch("/api/admin/cloudinary/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: accepted.length }),
      });
      const signatureBatch = await signatureResponse.json() as SignatureBatchResponse;
      if (!signatureResponse.ok || signatureBatch.uploads?.length !== accepted.length) throw new Error(labels.prepareError);
      const signatures = signatureBatch.uploads;
      preparedKeys = signatures.map((signature) => signature.storageKey);
      preparedKeys.forEach((storageKey) => {
        pendingKeysRef.current.add(storageKey);
        rememberPendingUpload(storageKey);
      });

      for (const [index, file] of accepted.entries()) {
        const signature = signatures[index];
        const payload = new FormData();
        payload.set("file", file);
        payload.set("api_key", signature.apiKey);
        payload.set("timestamp", String(signature.timestamp));
        payload.set("public_id", signature.storageKey);
        payload.set("signature", signature.signature);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(signature.cloudName)}/image/upload`, { method: "POST", body: payload });
        const result = await response.json() as UploadResponse;
        if (!response.ok || !result.secure_url || result.public_id !== signature.storageKey) throw new Error(formatMessage(labels.fileUploadError, { name: file.name }));
        uploaded.push({ src: result.secure_url, storageKey: result.public_id, width: result.width, height: result.height });
        setCompleted((value) => value + 1);
      }
      setImages((current) => [...current, ...uploaded]);
    } catch (error) {
      void cleanupUploads(preparedKeys);
      setMessage(error instanceof Error ? error.message : labels.uploadError);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function selectFiles(event: ChangeEvent<HTMLInputElement>) {
    void uploadFiles(Array.from(event.target.files ?? []));
  }

  function dropFiles(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    if (!uploading) void uploadFiles(Array.from(event.dataTransfer.files));
  }

  function move(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;
    setImages((current) => {
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  }

  function makePrimary(index: number) {
    setImages((current) => [current[index], ...current.filter((_, itemIndex) => itemIndex !== index)]);
  }

  function remove(index: number) {
    const storageKey = images[index]?.storageKey;
    if (storageKey && pendingKeysRef.current.has(storageKey)) void cleanupUploads([storageKey]);
    setImages((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <fieldset className="admin-image-fieldset">
      <legend>{labels.legend}</legend>
      <input type="hidden" name="imagesJson" value={JSON.stringify(images)} />
      <div className="admin-image-heading">
        <div>
          <p className="admin-image-kicker">{labels.kicker}</p>
          <h2>{labels.title}</h2>
          <p>{formatMessage(labels.intro, { max: MAX_IMAGES })}</p>
        </div>
        <span className="admin-image-count"><strong>{String(images.length).padStart(2, "0")}</strong> / {MAX_IMAGES}</span>
      </div>

      <div
        className={`admin-image-dropzone${dragActive ? " is-dragging" : ""}`}
        onDragEnter={(event) => { event.preventDefault(); setDragActive(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragActive(false); }}
        onDrop={dropFiles}
      >
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={selectFiles} />
        <span className="admin-upload-mark" aria-hidden="true">↥</span>
        <div><strong>{uploading ? formatMessage(labels.uploadingProgress, { current: completed + 1, total: queued }) : labels.drop}</strong><small>{labels.formats}</small></div>
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading || images.length >= MAX_IMAGES}>{uploading ? labels.uploading : labels.chooseFiles}</button>
      </div>

      {message ? <p className="admin-image-message" role="alert">{message}</p> : null}

      {images.length ? (
        <div className="admin-image-contact-sheet" aria-label={labels.orderLabel}>
          {images.map((image, index) => (
            <article className="admin-image-card" key={keyFor(image)}>
              <div className="admin-image-preview">
                <Image src={image.src} alt="" fill sizes="(max-width: 700px) 44vw, 220px" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                {index === 0 ? <strong>{labels.primary}</strong> : null}
              </div>
              <div className="admin-image-meta">
                <p>{image.width && image.height ? `${image.width} × ${image.height}` : labels.storedImage}</p>
                <div className="admin-image-actions">
                  {index > 0 ? <button type="button" onClick={() => makePrimary(index)}>{labels.makePrimary}</button> : null}
                  <button type="button" aria-label={labels.moveLeft} onClick={() => move(index, -1)} disabled={index === 0}>←</button>
                  <button type="button" aria-label={labels.moveRight} onClick={() => move(index, 1)} disabled={index === images.length - 1}>→</button>
                  <button className="remove" type="button" onClick={() => remove(index)}>{labels.remove}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : <p className="admin-image-empty">{labels.empty}</p>}
    </fieldset>
  );
}
