import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icon";
import { CtaBand } from "@/components/CtaBand";
import { activities } from "@/content/activities";

export const metadata: Metadata = {
  title: "Safari Activities",
  description:
    "Game drives, boat cruises, walking safaris, mokoro excursions and more — explore the activities that make an ATSZ safari unforgettable.",
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Safari Activities"
        subtitle="Every way to experience the wild — choose the adventures that move you."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a) => (
            <div key={a.slug} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Icon name={a.icon} className="h-6 w-6 text-gold-dark" />
              </div>
              <h2 className="mt-4 text-xl text-foreground">{a.name}</h2>
              <p className="mt-2 text-sm text-ink-soft">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title="See an activity you love?" subtitle="Tell us what excites you and we'll build it into your perfect itinerary." />
    </>
  );
}
