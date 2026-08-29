import { describe, expect, it } from "vitest";
import { createSessionToken, verifySessionToken } from "@/lib/auth/token";
import { isCustomerCredentialRoute, publicAdminLogoutDestination } from "@/lib/auth/admin-access";
import { adminContactMethodLabel, adminInquiryStatusLabel, adminLocaleLabel, adminStatusLabel, getAdminMessages } from "@/lib/admin-i18n";

function messagePaths(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, item]) => messagePaths(item, prefix ? `${prefix}.${key}` : key)).sort();
}

describe("admin session validation", () => {
  const secret = "a-secure-test-secret-with-more-than-thirty-two-characters";
  it("accepts a signed owner token", async () => expect(await verifySessionToken(await createSessionToken(secret), secret)).toBe(true));
  it("rejects tampered or foreign tokens", async () => expect(await verifySessionToken(`${await createSessionToken(secret)}x`, secret)).toBe(false));
  it("requires a strong signing secret", async () => expect(() => createSessionToken("short")).toThrow());
});

describe("admin and customer session separation", () => {
  it.each([
    "/api/auth/sign-in/email",
    "/api/auth/sign-up/email",
  ])("recognizes customer credential endpoint %s", (pathname) => {
    expect(isCustomerCredentialRoute(pathname)).toBe(true);
  });

  it.each([
    "/api/auth/sign-out",
    "/api/auth/get-session",
  ])("does not block non-credential endpoint %s", (pathname) => {
    expect(isCustomerCredentialRoute(pathname)).toBe(false);
  });

  it("allows only known same-locale destinations after admin logout", () => {
    expect(publicAdminLogoutDestination("zh-hant", "/zh-hant/account/login")).toBe("/zh-hant/account/login");
    expect(publicAdminLogoutDestination("zh-hant", "https://example.com")).toBe("/zh-hant");
    expect(publicAdminLogoutDestination("zh-hant", "/en/account/signup")).toBe("/zh-hant");
  });
});

describe("unified admin locale", () => {
  it("renders Traditional Chinese owner copy", () => expect(getAdminMessages("zh-hant").dashboard.title).toBe("收藏管理台"));
  it("renders Simplified Chinese status labels", () => expect(adminStatusLabel("zh-hans", "available")).toBe("可供购买"));
  it("localizes the Simplified Chinese putter editor", () => {
    const editor = getAdminMessages("zh-hans").putterEditor;
    expect(editor.newTitle).toBe("新增推杆");
    expect(editor.slug).toBe("公开页面网址");
    expect(editor.priceAmountHelp).toContain("无需换算成分");
    expect(editor.photography.chooseFiles).toBe("选择文件");
    expect(editor.priceModes.on_request).toBe("欢迎询价");
  });
  it("localizes every Simplified Chinese admin tab", () => {
    const messages = getAdminMessages("zh-hans");
    expect(messages.dashboard.title).toBe("收藏管理台");
    expect(messages.putters.title).toBe("推杆管理");
    expect(messages.inquiries.title).toBe("客户咨询");
    expect(messages.testimonials.title).toBe("藏家评价");
    expect(messages.settings.title).toBe("设置");
  });
  it("localizes stored admin values without changing their submitted keys", () => {
    expect(adminStatusLabel("zh-hant", "display_only")).toBe("私人珍藏・非賣品");
    expect(adminStatusLabel("zh-hans", "display_only")).toBe("私人收藏・非卖品");
    expect(adminInquiryStatusLabel("zh-hans", "contacted")).toBe("已联系");
    expect(adminContactMethodLabel("zh-hans", "email")).toBe("邮箱");
    expect(adminLocaleLabel("zh-hans", "zh-hant")).toBe("繁体中文");
  });
  it("does not use retired literal translations", () => {
    const messages = JSON.stringify([getAdminMessages("zh-hant"), getAdminMessages("zh-hans")]);
    for (const retired of ["僅供典藏", "仅供典藏", "工房", "隨附物件", "随附物件", "私人選藏", "私人选藏"]) {
      expect(messages).not.toContain(retired);
    }
  });
  it("keeps all admin dictionaries structurally synchronized", () => {
    const englishPaths = messagePaths(getAdminMessages("en"));
    expect(messagePaths(getAdminMessages("zh-hant"))).toEqual(englishPaths);
    expect(messagePaths(getAdminMessages("zh-hans"))).toEqual(englishPaths);
  });
});
