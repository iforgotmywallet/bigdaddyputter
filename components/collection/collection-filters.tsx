import type { CollectionFilters } from "@/lib/types";

interface Facets { brands: string[]; materials: string[]; headStyles: string[]; categories: string[]; years: number[]; }
interface FilterLabels { filters: string; availability: string; brand: string; material: string; headStyle: string; year: string; category: string; sort: string; search: string; apply: string; clear: string; sortOptions: Record<CollectionFilters["sort"], string>; status: Record<string, string>; }

export function CollectionFiltersForm({ filters, facets, labels, action }: { filters: CollectionFilters; facets: Facets; labels: FilterLabels; action: string }) {
  const field = (name: string, label: string, options: Array<string | number>, current?: string | number) => (
    <label className="filter-field"><span>{label}</span><select name={name} defaultValue={current ?? ""}><option value="">—</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
  );
  return (
    <form className="filters" action={action} method="get">
      <div className="filter-heading"><p className="eyebrow">{labels.filters}</p><a href={action}>{labels.clear}</a></div>
      <label className="search-field"><span className="sr-only">{labels.search}</span><input name="q" defaultValue={filters.search ?? ""} placeholder={`${labels.search}…`} /><button type="submit">↗</button></label>
      <div className="filter-grid">
        <label className="filter-field"><span>{labels.availability}</span><select name="status" defaultValue={filters.status ?? ""}><option value="">—</option>{["available", "reserved", "sold", "display_only"].map((status) => <option key={status} value={status}>{labels.status[status]}</option>)}</select></label>
        {field("brand", labels.brand, facets.brands, filters.brand)}
        {field("material", labels.material, facets.materials, filters.material)}
        {field("headStyle", labels.headStyle, facets.headStyles, filters.headStyle)}
        {field("year", labels.year, facets.years, filters.year)}
        {field("category", labels.category, facets.categories, filters.category)}
        <label className="filter-field"><span>{labels.sort}</span><select name="sort" defaultValue={filters.sort}>{Object.entries(labels.sortOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <button className="button button-dark filter-submit" type="submit">{labels.apply}</button>
      </div>
    </form>
  );
}
