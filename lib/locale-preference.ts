import "server-only";

import { cookies } from "next/headers";
import type { Locale } from "@/lib/types";
import { LOCALE_PREFERENCE_COOKIE, parseLocalePreference } from "@/lib/locale-selection";

export { LOCALE_PREFERENCE_COOKIE, parseLocalePreference } from "@/lib/locale-selection";

export async function getPreferredLocale(fallback: Locale) {
  return parseLocalePreference((await cookies()).get(LOCALE_PREFERENCE_COOKIE)?.value, fallback);
}
