import type { SiteSettings } from "@/lib/types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const PAGE_SIZE = 12;

export const defaultSettings: SiteSettings = {
  brandName: "The Putter Archive",
  logoText: "TPA / HK",
  defaultLocale: "zh-hant",
  announcementEnabled: true,
  announcement: {
    "zh-hant": "香港私人推杆珍藏 · 歡迎收藏交流",
    "zh-hans": "香港私人推杆珍藏 · 欢迎收藏交流",
    en: "Private putter collection based in Hong Kong",
  },
  heroTitle: {
    "zh-hant": "珍稀推杆，悉心收藏",
    "zh-hans": "珍稀推杆，悉心收藏",
    en: "Rare Putters, Carefully Collected",
  },
  heroSubtitle: {
    "zh-hant": "一座記錄巡迴賽、限量版與具歷史意義推杆的私人典藏。",
    "zh-hans": "一座记录巡回赛、限量版与具历史意义推杆的私人典藏。",
    en: "A curated archive of exceptional tour, limited-edition, and historically significant putters.",
  },
  heroImageSrc: "https://picsum.photos/seed/putter-hero-archive/2400/1500",
  ownerImageSrc: "https://picsum.photos/seed/collector-room-hk/1400/1750",
  contactEmail: "collector@example.com",
  location: "Hong Kong",
};
