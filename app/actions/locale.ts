"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOCALE_PREFERENCE_COOKIE, parseLocalePreference } from "@/lib/locale-preference";

export async function setLocalePreferenceAction(formData: FormData) {
  const locale = parseLocalePreference(String(formData.get("locale") ?? ""), "zh-hant");
  const requested = String(formData.get("returnTo") ?? "/admin/login");
  const returnTo = requested.startsWith("/admin") && !requested.startsWith("//") ? requested : "/admin/login";
  (await cookies()).set(LOCALE_PREFERENCE_COOKIE, locale, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  redirect(returnTo);
}
