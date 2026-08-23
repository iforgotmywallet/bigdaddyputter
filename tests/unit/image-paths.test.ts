import { describe, expect, it } from "vitest";
import { isApprovedImageSource, isCloudinaryDeliveryUrl, isManagedCloudinaryKey } from "@/lib/images/paths";

describe("product image path validation", () => {
  it("accepts product images from the configured Cloudinary cloud", () => {
    const src = "https://res.cloudinary.com/putter-archive/image/upload/v123/bigdaddyputter/products/face.jpg";
    expect(isCloudinaryDeliveryUrl(src, "putter-archive")).toBe(true);
    expect(isApprovedImageSource(src, "putter-archive")).toBe(true);
    expect(isCloudinaryDeliveryUrl(src, "another-cloud")).toBe(false);
  });

  it("rejects lookalike and insecure remote URLs", () => {
    expect(isCloudinaryDeliveryUrl("http://res.cloudinary.com/demo/image/upload/item.jpg")).toBe(false);
    expect(isCloudinaryDeliveryUrl("https://example.com/demo/image/upload/item.jpg")).toBe(false);
    expect(isApprovedImageSource("https://res.cloudinary.com.evil.test/demo/image/upload/item.jpg", "demo")).toBe(false);
  });

  it("limits managed deletion keys to the product folder", () => {
    expect(isManagedCloudinaryKey("bigdaddyputter/products/item-123")).toBe(true);
    expect(isManagedCloudinaryKey("bigdaddyputter/avatars/item-123")).toBe(false);
    expect(isManagedCloudinaryKey("bigdaddyputter/products/../avatars/item-123")).toBe(false);
  });
});
