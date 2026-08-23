import Image from "next/image";
import { getSiteSettings } from "@/db/queries/settings";
import { getMessages, requireLocale } from "@/lib/i18n";

export const metadata = { title: "About" };
export default async function About({ params }: { params: Promise<{ locale: string }> }) { const locale = requireLocale((await params).locale); const m = getMessages(locale); const settings = await getSiteSettings(); return <><header className="content-hero shell"><div className="content-hero-grid"><div><p className="eyebrow">{m.about.eyebrow}</p><h1>{m.about.title}</h1></div><Image src={settings.ownerImageSrc} alt="Private collection study" width={900} height={1125} sizes="(max-width: 800px) 100vw, 40vw" /></div></header><section className="content-body"><div className="prose-shell"><p>{m.about.body}</p><p className="pull-quote">“{m.about.principle}”</p></div></section></>; }
