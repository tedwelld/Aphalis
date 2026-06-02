import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { DestinationCard, TourCard, TestimonialCard, BlogCard } from "@/components/cards";
import { destinations } from "@/content/destinations";
import { activities } from "@/content/activities";
import { tours } from "@/content/tours";
import { guides, testimonials, pillars } from "@/content/site";
import { blogPosts } from "@/content/blog";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Destinations */}
      <Section>
        <SectionHeading
          eyebrow="Where we travel"
          title="Iconic Safari Destinations"
          description="Four extraordinary countries, one seamless journey. Choose your wilderness."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </Section>

      {/* Activities */}
      <Section muted>
        <SectionHeading
          eyebrow="What you'll do"
          title="Safari Activities & Experiences"
          description="From dawn game drives to sunset cruises and walking safaris — adventure, your way."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {activities.slice(0, 8).map((a) => (
            <div key={a.slug} className="rounded-xl border border-line bg-white p-5 text-center">
              <Icon name={a.icon} className="mx-auto h-7 w-7 text-gold-dark" />
              <p className="mt-3 text-sm font-medium text-foreground">{a.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/activities" variant="secondary">
            See all activities <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>

      {/* Featured tours */}
      <Section>
        <SectionHeading
          eyebrow="Popular journeys"
          title="Featured Safari Tours"
          description="Hand-crafted itineraries you can book online, on WhatsApp, or by email."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.slice(0, 3).map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/tours">
            Browse all tours <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>

      {/* Why ATSZ */}
      <Section muted>
        <SectionHeading eyebrow="Why ATSZ Safaris" title="Travel that gives back" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                <Icon name={p.icon} className="h-5 w-5 text-gold-dark" />
              </div>
              <h3 className="mt-4 text-lg text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Guides */}
      <Section>
        <SectionHeading
          eyebrow="Meet the team"
          title="Expert Local Guides"
          description="Born and raised in the wild places we explore — your guides are the heart of every safari."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {guides.map((g) => (
            <div key={g.name} className="text-center">
              <Photo src={g.image} alt={g.name} className="mx-auto aspect-square w-40 rounded-full" />
              <h3 className="mt-4 text-lg text-foreground">{g.name}</h3>
              <p className="text-sm font-medium text-gold-dark">{g.role}</p>
              <p className="mt-2 text-sm text-ink-soft">{g.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section muted>
        <SectionHeading eyebrow="Guest stories" title="Loved by Travellers" />
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} testimonial={t} />
          ))}
        </div>
      </Section>

      {/* Blog */}
      <Section>
        <SectionHeading eyebrow="From the field" title="Safari Journal" />
        <div className="grid gap-6 sm:grid-cols-3">
          {blogPosts.slice(0, 3).map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark">
            Read the journal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
