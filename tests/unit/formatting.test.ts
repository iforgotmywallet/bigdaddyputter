import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/formatting";

describe("price visibility", () => {
  it("hides hidden prices", () => expect(formatPrice("hidden", 10000, "HKD", "en")).toBeNull());
  it("returns the on-request sentinel", () => expect(formatPrice("on_request", undefined, undefined, "zh-hant")).toBe("on_request"));
  it("formats public amounts", () => expect(formatPrice("amount", 328000, "HKD", "en")).toContain("3,280"));
});
