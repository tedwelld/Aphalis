"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { Pi } from "@/components/Pi";
import { cn } from "@/lib/cn";

type GalleryItem = {
  src: string;
  alt: string;
  category: string;
};

const categories = ["All", "Wildlife", "Landscapes", "Safari Life"] as const;

const gallery: GalleryItem[] = [
  { src: "/images/demo/lion-portrait.jpg", alt: "Lion resting in golden light", category: "Wildlife" },
  { src: "/images/demo/lion-walking.jpg", alt: "Lion walking through the savannah", category: "Wildlife" },
  { src: "/images/demo/leopard-log.jpg", alt: "Leopard resting on a fallen log", category: "Wildlife" },
  { src: "/images/demo/leopard-rock.jpg", alt: "Leopard perched on a rocky outcrop", category: "Wildlife" },
  { src: "/images/demo/giraffe-portrait.jpg", alt: "Giraffe against golden hour sky", category: "Wildlife" },
  { src: "/images/demo/giraffe-sunset.jpg", alt: "Giraffe silhouette at sunset", category: "Wildlife" },
  { src: "/images/demo/zebra.jpg", alt: "Zebra grazing on the plains", category: "Wildlife" },
  { src: "/images/demo/rhino-calf.jpg", alt: "Rhino calf with its mother", category: "Wildlife" },
  { src: "/images/demo/rhinos-road.jpg", alt: "Rhinos crossing the road", category: "Wildlife" },
  { src: "/images/demo/elephant-forest.jpg", alt: "Elephant emerging from forest", category: "Wildlife" },
  { src: "/images/demo/elephants-grass.jpg", alt: "Elephants grazing in tall grass", category: "Wildlife" },
  { src: "/images/demo/elephants-sunset.jpg", alt: "Elephants at sunset", category: "Wildlife" },
  { src: "/images/demo/desert-dunes.jpg", alt: "Red dunes of the desert at sunrise", category: "Landscapes" },
  { src: "/images/demo/desert-rock.jpg", alt: "Ancient rock formation", category: "Landscapes" },
  { src: "/images/demo/forest-stream.jpg", alt: "Forest stream in morning light", category: "Landscapes" },
  { src: "/images/demo/waterfall.jpg", alt: "Waterfall cascading into a pool", category: "Landscapes" },
  { src: "/images/demo/tent-camp.jpg", alt: "Luxury tented camp under the stars", category: "Safari Life" },
  { src: "/images/demo/safari-jeep.jpg", alt: "Safari jeep on an afternoon drive", category: "Safari Life" },
  { src: "/images/demo/portrait-man.jpg", alt: "Local guide sharing stories", category: "Safari Life" },
  { src: "/images/demo/portrait-woman.jpg", alt: "Woman from a local community", category: "Safari Life" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const filtered = activeCategory === "All" ? gallery : gallery.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightbox(true);
  };

  const goNext = useCallback(() => {
    setLightboxIdx((prev) => (prev === filtered.length - 1 ? 0 : prev + 1));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIdx((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
  }, [filtered.length]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox, goNext, goPrev]);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Moments from the wild, captured on our journeys."
        image="/images/Sunset.jpeg"
      />

      <Section>
        <SectionHeading
          eyebrow="Photography"
          title="A Window Into the Wild"
          description="Every image tells a story — browse our collection of moments from across Southern Africa."
        />

        {/* Filter chips */}
        <div className="mb-10 mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-gold text-neutral-900 shadow-md"
                  : "bg-muted text-ink-soft hover:bg-gold/20 hover:text-foreground",
              )}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-60">
                  ({gallery.filter((img) => img.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-ink-soft">No images in this category yet.</p>
        ) : (
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
            {filtered.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => openLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <Photo
                  src={img.src}
                  alt={img.alt}
                  className={cn(
                    "w-full transition-transform duration-500 group-hover:scale-105",
                    i % 3 === 0 ? "aspect-[3/4]" : "aspect-square",
                  )}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">{img.alt}</span>
                  <span className="mt-0.5 text-xs text-white/60">{img.category}</span>
                </div>
                {/* Category badge (always visible, top-right) */}
                <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-sm">
                  {img.category}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Image counter */}
        {filtered.length > 0 && (
          <p className="mt-8 text-center text-sm text-ink-soft">
            Showing {filtered.length} {filtered.length === 1 ? "image" : "images"}
            {activeCategory !== "All" && <> in <span className="font-medium text-foreground">{activeCategory}</span></>}
          </p>
        )}
      </Section>

      {/* Lightbox */}
      {lightbox && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/90 px-4 pt-24 pb-8 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(false); }}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <Pi name="pi-times" className="text-xl" />
          </button>

          <span className="absolute left-6 top-6 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white">
            {lightboxIdx + 1} / {filtered.length}
          </span>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <Pi name="pi-chevron-left" className="text-2xl" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <Pi name="pi-chevron-right" className="text-2xl" />
              </button>
            </>
          )}

          <div className="flex flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].alt}
              className="max-h-[75vh] max-w-[90vw] rounded-2xl object-contain"
            />
            <div className="text-center">
              <p className="text-sm font-medium text-white">{filtered[lightboxIdx].alt}</p>
              <p className="mt-0.5 text-xs text-white/60">{filtered[lightboxIdx].category}</p>
            </div>
          </div>
        </div>,
        document.body
      )}

      <CtaBand />
    </>
  );
}
