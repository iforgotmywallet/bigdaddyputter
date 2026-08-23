import { redirect } from "next/navigation";
import { CustomerAuthForm } from "@/components/account/auth-form";
import { getCustomerSession, isCustomerAuthConfigured } from "@/lib/customer-session";
import { getMessages, requireLocale } from "@/lib/i18n";

export const metadata = { title: "Customer sign in", robots: { index: false, follow: false } };

export default async function CustomerLoginPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ next?: string }> }) {
  const locale = requireLocale((await params).locale);
  const m = getMessages(locale);
  const session = await getCustomerSession();
  const requested = (await searchParams).next;
  const callbackURL = requested?.startsWith(`/${locale}/`) ? requested : `/${locale}/account`;
  if (session) redirect(callbackURL);
  return <section className="customer-auth-page">
    <div className="customer-auth-story"><p className="eyebrow">{m.account.privateList}</p><p>{m.account.authQuote}</p><span>TPA / MEMBER 001</span></div>
    <div className="customer-auth-panel"><div><p className="eyebrow">{m.account.memberAccess}</p><h1>{m.account.loginTitle}</h1><p>{m.account.loginIntro}</p><CustomerAuthForm mode="login" locale={locale} labels={m.account} callbackURL={callbackURL} configured={isCustomerAuthConfigured()} /></div></div>
  </section>;
}
