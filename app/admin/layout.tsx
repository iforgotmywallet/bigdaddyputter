import type { Metadata } from "next";
import { adminHtmlLanguage, getAdminLanguage } from "@/lib/admin-language";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getAdminLanguage();
  return { title: { default: messages.common.metadataTitle, template: `%s | ${messages.common.metadataTitle}` }, robots: { index: false, follow: false, noarchive: true } };
}

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const { locale } = await getAdminLanguage();
  return <main id="main" className="admin-root" lang={adminHtmlLanguage(locale)}>{children}</main>;
}
