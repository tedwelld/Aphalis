import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Photo } from "@/components/Photo";
import { demoPhoto } from "@/lib/img";
import { Icon } from "@/components/Icon";
import { TestimonialCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { guides, pillars, testimonials } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Indlulamithi Safaris & Tours crafts ethical, expertly-guided safaris across Southern Africa. Meet our guides and discover what drives us.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Indlulamithi Safaris & Tours"
        subtitle="Ethical, expertly-guided safaris crafted by people who call this wilderness home."
        image="/images/walk.jpeg"
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Photo src={demoPhoto("safari,guide,binoculars", 3, 1000, 800)} alt="Safari guide scanning the horizon" className="aspect-[4/3] rounded-2xl" />
          <div>
            <span className="gold-rule mb-5 block" />
            <h2 className="text-3xl text-foreground">Our story</h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Indlulamithi Safaris & Tours was founded on a simple belief: that travel should give
              back to the land and people who make it unforgettable. We design
              low-impact safaris that put expert local guides, authentic encounters
              and conservation at the centre of every journey.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              From the thundering spray of Victoria Falls to the silent channels of
              the Okavango Delta, we handle every detail so you can focus on the
              wild. Book however suits you — online, on WhatsApp, or by email.
            </p>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="What we stand for" title="Our values" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                <Icon name={p.icon} className="h-5 w-5 text-gold-dark" />
              </div>
              <h3 className="mt-4 text-lg text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Meet the team" title="Expert Local Guides" />
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

      <Section muted>
        <SectionHeading eyebrow="Guest stories" title="Loved by Travellers" />
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} testimonial={t} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
