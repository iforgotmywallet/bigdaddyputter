import { SubsetPage } from "@/components/collection/subset-page";
import { getPublishedPutters } from "@/db/queries/putters";
import { getMessages, requireLocale } from "@/lib/i18n";

export const metadata = { title: "New Arrivals" };
export default async function NewArrivals({ params }: { params: Promise<{ locale: string }> }) { const locale = requireLocale((await params).locale); const m = getMessages(locale); const putters = (await getPublishedPutters({ sort: "newest" })).slice(0, 12); return <SubsetPage locale={locale} eyebrow="Recent / 30 days" title={m.nav.newArrivals} intro={m.home.featuredIntro} putters={putters} />; }
