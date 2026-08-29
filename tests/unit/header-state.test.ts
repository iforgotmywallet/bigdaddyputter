import { describe, expect, it } from "vitest";
import { shouldStartWithSolidHeader } from "@/lib/navigation/header-state";

describe("public header contrast", () => {
  it.each([
    "/zh-hant/collection",
    "/zh-hant/new-arrivals",
    "/zh-hant/available",
    "/zh-hant/archive",
    "/zh-hant/about",
    "/zh-hant/contact",
    "/zh-hant/privacy",
    "/zh-hant/collection/tour-putter",
  ])("starts solid on light route %s", (pathname) => {
    expect(shouldStartWithSolidHeader(pathname, "zh-hant")).toBe(true);
  });

  it.each([
    "/zh-hant",
    "/zh-hant/",
    "/zh-hant/account",
    "/zh-hant/account/login",
    "/zh-hant/account/signup",
  ])("keeps the transparent treatment on dark route %s", (pathname) => {
    expect(shouldStartWithSolidHeader(pathname, "zh-hant")).toBe(false);
  });

  it("uses the selected locale root", () => {
    expect(shouldStartWithSolidHeader("/en", "en")).toBe(false);
    expect(shouldStartWithSolidHeader("/zh-hant", "en")).toBe(true);
  });
});
