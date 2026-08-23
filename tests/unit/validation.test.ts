import { describe, expect, it } from "vitest";
import { parseCollectionFilters, slugSchema } from "@/lib/validation/collection";
import { inquirySchema } from "@/lib/validation/inquiry";
import { customerInterestSchema, customerProfileSchema } from "@/lib/validation/customer";

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
