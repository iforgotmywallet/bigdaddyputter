import "server-only";

import { getSiteSettings } from "@/db/queries/settings";
import { getAdminMessages } from "@/lib/admin-i18n";
import { getPreferredLocale } from "@/lib/locale-preference";
import type { Locale } from "@/lib/types";

export async function getAdminLanguage(defaultLocale?: Locale) {
  const locale = defaultLocale ?? (await getSiteSettings()).defaultLocale;
  return { locale, messages: getAdminMessages(locale) };
}

export async function getAdminLoginLanguage() {
  const fallback = (await getSiteSettings()).defaultLocale;
  const locale = await getPreferredLocale(fallback);
  return { locale, messages: getAdminMessages(locale) };
}

export function adminHtmlLanguage(locale: Locale) {
  return locale === "zh-hans" ? "zh-Hans" : locale === "zh-hant" ? "zh-Hant" : "en";
}
