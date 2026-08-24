import { saveSettingsAction } from "@/app/admin/actions";
import { getSiteSettings } from "@/db/queries/settings";
import { hasDatabase } from "@/db/client";
import { adminLocaleLabel } from "@/lib/admin-i18n";
import { getAdminLanguage } from "@/lib/admin-language";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const settings = await getSiteSettings();
  const { locale, messages } = await getAdminLanguage(settings.defaultLocale);
  const m = messages.settings;
  const databaseReady = hasDatabase();
  const query = await searchParams;
  const saved = query.saved === "1";
  const invalid = query.error === "1";
  return <>
    <header className="admin-page-header"><div><p className="eyebrow">{m.eyebrow}</p><h1>{m.title}</h1></div></header>
    {saved ? <p className="admin-alert">{m.saved}</p> : null}
    {invalid ? <p className="admin-alert error">{m.invalid}</p> : null}
    {!databaseReady ? <p className="admin-alert error">{m.databaseRequired}</p> : null}
    <form className="admin-form" action={saveSettingsAction}>
      <fieldset disabled={!databaseReady}><legend>{m.legend}</legend><div className="admin-form-grid">
        <label><span>{m.brand}</span><input name="brandName" defaultValue={settings.brandName} required /></label>
        <label><span>{m.logo}</span><input name="logoText" defaultValue={settings.logoText} required /></label>
        <label><span>{m.defaultLocale}</span><select name="defaultLocale" defaultValue={settings.defaultLocale}><option value="zh-hant">{adminLocaleLabel(locale, "zh-hant")}</option><option value="zh-hans">{adminLocaleLabel(locale, "zh-hans")}</option><option value="en">{adminLocaleLabel(locale, "en")}</option></select><small className="admin-field-help">{m.localeHelp}</small></label>
      </div></fieldset>
      <fieldset disabled={!databaseReady}><legend>{m.contactLegend}</legend><div className="admin-form-grid">
        <label><span>{m.email}</span><input type="email" name="contactEmail" defaultValue={settings.contactEmail} required /></label>
        <label><span>{m.location}</span><input name="location" defaultValue={settings.location} /></label>
        <label><span>{m.wechatId}</span><input name="wechatId" defaultValue={settings.wechatId ?? ""} /></label>
        <label><span>{m.whatsappUrl}</span><input type="url" name="whatsappUrl" defaultValue={settings.whatsappUrl ?? ""} placeholder="https://wa.me/…" /></label>
        <label><span>{m.instagramUrl}</span><input type="url" name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} placeholder="https://instagram.com/…" /></label>
        <label><span>{m.xiaohongshuUrl}</span><input type="url" name="xiaohongshuUrl" defaultValue={settings.xiaohongshuUrl ?? ""} placeholder="https://www.xiaohongshu.com/…" /></label>
      </div><p className="admin-field-help">{m.optionalHelp}</p></fieldset>
      <button className="admin-primary" type="submit" disabled={!databaseReady}>{m.save}</button>
    </form>
  </>;
}
