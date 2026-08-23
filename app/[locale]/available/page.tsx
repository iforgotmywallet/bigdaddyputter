import { SubsetPage } from "@/components/collection/subset-page";
import { getPublishedPutters } from "@/db/queries/putters";
import { getMessages, requireLocale } from "@/lib/i18n";

export const metadata = { title: "Available" };
export default async function Available({ params }: { params: Promise<{ locale: string }> }) { const locale = requireLocale((await params).locale); const m = getMessages(locale); const all = await getPublishedPutters({ sort: "availability" }); const putters = all.filter((item) => item.status === "available" || item.status === "reserved"); return <SubsetPage locale={locale} eyebrow="Private inquiry" title={m.nav.available} intro={m.home.contactText} putters={putters} />; }
