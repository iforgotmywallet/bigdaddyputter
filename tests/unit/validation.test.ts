import { describe, expect, it } from "vitest";
import { parseCollectionFilters, slugSchema } from "@/lib/validation/collection";
import { inquirySchema } from "@/lib/validation/inquiry";
import { customerInterestSchema, customerProfileSchema } from "@/lib/validation/customer";
import { cloudinaryCleanupSchema, putterAdminSchema, siteSettingsAdminSchema } from "@/lib/validation/admin";

describe("slug validation", () => {
  it("accepts normalized slugs", () => expect(slugSchema.safeParse("atelier-01-gss").success).toBe(true));
  it("rejects unsafe slugs", () => expect(slugSchema.safeParse("../Admin Page").success).toBe(false));
});

describe("collection filter parsing", () => {
  it("normalizes page and sort", () => expect(parseCollectionFilters({ page: "2", sort: "newest", material: "GSS" })).toMatchObject({ page: 2, sort: "newest", material: "GSS" }));
  it("falls back for invalid values", () => expect(parseCollectionFilters({ page: "-5", sort: "random" })).toMatchObject({ page: 1, sort: "featured" }));
});

describe("inquiry validation", () => {
  const valid = { name: "Ada Collector", contactMethod: "email", contactValue: "ada@example.com", countryRegion: "HK", message: "I would like to learn more about this putter.", locale: "en", consent: "on", company: "" };
  it("accepts and normalizes a valid inquiry", () => expect(inquirySchema.safeParse({ ...valid, name: " Ada   Collector " }).data?.name).toBe("Ada Collector"));
  it("rejects short messages", () => expect(inquirySchema.safeParse({ ...valid, message: "Hello" }).success).toBe(false));
  it("rejects a filled honeypot", () => expect(inquirySchema.safeParse({ ...valid, company: "Bots Ltd" }).success).toBe(false));
});

describe("customer account validation", () => {
  it("accepts bounded profile settings", () => expect(customerProfileSchema.safeParse({ name: "Ethan Collector", preferredLocale: "en", countryRegion: "Hong Kong", phone: "+852 5555 5555", contactPreference: "whatsapp", marketingOptIn: false }).success).toBe(true));
  it("rejects forged interest identifiers", () => expect(customerInterestSchema.safeParse({ putterId: "not-a-uuid", locale: "en", slug: "../private" }).success).toBe(false));
});

describe("admin site settings validation", () => {
  const valid = {
    brandName: "The Putter Archive",
    logoText: "TPA / HK",
    defaultLocale: "zh-hant",
    contactEmail: "collector@example.com",
    location: "Hong Kong",
    whatsappUrl: "",
    wechatId: "",
    instagramUrl: "https://instagram.com/putterarchive",
    xiaohongshuUrl: "",
  };

  it("accepts empty optional contact channels", () => expect(siteSettingsAdminSchema.safeParse(valid).success).toBe(true));
  it("rejects invalid email and non-http channel URLs", () => {
    expect(siteSettingsAdminSchema.safeParse({ ...valid, contactEmail: "not-an-email" }).success).toBe(false);
    expect(siteSettingsAdminSchema.safeParse({ ...valid, whatsappUrl: "javascript:alert(1)" }).success).toBe(false);
  });
});

describe("admin putter validation", () => {
  const valid = {
    slug: "scotty-cameron-gss-circle-t",
    brand: "Scotty Cameron",
    model: "GSS Timeless TourType Circle T",
    titleZhHant: "Scotty Cameron GSS Timeless TourType Circle T",
    titleZhHans: "Scotty Cameron GSS Timeless TourType Circle T",
    titleEn: "Scotty Cameron GSS Timeless TourType Circle T",
    status: "private",
    priceMode: "amount",
    priceAmount: "35000",
    priceCurrency: "USD",
    imagesJson: "[]",
  };

  it("accepts a normal display amount instead of requiring cents", () => expect(putterAdminSchema.safeParse(valid).success).toBe(true));
  it("requires an amount only when amount display is selected", () => {
    expect(putterAdminSchema.safeParse({ ...valid, priceAmount: "" }).success).toBe(false);
    expect(putterAdminSchema.safeParse({ ...valid, priceMode: "hidden", priceAmount: "" }).success).toBe(true);
  });
});

describe("Cloudinary cleanup validation", () => {
  it("accepts only bounded product-folder keys", () => {
    expect(cloudinaryCleanupSchema.safeParse({ storageKeys: ["bigdaddyputter/products/item-123"] }).success).toBe(true);
    expect(cloudinaryCleanupSchema.safeParse({ storageKeys: ["bigdaddyputter/avatars/item-123"] }).success).toBe(false);
    expect(cloudinaryCleanupSchema.safeParse({ storageKeys: Array.from({ length: 13 }, (_, index) => `bigdaddyputter/products/${index}`) }).success).toBe(false);
  });
});
