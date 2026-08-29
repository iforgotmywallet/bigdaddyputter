import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CustomerAuthForm } from "@/components/account/auth-form";
import { AdminAuthBlock } from "@/components/account/admin-auth-block";
import { getAdminSession } from "@/lib/auth/session";
import { getCustomerSession, isCustomerAuthConfigured } from "@/lib/customer-session";
import { getMessages, requireLocale } from "@/lib/i18n";
import { BRAND_SHORT_NAME } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const m = getMessages(requireLocale((await params).locale));
  return { title: m.account.memberAccess, description: m.account.loginIntro, robots: { index: false, follow: false } };
}

export default async function CustomerLoginPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ next?: string }> }) {
  const locale = requireLocale((await params).locale);
  const m = getMessages(locale);
  const adminSession = await getAdminSession();
  if (adminSession) return <AdminAuthBlock locale={locale} mode="login" labels={m.adminSession} />;
  const session = await getCustomerSession();
  const requested = (await searchParams).next;
  const callbackURL = requested?.startsWith(`/${locale}/`) ? requested : `/${locale}/account`;
  if (session) redirect(callbackURL);
  return <section className="customer-auth-page">
    <div className="customer-auth-story"><p className="eyebrow">{m.account.privateList}</p><p>{m.account.authQuote}</p><span>{BRAND_SHORT_NAME} / MEMBER 001</span></div>
    <div className="customer-auth-panel"><div><p className="eyebrow">{m.account.memberAccess}</p><h1>{m.account.loginTitle}</h1><p>{m.account.loginIntro}</p><CustomerAuthForm mode="login" locale={locale} labels={{ ...m.account, passwordHint: m.ui.passwordHint, genericError: m.ui.genericError }} callbackURL={callbackURL} configured={isCustomerAuthConfigured()} /></div></div>
  </section>;
}
