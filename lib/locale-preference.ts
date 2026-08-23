import "server-only";

import { cookies } from "next/headers";
import type { Locale } from "@/lib/types";

export const LOCALE_PREFERENCE_COOKIE = "site_locale";

export function parseLocalePreference(value: string | undefined, fallback: Locale): Locale {
  return ["zh-hant", "zh-hans", "en"].includes(value ?? "") ? value as Locale : fallback;
}

export async function getPreferredLocale(fallback: Locale) {
  return parseLocalePreference((await cookies()).get(LOCALE_PREFERENCE_COOKIE)?.value, fallback);
}
