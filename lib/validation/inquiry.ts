import { z } from "zod";

const normalized = (min: number, max: number) => z.string().transform((value) => value.replace(/\s+/g, " ").trim()).pipe(z.string().min(min).max(max));

export const inquirySchema = z.object({
  name: normalized(2, 80),
  contactMethod: z.enum(["email", "phone", "whatsapp", "wechat"]),
  contactValue: normalized(3, 150),
  countryRegion: z.string().transform((value) => value.replace(/\s+/g, " ").trim()).pipe(z.string().max(100)).optional(),
  message: normalized(10, 2000),
  putterId: z.string().uuid().optional().or(z.literal("")),
  locale: z.enum(["zh-hant", "zh-hans", "en"]),
  sourceUrl: z.string().url().max(500).optional().or(z.literal("")),
  consent: z.literal("on"),
  company: z.string().max(0, "Spam detected").optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
