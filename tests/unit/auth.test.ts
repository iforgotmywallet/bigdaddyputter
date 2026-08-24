import { describe, expect, it } from "vitest";
import { createSessionToken, verifySessionToken } from "@/lib/auth/token";
import { adminStatusLabel, getAdminMessages } from "@/lib/admin-i18n";

describe("admin session validation", () => {
  const secret = "a-secure-test-secret-with-more-than-thirty-two-characters";
  it("accepts a signed owner token", async () => expect(await verifySessionToken(await createSessionToken(secret), secret)).toBe(true));
  it("rejects tampered or foreign tokens", async () => expect(await verifySessionToken(`${await createSessionToken(secret)}x`, secret)).toBe(false));
  it("requires a strong signing secret", async () => expect(() => createSessionToken("short")).toThrow());
});

describe("unified admin locale", () => {
  it("renders Traditional Chinese owner copy", () => expect(getAdminMessages("zh-hant").dashboard.title).toBe("典藏管理台"));
  it("renders Simplified Chinese status labels", () => expect(adminStatusLabel("zh-hans", "available")).toBe("可供咨询"));
  it("localizes the Simplified Chinese putter editor", () => {
    const editor = getAdminMessages("zh-hans").putterEditor;
    expect(editor.newTitle).toBe("新增藏品");
    expect(editor.photography.chooseFiles).toBe("选择文件");
    expect(editor.priceModes.on_request).toBe("咨询报价");
  });
});
