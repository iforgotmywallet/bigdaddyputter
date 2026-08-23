import { saveSettingsAction } from "@/app/admin/actions";
import { getSiteSettings } from "@/db/queries/settings";
import { hasDatabase } from "@/db/client";
import { getAdminMessages } from "@/lib/admin-i18n";
import { getPreferredLocale } from "@/lib/locale-preference";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const settings = await getSiteSettings();
  const m = getAdminMessages(await getPreferredLocale(settings.defaultLocale));
  const databaseReady = hasDatabase();
  const saved = (await searchParams).saved === "1";
  return <>
    <header className="admin-page-header"><div><p className="eyebrow">{m.settings.eyebrow}</p><h1>{m.settings.title}</h1></div></header>
    {saved ? <p className="admin-alert">{m.settings.saved}</p> : null}
    {!databaseReady ? <p className="admin-alert error">{m.settings.databaseRequired}</p> : null}
    <form className="admin-form" action={saveSettingsAction}>
      <fieldset disabled={!databaseReady}><legend>{m.settings.legend}</legend><div className="admin-form-grid">
        <label><span>{m.settings.brand}</span><input name="brandName" defaultValue={settings.brandName} required /></label>
        <label><span>{m.settings.logo}</span><input name="logoText" defaultValue={settings.logoText} required /></label>
        <label><span>{m.settings.defaultLocale}</span><select name="defaultLocale" defaultValue={settings.defaultLocale}><option value="zh-hant">繁體中文</option><option value="zh-hans">简体中文</option><option value="en">English</option></select><small className="admin-field-help">{m.settings.localeHelp}</small></label>
        <label><span>{m.settings.email}</span><input type="email" name="contactEmail" defaultValue={settings.contactEmail} /></label>
        <label><span>{m.settings.location}</span><input name="location" defaultValue={settings.location} /></label>
      </div></fieldset>
      <button className="admin-primary" type="submit" disabled={!databaseReady}>{m.settings.save}</button>
    </form>
  </>;
}
