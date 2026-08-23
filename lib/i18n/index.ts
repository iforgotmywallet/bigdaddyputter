import { notFound } from "next/navigation";
import { en } from "@/messages/en";
import { zhHans } from "@/messages/zh-hans";
import { zhHant } from "@/messages/zh-hant";
import { locales, type Locale } from "@/lib/types";

const dictionaries = { en, "zh-hans": zhHans, "zh-hant": zhHant } as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

export function getMessages(locale: Locale) {
  return dictionaries[locale];
}

export function localePath(locale: Locale, path = "") {
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || `/${locale}`;
}

export const localeLabels: Record<Locale, string> = {
  "zh-hant": "繁",
  "zh-hans": "简",
  en: "EN",
};
