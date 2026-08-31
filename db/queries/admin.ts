import { asc, desc, eq, sql } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db/client";
import { inquiries, putterImages, putters, putterTranslations, testimonials } from "@/db/schema";
import { samplePutters } from "@/lib/data/sample-putters";

export async function getAdminPutters() {
  if (!hasDatabase()) return samplePutters.map((putter) => ({ id: putter.id, slug: putter.slug, brand: putter.brand, model: putter.model, catalogCategoryId: putter.catalogCategoryId ?? null, status: putter.status, isFeatured: putter.isFeatured, isPublished: putter.isPublished, displayOrder: putter.displayOrder, updatedAt: new Date(putter.updatedAt) }));
  return getDb().select({ id: putters.id, slug: putters.slug, brand: putters.brand, model: putters.model, catalogCategoryId: putters.catalogCategoryId, status: putters.status, isFeatured: putters.isFeatured, isPublished: putters.isPublished, displayOrder: putters.displayOrder, updatedAt: putters.updatedAt }).from(putters).orderBy(desc(putters.updatedAt));
}

export async function getAdminPutter(id: string) {
  if (!hasDatabase()) return samplePutters.find((putter) => putter.id === id) ?? null;
  const [row] = await getDb().select().from(putters).where(eq(putters.id, id)).limit(1);
  return row ?? null;
}

export async function getAdminPutterEditor(id: string) {
  if (!hasDatabase()) {
    const sample = samplePutters.find((putter) => putter.id === id);
    if (!sample) return null;
    return {
      ...sample,
      translations: sample.translations,
      images: sample.images.map((image) => ({ src: image.src, width: image.width, height: image.height, storageKey: null })),
    };
  }
  const db = getDb();
  const [record] = await db.select().from(putters).where(eq(putters.id, id)).limit(1);
  if (!record) return null;
  const [translations, images] = await Promise.all([
    db.select().from(putterTranslations).where(eq(putterTranslations.putterId, id)),
    db.select().from(putterImages).where(eq(putterImages.putterId, id)).orderBy(asc(putterImages.sortOrder)),
  ]);
  const translationFor = (locale: string) => {
    const translation = translations.find((item) => item.locale === locale);
    return {
      title: translation?.title ?? `${record.brand} ${record.model}`,
      subtitle: translation?.subtitle ?? "",
      overview: translation?.overview ?? "",
      collectorNotes: translation?.collectorNotes ?? "",
      conditionNotes: translation?.conditionNotes ?? "",
      provenanceText: translation?.provenanceText ?? "",
      includedItems: translation?.includedItems ?? "",
      seoTitle: translation?.seoTitle ?? "",
      seoDescription: translation?.seoDescription ?? "",
    };
  };
  return {
    ...record,
    translations: {
      "zh-hant": translationFor("zh-hant"),
      "zh-hans": translationFor("zh-hans"),
      en: translationFor("en"),
    },
    images: images.map((image) => ({ src: image.src, storageKey: image.storageKey, width: image.width, height: image.height })),
  };
}

export async function getDashboardCounts() {
  if (!hasDatabase()) return { total: samplePutters.length, available: samplePutters.filter((p) => p.status === "available").length, reserved: samplePutters.filter((p) => p.status === "reserved").length, sold: samplePutters.filter((p) => p.status === "sold").length, privateCount: 0, inquiries: 0 };
  const db = getDb();
  const [putterCounts, inquiryCount] = await Promise.all([
    db.select({ status: putters.status, count: sql<number>`count(*)::int` }).from(putters).groupBy(putters.status),
    db.select({ count: sql<number>`count(*)::int` }).from(inquiries).where(eq(inquiries.status, "new")),
  ]);
  const count = (status: string) => putterCounts.find((row) => row.status === status)?.count ?? 0;
  return { total: putterCounts.reduce((sum, row) => sum + row.count, 0), available: count("available"), reserved: count("reserved"), sold: count("sold"), privateCount: count("private"), inquiries: inquiryCount[0]?.count ?? 0 };
}

export async function getAdminTestimonials() { if (!hasDatabase()) return []; return getDb().select().from(testimonials).orderBy(testimonials.displayOrder); }
