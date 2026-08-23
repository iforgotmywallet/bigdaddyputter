import type { Locale, PriceMode, PutterStatus } from "@/lib/types";

const localeMap: Record<Locale, string> = { "zh-hant": "zh-HK", "zh-hans": "zh-CN", en: "en-HK" };

export function formatPrice(mode: PriceMode, cents: number | undefined, currency: string | undefined, locale: Locale) {
  if (mode === "hidden") return null;
  if (mode === "on_request") return "on_request";
  if (cents === undefined || !currency) return null;
  return new Intl.NumberFormat(localeMap[locale], { style: "currency", currency, maximumFractionDigits: 0 }).format(cents / 100);
}

export function getConditionLabel(score: number | undefined, locale: Locale) {
  if (!score) return "—";
  const descriptor = score >= 9 ? (locale === "en" ? "Excellent" : locale === "zh-hant" ? "優良" : "优良") : (locale === "en" ? "Very good" : locale === "zh-hant" ? "甚佳" : "甚佳");
  return `${descriptor} · ${score.toFixed(1)}/10`;
}

export const statusOrder: Record<PutterStatus, number> = { available: 0, reserved: 1, display_only: 2, sold: 3, private: 4 };
