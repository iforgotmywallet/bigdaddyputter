import type { Metadata } from "next";
import { SubsetPage } from "@/components/collection/subset-page";
import { getPublishedPutters } from "@/db/queries/putters";
import { getMessages, requireLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const m = getMessages(requireLocale((await params).locale));
  return { title: m.nav.archive, description: m.home.archiveText };
}
export default async function Archive({ params }: { params: Promise<{ locale: string }> }) { const locale = requireLocale((await params).locale); const m = getMessages(locale); const all = await getPublishedPutters(); const putters = all.filter((item) => item.status === "sold" || item.status === "display_only"); return <SubsetPage locale={locale} eyebrow={m.ui.archiveEyebrow} title={m.nav.archive} intro={m.home.archiveText} putters={putters} />; }
