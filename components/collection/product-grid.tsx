import type { Locale, Putter } from "@/lib/types";
import { getMessages } from "@/lib/i18n";
import { ProductCard } from "@/components/collection/product-card";

export function ProductGrid({ putters, locale, priorityCount = 0, density = "standard" }: { putters: Putter[]; locale: Locale; priorityCount?: number; density?: "standard" | "compact" }) {
  const m = getMessages(locale);
  return <div className={`product-grid${density === "compact" ? " product-grid-compact" : ""}`}>{putters.map((putter, index) => <ProductCard key={putter.id} putter={putter} locale={locale} statusLabel={m.status[putter.status]} priceOnRequest={m.common.priceOnRequest} priority={index < priorityCount} compact={density === "compact"} />)}</div>;
}
