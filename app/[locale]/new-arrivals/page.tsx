import type { Metadata } from "next";
import { SubsetPage } from "@/components/collection/subset-page";
import { getPublishedPutters } from "@/db/queries/putters";
import { getMessages, requireLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const m = getMessages(requireLocale((await params).locale));
  return { title: m.nav.newArrivals, description: m.home.featuredIntro };
}
export default async function NewArrivals({ params }: { params: Promise<{ locale: string }> }) { const locale = requireLocale((await params).locale); const m = getMessages(locale); const putters = (await getPublishedPutters({ sort: "newest" })).slice(0, 12); return <SubsetPage locale={locale} eyebrow={m.ui.newArrivalsEyebrow} title={m.nav.newArrivals} intro={m.home.featuredIntro} putters={putters} />; }
