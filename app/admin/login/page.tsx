import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminSession } from "@/lib/auth/session";
import { getSiteSettings } from "@/db/queries/settings";
import { getAdminMessages } from "@/lib/admin-i18n";
import { getPreferredLocale } from "@/lib/locale-preference";
import { AdminLanguageSelector } from "@/components/admin/admin-language-selector";

export default async function AdminLoginPage() { if (await getAdminSession()) redirect("/admin"); const settings = await getSiteSettings(); const locale = await getPreferredLocale(settings.defaultLocale); const m = getAdminMessages(locale); return <div className="admin-login"><div className="admin-login-note"><span>{m.login.privateAccess}</span><strong>HK / 22.3193° N</strong></div><div className="admin-login-panel"><AdminLanguageSelector locale={locale} /><p className="eyebrow">{m.login.eyebrow}</p><h1>{m.login.title}</h1><p>{m.login.intro}</p><LoginForm locale={locale} labels={m.login} /></div></div>; }
