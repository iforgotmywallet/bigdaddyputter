import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { ProductGrid } from "@/components/collection/product-grid";
import { ProductGallery } from "@/components/product/gallery";
import { ShareButton } from "@/components/product/share-button";
import { InterestButton } from "@/components/account/interest-button";
import { StatusBadge } from "@/components/ui/status-badge";
import { customerIsInterested } from "@/db/queries/customers";
import { getPublishedPutters, getPutterBySlug, getRelatedPutters } from "@/db/queries/putters";
import { getCustomerSession } from "@/lib/customer-session";
import { formatPrice, getConditionLabel } from "@/lib/formatting";
import { getMessages, requireLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export async function generateStaticParams() { const putters = await getPublishedPutters(); return putters.flatMap((putter) => ["zh-hant", "zh-hans", "en"].map((locale) => ({ locale, slug: putter.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> { const { locale: rawLocale, slug } = await params; const locale = requireLocale(rawLocale); const putter = await getPutterBySlug(slug); if (!putter) return {}; const t = putter.translations[locale]; const image = putter.images[0]?.src; return { title: t.seoTitle, description: t.seoDescription, alternates: { canonical: `/${locale}/collection/${slug}` }, openGraph: { title: t.seoTitle, description: t.seoDescription, type: "website", images: image ? [{ url: image, width: 1600, height: 1200, alt: putter.images[0].alt[locale] }] : [] }, twitter: { card: "summary_large_image", title: t.seoTitle, description: t.seoDescription, images: image ? [image] : [] } }; }

type SpecificationValue = string | number | undefined;
type SpecificationItem = [string, SpecificationValue];

function hasSpecificationValue(item: SpecificationItem) {
  return item[1] !== undefined && item[1] !== "";
}

export default async function PutterPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params; const locale = requireLocale(rawLocale); const putter = await getPutterBySlug(slug); if (!putter) notFound();
  const m = getMessages(locale); const t = putter.translations[locale]; const [related, session] = await Promise.all([getRelatedPutters(putter), getCustomerSession()]); const interested = session ? await customerIsInterested(session.user.id, putter.id) : false; const price = formatPrice(putter.priceMode, putter.priceCents, putter.priceCurrency, locale);
  const categorySlug = putter.catalogCategory?.slug ?? "putters";
  const categorySpecs = putter.categorySpecifications ?? {};
  const releaseDate = categorySpecs.releaseDate ? new Intl.DateTimeFormat(locale === "zh-hant" ? "zh-HK" : locale === "zh-hans" ? "zh-CN" : "en-HK", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${categorySpecs.releaseDate}T00:00:00Z`)) : undefined;
  const collectorItems: SpecificationItem[] = [[m.product.specLabels.category, putter.catalogCategory?.name[locale] ?? putter.category], [m.product.specLabels.coaStatus, putter.coaStatus], [m.product.specLabels.serialNumber, putter.serialNumber], [m.product.specLabels.conditionScore, putter.conditionScore && getConditionLabel(putter.conditionScore, locale)]];
  const releaseItems: SpecificationItem[] = [[m.product.specLabels.releaseYear, putter.releaseYear], [m.product.specLabels.productCode, categorySpecs.productCode], [m.product.specLabels.releaseDate, releaseDate], [m.product.specLabels.releaseEvent, categorySpecs.releaseEvent], [m.product.specLabels.edition, categorySpecs.edition]];
  const categoryItems: SpecificationItem[] = [[m.product.specLabels.brand, putter.brand], [m.product.specLabels.model, putter.model], [m.product.specLabels.modelFamily, putter.modelFamily], [m.product.specLabels.material, categorySpecs.material], [m.product.specLabels.colorway, categorySpecs.colorway]];
  if (categorySlug === "headcovers") categoryItems.push([m.product.specLabels.headcoverFit, categorySpecs.headcoverFit], [m.product.specLabels.handedness, categorySpecs.handedness], [m.product.specLabels.closureType, categorySpecs.closureType]);
  else if (categorySlug === "golf-bags") categoryItems.push([m.product.specLabels.bagType, categorySpecs.bagType], [m.product.specLabels.dividerTop, categorySpecs.dividerTop], [m.product.specLabels.strapSystem, categorySpecs.strapSystem], [m.product.specLabels.pocketCount, categorySpecs.pocketCount], [m.product.specLabels.weightPounds, categorySpecs.weightPounds && `${categorySpecs.weightPounds} lb`], [m.product.specLabels.featureSummary, categorySpecs.featureSummary]);
  else if (categorySlug === "accessories") categoryItems.push([m.product.specLabels.accessoryType, categorySpecs.accessoryType], [m.product.specLabels.dimensions, categorySpecs.dimensions], [m.product.specLabels.weightGrams, categorySpecs.weightGrams && `${categorySpecs.weightGrams} g`], [m.product.specLabels.galleryOrigin, categorySpecs.galleryOrigin]);
  else categoryItems.push([m.product.specLabels.dimensions, categorySpecs.dimensions], [m.product.specLabels.weightGrams, categorySpecs.weightGrams && `${categorySpecs.weightGrams} g`]);
  const specGroups = categorySlug === "putters" ? [
    { title: m.product.specGroups.head, items: [[m.product.specLabels.brand, putter.brand], [m.product.specLabels.model, putter.model], [m.product.specLabels.modelFamily, putter.modelFamily], [m.product.specLabels.headStyle, putter.headStyle], [m.product.specLabels.headMaterial, putter.headMaterial], [m.product.specLabels.finish, putter.finish], [m.product.specLabels.neckType, putter.neckType], [m.product.specLabels.alignmentAid, putter.alignmentAid]] as SpecificationItem[] },
    { title: m.product.specGroups.build, items: [[m.product.specLabels.lengthInches, putter.lengthInches && `${putter.lengthInches}\"`], [m.product.specLabels.loftDegrees, putter.loftDegrees && `${putter.loftDegrees}°`], [m.product.specLabels.lieDegrees, putter.lieDegrees && `${putter.lieDegrees}°`], [m.product.specLabels.headWeightGrams, putter.headWeightGrams && `${putter.headWeightGrams} g`], [m.product.specLabels.shaft, putter.shaft], [m.product.specLabels.grip, putter.grip]] as SpecificationItem[] },
    { title: m.product.specGroups.collector, items: [...collectorItems, [m.product.specLabels.releaseYear, putter.releaseYear], [m.product.specLabels.headcover, putter.headcover], [m.product.specLabels.paintFill, putter.paintFill]] as SpecificationItem[] },
  ] : [
    { title: m.product.specGroups.category, items: categoryItems },
    { title: m.product.specGroups.release, items: releaseItems },
    { title: m.product.specGroups.collector, items: collectorItems },
  ];
  const quickFacts: SpecificationItem[] = categorySlug === "putters"
    ? [[m.product.specLabels.lengthInches, putter.lengthInches && `${putter.lengthInches}\"`], [m.product.specLabels.headWeightGrams, putter.headWeightGrams && `${putter.headWeightGrams} g`], [m.product.specLabels.headMaterial, putter.headMaterial], [m.product.specLabels.alignmentAid, putter.alignmentAid], [m.common.condition, putter.conditionScore && getConditionLabel(putter.conditionScore, locale)], [m.common.location, putter.location]]
    : [[m.product.specLabels.releaseEvent, categorySpecs.releaseEvent], [m.product.specLabels.material, categorySpecs.material], [m.product.specLabels.colorway, categorySpecs.colorway], [m.common.condition, putter.conditionScore && getConditionLabel(putter.conditionScore, locale)], [m.common.location, putter.location]];
  const jsonLd = { "@context": "https://schema.org", "@type": "Product", name: t.title, description: t.overview, image: putter.images.map((image) => image.src), brand: { "@type": "Brand", name: putter.brand }, model: putter.model, sku: putter.serialNumber, itemCondition: "https://schema.org/UsedCondition", ...(putter.priceMode === "amount" && putter.priceCents ? { offers: { "@type": "Offer", price: putter.priceCents / 100, priceCurrency: putter.priceCurrency, availability: putter.status === "available" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability" } } : {}) };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <article className="product-page shell"><div className="breadcrumbs"><Link href={`/${locale}`}>{m.nav.archive}</Link><span>/</span><Link href={`/${locale}/collection`}>{m.nav.collection}</Link>{putter.catalogCategory ? <><span>/</span><Link href={`/${locale}/collection/category/${putter.catalogCategory.slug}`}>{putter.catalogCategory.name[locale]}</Link></> : null}<span>/</span><span>{putter.model}</span></div><div className="product-layout"><ProductGallery images={putter.images} locale={locale} label={m.product.gallery} counterWord={m.product.imageCount} controls={{ close: m.ui.close, previous: m.ui.previousImage, next: m.ui.nextImage }} /><aside className="product-summary"><StatusBadge status={putter.status} label={m.status[putter.status]} /><p className="product-brand">{putter.brand}</p><h1>{t.title}</h1><p className="product-subtitle">{t.subtitle}</p>{quickFacts.filter(hasSpecificationValue).length ? <dl className="product-facts">{quickFacts.filter(hasSpecificationValue).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl> : null}{price ? <p className="product-price">{price === "on_request" ? m.common.priceOnRequest : price}</p> : null}{putter.status === "available" || putter.status === "reserved" ? <Link className="button button-dark" href="#inquiry">{m.product.inquiry} <span>↗</span></Link> : <p className="product-notice">{m.product.collectionOnlyNotice}</p>}<InterestButton putterId={putter.id} slug={putter.slug} locale={locale} signedIn={Boolean(session)} initialInterested={interested} labels={{ add: m.account.addInterest, remove: m.account.removeInterest, signIn: m.account.signInToSave }} />{putter.status === "reserved" ? <p className="product-notice">{m.product.reservedNotice}</p> : null}<div className="summary-actions"><ShareButton label={m.common.share} copied={m.common.copied} /><span className="text-button">ID {putter.id.slice(-6)}</span></div></aside></div>
      <section className="product-editorial"><h2>{m.product.objectNotes}</h2><div className="product-editorial-copy">{[[m.product.overview, t.overview], [m.product.collectorNotes, t.collectorNotes], [m.product.condition, t.conditionNotes], [m.product.provenance, t.provenanceText], [m.product.included, t.includedItems]].filter(([, text]) => text).map(([title, text]) => <section key={title}><h3>{title}</h3><p>{text}</p></section>)}</div></section>
      <section className="specifications"><div className="section-heading"><div><p className="eyebrow">{m.product.recorded}</p><h2>{m.product.specifications}</h2></div></div><div className="spec-groups">{specGroups.map((group) => ({ ...group, items: group.items.filter(hasSpecificationValue) })).filter((group) => group.items.length).map((group) => <section className="spec-group" key={group.title}><h3>{group.title}</h3><dl>{group.items.map(([label, value]) => <div className="spec-item" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>)}</div><p className="authenticity-note">{m.product.authenticity}</p></section>
      {related.length ? <section className="home-section"><div className="section-heading"><h2>{m.product.related}</h2></div><ProductGrid putters={related} locale={locale} /></section> : null}
      <section id="inquiry" className="contact-page"><div className="contact-intro"><p className="eyebrow">{m.product.inquiryEyebrow}</p><h2 className="display-title">{m.product.inquiry}</h2><p>{m.contact.intro}</p></div><InquiryForm locale={locale} labels={m.contact} putterId={putter.id} productTitle={t.title} /></section>
    </article>
  </>;
}
