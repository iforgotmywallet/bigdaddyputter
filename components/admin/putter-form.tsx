"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { savePutterAction, type AdminActionState } from "@/app/admin/actions";
import { AdminImageManager } from "@/components/admin/image-manager";
import type { AdminPutterEditorMessages } from "@/lib/admin-i18n";
import type { AdminImageInput } from "@/lib/images/paths";
import type { Locale, PutterStatus } from "@/lib/types";

const initialState: AdminActionState = { status: "idle", message: "" };
const statuses: PutterStatus[] = ["available", "reserved", "sold", "display_only", "private"];
const priceModes = ["hidden", "amount", "on_request"] as const;

interface PutterFormData { id?: string; slug?: string; brand?: string; model?: string; status?: string; headMaterial?: string | null; headStyle?: string | null; releaseYear?: number | null; priceMode?: string; priceCents?: number | null; priceCurrency?: string | null; isFeatured?: boolean; isPublished?: boolean; titleZhHant?: string; titleZhHans?: string; titleEn?: string; images?: AdminImageInput[]; }

interface PutterFormProps {
  data?: PutterFormData;
  labels: AdminPutterEditorMessages;
  locale: Locale;
  statusLabels: Record<PutterStatus, string>;
}

function SaveButton({ labels }: { labels: AdminPutterEditorMessages }) {
  const status = useFormStatus();
  return <button className="admin-primary" type="submit" disabled={status.pending}>{status.pending ? labels.saving : labels.save}</button>;
}

export function PutterForm({ data = {}, labels, locale, statusLabels }: PutterFormProps) {
  const [state, action] = useActionState(savePutterAction, initialState);
  const input = (name: string, label: string, defaultValue?: string | number | null, required = false) => <label><span>{label}</span><input name={name} defaultValue={defaultValue ?? ""} required={required} aria-invalid={Boolean(state.errors?.[name])} />{state.errors?.[name] ? <small>{state.errors[name]}</small> : null}</label>;
  const defaultTitle = `${data.brand ?? ""} ${data.model ?? ""}`.trim();

  return <form className="admin-form" action={action} lang={locale}>
    <input type="hidden" name="adminLocale" value={locale} />
    {data.id ? <input type="hidden" name="id" value={data.id} /> : null}
    {state.message ? <p className={`admin-alert ${state.status}`} role="alert">{state.message}</p> : null}
    <fieldset>
      <legend>{labels.identity}</legend>
      <div className="admin-form-grid">
        {input("slug", labels.slug, data.slug, true)}
        {input("brand", labels.brand, data.brand, true)}
        {input("model", labels.model, data.model, true)}
        {input("releaseYear", labels.releaseYear, data.releaseYear)}
      </div>
    </fieldset>
    <fieldset>
      <legend>{labels.localizedTitles}</legend>
      <div className="admin-form-grid">
        {input("titleZhHant", labels.traditionalChinese, data.titleZhHant ?? defaultTitle, true)}
        {input("titleZhHans", labels.simplifiedChinese, data.titleZhHans ?? defaultTitle, true)}
        {input("titleEn", labels.english, data.titleEn ?? defaultTitle, true)}
      </div>
    </fieldset>
    <fieldset>
      <legend>{labels.catalogueState}</legend>
      <div className="admin-form-grid">
        <label><span>{labels.status}</span><select name="status" defaultValue={data.status ?? "private"}>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label>
        {input("headMaterial", labels.headMaterial, data.headMaterial)}
        {input("headStyle", labels.headStyle, data.headStyle)}
        <label><span>{labels.priceMode}</span><select name="priceMode" defaultValue={data.priceMode ?? "hidden"}>{priceModes.map((mode) => <option key={mode} value={mode}>{labels.priceModes[mode]}</option>)}</select></label>
        {input("priceCents", labels.priceCents, data.priceCents)}
        {input("priceCurrency", labels.currency, data.priceCurrency ?? "HKD")}
      </div>
      <div className="admin-checks">
        <label><input type="checkbox" name="isFeatured" defaultChecked={data.isFeatured} /> {labels.featured}</label>
        <label><input type="checkbox" name="isPublished" defaultChecked={data.isPublished} /> {labels.published}</label>
      </div>
    </fieldset>
    <AdminImageManager initialImages={data.images} labels={labels.photography} />
    <SaveButton labels={labels} />
  </form>;
}
