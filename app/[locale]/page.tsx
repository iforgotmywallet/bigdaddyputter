import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/collection/product-grid";
import { getPublishedPutters } from "@/db/queries/putters";
import { getSiteSettings } from "@/db/queries/settings";
import { getMessages, requireLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const settings = await getSiteSettings();
  return { title: settings.heroTitle[locale], description: settings.heroSubtitle[locale], alternates: { canonical: `/${locale}`, languages: { "zh-Hant": "/zh-hant", "zh-Hans": "/zh-hans", en: "/en" } } };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const m = getMessages(locale);
  const [all, settings] = await Promise.all([getPublishedPutters({ sort: "newest" }), getSiteSettings()]);
  const featured = all.filter((putter) => putter.isFeatured).slice(0, 4);
  const latest = all.slice(0, 4);
  const archive = all.filter((putter) => ["sold", "display_only"].includes(putter.status)).slice(0, 4);
  const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: settings.brandName, url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/${locale}`, inLanguage: locale };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }} />
      <section className="hero">
        <Image src={settings.heroImageSrc} alt="" width={2400} height={1500} sizes="100vw" priority />
        <div className="shell hero-content">
          <div className="hero-copy"><p className="eyebrow">{m.home.eyebrow}</p><h1>{settings.heroTitle[locale]}</h1><p>{settings.heroSubtitle[locale]}</p><div className="hero-actions"><Link className="button button-light" href={`/${locale}/collection`}>{m.common.explore}</Link><Link className="button button-outline" href={`/${locale}/contact`}>{m.common.contactCollector}</Link></div></div>
          <div className="hero-index"><span>Catalogue / 2026</span><b>{String(all.length).padStart(2, "0")}</b><span>Published objects</span></div>
        </div>
      </section>
      <section className="home-section shell"><div className="section-heading"><div><p className="eyebrow">01 / Featured</p><h2>{m.home.featured}</h2></div><p>{m.home.featuredIntro}</p></div><ProductGrid putters={featured} locale={locale} priorityCount={4} /></section>
      <section className="principles"><div className="shell"><div className="principles-intro"><p className="eyebrow">{m.home.principlesEyebrow}</p><h2>{m.home.principlesTitle}</h2></div><div className="principles-list">{m.home.principles.map((principle) => <article className="principle" key={principle.title}><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div></div></section>
      <section className="home-section shell"><div className="section-heading"><div><p className="eyebrow">02 / Recent</p><h2>{m.home.latest}</h2></div><Link className="text-link" href={`/${locale}/new-arrivals`}>{m.common.viewAll} ↗</Link></div><ProductGrid putters={latest} locale={locale} /></section>
      <section className="owner-note"><div className="owner-image"><Image src={settings.ownerImageSrc} alt="Private collection room" width={1400} height={1750} sizes="(max-width: 800px) 100vw, 52vw" /></div><div className="owner-copy"><p className="eyebrow">{m.home.ownerEyebrow}</p><h2>{m.home.ownerTitle}</h2><p>{m.home.ownerText}</p><p className="owner-signature">Private Collector · Hong Kong</p></div></section>
      <section className="home-section shell"><div className="section-heading"><div><p className="eyebrow">03 / Reference</p><h2>{m.home.archive}</h2></div><p>{m.home.archiveText}</p></div><ProductGrid putters={archive} locale={locale} /></section>
      <section className="final-cta shell"><p className="eyebrow">{m.home.contactEyebrow}</p><h2>{m.home.contactTitle}</h2><p>{m.home.contactText}</p><Link className="button button-dark" href={`/${locale}/contact`}>{m.common.contactCollector} <span>↗</span></Link></section>
    </>
  );
}
