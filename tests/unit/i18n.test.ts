import { describe, expect, it } from "vitest";
import { getMessages, isLocale } from "@/lib/i18n";

describe("locale validation", () => {
  it.each(["zh-hant", "zh-hans", "en"])("accepts %s", (locale) => expect(isLocale(locale)).toBe(true));
  it("rejects unsupported locale", () => expect(isLocale("fr")).toBe(false));
});

describe("availability labels", () => {
  it("defines every public status in each locale", () => { for (const locale of ["zh-hant", "zh-hans", "en"] as const) for (const status of ["available", "reserved", "sold", "display_only"] as const) expect(getMessages(locale).status[status]).toBeTruthy(); });
});
