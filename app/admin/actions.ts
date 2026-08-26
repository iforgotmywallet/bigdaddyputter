"use server";

import { compare } from "bcryptjs";
import { randomUUID } from "node:crypto";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getDb, hasDatabase } from "@/db/client";
import { inquiries, putterImages, putters, putterTranslations, siteSettings, testimonials } from "@/db/schema";
import { clearAdminSession, createAdminSession, requireAdmin } from "@/lib/auth/session";
import { adminLoginSchema, putterAdminSchema, siteSettingsAdminSchema } from "@/lib/validation/admin";
import { getAdminMessages } from "@/lib/admin-i18n";
import { deleteUnreferencedCloudinaryImages } from "@/lib/images/cloudinary-cleanup";
import { isApprovedImageSource, isManagedCloudinaryKey } from "@/lib/images/paths";
import type { Locale } from "@/lib/types";
import { LOCALE_PREFERENCE_COOKIE } from "@/lib/locale-preference";

export interface AdminActionState { status: "idle" | "error" | "success"; message: string; errors?: Record<string, string>; }

function adminLocaleFrom(formData: FormData): Locale {
  const value = String(formData.get("adminLocale"));
  return ["zh-hant", "zh-hans", "en"].includes(value) ? value as Locale : "en";
}

export async function loginAction(_previous: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const locale = adminLocaleFrom(formData);
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
function emptyToNull<T>(value: T | "") { return value === "" ? null : value; }

export async function savePutterAction(_previous: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const editorMessages = getAdminMessages(adminLocaleFrom(formData)).putterEditor;
  if (!hasDatabase()) return { status: "error", message: editorMessages.errors.databaseRequired };
  const result = putterAdminSchema.safeParse(toObject(formData));
  if (!result.success) { const fields = result.error.flatten().fieldErrors; return { status: "error", message: editorMessages.errors.reviewFields, errors: Object.fromEntries(Object.keys(fields).map((key) => [key, editorMessages.errors.invalidField])) }; }
  const data = result.data; const db = getDb();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const invalidImage = data.imagesJson.find((image) => !isApprovedImageSource(image.src, cloudName) || (image.storageKey && !isManagedCloudinaryKey(image.storageKey)));
  if (invalidImage) return { status: "error", message: editorMessages.errors.invalidImages };
  const values = {
    slug: data.slug,
    brand: data.brand,
    model: data.model,
    modelFamily: emptyToNull(data.modelFamily),
    category: emptyToNull(data.category),
    releaseYear: emptyToNull(data.releaseYear),
    status: data.status,
    headStyle: emptyToNull(data.headStyle),
    headMaterial: emptyToNull(data.headMaterial),
    finish: emptyToNull(data.finish),
    neckType: emptyToNull(data.neckType),
    alignmentAid: emptyToNull(data.alignmentAid),
    lengthInches: emptyToNull(data.lengthInches),
    loftDegrees: emptyToNull(data.loftDegrees),
    lieDegrees: emptyToNull(data.lieDegrees),
    headWeightGrams: emptyToNull(data.headWeightGrams),
    shaft: emptyToNull(data.shaft),
    grip: emptyToNull(data.grip),
    headcover: emptyToNull(data.headcover),
    paintFill: emptyToNull(data.paintFill),
    coaStatus: emptyToNull(data.coaStatus),
    serialNumber: emptyToNull(data.serialNumber),
    conditionScore: emptyToNull(data.conditionScore),
    location: emptyToNull(data.location),
    provenanceSummary: emptyToNull(data.provenanceSummary),
    priceMode: data.priceMode,
    priceCents: data.priceAmount === "" ? null : Math.round(Number(data.priceAmount) * 100),
    priceCurrency: data.priceCurrency.toUpperCase(),
    isFeatured: data.isFeatured,
    isPublished: data.isPublished,
    updatedAt: new Date(),
  };
  const id = data.id ?? randomUUID();
  let previousImages: Array<{ storageKey: string | null }> = [];
  try {
    previousImages = data.id ? await db.select({ storageKey: putterImages.storageKey }).from(putterImages).where(eq(putterImages.putterId, data.id)) : [];
    const putterMutation = data.id
      ? db.update(putters).set({ ...values, publishedAt: data.isPublished ? sql`coalesce(${putters.publishedAt}, now())` : null }).where(eq(putters.id, data.id))
      : db.insert(putters).values({ id, ...values, publishedAt: data.isPublished ? new Date() : null });
    const zhHantValues = { title: data.titleZhHant, subtitle: emptyToNull(data.subtitleZhHant), overview: emptyToNull(data.overviewZhHant), collectorNotes: emptyToNull(data.collectorNotesZhHant), conditionNotes: emptyToNull(data.conditionNotesZhHant), provenanceText: emptyToNull(data.provenanceTextZhHant), includedItems: emptyToNull(data.includedItemsZhHant), seoTitle: emptyToNull(data.seoTitleZhHant), seoDescription: emptyToNull(data.seoDescriptionZhHant) };
    const zhHansValues = { title: data.titleZhHans, subtitle: emptyToNull(data.subtitleZhHans), overview: emptyToNull(data.overviewZhHans), collectorNotes: emptyToNull(data.collectorNotesZhHans), conditionNotes: emptyToNull(data.conditionNotesZhHans), provenanceText: emptyToNull(data.provenanceTextZhHans), includedItems: emptyToNull(data.includedItemsZhHans), seoTitle: emptyToNull(data.seoTitleZhHans), seoDescription: emptyToNull(data.seoDescriptionZhHans) };
    const enValues = { title: data.titleEn, subtitle: emptyToNull(data.subtitleEn), overview: emptyToNull(data.overviewEn), collectorNotes: emptyToNull(data.collectorNotesEn), conditionNotes: emptyToNull(data.conditionNotesEn), provenanceText: emptyToNull(data.provenanceTextEn), includedItems: emptyToNull(data.includedItemsEn), seoTitle: emptyToNull(data.seoTitleEn), seoDescription: emptyToNull(data.seoDescriptionEn) };
    const translationZhHant = db.insert(putterTranslations).values({ putterId: id, locale: "zh-hant", ...zhHantValues }).onConflictDoUpdate({ target: [putterTranslations.putterId, putterTranslations.locale], set: zhHantValues });
    const translationZhHans = db.insert(putterTranslations).values({ putterId: id, locale: "zh-hans", ...zhHansValues }).onConflictDoUpdate({ target: [putterTranslations.putterId, putterTranslations.locale], set: zhHansValues });
    const translationEn = db.insert(putterTranslations).values({ putterId: id, locale: "en", ...enValues }).onConflictDoUpdate({ target: [putterTranslations.putterId, putterTranslations.locale], set: enValues });
    const resetImages = db.delete(putterImages).where(eq(putterImages.putterId, id));

    // drizzle/neon-http batches execute as one non-interactive Neon transaction.
    if (data.imagesJson.length) {
      const insertImages = db.insert(putterImages).values(data.imagesJson.map((image, index) => ({
        putterId: id, src: image.src, storageKey: image.storageKey || null,
        width: image.width || null, height: image.height || null,
        sortOrder: index, isPrimary: index === 0,
        altZhHant: data.titleZhHant, altZhHans: data.titleZhHans, altEn: data.titleEn,
      })));
      await db.batch([putterMutation, translationZhHant, translationZhHans, translationEn, resetImages, insertImages]);
    } else {
      await db.batch([putterMutation, translationZhHant, translationZhHans, translationEn, resetImages]);
    }
  } catch (error) {
    console.error("Could not save putter atomically", error);
    return { status: "error", message: editorMessages.errors.saveFailed };
  }
  const retainedKeys = new Set(data.imagesJson.map((image) => image.storageKey).filter(Boolean));
  const removedKeys = previousImages.map((image) => image.storageKey).filter((key): key is string => Boolean(key) && !retainedKeys.has(key));
  try {
    const cleanup = await deleteUnreferencedCloudinaryImages(removedKeys);
    cleanup.failed.forEach((key) => console.error(`Could not delete Cloudinary asset ${key}`));
  } catch (error) {
    console.error("Could not clean up removed Cloudinary assets", error);
  }
  refreshPutter(id, data.slug); redirect(`/admin/putters/${id}?saved=1`);
}

export async function duplicatePutterAction(formData: FormData) {
  await requireAdmin(); if (!hasDatabase()) return;
  const id = String(formData.get("id"));
  const db = getDb();
  const [source] = await db.select().from(putters).where(eq(putters.id, id)).limit(1);
  if (!source) return;
  const [translations, images] = await Promise.all([
    db.select().from(putterTranslations).where(eq(putterTranslations.putterId, id)),
    db.select().from(putterImages).where(eq(putterImages.putterId, id)),
  ]);
  const newId = randomUUID();
  const newSlug = `${source.slug}-copy-${newId.slice(0, 8)}`;
  const { id: _id, createdAt: _created, updatedAt: _updated, ...copy } = source;
  void _id; void _created; void _updated;
  const insertPutter = db.insert(putters).values({ ...copy, id: newId, slug: newSlug, status: "private", isFeatured: false, isPublished: false, publishedAt: null, createdAt: new Date(), updatedAt: new Date() });
  const translationRows = translations.map((translation) => ({
    putterId: newId, locale: translation.locale, title: translation.title, subtitle: translation.subtitle,
    overview: translation.overview, collectorNotes: translation.collectorNotes, conditionNotes: translation.conditionNotes,
    provenanceText: translation.provenanceText, includedItems: translation.includedItems,
    seoTitle: translation.seoTitle, seoDescription: translation.seoDescription,
  }));
  const imageRows = images.map((image) => ({
    putterId: newId, src: image.src, storageKey: image.storageKey, altZhHant: image.altZhHant,
    altZhHans: image.altZhHans, altEn: image.altEn, width: image.width, height: image.height,
    sortOrder: image.sortOrder, isPrimary: image.isPrimary, createdAt: new Date(),
  }));
  if (translationRows.length && imageRows.length) await db.batch([insertPutter, db.insert(putterTranslations).values(translationRows), db.insert(putterImages).values(imageRows)]);
  else if (translationRows.length) await db.batch([insertPutter, db.insert(putterTranslations).values(translationRows)]);
  else if (imageRows.length) await db.batch([insertPutter, db.insert(putterImages).values(imageRows)]);
  else await db.batch([insertPutter]);
  revalidatePath("/admin/putters");
  redirect(`/admin/putters/${newId}?duplicated=1`);
}

export async function deletePutterAction(formData: FormData) {
  await requireAdmin(); if (!hasDatabase()) return;
  const id = String(formData.get("id")); const slug = String(formData.get("slug")); const confirmation = String(formData.get("confirmation"));
  if (confirmation !== slug) return;
  const images = await getDb().select({ storageKey: putterImages.storageKey }).from(putterImages).where(eq(putterImages.putterId, id));
  const [deleted] = await getDb().delete(putters).where(and(eq(putters.id, id), eq(putters.slug, slug))).returning({ id: putters.id });
  if (!deleted) return;
  const keys = images.map((image) => image.storageKey).filter((key): key is string => Boolean(key));
  try {
    const cleanup = await deleteUnreferencedCloudinaryImages(keys);
    cleanup.failed.forEach((key) => console.error(`Could not delete Cloudinary asset ${key}`));
  } catch (error) {
    console.error("Could not clean up deleted putter assets", error);
  }
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
  const result = siteSettingsAdminSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) redirect("/admin/settings?error=1");
  const values = {
    ...result.data,
    whatsappUrl: result.data.whatsappUrl || null,
    wechatId: result.data.wechatId || null,
    instagramUrl: result.data.instagramUrl || null,
    xiaohongshuUrl: result.data.xiaohongshuUrl || null,
    updatedAt: new Date(),
  };
  const [existing] = await getDb().select({ id: siteSettings.id }).from(siteSettings).limit(1);
  if (existing) await getDb().update(siteSettings).set(values).where(eq(siteSettings.id, existing.id)); else await getDb().insert(siteSettings).values(values);
  (await cookies()).set(LOCALE_PREFERENCE_COOKIE, values.defaultLocale, { httpOnly: false, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365 });
  updateTag("site-settings");
  revalidatePath("/", "page");
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin", "layout");
  redirect("/admin/settings?saved=1");
}
