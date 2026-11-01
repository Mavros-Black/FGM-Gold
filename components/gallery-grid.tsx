"use client";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImage = { src: string; alt: string; caption: string; tag: string };

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex(i => (i === null ? i : (i - 1 + images.length) % images.length)), [images.length]);
  const next = useCallback(() => setIndex(i => (i === null ? i : (i + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, close, prev, next]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <button key={img.src} className="gallery-item" onClick={() => setIndex(i)} aria-label={`View ${img.caption}`}>
            <img src={img.src} alt={img.alt} loading="lazy" />
            <span className="gallery-item-info"><small>{img.tag}</small><strong>{img.caption}</strong></span>
          </button>
        ))}
      </div>
      {index !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={images[index].caption} onClick={close}>
          <button className="gallery-close" onClick={close} aria-label="Close gallery"><X size={22} /></button>
          <button className="gallery-nav gallery-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image"><ChevronLeft size={26} /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={images[index].src} alt={images[index].alt} />
            <figcaption><small>{images[index].tag}</small><strong>{images[index].caption}</strong><span>{index + 1} / {images.length}</span></figcaption>
          </figure>
          <button className="gallery-nav gallery-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image"><ChevronRight size={26} /></button>
        </div>
      )}
    </>
  );
}
