import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { customerInterests, customerProfiles } from "@/db/schema";
import type { Locale } from "@/lib/types";

export interface CustomerProfile {
  preferredLocale: Locale;
  countryRegion: string;
  phone: string;
  contactPreference: "email" | "phone" | "whatsapp" | "wechat";
  marketingOptIn: boolean;
}

export async function getCustomerProfile(userId: string, fallbackLocale: Locale): Promise<CustomerProfile> {
  const [profile] = await getDb().select().from(customerProfiles).where(eq(customerProfiles.userId, userId)).limit(1);
  const preferredLocale = ["zh-hant", "zh-hans", "en"].includes(profile?.preferredLocale ?? "")
    ? profile!.preferredLocale as Locale
    : fallbackLocale;
  const preference = profile?.contactPreference;
  const contactPreference = ["email", "phone", "whatsapp", "wechat"].includes(preference ?? "")
    ? preference as CustomerProfile["contactPreference"]
    : "email";
  return {
    preferredLocale,
    countryRegion: profile?.countryRegion ?? "",
    phone: profile?.phone ?? "",
    contactPreference,
    marketingOptIn: profile?.marketingOptIn ?? false,
  };
}

export async function getCustomerInterestIds(userId: string) {
  const rows = await getDb().select({ putterId: customerInterests.putterId })
    .from(customerInterests)
    .where(eq(customerInterests.userId, userId))
    .orderBy(desc(customerInterests.createdAt));
  return rows.map((row) => row.putterId);
}

export async function customerIsInterested(userId: string, putterId: string) {
  const [row] = await getDb().select({ putterId: customerInterests.putterId })
    .from(customerInterests)
    .where(and(eq(customerInterests.userId, userId), eq(customerInterests.putterId, putterId)))
    .limit(1);
  return Boolean(row);
}
