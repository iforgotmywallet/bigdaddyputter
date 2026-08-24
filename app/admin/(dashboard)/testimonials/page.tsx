import { saveTestimonialAction } from "@/app/admin/actions";
import { getAdminTestimonials } from "@/db/queries/admin";
import { adminDateLocale, adminLocaleLabel } from "@/lib/admin-i18n";
import { getAdminLanguage } from "@/lib/admin-language";

const testimonialLocales = ["zh-hant", "zh-hans", "en"] as const;

export default async function TestimonialsPage() {
  const [rows, { locale, messages }] = await Promise.all([getAdminTestimonials(), getAdminLanguage()]);
  const m = messages.testimonials;

  return <>
    <header className="admin-page-header"><div><p className="eyebrow">{m.eyebrow}</p><h1>{m.title}</h1></div></header>
    <p className="admin-note">{m.caution}</p>
    <form className="admin-form compact" action={saveTestimonialAction}>
      <fieldset>
        <legend>{m.add}</legend>
        <div className="admin-form-grid">
          <label><span>{m.name}</span><input name="name" required /></label>
          <label><span>{m.location}</span><input name="location" /></label>
          <label><span>{m.locale}</span><select name="locale" defaultValue={locale}>{testimonialLocales.map((value) => <option value={value} key={value}>{adminLocaleLabel(locale, value)}</option>)}</select></label>
        </div>
        <label><span>{m.quote}</span><textarea name="quote" rows={4} required /></label>
        <label className="admin-checkbox"><input type="checkbox" name="isPublished" /> {m.publishImmediately}</label>
      </fieldset>
      <button className="admin-primary" type="submit">{m.addStatement}</button>
    </form>
    {rows.length ? <div className="admin-table">{rows.map((row) => <div className="admin-table-row" key={row.id}><span>{adminLocaleLabel(locale, row.locale)}</span><strong>{row.name}</strong><i>{row.isPublished ? messages.common.published : messages.common.draft}</i><time>{row.createdAt.toLocaleDateString(adminDateLocale(locale))}</time></div>)}</div> : <p className="admin-empty-state">{m.empty}</p>}
  </>;
}
