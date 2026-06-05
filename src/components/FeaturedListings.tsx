"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pi } from "@/components/Pi";
import { Photo } from "@/components/Photo";
import { tours } from "@/content/tours";

const scrim =
  "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent";
const pictureTile =
  "relative mx-auto aspect-[16/11] w-full max-w-[22rem] overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5";

type ProductStat = { id: number; reviewCount: number; reviewRating: number; title: string };

export function FeaturedListings() {
  const [stats, setStats] = useState<Map<number, ProductStat>>(new Map());

  useEffect(() => {
    fetch("/api/bokun/stats")
      .then((r) => r.json())
      .then((data: ProductStat[]) => {
        const map = new Map<number, ProductStat>();
        data.forEach((s) => map.set(s.id, s));
        setStats(map);
      })
      .catch(() => {});
  }, []);

  const featured = [...tours]
    .sort((a, b) => {
      const aCount = a.bokunProductId ? (stats.get(a.bokunProductId)?.reviewCount ?? a.bookingCount ?? 0) : (a.bookingCount ?? 0);
      const bCount = b.bokunProductId ? (stats.get(b.bokunProductId)?.reviewCount ?? b.bookingCount ?? 0) : (b.bookingCount ?? 0);
      return bCount - aCount;
    })
    .slice(0, 4);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featured.map((tour) => {
        const href = tour.bokunProductId ? `/product/${tour.bokunProductId}` : `/tours/${tour.slug}`;
        const durationLabel = tour.durationDays > 0 ? `${tour.durationDays} days` : "1 hour";
        const stat = tour.bokunProductId ? stats.get(tour.bokunProductId) : undefined;
        const displayCount = stat?.reviewCount ?? tour.bookingCount;
        return (
        <Link key={tour.slug} href={href} className="group block">
          <div className={pictureTile}>
            <Photo
              src={tour.image}
              alt={tour.name}
              className="absolute inset-0 h-full w-full"
              imgClassName="transition-transform duration-500 group-hover:scale-105"
            />
            <div className={scrim} />
            <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-4">
              <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-foreground">
                {tour.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-sm">
                <Pi name="pi-clock" className="text-xs" /> {durationLabel}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="flex items-center gap-1 text-xs text-white/80">
                <Pi name="pi-map-marker" className="text-xs text-gold-light" />{" "}
                {capitalize(tour.destinationSlug)}
              </p>
              <h3 className="mt-1 text-lg text-white">{tour.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-white/85">{tour.summary}</p>
              {tour.priceFrom && !tour.priceFrom.startsWith("$ on") && (
                <p className="mt-1 text-sm font-semibold text-gold-light">From {tour.priceFrom}</p>
              )}
              {stat && stat.reviewRating > 0 && (
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-white/90 backdrop-blur-sm">
                    <Pi name="pi-star-fill" className="text-gold-light" /> {stat.reviewRating.toFixed(1)} ({stat.reviewCount} reviews)
                  </span>
                </div>
              )}
              {!stat && displayCount && (
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-white/90 backdrop-blur-sm">
                    <Pi name="pi-heart-fill" className="text-gold-light" /> {displayCount} booked
                  </span>
                </div>
              )}
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gold-light">
                View &amp; book <Pi name="pi-arrow-right" className="text-sm transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
        );
      })}
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
