import type { Locale, Putter, PutterStatus, PutterTranslation } from "@/lib/types";
import { BRAND_NAME } from "@/lib/constants";

const copy = (
  title: string,
  subtitle: string,
  overview: string,
  locale: Locale,
): PutterTranslation => {
  const localized = locale === "en"
    ? { title, subtitle, overview }
    : locale === "zh-hant"
      ? { title, subtitle: `${subtitle} · 私人收藏`, overview: `這支推桿因${overview}而納入收藏。頁面資料為開發示例，正式發布前應由收藏家核實。` }
      : { title, subtitle: `${subtitle} · 私人收藏`, overview: `这支推杆因${overview}而纳入收藏。页面资料为开发示例，正式发布前应由收藏家核实。` };

  return {
    ...localized,
    collectorNotes: locale === "en" ? "The proportions feel deliberate from every angle, with small workshop choices that reward close inspection." : locale === "zh-hant" ? "各角度的比例均經仔細推敲，工坊細節值得近距離觀察。" : "各角度的比例均经仔细推敲，工坊细节值得近距离观察。",
    conditionNotes: locale === "en" ? "Collector-kept condition with light handling marks noted in the gallery. No restoration has been represented." : locale === "zh-hant" ? "收藏級品相，圖片記錄輕微使用痕跡；未聲稱經過修復。" : "收藏级品相，图片记录轻微使用痕迹；未声称经过修复。",
    provenanceText: locale === "en" ? "Acquired through a known specialist source. Supporting details are available to serious inquiries." : locale === "zh-hant" ? "經專業渠道收藏；如有認真查詢，可進一步了解相關資料。" : "经专业渠道收藏；如有认真咨询，可进一步了解相关资料。",
    includedItems: locale === "en" ? "Putter, fitted grip, and matching headcover as photographed." : locale === "zh-hant" ? "推桿、已安裝握把及照片所示桿頭套。" : "推杆、已安装握把及照片所示杆头套。",
    seoTitle: `${localized.title} | ${BRAND_NAME}`,
    seoDescription: localized.overview,
  };
};

const gallery = (slug: string, title: string) => Array.from({ length: 6 }, (_, index) => ({
  id: `${slug}-image-${index + 1}`,
  src: `https://picsum.photos/seed/${slug}-${index + 1}/1600/1200`,
  alt: {
    "zh-hant": `${title} 實物照片 ${index + 1}`,
    "zh-hans": `${title} 实物照片 ${index + 1}`,
    en: `${title}, collection view ${index + 1}`,
  },
  width: 1600,
  height: 1200,
  sortOrder: index,
  isPrimary: index === 0,
}));

interface SeedPutter {
  slug: string;
  brand: string;
  model: string;
  family: string;
  year: number;
  status: PutterStatus;
  material: string;
  headStyle: string;
  finish: string;
  title: string;
  subtitle: string;
  reason: string;
  featured?: boolean;
  priceMode?: Putter["priceMode"];
  priceCents?: number;
  daysAgo: number;
}

const seeds: SeedPutter[] = [
  { slug: "atelier-01-gss-blade", brand: "Atelier No. 7", model: "01 GSS", family: "Workshop Blade", year: 2024, status: "available", material: "German Stainless Steel", headStyle: "Anser Blade", finish: "Soft Satin", title: "Atelier 01 GSS", subtitle: "Hand-finished workshop blade", reason: "restrained proportions and exceptionally fine face milling", featured: true, priceMode: "on_request", daysAgo: 2 },
  { slug: "northstar-tour-mallet", brand: "Northstar", model: "Tour M1", family: "Tour Mallet", year: 2023, status: "reserved", material: "Carbon Steel", headStyle: "Compact Mallet", finish: "Black Oxide", title: "Northstar Tour M1", subtitle: "Compact tour mallet · black oxide", reason: "deep finish and unusually compact mallet geometry", featured: true, priceMode: "amount", priceCents: 328000, daysAgo: 8 },
  { slug: "foundry-heritage-copper", brand: "The Foundry", model: "Heritage 2", family: "Heritage Blade", year: 2019, status: "sold", material: "Carbon Steel", headStyle: "Heel-shafted Blade", finish: "Aged Copper", title: "Foundry Heritage 2", subtitle: "Aged copper presentation finish", reason: "natural patina and classical heel-shafted balance", featured: true, daysAgo: 18 },
  { slug: "studio-long-neck-prototype", brand: "Studio Works", model: "LN Prototype", family: "Prototype Series", year: 2017, status: "display_only", material: "303 Stainless Steel", headStyle: "Long-neck Blade", finish: "Bead Blast", title: "Studio Long Neck Prototype", subtitle: "One-off long-neck study", reason: "prototype neck geometry and hand-marked workshop character", featured: true, daysAgo: 42 },
  { slug: "atelier-mid-slant-raw", brand: "Atelier No. 7", model: "03 Raw", family: "Workshop Blade", year: 2022, status: "available", material: "Carbon Steel", headStyle: "Mid-slant Blade", finish: "Raw Carbon", title: "Atelier 03 Raw", subtitle: "Raw carbon · mid-slant neck", reason: "honest raw finish and direct compact setup", priceMode: "hidden", daysAgo: 5 },
  { slug: "northstar-tungsten-widebody", brand: "Northstar", model: "WB-T", family: "Tour Mallet", year: 2025, status: "available", material: "303 Stainless / Tungsten", headStyle: "Wide-body Blade", finish: "Satin / Polished", title: "Northstar WB-T", subtitle: "Tungsten-weighted wide body", reason: "precise tungsten weighting and clean sightline treatment", priceMode: "on_request", daysAgo: 1 },
  { slug: "heritage-center-shaft", brand: "Archive Workshop", model: "CS-88", family: "Classic Studies", year: 1998, status: "sold", material: "Manganese Bronze", headStyle: "Center-shafted Mallet", finish: "Natural Patina", title: "Archive CS-88", subtitle: "Center-shafted bronze study", reason: "period proportions and untouched bronze surface", daysAgo: 110 },
  { slug: "studio-flow-neck-satin", brand: "Studio Works", model: "Flow 4", family: "Studio Series", year: 2021, status: "display_only", material: "303 Stainless Steel", headStyle: "Flow-neck Blade", finish: "Satin", title: "Studio Flow 4", subtitle: "Flow-neck studio reference", reason: "fluid neck transition and balanced shoulder lines", daysAgo: 85 },
];

export const samplePutters: Putter[] = seeds.map((seed, index) => {
  const publishedAt = new Date(Date.UTC(2026, 6, 25 - seed.daysAgo)).toISOString();
  return {
    id: `00000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
    slug: seed.slug,
    brand: seed.brand,
    model: seed.model,
    modelFamily: seed.family,
    releaseYear: seed.year,
    category: seed.status === "sold" || seed.status === "display_only" ? "Archive Studies" : "Private Selection",
    status: seed.status,
    headStyle: seed.headStyle,
    headMaterial: seed.material,
    finish: seed.finish,
    neckType: seed.headStyle.includes("Center") ? "Center shaft" : seed.headStyle.includes("Long") ? "Long plumbing neck" : "Plumbing neck",
    alignmentAid: "Single hand-painted sight line",
    lengthInches: 34,
    loftDegrees: 3.5,
    lieDegrees: 71,
    headWeightGrams: 350 + (index % 3) * 5,
    shaft: "Stepless steel",
    grip: "Stitched leather pistol",
    headcover: "Matching workshop cover",
    paintFill: index % 2 ? "Warm ivory" : "Deep green / ivory",
    coaStatus: index % 3 === 0 ? "COA included" : "Collector-assessed",
    serialNumber: `DEV-${seed.year}-${String(index + 1).padStart(3, "0")}`,
    conditionScore: 8.5 + (index % 3) * 0.25,
    priceMode: seed.priceMode ?? "hidden",
    priceCents: seed.priceCents,
    priceCurrency: "HKD",
    location: "Hong Kong",
    provenanceSummary: "Development seed record — verify before production use.",
    isFeatured: seed.featured ?? false,
    isPublished: true,
    displayOrder: index,
    publishedAt,
    updatedAt: publishedAt,
    translations: {
      "zh-hant": copy(seed.title, seed.subtitle, seed.reason, "zh-hant"),
      "zh-hans": copy(seed.title, seed.subtitle, seed.reason, "zh-hans"),
      en: copy(seed.title, seed.subtitle, seed.reason, "en"),
    },
    images: gallery(seed.slug, seed.title),
    tags: [seed.family, seed.material, seed.headStyle],
  };
});
