import { z } from "zod";
import type { CollectionFilters } from "@/lib/types";

const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
const optionalShort = z.string().trim().max(100).optional().catch(undefined);
const sortSchema = z.enum(["featured", "newest", "model", "year", "price", "availability"]).catch("featured");

export function parseCollectionFilters(params: Record<string, string | string[] | undefined>): CollectionFilters {
  return {
    status: optionalShort.parse(first(params.status)),
    brand: optionalShort.parse(first(params.brand)),
    modelFamily: optionalShort.parse(first(params.modelFamily)),
    headStyle: optionalShort.parse(first(params.headStyle)),
    material: optionalShort.parse(first(params.material)),
    condition: optionalShort.parse(first(params.condition)),
    year: z.coerce.number().int().min(1900).max(2100).optional().catch(undefined).parse(first(params.year)),
    category: optionalShort.parse(first(params.category)),
    search: optionalShort.parse(first(params.q)),
    sort: sortSchema.parse(first(params.sort)),
    page: z.coerce.number().int().min(1).max(1000).catch(1).parse(first(params.page)),
  };
}

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(3).max(120);
