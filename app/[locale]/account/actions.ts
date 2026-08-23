"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { customerInterests, customerProfiles, customerUser, putters } from "@/db/schema";
import { customerAuth } from "@/lib/customer-auth";
import { getCustomerSession } from "@/lib/customer-session";
import { customerInterestSchema, customerProfileSchema } from "@/lib/validation/customer";

export interface ProfileActionState {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
}

export interface InterestActionState {
  status: "idle" | "success" | "error";
  message: string;
  interested: boolean;
}

export async function updateCustomerProfileAction(
  _previous: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const session = await getCustomerSession();
  if (!session) return { status: "error", message: "Your session has expired. Please sign in again." };

  const result = customerProfileSchema.safeParse({
    name: formData.get("name"),
    preferredLocale: formData.get("preferredLocale"),
    countryRegion: formData.get("countryRegion"),
    phone: formData.get("phone"),
    contactPreference: formData.get("contactPreference"),
    marketingOptIn: formData.get("marketingOptIn") === "on",
  });
  if (!result.success) {
    const fields = result.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      errors: Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value?.[0] ?? "Invalid value"])),
    };
  }

  const data = result.data;
  const db = getDb();
  await db.update(customerUser).set({ name: data.name, updatedAt: new Date() }).where(eq(customerUser.id, session.user.id));
  await db.insert(customerProfiles).values({
    userId: session.user.id,
    preferredLocale: data.preferredLocale,
    countryRegion: data.countryRegion || null,
    phone: data.phone || null,
    contactPreference: data.contactPreference,
    marketingOptIn: data.marketingOptIn,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: customerProfiles.userId,
    set: {
      preferredLocale: data.preferredLocale,
      countryRegion: data.countryRegion || null,
      phone: data.phone || null,
      contactPreference: data.contactPreference,
      marketingOptIn: data.marketingOptIn,
      updatedAt: new Date(),
    },
  });
  revalidatePath(`/${data.preferredLocale}/account`);
  return { status: "success", message: "Profile settings saved." };
}

export async function toggleCustomerInterestAction(
  previous: InterestActionState,
  formData: FormData,
): Promise<InterestActionState> {
  const session = await getCustomerSession();
  if (!session) return { status: "error", message: "Please sign in to save interests.", interested: previous.interested };
  const result = customerInterestSchema.safeParse({
    putterId: formData.get("putterId"),
    locale: formData.get("locale"),
    slug: formData.get("slug"),
  });
  if (!result.success) return { status: "error", message: "This item could not be updated.", interested: previous.interested };

  const { putterId, locale, slug } = result.data;
  const db = getDb();
  const [published] = await db.select({ id: putters.id }).from(putters)
    .where(and(eq(putters.id, putterId), eq(putters.isPublished, true)))
    .limit(1);
  if (!published) return { status: "error", message: "This item is no longer available to save.", interested: previous.interested };

  const [existing] = await db.select({ putterId: customerInterests.putterId }).from(customerInterests)
    .where(and(eq(customerInterests.userId, session.user.id), eq(customerInterests.putterId, putterId)))
    .limit(1);
  const interested = !existing;
  if (existing) {
    await db.delete(customerInterests).where(and(eq(customerInterests.userId, session.user.id), eq(customerInterests.putterId, putterId)));
  } else {
    await db.insert(customerInterests).values({ userId: session.user.id, putterId }).onConflictDoNothing();
  }
  revalidatePath(`/${locale}/collection/${slug}`);
  revalidatePath(`/${locale}/account`);
  return { status: "success", message: interested ? "Added to your interest list." : "Removed from your interest list.", interested };
}

export async function signOutCustomerAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  await customerAuth.api.signOut({ headers: await headers() });
  redirect(`/${["zh-hant", "zh-hans", "en"].includes(locale) ? locale : "en"}`);
}
