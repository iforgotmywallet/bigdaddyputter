"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { savePutterAction, type AdminActionState } from "@/app/admin/actions";
import { AdminImageManager } from "@/components/admin/image-manager";
import type { AdminPutterEditorMessages } from "@/lib/admin-i18n";
import type { AdminImageInput } from "@/lib/images/paths";
import type { CatalogCategory, Locale, PutterStatus, PutterTranslation } from "@/lib/types";

const initialState: AdminActionState = { status: "idle", message: "" };
const statuses: PutterStatus[] = ["available", "reserved", "sold", "display_only", "private"];
const priceModes = ["hidden", "amount", "on_request"] as const;

interface PutterFormData {
  id?: string;
  slug?: string;
  brand?: string;
  model?: string;
  modelFamily?: string | null;
  category?: string | null;
  catalogCategoryId?: string | null;
  releaseYear?: number | null;
  status?: string;
  headMaterial?: string | null;
  headStyle?: string | null;
  finish?: string | null;
  neckType?: string | null;
  alignmentAid?: string | null;
  lengthInches?: number | null;
  loftDegrees?: number | null;
  lieDegrees?: number | null;
  headWeightGrams?: number | null;
  shaft?: string | null;
  grip?: string | null;
  headcover?: string | null;
  paintFill?: string | null;
  coaStatus?: string | null;
  serialNumber?: string | null;
  conditionScore?: number | null;
  location?: string | null;
  provenanceSummary?: string | null;
  priceMode?: string;
  priceCents?: number | null;
  priceCurrency?: string | null;
  isFeatured?: boolean;
  isPublished?: boolean;
  translations?: Partial<Record<Locale, Partial<PutterTranslation>>>;
  images?: AdminImageInput[];
}

interface PutterFormProps {
  data?: PutterFormData;
  labels: AdminPutterEditorMessages;
  locale: Locale;
  statusLabels: Record<PutterStatus, string>;
  categories: CatalogCategory[];
  defaultCategoryId: string;
}

interface InputOptions {
  required?: boolean;
  help?: string;
  type?: "text" | "number";
  inputMode?: "decimal" | "numeric";
  min?: number;
  max?: number;
  step?: number | "any";
  className?: string;
  placeholder?: string;
}

function SaveButton({ labels }: { labels: AdminPutterEditorMessages }) {
  const status = useFormStatus();
  return <button className="admin-primary" type="submit" disabled={status.pending}>{status.pending ? labels.saving : labels.save}</button>;
}

function amountFromCents(cents?: number | null) {
  if (cents === null || cents === undefined) return "";
  return String(cents / 100);
}

export function PutterForm({ data = {}, labels, locale, statusLabels, categories, defaultCategoryId }: PutterFormProps) {
  const [state, action] = useActionState(savePutterAction, initialState);
  const input = (name: string, label: string, defaultValue?: string | number | null, options: InputOptions = {}) => <label className={options.className}>
    <span>{label}</span>
    <input
      name={name}
      defaultValue={defaultValue ?? ""}
      required={options.required}
      type={options.type ?? "text"}
      inputMode={options.inputMode}
      min={options.min}
      max={options.max}
      step={options.step}
      placeholder={options.placeholder}
      aria-invalid={Boolean(state.errors?.[name])}
    />
    {options.help ? <small className="admin-field-help">{options.help}</small> : null}
    {state.errors?.[name] ? <small className="admin-field-error">{state.errors[name]}</small> : null}
  </label>;
  const textarea = (name: string, label: string, defaultValue?: string | null, className?: string, rows = 4) => <label className={className}>
    <span>{label}</span>
    <textarea name={name} defaultValue={defaultValue ?? ""} rows={rows} aria-invalid={Boolean(state.errors?.[name])} />
    {state.errors?.[name] ? <small className="admin-field-error">{state.errors[name]}</small> : null}
  </label>;
  const defaultTitle = `${data.brand ?? ""} ${data.model ?? ""}`.trim();
  const localeEditors = [
    { key: "zh-hant" as const, suffix: "ZhHant", label: labels.traditionalChinese },
    { key: "zh-hans" as const, suffix: "ZhHans", label: labels.simplifiedChinese },
    { key: "en" as const, suffix: "En", label: labels.english },
  ];

  return <form className="admin-form" action={action} lang={locale}>
    <input type="hidden" name="adminLocale" value={locale} />
    {data.id ? <input type="hidden" name="id" value={data.id} /> : null}
    {state.message ? <p className={`admin-alert ${state.status}`} role="alert" aria-live="polite">{state.message}</p> : null}

    <fieldset>
      <legend>{labels.identity}</legend>
      <p className="admin-fieldset-intro">{labels.identityIntro}</p>
      <div className="admin-form-grid">
        <label><span>{labels.catalogCategory}</span><select name="catalogCategoryId" defaultValue={data.catalogCategoryId ?? defaultCategoryId} required>{categories.map((category) => <option key={category.id} value={category.id}>{category.name[locale]}{category.isDefault ? " · ★" : ""}</option>)}</select></label>
        {input("brand", labels.brand, data.brand, { required: true })}
        {input("model", labels.model, data.model, { required: true, className: "admin-span-2" })}
        {input("modelFamily", labels.modelFamily, data.modelFamily, { help: labels.modelFamilyHelp })}
        {input("category", labels.category, data.category)}
        {input("releaseYear", labels.releaseYear, data.releaseYear, { type: "number", inputMode: "numeric", min: 1900, max: 2100 })}
        {input("slug", labels.slug, data.slug, { required: true, help: labels.slugHelp, className: "admin-span-3", placeholder: "scotty-cameron-timeless-circle-t" })}
      </div>
    </fieldset>

    <fieldset>
      <legend>{labels.playingSpecifications}</legend>
      <p className="admin-fieldset-intro">{labels.playingSpecificationsIntro}</p>
      <div className="admin-form-grid">
        {input("headStyle", labels.headStyle, data.headStyle, { placeholder: labels.examples.headStyle })}
        {input("headMaterial", labels.headMaterial, data.headMaterial, { placeholder: labels.examples.headMaterial })}
        {input("finish", labels.finish, data.finish, { placeholder: labels.examples.finish })}
        {input("neckType", labels.neckType, data.neckType, { placeholder: labels.examples.neckType })}
        {input("alignmentAid", labels.alignmentAid, data.alignmentAid, { placeholder: labels.examples.alignmentAid })}
        {input("headWeightGrams", labels.headWeightGrams, data.headWeightGrams, { type: "number", inputMode: "numeric", min: 100, max: 1000, step: 1 })}
        {input("lengthInches", labels.lengthInches, data.lengthInches, { type: "number", inputMode: "decimal", min: 20, max: 60, step: 0.25 })}
        {input("loftDegrees", labels.loftDegrees, data.loftDegrees, { type: "number", inputMode: "decimal", min: -10, max: 20, step: 0.25 })}
        {input("lieDegrees", labels.lieDegrees, data.lieDegrees, { type: "number", inputMode: "decimal", min: 40, max: 90, step: 0.25 })}
        {input("shaft", labels.shaft, data.shaft)}
        {input("grip", labels.grip, data.grip, { className: "admin-span-2" })}
      </div>
    </fieldset>

    <fieldset>
      <legend>{labels.collectorDetails}</legend>
      <p className="admin-fieldset-intro">{labels.collectorDetailsIntro}</p>
      <div className="admin-form-grid">
        {input("headcover", labels.headcover, data.headcover, { className: "admin-span-2" })}
        {input("paintFill", labels.paintFill, data.paintFill)}
        {input("coaStatus", labels.coaStatus, data.coaStatus, { help: labels.coaHelp })}
        {input("serialNumber", labels.serialNumber, data.serialNumber)}
        {input("conditionScore", labels.conditionScore, data.conditionScore, { type: "number", inputMode: "decimal", min: 0, max: 10, step: 0.1 })}
        {input("location", labels.location, data.location)}
        {textarea("provenanceSummary", labels.provenanceSummary, data.provenanceSummary, "admin-span-3", 3)}
      </div>
    </fieldset>

    <fieldset className="admin-localized-fieldset">
      <legend>{labels.localizedContent}</legend>
      <p className="admin-fieldset-intro">{labels.localizedContentIntro}</p>
      <div className="admin-locale-stack">
        {localeEditors.map((editor) => {
          const translation = data.translations?.[editor.key];
          return <details className="admin-locale-editor" key={editor.key} open={editor.key === locale}>
            <summary><strong>{editor.label}</strong><span>{labels.localeEditorHint}</span></summary>
            <div className="admin-locale-fields">
              {input(`title${editor.suffix}`, labels.title, translation?.title ?? defaultTitle, { required: true, className: "admin-span-2" })}
              {input(`subtitle${editor.suffix}`, labels.subtitle, translation?.subtitle)}
              {textarea(`overview${editor.suffix}`, labels.overview, translation?.overview, "admin-span-3", 5)}
              {textarea(`collectorNotes${editor.suffix}`, labels.collectorNotes, translation?.collectorNotes, "admin-span-3", 4)}
              {textarea(`conditionNotes${editor.suffix}`, labels.conditionNotes, translation?.conditionNotes, "admin-span-3", 3)}
              {textarea(`provenanceText${editor.suffix}`, labels.provenanceText, translation?.provenanceText, "admin-span-3", 3)}
              {textarea(`includedItems${editor.suffix}`, labels.includedItems, translation?.includedItems, "admin-span-3", 3)}
              {input(`seoTitle${editor.suffix}`, labels.seoTitle, translation?.seoTitle, { className: "admin-span-2" })}
              {textarea(`seoDescription${editor.suffix}`, labels.seoDescription, translation?.seoDescription, undefined, 2)}
            </div>
          </details>;
        })}
      </div>
    </fieldset>

    <fieldset>
      <legend>{labels.catalogueState}</legend>
      <p className="admin-fieldset-intro">{labels.catalogueStateIntro}</p>
      <div className="admin-form-grid admin-pricing-grid">
        <label><span>{labels.status}</span><select name="status" defaultValue={data.status ?? "private"}>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label>
        <label><span>{labels.priceMode}</span><select name="priceMode" defaultValue={data.priceMode ?? "hidden"}>{priceModes.map((mode) => <option key={mode} value={mode}>{labels.priceModes[mode]}</option>)}</select></label>
        {input("priceAmount", labels.priceAmount, amountFromCents(data.priceCents), { inputMode: "decimal", help: labels.priceAmountHelp, placeholder: "35000" })}
        {input("priceCurrency", labels.currency, data.priceCurrency ?? "HKD", { help: labels.currencyHelp, placeholder: "USD" })}
      </div>
      <div className="admin-checks">
        <label className="admin-check-card"><input type="checkbox" name="isFeatured" defaultChecked={data.isFeatured} /><span><strong>{labels.featured}</strong><small>{labels.featuredHelp}</small></span></label>
        <label className="admin-check-card"><input type="checkbox" name="isPublished" defaultChecked={data.isPublished} /><span><strong>{labels.published}</strong><small>{labels.publishedHelp}</small></span></label>
      </div>
    </fieldset>

    <AdminImageManager initialImages={data.images} labels={labels.photography} saveResult={state} />
    <div className="admin-save-bar"><p>{labels.saveHint}</p><SaveButton labels={labels} /></div>
  </form>;
}
