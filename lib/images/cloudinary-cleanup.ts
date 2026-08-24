import "server-only";

import { inArray } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db/client";
import { putterImages } from "@/db/schema";
import { deleteCloudinaryImage } from "@/lib/images/cloudinary";
import { isManagedCloudinaryKey } from "@/lib/images/paths";

export interface CloudinaryCleanupResult {
  deleted: string[];
  retained: string[];
  failed: string[];
}

export async function deleteUnreferencedCloudinaryImages(storageKeys: string[]): Promise<CloudinaryCleanupResult> {
  const keys = [...new Set(storageKeys)];
  if (!keys.length) return { deleted: [], retained: [], failed: [] };
  if (!hasDatabase()) throw new Error("DATABASE_URL is required before Cloudinary assets can be cleaned up safely");

  const managedKeys = keys.filter(isManagedCloudinaryKey);
  const invalidKeys = keys.filter((key) => !isManagedCloudinaryKey(key));
  const references = managedKeys.length
    ? await getDb().select({ storageKey: putterImages.storageKey }).from(putterImages).where(inArray(putterImages.storageKey, managedKeys))
    : [];
  const referenced = new Set(references.map((row) => row.storageKey).filter((key): key is string => Boolean(key)));
  const retained = managedKeys.filter((key) => referenced.has(key));
  const candidates = managedKeys.filter((key) => !referenced.has(key));
  const results = await Promise.allSettled(candidates.map((key) => deleteCloudinaryImage(key)));
  const deleted = candidates.filter((_, index) => results[index]?.status === "fulfilled");
  const failed = [...invalidKeys, ...candidates.filter((_, index) => results[index]?.status === "rejected")];

  return { deleted, retained, failed };
}
