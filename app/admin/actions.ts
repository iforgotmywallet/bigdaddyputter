"use server";

import { compare } from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getDb, hasDatabase } from "@/db/client";
import { inquiries, putterImages, putters, putterTranslations, siteSettings, testimonials } from "@/db/schema";
import { clearAdminSession, createAdminSession, requireAdmin } from "@/lib/auth/session";
import { adminLoginSchema, putterAdminSchema } from "@/lib/validation/admin";
import { getAdminMessages } from "@/lib/admin-i18n";
import { deleteCloudinaryImage } from "@/lib/images/cloudinary";
import { isApprovedImageSource, isManagedCloudinaryKey } from "@/lib/images/paths";
import type { Locale } from "@/lib/types";
import { LOCALE_PREFERENCE_COOKIE } from "@/lib/locale-preference";

export interface AdminActionState { status: "idle" | "error" | "success"; message: string; errors?: Record<string, string>; }

export async function loginAction(_previous: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const locale = ["zh-hant", "zh-hans", "en"].includes(String(formData.get("adminLocale"))) ? String(formData.get("adminLocale")) as Locale : "en";
  const loginMessages = getAdminMessages(locale).login;
  const result = adminLoginSchema.safeParse({ password: formData.get("password") });
  if (!result.success) return { status: "error", message: loginMessages.invalid };
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash || !process.env.ADMIN_SESSION_SECRET) { console.error("Admin authentication environment variables are missing"); return { status: "error", message: loginMessages.notConfigured }; }
  if (!(await compare(result.data.password, hash))) return { status: "error", message: loginMessages.invalid };
  await createAdminSession(); redirect("/admin");
}

export async function logoutAction() { await clearAdminSession(); redirect("/admin/login"); }

function toObject(formData: FormData) { return { ...Object.fromEntries(formData.entries()), isFeatured: formData.get("isFeatured") === "on", isPublished: formData.get("isPublished") === "on" }; }
function refreshPutter(id: string, slug: string) { revalidateTag(`putter:${id}`, "max"); revalidateTag("putters", "max"); revalidatePath("/"); revalidatePath("/[locale]/collection", "page"); revalidatePath(`/zh-hant/collection/${slug}`); revalidatePath(`/zh-hans/collection/${slug}`); revalidatePath(`/en/collection/${slug}`); }

export async function savePutterAction(_previous: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  if (!hasDatabase()) return { status: "error", message: "Configure DATABASE_URL before editing catalogue records." };
  const result = putterAdminSchema.safeParse(toObject(formData));
  if (!result.success) { const fields = result.error.flatten().fieldErrors; return { status: "error", message: "Review the highlighted fields.", errors: Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value?.[0] ?? "Invalid value"])) }; }
  const data = result.data; const db = getDb();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const invalidImage = data.imagesJson.find((image) => !isApprovedImageSource(image.src, cloudName) || (image.storageKey && !isManagedCloudinaryKey(image.storageKey)));
  if (invalidImage) return { status: "error", message: "The image list contains an unapproved path or storage key." };
  const values = { slug: data.slug, brand: data.brand, model: data.model, status: data.status, headMaterial: data.headMaterial || null, headStyle: data.headStyle || null, releaseYear: data.releaseYear === "" ? null : data.releaseYear, priceMode: data.priceMode, priceCents: data.priceCents === "" ? null : data.priceCents, priceCurrency: data.priceCurrency.toUpperCase(), isFeatured: data.isFeatured, isPublished: data.isPublished, updatedAt: new Date(), publishedAt: data.isPublished ? new Date() : null };
  let id = data.id;
  const previousImages = id ? await db.select({ storageKey: putterImages.storageKey }).from(putterImages).where(eq(putterImages.putterId, id)) : [];
  if (id) await db.update(putters).set(values).where(eq(putters.id, id));
  else { const [created] = await db.insert(putters).values(values).returning({ id: putters.id }); id = created.id; }
  for (const [locale, title] of [["zh-hant", data.titleZhHant], ["zh-hans", data.titleZhHans], ["en", data.titleEn]] as const) {
    await db.insert(putterTranslations).values({ putterId: id, locale, title }).onConflictDoUpdate({ target: [putterTranslations.putterId, putterTranslations.locale], set: { title } });
  }
  await db.delete(putterImages).where(eq(putterImages.putterId, id));
  if (data.imagesJson.length) {
    await db.insert(putterImages).values(data.imagesJson.map((image, index) => ({
      putterId: id!, src: image.src, storageKey: image.storageKey || null,
      width: image.width || null, height: image.height || null,
      sortOrder: index, isPrimary: index === 0,
      altZhHant: data.titleZhHant, altZhHans: data.titleZhHans, altEn: data.titleEn,
    })));
  }
  const retainedKeys = new Set(data.imagesJson.map((image) => image.storageKey).filter(Boolean));
  const removedKeys = previousImages.map((image) => image.storageKey).filter((key): key is string => Boolean(key) && !retainedKeys.has(key));
  const deletions = await Promise.allSettled(removedKeys.map((key) => deleteCloudinaryImage(key)));
  deletions.forEach((deletion, index) => { if (deletion.status === "rejected") console.error(`Could not delete Cloudinary asset ${removedKeys[index]}`, deletion.reason); });
  refreshPutter(id, data.slug); redirect(`/admin/putters/${id}?saved=1`);
}

export async function duplicatePutterAction(formData: FormData) {
  await requireAdmin(); if (!hasDatabase()) return;
  const id = String(formData.get("id")); const db = getDb(); const [source] = await db.select().from(putters).where(eq(putters.id, id)).limit(1); if (!source) return;
  const { id: _id, createdAt: _created, updatedAt: _updated, ...copy } = source; void _id; void _created; void _updated;
  await db.insert(putters).values({ ...copy, slug: `${source.slug}-copy-${Date.now().toString().slice(-5)}`, status: "private", isPublished: false, publishedAt: null, createdAt: new Date(), updatedAt: new Date() });
  revalidatePath("/admin/putters");
}

export async function deletePutterAction(formData: FormData) {
  await requireAdmin(); if (!hasDatabase()) return;
  const id = String(formData.get("id")); const slug = String(formData.get("slug")); const confirmation = String(formData.get("confirmation"));
  if (confirmation !== slug) return;
  const images = await getDb().select({ storageKey: putterImages.storageKey }).from(putterImages).where(eq(putterImages.putterId, id));
  const [deleted] = await getDb().delete(putters).where(and(eq(putters.id, id), eq(putters.slug, slug))).returning({ id: putters.id });
  if (!deleted) return;
  const keys = images.map((image) => image.storageKey).filter((key): key is string => Boolean(key));
  const deletions = await Promise.allSettled(keys.map((key) => deleteCloudinaryImage(key)));
  deletions.forEach((deletion, index) => { if (deletion.status === "rejected") console.error(`Could not delete Cloudinary asset ${keys[index]}`, deletion.reason); });
  refreshPutter(id, slug); redirect("/admin/putters");
}

export async function updateInquiryAction(formData: FormData) {
  await requireAdmin(); if (!hasDatabase()) return;
  const id = String(formData.get("id")); const status = String(formData.get("status")); const note = String(formData.get("internalNote") ?? "").slice(0, 4000);
  if (!id || !["new", "contacted", "closed"].includes(status)) return;
  await getDb().update(inquiries).set({ status, internalNote: note || null, updatedAt: new Date() }).where(eq(inquiries.id, id)); revalidatePath("/admin/inquiries");
}

export async function saveTestimonialAction(formData: FormData) {
  await requireAdmin(); if (!hasDatabase()) return;
  const quote = String(formData.get("quote") ?? "").trim().slice(0, 2000); const name = String(formData.get("name") ?? "").trim().slice(0, 100); const locale = String(formData.get("locale") ?? "en");
  if (!quote || !name || !["zh-hant", "zh-hans", "en"].includes(locale)) return;
  await getDb().insert(testimonials).values({ quote, name, locale, location: String(formData.get("location") ?? "").slice(0, 120) || null, isPublished: formData.get("isPublished") === "on" }); revalidatePath("/admin/testimonials");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin(); if (!hasDatabase()) return;
  const values = { brandName: String(formData.get("brandName") ?? "").trim().slice(0, 120), logoText: String(formData.get("logoText") ?? "").trim().slice(0, 80), defaultLocale: String(formData.get("defaultLocale") ?? "zh-hant"), contactEmail: String(formData.get("contactEmail") ?? "").trim().slice(0, 180), location: String(formData.get("location") ?? "").trim().slice(0, 120), updatedAt: new Date() };
  if (!values.brandName || !values.logoText || !["zh-hant", "zh-hans", "en"].includes(values.defaultLocale)) return;
  const [existing] = await getDb().select({ id: siteSettings.id }).from(siteSettings).limit(1);
  if (existing) await getDb().update(siteSettings).set(values).where(eq(siteSettings.id, existing.id)); else await getDb().insert(siteSettings).values(values);
  (await cookies()).set(LOCALE_PREFERENCE_COOKIE, values.defaultLocale, { httpOnly: false, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365 });
  updateTag("site-settings");
  revalidatePath("/", "page");
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin", "layout");
  redirect("/admin/settings?saved=1");
}
