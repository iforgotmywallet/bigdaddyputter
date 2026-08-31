import type { Metadata } from "next";
import Link from "next/link";
import { CollectionFiltersForm } from "@/components/collection/collection-filters";
import { CategoryGrid } from "@/components/collection/category-grid";
import { ProductGrid } from "@/components/collection/product-grid";
import { getCatalogCategories } from "@/db/queries/categories";
import { filterPublishedPutters, getCollectionFacets, getPublishedPutters } from "@/db/queries/putters";
import { PAGE_SIZE } from "@/lib/constants";
import { getMessages, requireLocale } from "@/lib/i18n";
import { parseCollectionFilters } from "@/lib/validation/collection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const m = getMessages(requireLocale((await params).locale));
  return { title: m.collection.title, description: m.collection.intro };
}

export default async function CollectionPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const locale = requireLocale((await params).locale);
  const raw = await searchParams;
  const filters = parseCollectionFilters(raw);
  const m = getMessages(locale);
  const [allItems, categories] = await Promise.all([getPublishedPutters(), getCatalogCategories()]);
  const putters = filterPublishedPutters(allItems, filters);
  const facets = await getCollectionFacets(allItems);
  const pages = Math.max(1, Math.ceil(putters.length / PAGE_SIZE));
  const page = Math.min(filters.page, pages);
  const visible = putters.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageHref = (target: number) => { const query = new URLSearchParams(); Object.entries(raw).forEach(([key, value]) => { if (key !== "page" && typeof value === "string" && value) query.set(key, value); }); query.set("page", String(target)); return `/${locale}/collection?${query}`; };
  return (
    <>
      <header className="page-hero"><div className="shell page-hero-grid"><div><p className="eyebrow">{m.collection.eyebrow}</p><h1>{m.collection.title}</h1></div><p className="page-hero-copy">{m.collection.intro}</p></div></header>
      <section className="category-index shell"><div className="section-heading"><div><p className="eyebrow">01 / {m.collection.categoriesTitle}</p><h2>{m.collection.categoriesTitle}</h2></div><p>{m.collection.categoriesIntro}</p></div><CategoryGrid categories={categories} items={allItems} locale={locale} countLabel={m.collection.categoryCount} browseLabel={m.collection.browseCategory} /></section>
      <div className="shell collection-layout">
        <div className="collection-heading"><p className="eyebrow">02 / {m.collection.allItems}</p><h2>{m.collection.allItems}</h2></div>
        <CollectionFiltersForm action={`/${locale}/collection`} filters={filters} facets={{ brands: facets.brands }} resultCount={putters.length} labels={{ filters: m.collection.filters, availability: m.collection.availability, brand: m.collection.brand, sort: m.collection.sort, search: m.common.search, searchByName: m.collection.searchByName, apply: m.common.apply, clear: m.common.clear, all: m.common.all, results: m.collection.results, sortOptions: m.collection.sortOptions, status: m.status }} />
        <section className="collection-results" aria-live="polite"><div className="results-bar"><span>{putters.length} {m.collection.results}</span><span>{m.common.page} {page} {m.common.of} {pages}</span></div>{visible.length ? <ProductGrid putters={visible} locale={locale} priorityCount={6} density="compact" /> : <div className="no-results">{m.collection.noResults}</div>}{pages > 1 ? <nav className="pagination" aria-label={m.ui.pagination}>{page > 1 ? <Link href={pageHref(page - 1)}>← {m.common.previous}</Link> : <span />}{page < pages ? <Link href={pageHref(page + 1)}>{m.common.next} →</Link> : <span />}</nav> : null}</section>
      </div>
    </>
  );
}
