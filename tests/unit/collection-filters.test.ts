import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CollectionFiltersForm } from "@/components/collection/collection-filters";

const labels = {
  filters: "Filter collection",
  availability: "Availability",
  brand: "Brand",
  sort: "Sort",
  search: "Search",
  searchByName: "Search by name",
  apply: "Apply",
  clear: "Clear",
  all: "All",
  results: "items",
  sortOptions: {
    featured: "Featured",
    newest: "Newest",
    model: "Model",
    year: "Year",
    price: "Price",
    availability: "Availability",
  },
  status: {
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
    display_only: "Private collection · Not for sale",
  },
};

describe("collection filter disclosure", () => {
  it("summarizes results and active filters before the full controls", () => {
    const html = renderToStaticMarkup(createElement(CollectionFiltersForm, {
      action: "/en/collection",
      filters: { status: "available", sort: "featured", page: 1 },
      facets: { brands: [] },
      labels,
      resultCount: 3,
    }));

    expect(html).toContain("filters-mobile-summary");
    expect(html).toContain('data-open="false"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("3 items");
    expect(html).toContain('<b aria-label="1">1</b>');
    expect(html).toContain('<option value="">All</option>');
    expect(html).toContain("filter-search-disclosure");
    expect(html).toContain("Search by name");
  });
});
