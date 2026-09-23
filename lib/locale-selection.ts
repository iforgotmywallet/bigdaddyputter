import type { Locale } from "@/lib/types";

export const LOCALE_PREFERENCE_COOKIE = "site_locale";

export function isLocale(value: string | undefined): value is Locale {
  return ["zh-hant", "zh-hans", "en"].includes(value ?? "");
}

export function parseLocalePreference(value: string | undefined, fallback: Locale): Locale {
  return isLocale(value) ? value : fallback;
}

export function localeFromVisitorRegion(country: string | null, continent: string | null): Locale {
  if (["HK", "TW", "SG"].includes(country?.toUpperCase() ?? "")) return "zh-hant";
  if (continent?.toUpperCase() === "AS") return "zh-hans";
  return "en";
}
