import type { MetadataRoute } from "next";
import { getPublishedPutters } from "@/db/queries/putters";
import { SITE_URL } from "@/lib/constants";
import { locales } from "@/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const putters = await getPublishedPutters(); const staticPaths = ["", "/collection", "/new-arrivals", "/available", "/archive", "/about", "/contact", "/privacy"]; return [...locales.flatMap((locale) => staticPaths.map((path) => ({ url: `${SITE_URL}/${locale}${path}`, lastModified: new Date(), changeFrequency: path === "" || path === "/collection" ? "daily" as const : "monthly" as const }))), ...locales.flatMap((locale) => putters.map((putter) => ({ url: `${SITE_URL}/${locale}/collection/${putter.slug}`, lastModified: new Date(putter.updatedAt), changeFrequency: "weekly" as const })))]; }
