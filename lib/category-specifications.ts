import type { CategorySpecifications } from "@/lib/types";

export const CATEGORY_SPECIFICATION_FIELDS = {
  putters: [],
  headcovers: ["productCode", "releaseDate", "releaseEvent", "edition", "headcoverFit", "handedness", "material", "colorway", "closureType"],
  "golf-bags": ["productCode", "releaseDate", "releaseEvent", "edition", "bagType", "material", "colorway", "dividerTop", "strapSystem", "pocketCount", "weightPounds", "featureSummary"],
  accessories: ["productCode", "releaseDate", "releaseEvent", "edition", "accessoryType", "material", "colorway", "dimensions", "weightGrams", "galleryOrigin"],
  additional: ["productCode", "releaseDate", "releaseEvent", "edition", "material", "colorway", "dimensions", "weightGrams"],
} as const satisfies Record<string, readonly (keyof CategorySpecifications)[]>;

export type CoreCatalogCategorySlug = Exclude<keyof typeof CATEGORY_SPECIFICATION_FIELDS, "additional">;

export function specificationFieldsForCategory(slug: string) {
  return CATEGORY_SPECIFICATION_FIELDS[slug as CoreCatalogCategorySlug] ?? CATEGORY_SPECIFICATION_FIELDS.additional;
}

export function buildCategorySpecifications(slug: string, values: Record<string, unknown>): CategorySpecifications {
  return Object.fromEntries(specificationFieldsForCategory(slug).flatMap((field) => {
    const value = values[field];
    return value === "" || value === undefined || value === null ? [] : [[field, value]];
  })) as CategorySpecifications;
}
