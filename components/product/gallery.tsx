"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Locale, PutterImage } from "@/lib/types";

export function ProductGallery({ images, locale, label, counterWord }: { images: PutterImage[]; locale: Locale; label: string; counterWord: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const move = useCallback((step: number) => setActive((current) => (current + step + images.length) % images.length), [images.length]);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setLightbox(false); if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [lightbox, move]);
  if (!images.length) return <div className="gallery-empty" />;
  const current = images[active];
  return (
    <div className="gallery" aria-label={label}>
      <button className="gallery-main" type="button" onClick={() => setLightbox(true)} aria-label={`${label}: ${active + 1} ${counterWord} ${images.length}`}>
        <Image src={current.src} alt={current.alt[locale]} width={current.width} height={current.height} sizes="(max-width: 900px) 100vw, 62vw" priority />
        <span className="gallery-counter">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <span className="gallery-zoom" aria-hidden="true">＋</span>
      </button>
      <div className="gallery-thumbs">
        {images.map((image, index) => <button key={image.id} className={active === index ? "active" : ""} type="button" aria-label={`${index + 1} ${counterWord} ${images.length}`} aria-pressed={active === index} onClick={() => setActive(index)}><Image src={image.src} alt="" width={200} height={150} sizes="100px" /></button>)}
      </div>
      <div className="gallery-mobile-controls"><button type="button" onClick={() => move(-1)}>←</button><span>{active + 1} / {images.length}</span><button type="button" onClick={() => move(1)}>→</button></div>
      {lightbox ? <div className="lightbox" role="dialog" aria-modal="true" aria-label={label}><button className="lightbox-close" type="button" onClick={() => setLightbox(false)} aria-label="Close">×</button><button type="button" onClick={() => move(-1)} aria-label="Previous image">←</button><Image src={current.src} alt={current.alt[locale]} width={current.width} height={current.height} sizes="90vw" priority /><button type="button" onClick={() => move(1)} aria-label="Next image">→</button><span>{active + 1} / {images.length}</span></div> : null}
    </div>
  );
}
