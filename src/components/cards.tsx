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
  return (
    <Link href={href} className="group block">
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
            <Pi name="pi-map-marker" className="text-xs text-gold-light" /> {capitalize(tour.destinationSlug)}
          </p>
          <h3 className="mt-1 text-lg text-white">{tour.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/85">{tour.summary}</p>
          {tour.priceFrom && !tour.priceFrom.startsWith("$ on") && (
            <p className="mt-1 text-sm font-semibold text-gold-light">From {tour.priceFrom}</p>
          )}
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gold-light">
            View &amp; book <Pi name="pi-arrow-right" className="text-sm transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
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
