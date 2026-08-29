import type { Metadata } from "next";
import { SubsetPage } from "@/components/collection/subset-page";
import { getPublishedPutters } from "@/db/queries/putters";
import { getMessages, requireLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const m = getMessages(requireLocale((await params).locale));
  return { title: m.nav.available, description: m.home.contactText };
}
export default async function Available({ params }: { params: Promise<{ locale: string }> }) { const locale = requireLocale((await params).locale); const m = getMessages(locale); const all = await getPublishedPutters({ sort: "availability" }); const putters = all.filter((item) => item.status === "available" || item.status === "reserved"); return <SubsetPage locale={locale} eyebrow={m.ui.availableEyebrow} title={m.nav.available} intro={m.home.contactText} putters={putters} />; }
