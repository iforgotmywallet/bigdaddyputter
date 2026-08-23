import type { Locale, Putter } from "@/lib/types";
import { getMessages } from "@/lib/i18n";
import { ProductCard } from "@/components/collection/product-card";

export function ProductGrid({ putters, locale, priorityCount = 0 }: { putters: Putter[]; locale: Locale; priorityCount?: number }) {
  const m = getMessages(locale);
  return <div className="product-grid">{putters.map((putter, index) => <ProductCard key={putter.id} putter={putter} locale={locale} statusLabel={m.status[putter.status]} priceOnRequest={m.common.priceOnRequest} priority={index < priorityCount} />)}</div>;
}
