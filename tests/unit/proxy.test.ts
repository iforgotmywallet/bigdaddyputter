import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function request(headers: Record<string, string> = {}) {
  return new NextRequest("https://scotty-goldenbell.com/", { headers });
}

describe("root locale proxy", () => {
  it("redirects Hong Kong visitors to Traditional Chinese and saves the cookie", () => {
    const response = proxy(request({
      "x-vercel-ip-country": "HK",
      "x-vercel-ip-continent": "AS",
    }));

    expect(response.headers.get("location")).toBe("https://scotty-goldenbell.com/zh-hant");
    expect(response.cookies.get("site_locale")?.value).toBe("zh-hant");
  });

  it("redirects Singapore visitors to Traditional Chinese", () => {
    const response = proxy(request({
      "x-vercel-ip-country": "SG",
      "x-vercel-ip-continent": "AS",
    }));

    expect(response.headers.get("location")).toBe("https://scotty-goldenbell.com/zh-hant");
    expect(response.cookies.get("site_locale")?.value).toBe("zh-hant");
  });

  it("redirects other Asian visitors to Simplified Chinese", () => {
    const response = proxy(request({
      "x-vercel-ip-country": "JP",
      "x-vercel-ip-continent": "AS",
    }));

    expect(response.headers.get("location")).toBe("https://scotty-goldenbell.com/zh-hans");
    expect(response.cookies.get("site_locale")?.value).toBe("zh-hans");
  });

  it("redirects visitors outside Asia to English", () => {
    const response = proxy(request({
      "x-vercel-ip-country": "CA",
      "x-vercel-ip-continent": "NA",
    }));

    expect(response.headers.get("location")).toBe("https://scotty-goldenbell.com/en");
    expect(response.cookies.get("site_locale")?.value).toBe("en");
  });

  it("honors an existing valid cookie without replacing it", () => {
    const response = proxy(request({
      cookie: "site_locale=en",
      "x-vercel-ip-country": "HK",
      "x-vercel-ip-continent": "AS",
    }));

    expect(response.headers.get("location")).toBe("https://scotty-goldenbell.com/en");
    expect(response.cookies.get("site_locale")).toBeUndefined();
  });
});
