import { getMessages, requireLocale } from "@/lib/i18n";

export const metadata = { title: "Privacy" };
export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) { const locale = requireLocale((await params).locale); const m = getMessages(locale); return <><header className="content-hero shell"><p className="eyebrow">Legal / 01</p><h1>{m.privacy.title}</h1></header><section className="content-body"><div className="prose-shell"><p>{m.privacy.body}</p></div></section></>; }
