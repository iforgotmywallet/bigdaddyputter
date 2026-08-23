"use server";

import { headers } from "next/headers";
import { hasDatabase } from "@/db/client";
import { storeInquiry } from "@/db/queries/inquiries";
import { inquirySchema } from "@/lib/validation/inquiry";

export interface InquiryState { status: "idle" | "success" | "error"; message: string; errors: Record<string, string>; }
const attempts = new Map<string, number[]>();

function isRateLimited(key: string) {
  const windowSeconds = Number(process.env.INQUIRY_RATE_LIMIT_WINDOW_SECONDS ?? 600);
  const max = Number(process.env.INQUIRY_RATE_LIMIT_MAX ?? 5);
  const cutoff = Date.now() - windowSeconds * 1000;
  const recent = (attempts.get(key) ?? []).filter((time) => time > cutoff);
  if (recent.length >= max) return true;
  recent.push(Date.now()); attempts.set(key, recent); return false;
}

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const headerStore = await headers();
  const origin = headerStore.get("origin"); const host = headerStore.get("host");
  if (origin && host && new URL(origin).host !== host) return { status: "error", message: "Invalid request origin.", errors: {} };
  const forwarded = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(forwarded)) return { status: "error", message: "Too many inquiries. Please try again later.", errors: {} };
  const values = Object.fromEntries(formData.entries());
  const result = inquirySchema.safeParse(values);
  if (!result.success) { const flattened = result.error.flatten().fieldErrors; return { status: "error", message: "Validation failed.", errors: Object.fromEntries(Object.entries(flattened).map(([key, errors]) => [key, errors?.[0] ?? "Invalid value"])) }; }
  try { if (hasDatabase()) await storeInquiry(result.data); return { status: "success", message: "Recorded", errors: {} }; } catch (error) { console.error("Inquiry storage failed", error); return { status: "error", message: "Unable to record the inquiry right now.", errors: {} }; }
}
