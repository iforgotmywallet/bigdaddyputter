import Image from "next/image";
import Link from "next/link";
import type { CatalogCategory, Locale, Putter } from "@/lib/types";

export function CategoryGrid({ categories, items, locale, countLabel, browseLabel }: { categories: CatalogCategory[]; items: Putter[]; locale: Locale; countLabel: string; browseLabel: string }) {
  return <div className="category-grid">
    {categories.map((category, index) => {
      const categoryItems = items.filter((item) => item.catalogCategory?.id === category.id);
      const cover = categoryItems[0]?.images.find((image) => image.isPrimary) ?? categoryItems[0]?.images[0];
      return <article className="category-card" key={category.id}>
        <Link className="category-card-image" href={`/${locale}/collection/category/${category.slug}`} aria-label={`${browseLabel}: ${category.name[locale]}`}>
          {cover ? <Image src={cover.src} alt={cover.alt[locale]} width={cover.width} height={cover.height} sizes="(max-width: 700px) 50vw, 25vw" priority={index < 2} /> : <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
        </Link>
        <div className="category-card-copy">
          <p>{String(categoryItems.length).padStart(2, "0")} {countLabel}</p>
          <h2><Link href={`/${locale}/collection/category/${category.slug}`}>{category.name[locale]}</Link></h2>
          <span>{category.description[locale]}</span>
        </div>
      </article>;
    })}
  </div>;
}
