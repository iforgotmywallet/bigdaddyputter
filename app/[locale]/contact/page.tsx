import type { Metadata } from "next";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { getSiteSettings } from "@/db/queries/settings";
import { getMessages, requireLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Contact", robots: { index: true, follow: true } };
export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const m = getMessages(locale);
  const settings = await getSiteSettings();
  const externalLinks = [
    ["WhatsApp", settings.whatsappUrl],
    ["Instagram", settings.instagramUrl],
    ["小紅書 / Xiaohongshu", settings.xiaohongshuUrl],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return <div className="shell contact-page"><div className="contact-intro"><p className="eyebrow">{m.contact.eyebrow}</p><h1>{m.contact.title}</h1><p>{m.contact.intro}</p><div className="contact-details"><a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>{settings.location ? <span>{settings.location}</span> : null}{settings.wechatId ? <span>WeChat / {settings.wechatId}</span> : null}{externalLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div></div><InquiryForm locale={locale} labels={m.contact} /></div>;
}
