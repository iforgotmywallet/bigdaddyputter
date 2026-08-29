import type { SiteSettings } from "@/lib/types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const PAGE_SIZE = 12;
export const BRAND_NAME = "ScottyGoldenBell";
export const BRAND_SHORT_NAME = "SGB";

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
