import { z } from "zod";
import { locales } from "@/lib/types";

export const customerProfileSchema = z.object({
  name: z.string().trim().min(2).max(80),
  preferredLocale: z.enum(locales),
  countryRegion: z.string().trim().max(100),
  phone: z.string().trim().max(40),
  contactPreference: z.enum(["email", "phone", "whatsapp", "wechat"]),
  marketingOptIn: z.boolean(),
});

export const customerInterestSchema = z.object({
  putterId: z.string().uuid(),
  locale: z.enum(locales),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});
