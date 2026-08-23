export const locales = ["zh-hant", "zh-hans", "en"] as const;
export type Locale = (typeof locales)[number];

export const putterStatuses = ["available", "reserved", "sold", "display_only", "private"] as const;
export type PutterStatus = (typeof putterStatuses)[number];
export type PublicPutterStatus = Exclude<PutterStatus, "private">;
export type PriceMode = "hidden" | "amount" | "on_request";

export type LocalizedText = Record<Locale, string>;

export interface PutterImage {
  id: string;
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
  sortOrder: number;
  isPrimary: boolean;
}

export interface PutterTranslation {
  title: string;
  subtitle: string;
  overview: string;
  collectorNotes: string;
  conditionNotes: string;
  provenanceText: string;
  includedItems: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Putter {
  id: string;
  slug: string;
  brand: string;
  model: string;
  modelFamily?: string;
  releaseYear?: number;
  category?: string;
  status: PutterStatus;
  headStyle?: string;
  headMaterial?: string;
  finish?: string;
  neckType?: string;
  alignmentAid?: string;
  lengthInches?: number;
  loftDegrees?: number;
  lieDegrees?: number;
  headWeightGrams?: number;
  shaft?: string;
  grip?: string;
  headcover?: string;
  paintFill?: string;
  coaStatus?: string;
  serialNumber?: string;
  conditionScore?: number;
  priceMode: PriceMode;
  priceCents?: number;
  priceCurrency?: string;
  location?: string;
  provenanceSummary?: string;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  publishedAt?: string;
  updatedAt: string;
  translations: Record<Locale, PutterTranslation>;
  images: PutterImage[];
  tags: string[];
}

export interface CollectionFilters {
  status?: string;
  brand?: string;
  modelFamily?: string;
  headStyle?: string;
  material?: string;
  condition?: string;
  year?: number;
  category?: string;
  search?: string;
  sort: "featured" | "newest" | "model" | "year" | "price" | "availability";
  page: number;
}

export interface SiteSettings {
  brandName: string;
  logoText: string;
  defaultLocale: Locale;
  announcementEnabled: boolean;
  announcement: LocalizedText;
  heroTitle: LocalizedText;
  heroSubtitle: LocalizedText;
  heroImageSrc: string;
  ownerImageSrc: string;
  contactEmail: string;
  whatsappUrl?: string;
  wechatId?: string;
  wechatQrSrc?: string;
  instagramUrl?: string;
  xiaohongshuUrl?: string;
  location: string;
}
