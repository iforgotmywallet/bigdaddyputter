import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminSession } from "@/lib/auth/session";
import { AdminLanguageSelector } from "@/components/admin/admin-language-selector";
import { getAdminLoginLanguage } from "@/lib/admin-language";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  const { locale, messages } = await getAdminLoginLanguage();
  const m = messages.login;
  return <div className="admin-login"><div className="admin-login-note"><span>{m.privateAccess}</span><strong>HK / 22.3193° N</strong></div><div className="admin-login-panel"><AdminLanguageSelector locale={locale} /><p className="eyebrow">{m.eyebrow}</p><h1>{m.title}</h1><p>{m.intro}</p><LoginForm locale={locale} labels={m} /></div></div>;
}
