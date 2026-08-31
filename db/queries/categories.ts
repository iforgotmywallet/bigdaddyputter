import { asc, eq } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db/client";
import { catalogCategories } from "@/db/schema";
import { DEFAULT_CATALOG_CATEGORIES, DEFAULT_CATALOG_CATEGORY_SLUG } from "@/lib/constants";
import type { CatalogCategory } from "@/lib/types";

function hydrateCategory(row: typeof catalogCategories.$inferSelect): CatalogCategory {
  return {
    id: row.id,
    slug: row.slug,
    name: { "zh-hant": row.nameZhHant, "zh-hans": row.nameZhHans, en: row.nameEn },
    description: { "zh-hant": row.descriptionZhHant, "zh-hans": row.descriptionZhHans, en: row.descriptionEn },
    displayOrder: row.displayOrder,
    isDefault: row.isDefault,
    isActive: row.isActive,
  };
}

export async function getCatalogCategories({ includeInactive = false }: { includeInactive?: boolean } = {}) {
  if (!hasDatabase()) return DEFAULT_CATALOG_CATEGORIES.filter((category) => includeInactive || category.isActive);
  const query = getDb().select().from(catalogCategories);
  const rows = includeInactive
    ? await query.orderBy(asc(catalogCategories.displayOrder), asc(catalogCategories.nameEn))
    : await query.where(eq(catalogCategories.isActive, true)).orderBy(asc(catalogCategories.displayOrder), asc(catalogCategories.nameEn));
  return rows.map(hydrateCategory);
}

export async function getCatalogCategoryBySlug(slug: string) {
  return (await getCatalogCategories()).find((category) => category.slug === slug) ?? null;
}

export async function getDefaultCatalogCategory() {
  const categories = await getCatalogCategories();
  return categories.find((category) => category.isDefault)
    ?? categories.find((category) => category.slug === DEFAULT_CATALOG_CATEGORY_SLUG)
    ?? categories[0]
    ?? DEFAULT_CATALOG_CATEGORIES[0];
}
