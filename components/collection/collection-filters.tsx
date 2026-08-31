"use client";

import { useState } from "react";
import type { CollectionFilters } from "@/lib/types";

interface Facets { brands: string[]; }
interface FilterLabels { filters: string; availability: string; brand: string; sort: string; search: string; searchByName: string; apply: string; clear: string; all: string; results: string; sortOptions: Record<CollectionFilters["sort"], string>; status: Record<string, string>; }

export function CollectionFiltersForm({ filters, facets, labels, action, resultCount }: { filters: CollectionFilters; facets: Facets; labels: FilterLabels; action: string; resultCount: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCount = [filters.search, filters.status, filters.brand].filter(Boolean).length;
  const field = (name: string, label: string, options: Array<string | number>, current?: string | number) => (
    <label className="filter-field"><span>{label}</span><select name={name} defaultValue={current ?? ""}><option value="">{labels.all}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
  );
  return (
    <form className="filters" action={action} method="get">
      <div className="filters-disclosure" data-open={mobileOpen}>
        <button className="filters-mobile-summary" type="button" aria-expanded={mobileOpen} aria-controls="collection-filter-controls" onClick={() => setMobileOpen((open) => !open)}>
          <span><strong>{labels.filters}</strong><small>{resultCount} {labels.results}</small></span>
          {activeCount ? <b aria-label={`${activeCount}`}>{activeCount}</b> : null}
        </button>
        <div id="collection-filter-controls" className="filters-body">
          <div className="filter-heading"><p className="eyebrow">{labels.filters}</p><a href={action}>{labels.clear}</a></div>
          <div className="filter-grid filter-grid-compact">
            <label className="filter-field"><span>{labels.availability}</span><select name="status" defaultValue={filters.status ?? ""}><option value="">{labels.all}</option>{["available", "reserved", "sold", "display_only"].map((status) => <option key={status} value={status}>{labels.status[status]}</option>)}</select></label>
            {field("brand", labels.brand, facets.brands, filters.brand)}
            <label className="filter-field"><span>{labels.sort}</span><select name="sort" defaultValue={filters.sort}>{Object.entries(labels.sortOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <button className="button button-dark filter-submit" type="submit">{labels.apply}</button>
          </div>
          <details className="filter-search-disclosure" open={Boolean(filters.search)}><summary>{labels.searchByName}</summary><label className="search-field"><span className="sr-only">{labels.search}</span><input name="q" defaultValue={filters.search ?? ""} placeholder={`${labels.search}…`} /><button type="submit">↗</button></label></details>
        </div>
      </div>
    </form>
  );
}
