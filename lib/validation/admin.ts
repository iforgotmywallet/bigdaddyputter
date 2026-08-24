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
  brandName: z.string().trim().min(1).max(120),
  logoText: z.string().trim().min(1).max(80),
  defaultLocale: z.enum(["zh-hant", "zh-hans", "en"]),
  contactEmail: z.string().trim().email().max(180),
  location: z.string().trim().max(120),
  whatsappUrl: optionalHttpUrlSchema,
  wechatId: z.string().trim().max(120),
  instagramUrl: optionalHttpUrlSchema,
  xiaohongshuUrl: optionalHttpUrlSchema,
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

export const putterAdminSchema = z.object({
  id: z.string().uuid().optional(),
  slug: slugSchema,
  brand: z.string().trim().min(1).max(100),
  model: z.string().trim().min(1).max(120),
  titleZhHant: z.string().trim().min(1).max(180),
  titleZhHans: z.string().trim().min(1).max(180),
  titleEn: z.string().trim().min(1).max(180),
  status: z.enum(["available", "reserved", "sold", "display_only", "private"]),
  headMaterial: z.string().trim().max(120).optional(),
  headStyle: z.string().trim().max(120).optional(),
  releaseYear: z.coerce.number().int().min(1900).max(2100).optional().or(z.literal("")),
  priceMode: z.enum(["hidden", "amount", "on_request"]),
  priceCents: z.coerce.number().int().nonnegative().optional().or(z.literal("")),
  priceCurrency: z.string().trim().length(3).default("HKD"),
  imagesJson: adminImagesSchema,
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});
