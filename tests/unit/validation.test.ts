import { describe, expect, it } from "vitest";
import { parseCollectionFilters, slugSchema } from "@/lib/validation/collection";
import { inquirySchema } from "@/lib/validation/inquiry";
import { customerInterestSchema, customerProfileSchema } from "@/lib/validation/customer";
import { catalogCategoryAdminSchema, cloudinaryCleanupSchema, putterAdminSchema, siteSettingsAdminSchema } from "@/lib/validation/admin";
import { BRAND_NAME, BRAND_SHORT_NAME } from "@/lib/constants";
import { buildCategorySpecifications } from "@/lib/category-specifications";

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
    defaultLocale: "zh-hant",
    contactEmail: "collector@example.com",
    location: "Hong Kong",
    whatsappUrl: "",
    wechatId: "",
    instagramUrl: "https://instagram.com/scottygoldenbell",
    xiaohongshuUrl: "",
  };

  it("accepts empty optional contact channels", () => expect(siteSettingsAdminSchema.safeParse(valid).success).toBe(true));
  it("keeps the canonical brand identity outside editable site settings", () => {
    expect(BRAND_NAME).toBe("ScottyGoldenBell");
    expect(BRAND_SHORT_NAME).toBe("SGB");
    expect(siteSettingsAdminSchema.parse({ ...valid, brandName: "Other", logoText: "Other" })).not.toHaveProperty("brandName");
  });
  it("rejects invalid email and non-http channel URLs", () => {
    expect(siteSettingsAdminSchema.safeParse({ ...valid, contactEmail: "not-an-email" }).success).toBe(false);
    expect(siteSettingsAdminSchema.safeParse({ ...valid, whatsappUrl: "javascript:alert(1)" }).success).toBe(false);
  });
});

describe("admin putter validation", () => {
  const valid = {
    slug: "scotty-cameron-gss-circle-t",
    catalogCategoryId: "10000000-0000-4000-8000-000000000001",
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
  it("validates category-specific dates and numeric measurements", () => {
    expect(putterAdminSchema.safeParse({ ...valid, releaseDate: "2026-06-15", pocketCount: "7", weightPounds: "5.8" }).success).toBe(true);
    expect(putterAdminSchema.safeParse({ ...valid, releaseDate: "June 15" }).success).toBe(false);
  });
});

describe("category-specific specification storage", () => {
  it("keeps only fields belonging to the selected category", () => {
    expect(buildCategorySpecifications("headcovers", { headcoverFit: "Blade", colorway: "Red", bagType: "Stand bag", headStyle: "Blade" })).toEqual({ headcoverFit: "Blade", colorway: "Red" });
    expect(buildCategorySpecifications("golf-bags", { bagType: "Pathfinder stand bag", pocketCount: 7, accessoryType: "Ball marker" })).toEqual({ bagType: "Pathfinder stand bag", pocketCount: 7 });
  });
  it("gives additional categories a useful generic specification set", () => {
    expect(buildCategorySpecifications("apparel", { material: "Cotton", dimensions: "Large", bagType: "Stand bag" })).toEqual({ material: "Cotton", dimensions: "Large" });
  });
});

describe("catalogue category validation", () => {
  const valid = { slug: "headcovers", nameZhHant: "桿套", nameZhHans: "杆套", nameEn: "Headcovers", descriptionZhHant: "", descriptionZhHans: "", descriptionEn: "", displayOrder: 1, isDefault: false, isActive: true };
  it("accepts an additional localized category", () => expect(catalogCategoryAdminSchema.safeParse(valid).success).toBe(true));
  it("rejects category URL names with spaces", () => expect(catalogCategoryAdminSchema.safeParse({ ...valid, slug: "Golf Bags" }).success).toBe(false));
});

describe("Cloudinary cleanup validation", () => {
  it("accepts only bounded product-folder keys", () => {
    expect(cloudinaryCleanupSchema.safeParse({ storageKeys: ["bigdaddyputter/products/item-123"] }).success).toBe(true);
    expect(cloudinaryCleanupSchema.safeParse({ storageKeys: ["bigdaddyputter/avatars/item-123"] }).success).toBe(false);
    expect(cloudinaryCleanupSchema.safeParse({ storageKeys: Array.from({ length: 13 }, (_, index) => `bigdaddyputter/products/${index}`) }).success).toBe(false);
  });
});
