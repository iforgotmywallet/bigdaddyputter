import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionFiltersForm } from "@/components/collection/collection-filters";
import { ProductGrid } from "@/components/collection/product-grid";
import { getCatalogCategories, getCatalogCategoryBySlug } from "@/db/queries/categories";
import { filterPublishedPutters, getCollectionFacets, getPublishedPutters } from "@/db/queries/putters";
import { PAGE_SIZE } from "@/lib/constants";
import { getMessages, requireLocale } from "@/lib/i18n";
import { parseCollectionFilters } from "@/lib/validation/collection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; categorySlug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, categorySlug } = await params;
  const locale = requireLocale(rawLocale);
  const category = await getCatalogCategoryBySlug(categorySlug);
  if (!category) return {};
  return { title: category.name[locale], description: category.description[locale] };
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ locale: string; categorySlug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale: rawLocale, categorySlug } = await params;
  const locale = requireLocale(rawLocale);
  const raw = await searchParams;
  const filters = parseCollectionFilters(raw);
  const [category, categories, allItems] = await Promise.all([getCatalogCategoryBySlug(categorySlug), getCatalogCategories(), getPublishedPutters()]);
  if (!category) notFound();
  const putters = filterPublishedPutters(allItems, { ...filters, category: category.slug });
  const facets = await getCollectionFacets(allItems.filter((item) => item.catalogCategory?.id === category.id));
  const m = getMessages(locale);
  const pages = Math.max(1, Math.ceil(putters.length / PAGE_SIZE));
  const page = Math.min(filters.page, pages);
  const visible = putters.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageHref = (target: number) => { const query = new URLSearchParams(); Object.entries(raw).forEach(([key, value]) => { if (key !== "page" && typeof value === "string" && value) query.set(key, value); }); query.set("page", String(target)); return `/${locale}/collection/category/${category.slug}?${query}`; };
  return <>
    <header className="page-hero category-hero"><div className="shell page-hero-grid"><div><p className="eyebrow">{m.collection.eyebrow} / {String(category.displayOrder + 1).padStart(2, "0")}</p><h1>{category.name[locale]}</h1></div><p className="page-hero-copy">{category.description[locale]}</p></div></header>
    <nav className="category-switcher shell" aria-label={m.collection.categoriesTitle}><Link href={`/${locale}/collection`}>{m.common.all}</Link>{categories.map((item) => <Link key={item.id} href={`/${locale}/collection/category/${item.slug}`} aria-current={item.id === category.id ? "page" : undefined}>{item.name[locale]}</Link>)}</nav>
    <div className="shell collection-layout category-collection-layout">
      <CollectionFiltersForm action={`/${locale}/collection/category/${category.slug}`} filters={filters} facets={{ brands: facets.brands }} resultCount={putters.length} labels={{ filters: m.collection.filters, availability: m.collection.availability, brand: m.collection.brand, sort: m.collection.sort, search: m.common.search, searchByName: m.collection.searchByName, apply: m.common.apply, clear: m.common.clear, all: m.common.all, results: m.collection.results, sortOptions: m.collection.sortOptions, status: m.status }} />
      <section className="collection-results" aria-live="polite"><div className="results-bar"><span>{putters.length} {m.collection.results}</span><span>{m.common.page} {page} {m.common.of} {pages}</span></div>{visible.length ? <ProductGrid putters={visible} locale={locale} priorityCount={6} density="compact" /> : <div className="no-results">{m.collection.noResults}</div>}{pages > 1 ? <nav className="pagination" aria-label={m.ui.pagination}>{page > 1 ? <Link href={pageHref(page - 1)}>← {m.common.previous}</Link> : <span />}{page < pages ? <Link href={pageHref(page + 1)}>{m.common.next} →</Link> : <span />}</nav> : null}</section>
    </div>
  </>;
}
