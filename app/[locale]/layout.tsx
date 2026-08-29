import { getMessages, requireLocale } from "@/lib/i18n";
import { locales } from "@/lib/types";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { isCustomerAuthConfigured } from "@/lib/customer-session";
import { getSiteSettings } from "@/db/queries/settings";

export const revalidate = 300;

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const m = getMessages(locale);
  const settings = await getSiteSettings();
  return <><Header locale={locale} logoText={settings.logoText} announcement={settings.announcementEnabled ? settings.announcement[locale] : undefined} labels={m.nav} adminSessionLabels={m.adminSession} customerAuthEnabled={isCustomerAuthConfigured()} /><main id="main">{children}</main><Footer locale={locale} logoText={settings.logoText} note={m.footer.note} rights={m.footer.rights} admin={m.footer.admin} /></>;
}
