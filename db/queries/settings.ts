import { unstable_cache } from "next/cache";
import { getDb, hasDatabase } from "@/db/client";
import { siteSettings } from "@/db/schema";
import { defaultSettings } from "@/lib/constants";
import type { Locale, SiteSettings } from "@/lib/types";

function locale(value: string): Locale {
  return ["zh-hant", "zh-hans", "en"].includes(value) ? value as Locale : defaultSettings.defaultLocale;
}

async function loadSiteSettings(): Promise<SiteSettings> {
  if (!hasDatabase()) return defaultSettings;
  const [row] = await getDb().select().from(siteSettings).limit(1);
  if (!row) return defaultSettings;
  return {
    brandName: row.brandName,
    logoText: row.logoText,
    defaultLocale: locale(row.defaultLocale),
    announcementEnabled: row.announcementEnabled,
    announcement: {
      "zh-hant": row.announcementZhHant ?? defaultSettings.announcement["zh-hant"],
      "zh-hans": row.announcementZhHans ?? defaultSettings.announcement["zh-hans"],
      en: row.announcementEn ?? defaultSettings.announcement.en,
    },
    heroTitle: {
      "zh-hant": row.heroTitleZhHant ?? defaultSettings.heroTitle["zh-hant"],
      "zh-hans": row.heroTitleZhHans ?? defaultSettings.heroTitle["zh-hans"],
      en: row.heroTitleEn ?? defaultSettings.heroTitle.en,
    },
    heroSubtitle: {
      "zh-hant": row.heroSubtitleZhHant ?? defaultSettings.heroSubtitle["zh-hant"],
      "zh-hans": row.heroSubtitleZhHans ?? defaultSettings.heroSubtitle["zh-hans"],
      en: row.heroSubtitleEn ?? defaultSettings.heroSubtitle.en,
    },
    heroImageSrc: row.heroImageSrc ?? defaultSettings.heroImageSrc,
    ownerImageSrc: row.ownerImageSrc ?? defaultSettings.ownerImageSrc,
    contactEmail: row.contactEmail ?? defaultSettings.contactEmail,
    whatsappUrl: row.whatsappUrl ?? undefined,
    wechatId: row.wechatId ?? undefined,
    wechatQrSrc: row.wechatQrSrc ?? undefined,
    instagramUrl: row.instagramUrl ?? undefined,
    xiaohongshuUrl: row.xiaohongshuUrl ?? undefined,
    location: row.location ?? defaultSettings.location,
  };
}

export const getSiteSettings = unstable_cache(loadSiteSettings, ["site-settings"], {
  tags: ["site-settings"],
  revalidate: 300,
});
