import type { CatalogCategory, SiteSettings } from "@/lib/types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const PAGE_SIZE = 24;
export const BRAND_NAME = "ScottyGoldenBell";
export const BRAND_SHORT_NAME = "SGB";
export const DEFAULT_CATALOG_CATEGORY_SLUG = "putters";

export const DEFAULT_CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    slug: "putters",
    name: { "zh-hant": "推桿", "zh-hans": "推杆", en: "Putters" },
    description: { "zh-hant": "巡迴賽版本、限量作品與值得記錄的推桿。", "zh-hans": "巡回赛版本、限量作品与值得记录的推杆。", en: "Tour builds, limited releases, and putters worth documenting." },
    displayOrder: 0,
    isDefault: true,
    isActive: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    slug: "headcovers",
    name: { "zh-hant": "桿套", "zh-hans": "杆套", en: "Headcovers" },
    description: { "zh-hant": "原廠、巡迴賽及特別版本桿套。", "zh-hans": "原厂、巡回赛及特别版本杆套。", en: "Factory, tour, and special-edition headcovers." },
    displayOrder: 1,
    isDefault: false,
    isActive: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    slug: "golf-bags",
    name: { "zh-hant": "球包", "zh-hans": "球包", en: "Golf Bags" },
    description: { "zh-hant": "具收藏價值的球包與限量設計。", "zh-hans": "具有收藏价值的球包与限量设计。", en: "Collectible golf bags and limited designs." },
    displayOrder: 2,
    isDefault: false,
    isActive: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    slug: "accessories",
    name: { "zh-hant": "配件", "zh-hans": "配件", en: "Accessories" },
    description: { "zh-hant": "標記、工具及其他收藏配件。", "zh-hans": "标记、工具及其他收藏配件。", en: "Markers, tools, and other collectible accessories." },
    displayOrder: 3,
    isDefault: false,
    isActive: true,
  },
];

export const defaultSettings: SiteSettings = {
  brandName: BRAND_NAME,
  logoText: BRAND_SHORT_NAME,
  defaultLocale: "zh-hant",
  announcementEnabled: true,
  announcement: {
    "zh-hant": "香港私人推桿收藏 · 歡迎收藏交流",
    "zh-hans": "香港私人推杆收藏 · 欢迎收藏交流",
    en: "Private putter collection based in Hong Kong",
  },
  heroTitle: {
    "zh-hant": "珍稀推桿，悉心收藏",
    "zh-hans": "珍稀推杆，悉心收藏",
    en: "Rare Putters, Carefully Collected",
  },
  heroSubtitle: {
    "zh-hant": "收錄巡迴賽版本、限量版與具歷史意義推桿的私人收藏。",
    "zh-hans": "收录巡回赛版本、限量版及具有历史意义推杆的私人收藏。",
    en: "A curated archive of exceptional tour, limited-edition, and historically significant putters.",
  },
  heroImageSrc: "https://picsum.photos/seed/putter-hero-archive/2400/1500",
  ownerImageSrc: "https://picsum.photos/seed/collector-room-hk/1400/1750",
  contactEmail: "collector@example.com",
  location: "Hong Kong",
};
