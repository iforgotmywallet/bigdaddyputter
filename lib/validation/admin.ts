import { z } from "zod";
import { slugSchema } from "@/lib/validation/collection";

export const adminLoginSchema = z.object({ password: z.string().min(8).max(200) });

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
  imagePaths: z.string().max(5000).optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});
