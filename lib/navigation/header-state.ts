import type { Locale } from "@/lib/types";

export function shouldStartWithSolidHeader(pathname: string, locale: Locale) {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const localeRoot = `/${locale}`;

  return normalizedPath !== localeRoot && !normalizedPath.startsWith(`${localeRoot}/account`);
}
