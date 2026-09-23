import { describe, expect, it } from "vitest";
import {
  isLocale,
  localeFromVisitorRegion,
  parseLocalePreference,
} from "@/lib/locale-selection";

describe("locale selection", () => {
  it("uses Traditional Chinese for Hong Kong, Taiwan, and Singapore", () => {
    expect(localeFromVisitorRegion("HK", "AS")).toBe("zh-hant");
    expect(localeFromVisitorRegion("hk", "as")).toBe("zh-hant");
    expect(localeFromVisitorRegion("TW", "AS")).toBe("zh-hant");
    expect(localeFromVisitorRegion("SG", "AS")).toBe("zh-hant");
  });

  it("uses Simplified Chinese elsewhere in Asia", () => {
    expect(localeFromVisitorRegion("CN", "AS")).toBe("zh-hans");
    expect(localeFromVisitorRegion("JP", "AS")).toBe("zh-hans");
  });

  it("uses English outside Asia or when geolocation is unavailable", () => {
    expect(localeFromVisitorRegion("CA", "NA")).toBe("en");
    expect(localeFromVisitorRegion(null, null)).toBe("en");
  });

  it("recognizes and preserves valid cookie values", () => {
    expect(isLocale("zh-hant")).toBe(true);
    expect(isLocale("zh-hans")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(parseLocalePreference("en", "zh-hant")).toBe("en");
    expect(parseLocalePreference("invalid", "zh-hans")).toBe("zh-hans");
  });
});
