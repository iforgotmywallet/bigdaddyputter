import { ProductGrid } from "@/components/collection/product-grid";
import type { Locale, Putter } from "@/lib/types";

export function SubsetPage({ locale, eyebrow, title, intro, putters }: { locale: Locale; eyebrow: string; title: string; intro: string; putters: Putter[] }) {
  return <><header className="page-hero"><div className="shell page-hero-grid"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><p className="page-hero-copy">{intro}</p></div></header><section className="home-section shell"><ProductGrid putters={putters} locale={locale} priorityCount={4} /></section></>;
}
