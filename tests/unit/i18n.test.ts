import { describe, expect, it } from "vitest";
import { getMessages, isLocale } from "@/lib/i18n";

describe("locale validation", () => {
  it.each(["zh-hant", "zh-hans", "en"])("accepts %s", (locale) => expect(isLocale(locale)).toBe(true));
  it("rejects unsupported locale", () => expect(isLocale("fr")).toBe(false));
});

describe("availability labels", () => {
  it("defines every public status in each locale", () => { for (const locale of ["zh-hant", "zh-hans", "en"] as const) for (const status of ["available", "reserved", "sold", "display_only"] as const) expect(getMessages(locale).status[status]).toBeTruthy(); });
  it.each([
    ["zh-hant", "全部"],
    ["zh-hans", "全部"],
    ["en", "All"],
  ] as const)("uses a readable default filter label in %s", (locale, label) => {
    expect(getMessages(locale).common.all).toBe(label);
  });
});

describe("collector-facing Chinese terminology", () => {
  it("uses an explicit not-for-sale status in every locale", () => {
    expect(getMessages("zh-hant").status.display_only).toBe("私人珍藏・非賣品");
    expect(getMessages("zh-hans").status.display_only).toBe("私人收藏・非卖品");
    expect(getMessages("en").status.display_only).toBe("Private Collection · Not for Sale");
  });

  it("does not use retired literal translations", () => {
    const messages = JSON.stringify([getMessages("zh-hant"), getMessages("zh-hans")]);
    for (const retired of ["僅供典藏", "仅供典藏", "工房", "隨附物件", "随附物件", "私人選藏", "私人选藏"]) {
      expect(messages).not.toContain(retired);
    }
  });
});

describe("admin storefront warning", () => {
  it.each(["zh-hant", "zh-hans", "en"] as const)("defines the admin-session controls in %s", (locale) => {
    const messages = getMessages(locale).adminSession;
    expect(messages.warning).toBeTruthy();
    expect(messages.logout).toBeTruthy();
    expect(messages.blockedTitle).toBeTruthy();
  });
});
