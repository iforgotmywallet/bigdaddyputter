import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatting";
import type { Locale, Putter } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

export function ProductCard({ putter, locale, statusLabel, priceOnRequest, priority = false, compact = false }: { putter: Putter; locale: Locale; statusLabel: string; priceOnRequest: string; priority?: boolean; compact?: boolean }) {
  const translation = putter.translations[locale];
  const primary = putter.images.find((image) => image.isPrimary) ?? putter.images[0];
  const alternate = putter.images[1];
  const price = formatPrice(putter.priceMode, putter.priceCents, putter.priceCurrency, locale);
  const categoryDetail = putter.catalogCategory?.slug === "golf-bags" ? putter.categorySpecifications?.bagType
    : putter.catalogCategory?.slug === "headcovers" ? putter.categorySpecifications?.headcoverFit
      : putter.catalogCategory?.slug === "accessories" ? putter.categorySpecifications?.accessoryType
        : undefined;
  const metadata = [categoryDetail ?? putter.headMaterial ?? putter.categorySpecifications?.material, putter.releaseYear].filter(Boolean).join(" · ");
  return (
    <article className={`product-card${compact ? " product-card-compact" : ""}`}>
      <Link className="product-image-wrap" href={`/${locale}/collection/${putter.slug}`} aria-label={translation.title}>
        {primary ? <Image className="product-image primary" src={primary.src} alt={primary.alt[locale]} width={primary.width} height={primary.height} sizes={compact ? "(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 17vw" : "(max-width: 520px) 100vw, (max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"} priority={priority} /> : <div className="image-placeholder" />}
        {!compact && alternate ? <Image className="product-image alternate" src={alternate.src} alt="" width={alternate.width} height={alternate.height} sizes="(max-width: 1100px) 33vw, 25vw" /> : null}
        <StatusBadge status={putter.status} label={statusLabel} />
        <span className="card-index" aria-hidden="true">{String(putter.displayOrder + 1).padStart(2, "0")}</span>
      </Link>
      <div className="product-card-copy">
        <p className="card-brand">{putter.brand}</p>
        <h3><Link href={`/${locale}/collection/${putter.slug}`}>{translation.title}</Link></h3>
        {metadata ? <p>{metadata}</p> : putter.catalogCategory ? <p>{putter.catalogCategory.name[locale]}</p> : null}
        {price ? <p className="card-price">{price === "on_request" ? priceOnRequest : price}</p> : null}
      </div>
    </article>
  );
}
