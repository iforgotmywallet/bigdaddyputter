import type { Metadata } from "next";
import { getMessages, requireLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const m = getMessages(requireLocale((await params).locale));
  return { title: m.privacy.title, description: m.privacy.body };
}
export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) { const locale = requireLocale((await params).locale); const m = getMessages(locale); return <><header className="content-hero shell"><p className="eyebrow">{m.ui.legalEyebrow}</p><h1>{m.privacy.title}</h1></header><section className="content-body"><div className="prose-shell"><p>{m.privacy.body}</p></div></section></>; }
