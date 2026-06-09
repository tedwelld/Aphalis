import Link from "next/link";
import { Pi } from "@/components/Pi";
import { Card } from "@/components/ui/Card";
import { Photo } from "@/components/Photo";
import type { Destination } from "@/content/destinations";
import type { Tour } from "@/content/tours";
import type { BlogPost } from "@/content/blog";
import type { Testimonial } from "@/content/site";

/**
 * Image cards with the caption text overlaid INSIDE the picture. A bottom-up
 * gradient scrim keeps the white text readable over any photo.
 */

const scrim =
  "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent";
const pictureTile =
  "relative mx-auto aspect-[16/11] w-full max-w-[22rem] overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group block">
      <div className={pictureTile}>
        <Photo
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className={scrim} />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="text-xl text-white">{destination.name}</h3>
          <p className="mt-1 text-sm text-white/85">{destination.tagline}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-light">
            Explore <Pi name="pi-arrow-right" className="text-sm transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function TourCard({ tour }: { tour: Tour }) {
  const href = tour.bokunProductId ? `/product/${tour.bokunProductId}` : `/tours/${tour.slug}`;
  const durationLabel = tour.durationDays > 0 ? `${tour.durationDays} days` : "1 hour";
  const isBestSeller = (tour.bookingCount ?? 0) >= 100;
  const isPopular = (tour.bookingCount ?? 0) >= 50 && (tour.bookingCount ?? 0) < 100;
  const hasPrice = tour.priceFrom && !tour.priceFrom.startsWith("$ on");
  return (
    <article className="group rounded-2xl border border-line bg-surface shadow-sm overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="relative overflow-hidden">
        <Link href={href} className="block aspect-[16/11]">
          <Photo
            src={tour.image}
            alt={tour.name}
            className="absolute inset-0 h-full w-full"
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {/* Top badges row */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
            {tour.category}
          </span>
          {isBestSeller && (
            <span className="rounded-full bg-rose-600/90 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
              Best Seller
            </span>
          )}
          {isPopular && !isBestSeller && (
            <span className="rounded-full bg-amber-600/90 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
              Popular
            </span>
          )}
        </div>
        {/* Rating badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
          <Pi name="pi-star-fill" className="text-[10px] text-gold-light" />
          <span className="font-medium">{tour.bookingCount ? "4.8" : "—"}</span>
          <span className="opacity-70">({tour.bookingCount ?? "0"})</span>
        </div>
        {/* Wishlist / save icon (decorative — no handler to keep TourCard server-safe) */}
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
          <Pi name="pi-heart" className="text-sm" />
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-ink-soft">
          <span className="flex items-center gap-1"><Pi name="pi-clock" className="text-gold-dark" />{durationLabel}</span>
          <span className="text-line">·</span>
          <span>{tour.destinationSlug ? capitalize(tour.destinationSlug) : tour.category}</span>
        </div>
        <Link href={href}>
          <h3 className="mt-1.5 font-medium text-foreground hover:text-gold-dark transition-colors line-clamp-1">{tour.name}</h3>
        </Link>
        {tour.summary && <p className="mt-1 text-sm text-ink-soft line-clamp-2">{tour.summary}</p>}
        <div className="mt-4 flex items-center justify-between">
          <div>
            {hasPrice ? (
              <p className="text-lg font-semibold text-foreground">{tour.priceFrom} <span className="text-xs font-normal text-ink-soft">/ person</span></p>
            ) : (
              <p className="text-sm font-medium text-gold-dark">Price on request</p>
            )}
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2 text-xs font-semibold text-neutral-900 transition-all hover:bg-gold-dark hover:text-white hover:shadow-md active:scale-95"
          >
            {hasPrice ? "Book Now" : "Enquire"}
            <Pi name="pi-arrow-right" className="text-xs" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className={pictureTile}>
        <Photo
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className={scrim} />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <time className="text-xs uppercase tracking-wider text-gold-light">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <h3 className="mt-1 text-lg text-white">{post.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/85">{post.excerpt}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-light">
            Read more <Pi name="pi-arrow-right" className="text-sm transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Testimonials are not image cards — keep the light panel style. */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full p-6">
      <div className="flex gap-0.5 text-gold">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Pi key={i} name="pi-star-fill" className="text-sm" />
        ))}
      </div>
      <p className="mt-4 text-foreground leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      <p className="mt-5 text-sm font-semibold text-foreground">{testimonial.author}</p>
      <p className="text-xs text-ink-soft">{testimonial.location}</p>
    </Card>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
