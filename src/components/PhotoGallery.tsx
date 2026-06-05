"use client";

import { useState } from "react";
import { Photo } from "@/components/Photo";
import { Pi } from "@/components/Pi";
import { cn } from "@/lib/cn";

type GalleryImage = { src: string; alt: string };

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Main image */}
      <div className="aspect-[16/9] sm:aspect-[21/9]">
        <Photo
          src={images[active].src}
          alt={images[active].alt}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === active ? "w-8 bg-gold" : "w-2 bg-white/60 hover:bg-white/80",
              )}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setActive((a) => (a === 0 ? images.length - 1 : a - 1))}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-colors"
            aria-label="Previous image"
          >
            <Pi name="pi-chevron-left" className="text-lg" />
          </button>
          <button
            type="button"
            onClick={() => setActive((a) => (a === images.length - 1 ? 0 : a + 1))}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-colors"
            aria-label="Next image"
          >
            <Pi name="pi-chevron-right" className="text-lg" />
          </button>
        </>
      )}
    </div>
  );
}
