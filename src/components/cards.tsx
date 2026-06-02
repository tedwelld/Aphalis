import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star } from "lucide-react";
import { Card, Badge } from "@/components/ui/Card";
import { Photo } from "@/components/Photo";
import type { Destination } from "@/content/destinations";
import type { Tour } from "@/content/tours";
import type { BlogPost } from "@/content/blog";
import type { Testimonial } from "@/content/site";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group">
      <Card className="h-full">
        <Photo src={destination.image} alt={destination.name} className="aspect-[4/3]" imgClassName="transition-transform duration-500 group-hover:scale-105" />
        <div className="p-5">
          <h3 className="text-xl text-foreground">{destination.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{destination.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-dark">
            Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group">
      <Card className="flex h-full flex-col">
        <Photo src={tour.image} alt={tour.name} className="aspect-[16/10]" imgClassName="transition-transform duration-500 group-hover:scale-105" />
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge>{tour.category}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-ink-soft">
              <Clock className="h-3.5 w-3.5" /> {tour.durationDays} days
            </span>
          </div>
          <h3 className="text-lg text-foreground">{tour.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
            <MapPin className="h-3.5 w-3.5 text-gold-dark" /> {capitalize(tour.destinationSlug)}
          </p>
          <p className="mt-2 flex-1 text-sm text-ink-soft">{tour.summary}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-dark">
            View &amp; book <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full p-6">
      <div className="flex gap-0.5 text-gold">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-foreground leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      <p className="mt-5 text-sm font-semibold text-foreground">{testimonial.author}</p>
      <p className="text-xs text-ink-soft">{testimonial.location}</p>
    </Card>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="flex h-full flex-col">
        <Photo src={post.image} alt={post.title} className="aspect-[16/9]" imgClassName="transition-transform duration-500 group-hover:scale-105" />
        <div className="flex flex-1 flex-col p-5">
          <time className="text-xs uppercase tracking-wider text-gold-dark">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <h3 className="mt-2 text-lg text-foreground">{post.title}</h3>
          <p className="mt-2 flex-1 text-sm text-ink-soft">{post.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-dark">
            Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
