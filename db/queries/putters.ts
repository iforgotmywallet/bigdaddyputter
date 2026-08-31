import { asc, eq, inArray } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db/client";
import { putterImages, putters, putterTranslations } from "@/db/schema";
import { getCatalogCategories } from "@/db/queries/categories";
import { DEFAULT_CATALOG_CATEGORIES } from "@/lib/constants";
import { samplePutters } from "@/lib/data/sample-putters";
import { statusOrder } from "@/lib/formatting";
import type { CollectionFilters, Locale, PriceMode, Putter, PutterStatus } from "@/lib/types";

function normalizeStatus(value: string): PutterStatus {
  return ["available", "reserved", "sold", "display_only", "private"].includes(value) ? value as PutterStatus : "private";
}

function normalizePriceMode(value: string): PriceMode {
  return ["hidden", "amount", "on_request"].includes(value) ? value as PriceMode : "hidden";
}

async function hydratePublished(): Promise<Putter[]> {
  if (!hasDatabase()) return samplePutters.map((putter) => ({
    ...putter,
    catalogCategoryId: putter.catalogCategoryId ?? DEFAULT_CATALOG_CATEGORIES[0].id,
    catalogCategory: putter.catalogCategory ?? DEFAULT_CATALOG_CATEGORIES[0],
  }));
  const db = getDb();
  const rows = await db.select().from(putters).where(eq(putters.isPublished, true)).orderBy(asc(putters.displayOrder));
  if (!rows.length) return [];
  const ids = rows.map((row) => row.id);
  const [translations, images, categories] = await Promise.all([
    db.select().from(putterTranslations).where(inArray(putterTranslations.putterId, ids)),
    db.select().from(putterImages).where(inArray(putterImages.putterId, ids)).orderBy(asc(putterImages.sortOrder)),
    getCatalogCategories({ includeInactive: true }),
  ]);
  const defaultCategory = categories.find((category) => category.isDefault) ?? DEFAULT_CATALOG_CATEGORIES[0];
  return rows.filter((row) => row.status !== "private").map((row) => {
    const fallbackTitle = `${row.brand} ${row.model}`;
    const translationFor = (locale: Locale) => {
      const item = translations.find((translation) => translation.putterId === row.id && translation.locale === locale);
      return {
        title: item?.title ?? fallbackTitle,
        subtitle: item?.subtitle ?? "",
        overview: item?.overview ?? "",
        collectorNotes: item?.collectorNotes ?? "",
        conditionNotes: item?.conditionNotes ?? "",
        provenanceText: item?.provenanceText ?? "",
        includedItems: item?.includedItems ?? "",
        seoTitle: item?.seoTitle ?? fallbackTitle,
        seoDescription: item?.seoDescription ?? item?.overview ?? "",
      };
    };
    return {
      id: row.id, slug: row.slug, brand: row.brand, model: row.model, modelFamily: row.modelFamily ?? undefined,
      releaseYear: row.releaseYear ?? undefined, category: row.category ?? undefined,
      catalogCategoryId: row.catalogCategoryId ?? defaultCategory.id,
      catalogCategory: categories.find((category) => category.id === row.catalogCategoryId) ?? defaultCategory,
      status: normalizeStatus(row.status),
      headStyle: row.headStyle ?? undefined, headMaterial: row.headMaterial ?? undefined, finish: row.finish ?? undefined,
      neckType: row.neckType ?? undefined, alignmentAid: row.alignmentAid ?? undefined, lengthInches: row.lengthInches ?? undefined,
      loftDegrees: row.loftDegrees ?? undefined, lieDegrees: row.lieDegrees ?? undefined, headWeightGrams: row.headWeightGrams ?? undefined,
      shaft: row.shaft ?? undefined, grip: row.grip ?? undefined, headcover: row.headcover ?? undefined, paintFill: row.paintFill ?? undefined,
      coaStatus: row.coaStatus ?? undefined, serialNumber: row.serialNumber ?? undefined, conditionScore: row.conditionScore ?? undefined,
      priceMode: normalizePriceMode(row.priceMode), priceCents: row.priceCents ?? undefined, priceCurrency: row.priceCurrency ?? undefined,
      location: row.location ?? undefined, provenanceSummary: row.provenanceSummary ?? undefined, isFeatured: row.isFeatured,
      isPublished: row.isPublished, displayOrder: row.displayOrder, publishedAt: row.publishedAt?.toISOString(), updatedAt: row.updatedAt.toISOString(),
      translations: { "zh-hant": translationFor("zh-hant"), "zh-hans": translationFor("zh-hans"), en: translationFor("en") },
      images: images.filter((image) => image.putterId === row.id).map((image) => ({
        id: image.id, src: image.src,
        alt: { "zh-hant": image.altZhHant ?? fallbackTitle, "zh-hans": image.altZhHans ?? fallbackTitle, en: image.altEn ?? fallbackTitle },
        width: image.width ?? 1600, height: image.height ?? 1200, sortOrder: image.sortOrder, isPrimary: image.isPrimary,
      })),
      tags: [],
    };
  });
}

export function filterPublishedPutters(items: Putter[], filters?: Partial<CollectionFilters>) {
  let result = items.filter((putter) => putter.isPublished && putter.status !== "private");
  if (filters?.status) result = result.filter((putter) => putter.status === filters.status);
  if (filters?.brand) result = result.filter((putter) => putter.brand === filters.brand);
  if (filters?.modelFamily) result = result.filter((putter) => putter.modelFamily === filters.modelFamily);
  if (filters?.headStyle) result = result.filter((putter) => putter.headStyle === filters.headStyle);
  if (filters?.material) result = result.filter((putter) => putter.headMaterial === filters.material);
  if (filters?.year) result = result.filter((putter) => putter.releaseYear === filters.year);
  if (filters?.category) result = result.filter((putter) => putter.catalogCategory?.slug === filters.category);
  if (filters?.search) {
    const term = filters.search.toLowerCase();
    result = result.filter((putter) => [putter.brand, putter.model, putter.modelFamily, putter.headMaterial, putter.neckType, ...putter.tags].some((value) => value?.toLowerCase().includes(term)));
  }
  switch (filters?.sort) {
    case "newest": result.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")); break;
    case "model": result.sort((a, b) => a.model.localeCompare(b.model)); break;
    case "year": result.sort((a, b) => (b.releaseYear ?? 0) - (a.releaseYear ?? 0)); break;
    case "price": result.sort((a, b) => (a.priceCents ?? Number.MAX_SAFE_INTEGER) - (b.priceCents ?? Number.MAX_SAFE_INTEGER)); break;
    case "availability": result.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]); break;
    default: result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.displayOrder - b.displayOrder);
  }
  return result;
}

export async function getPublishedPutters(filters?: Partial<CollectionFilters>) {
  return filterPublishedPutters(await hydratePublished(), filters);
}

export async function getPutterBySlug(slug: string) {
  return (await hydratePublished()).find((putter) => putter.slug === slug && putter.isPublished && putter.status !== "private") ?? null;
}

export async function getRelatedPutters(putter: Putter, limit = 4) {
  const all = await getPublishedPutters();
  return all.filter((candidate) => candidate.id !== putter.id).map((candidate) => ({ candidate, score: Number(candidate.catalogCategory?.id === putter.catalogCategory?.id) * 8 + Number(candidate.modelFamily === putter.modelFamily) * 4 + Number(candidate.headMaterial === putter.headMaterial) * 2 + Number(candidate.headStyle === putter.headStyle) })).sort((a, b) => b.score - a.score).slice(0, limit).map(({ candidate }) => candidate);
}

export async function getCollectionFacets(items?: Putter[]) {
  const all = items ?? await getPublishedPutters();
  const unique = (values: Array<string | undefined>) => [...new Set(values.filter(Boolean) as string[])].sort();
  return { brands: unique(all.map((item) => item.brand)), materials: unique(all.map((item) => item.headMaterial)), headStyles: unique(all.map((item) => item.headStyle)), categories: unique(all.map((item) => item.catalogCategory?.slug)), years: [...new Set(all.map((item) => item.releaseYear).filter(Boolean) as number[])].sort((a, b) => b - a) };
}
