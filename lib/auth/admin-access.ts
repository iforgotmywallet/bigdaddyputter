import type { Locale } from "@/lib/types";

export function isCustomerCredentialRoute(pathname: string) {
  return /\/sign-(?:in|up)(?:\/|$)/.test(pathname);
}

export function publicAdminLogoutDestination(locale: Locale, requested: string) {
  const allowed = new Set([
    `/${locale}`,
    `/${locale}/account/login`,
    `/${locale}/account/signup`,
  ]);

  return allowed.has(requested) ? requested : `/${locale}`;
}
