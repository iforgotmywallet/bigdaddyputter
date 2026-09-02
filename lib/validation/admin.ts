import { z } from "zod";
import { slugSchema } from "@/lib/validation/collection";
import { isManagedCloudinaryKey } from "@/lib/images/paths";

export const adminLoginSchema = z.object({ password: z.string().min(8).max(200) });

const optionalHttpUrlSchema = z.string().trim().max(500).refine((value) => {
  if (!value) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
});

export const siteSettingsAdminSchema = z.object({
  defaultLocale: z.enum(["zh-hant", "zh-hans", "en"]),
  contactEmail: z.string().trim().email().max(180),
  location: z.string().trim().max(120),
  whatsappUrl: optionalHttpUrlSchema,
  wechatId: z.string().trim().max(120),
  instagramUrl: optionalHttpUrlSchema,
  xiaohongshuUrl: optionalHttpUrlSchema,
});

export const catalogCategoryAdminSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(3).max(80),
  nameZhHant: z.string().trim().min(1).max(80),
  nameZhHans: z.string().trim().min(1).max(80),
  nameEn: z.string().trim().min(1).max(80),
  descriptionZhHant: z.string().trim().max(500),
  descriptionZhHans: z.string().trim().max(500),
  descriptionEn: z.string().trim().max(500),
  displayOrder: z.coerce.number().int().min(0).max(999),
  isDefault: z.boolean(),
  isActive: z.boolean(),
});

export const cloudinaryCleanupSchema = z.object({
  storageKeys: z.array(z.string().max(600).refine(isManagedCloudinaryKey)).max(12),
});

const adminImageSchema = z.object({
  src: z.string().trim().min(1).max(600),
  storageKey: z.string().trim().max(600).nullable().optional(),
  width: z.number().int().positive().max(20000).nullable().optional(),
  height: z.number().int().positive().max(20000).nullable().optional(),
});

const adminImagesSchema = z.string().max(50_000).transform((value, context) => {
  try {
    const parsed = z.array(adminImageSchema).max(12).safeParse(JSON.parse(value || "[]"));
    if (parsed.success) return parsed.data;
    context.addIssue({ code: "custom", message: "The product image list is invalid." });
  } catch {
    context.addIssue({ code: "custom", message: "The product image list is invalid." });
  }
  return z.NEVER;
});

const optionalShortText = (max: number) => z.string().trim().max(max).optional().default("");
const optionalNumber = (minimum: number, maximum: number) => z.literal("").or(z.coerce.number().min(minimum).max(maximum)).optional().default("");
const optionalInteger = (minimum: number, maximum: number) => z.literal("").or(z.coerce.number().int().min(minimum).max(maximum)).optional().default("");
const priceAmountSchema = z.literal("").or(z.string().trim().regex(/^\d{1,9}(?:\.\d{1,2})?$/));
const optionalDate = z.string().trim().refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value)).optional().default("");

export const putterAdminSchema = z.object({
  id: z.string().uuid().optional(),
  slug: slugSchema,
  catalogCategoryId: z.string().uuid(),
  brand: z.string().trim().min(1).max(100),
  model: z.string().trim().min(1).max(120),
  modelFamily: optionalShortText(120),
  category: optionalShortText(120),
  releaseYear: optionalInteger(1900, 2100),
  productCode: optionalShortText(120),
  releaseDate: optionalDate,
  releaseEvent: optionalShortText(160),
  edition: optionalShortText(160),
  colorway: optionalShortText(160),
  material: optionalShortText(160),
  bagType: optionalShortText(120),
  dividerTop: optionalShortText(120),
  strapSystem: optionalShortText(160),
  pocketCount: optionalInteger(0, 50),
  weightPounds: optionalNumber(0, 50),
  featureSummary: optionalShortText(2000),
  headcoverFit: optionalShortText(120),
  handedness: optionalShortText(80),
  closureType: optionalShortText(120),
  accessoryType: optionalShortText(120),
  dimensions: optionalShortText(160),
  weightGrams: optionalNumber(0, 10000),
  galleryOrigin: optionalShortText(160),
  headStyle: optionalShortText(120),
  headMaterial: optionalShortText(120),
  finish: optionalShortText(120),
  neckType: optionalShortText(120),
  alignmentAid: optionalShortText(160),
  lengthInches: optionalNumber(20, 60),
  loftDegrees: optionalNumber(-10, 20),
  lieDegrees: optionalNumber(40, 90),
  headWeightGrams: optionalInteger(100, 1000),
  shaft: optionalShortText(160),
  grip: optionalShortText(160),
  headcover: optionalShortText(160),
  paintFill: optionalShortText(160),
  coaStatus: optionalShortText(80),
  serialNumber: optionalShortText(160),
  conditionScore: optionalNumber(0, 10),
  location: optionalShortText(120),
  provenanceSummary: optionalShortText(5000),
  titleZhHant: z.string().trim().min(1).max(180),
  subtitleZhHant: optionalShortText(240),
  overviewZhHant: optionalShortText(6000),
  collectorNotesZhHant: optionalShortText(6000),
  conditionNotesZhHant: optionalShortText(6000),
  provenanceTextZhHant: optionalShortText(6000),
  includedItemsZhHant: optionalShortText(6000),
  seoTitleZhHant: optionalShortText(180),
  seoDescriptionZhHant: optionalShortText(320),
  titleZhHans: z.string().trim().min(1).max(180),
  subtitleZhHans: optionalShortText(240),
  overviewZhHans: optionalShortText(6000),
  collectorNotesZhHans: optionalShortText(6000),
  conditionNotesZhHans: optionalShortText(6000),
  provenanceTextZhHans: optionalShortText(6000),
  includedItemsZhHans: optionalShortText(6000),
  seoTitleZhHans: optionalShortText(180),
  seoDescriptionZhHans: optionalShortText(320),
  titleEn: z.string().trim().min(1).max(180),
  subtitleEn: optionalShortText(240),
  overviewEn: optionalShortText(6000),
  collectorNotesEn: optionalShortText(6000),
  conditionNotesEn: optionalShortText(6000),
  provenanceTextEn: optionalShortText(6000),
  includedItemsEn: optionalShortText(6000),
  seoTitleEn: optionalShortText(180),
  seoDescriptionEn: optionalShortText(320),
  status: z.enum(["available", "reserved", "sold", "display_only", "private"]),
  priceMode: z.enum(["hidden", "amount", "on_request"]),
  priceAmount: priceAmountSchema,
  priceCurrency: z.string().trim().length(3).default("HKD"),
  imagesJson: adminImagesSchema,
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
}).superRefine((data, context) => {
  if (data.priceMode === "amount" && data.priceAmount === "") {
    context.addIssue({ code: "custom", path: ["priceAmount"], message: "Enter an amount when the price is shown." });
  }
});
