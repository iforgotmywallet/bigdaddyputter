import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isLocale,
  LOCALE_PREFERENCE_COOKIE,
  localeFromVisitorRegion,
} from "@/lib/locale-selection";

export function proxy(request: NextRequest) {
  const savedLocale = request.cookies.get(LOCALE_PREFERENCE_COOKIE)?.value;
  const locale = isLocale(savedLocale)
    ? savedLocale
    : localeFromVisitorRegion(
        request.headers.get("x-vercel-ip-country"),
        request.headers.get("x-vercel-ip-continent"),
      );

  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}`;

  const response = NextResponse.redirect(destination);

  if (!isLocale(savedLocale)) {
    response.cookies.set(LOCALE_PREFERENCE_COOKIE, locale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  matcher: "/",
};
