import Link from "next/link";
import { Pi } from "@/components/Pi";
import { Hero } from "@/components/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
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
        <Reveal>
          <SectionHeading
            eyebrow="Where we travel"
            title="Iconic Safari Destinations"
            description="Four extraordinary countries, one seamless journey. Choose your wilderness."
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={i * 90}>
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Activities */}
      <Section muted>
        <Reveal>
          <SectionHeading
            eyebrow="What you'll do"
            title="Safari Activities & Experiences"
            description="From dawn game drives to sunset cruises and walking safaris — adventure, your way."
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {activities.slice(0, 8).map((a, i) => (
            <Reveal key={a.slug} delay={i * 60}>
              <div className="rounded-xl border border-line bg-surface p-5 text-center transition-shadow hover:shadow-md">
                <Icon name={a.icon} className="mx-auto text-3xl text-gold-dark" />
                <p className="mt-3 text-sm font-medium text-foreground">{a.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/explore?view=activities" variant="secondary">
            See all activities <Pi name="pi-arrow-right" className="text-base" />
          </ButtonLink>
        </div>
      </Section>

      {/* Featured tours */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Popular journeys"
            title="Featured Safari Tours"
            description="Hand-crafted itineraries you can book online, on WhatsApp, or by email."
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.slice(0, 3).map((t, i) => (
            <Reveal key={t.slug} delay={i * 90}>
              <TourCard tour={t} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/explore?view=tours">
            Browse all tours <Pi name="pi-arrow-right" className="text-base" />
          </ButtonLink>
        </div>
      </Section>

      {/* Why Indlulamithi */}
      <Section muted>
        <Reveal>
          <SectionHeading eyebrow="Why Indlulamithi" title="Travel that gives back" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                  <Icon name={p.icon} className="text-xl text-gold-dark" />
                </div>
                <h3 className="mt-4 text-lg text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Guides */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Meet the team"
            title="Expert Local Guides"
            description="Born and raised in the wild places we explore — your guides are the heart of every safari."
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.name} delay={i * 90}>
              <div className="text-center">
                <Photo src={g.image} alt={g.name} className="mx-auto aspect-square w-40 rounded-full" />
                <h3 className="mt-4 text-lg text-foreground">{g.name}</h3>
                <p className="text-sm font-medium text-gold-dark">{g.role}</p>
                <p className="mt-2 text-sm text-ink-soft">{g.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section muted>
        <Reveal>
          <SectionHeading eyebrow="Guest stories" title="Loved by Travellers" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 90}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Blog */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="From the field" title="Safari Journal" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {blogPosts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark">
            Read the journal <Pi name="pi-arrow-right" className="text-base" />
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
