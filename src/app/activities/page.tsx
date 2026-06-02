import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icon";
import { Card } from "@/components/ui/Card";
import { Photo } from "@/components/Photo";
import { CtaBand } from "@/components/CtaBand";
import { activities } from "@/content/activities";

export const metadata: Metadata = {
  title: "Safari Activities",
  description:
    "Game drives, boat cruises, walking safaris, mokoro excursions and more — explore the activities that make an Africa Jungle Safaris experience unforgettable.",
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
            <Card key={a.slug} className="flex flex-col">
              <div className="relative">
                <Photo src={a.image} alt={a.name} className="aspect-[16/10]" />
                <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow">
                  <Icon name={a.icon} className="h-5 w-5 text-gold-dark" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-xl text-foreground">{a.name}</h2>
                <p className="mt-2 text-sm text-ink-soft">{a.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <CtaBand title="See an activity you love?" subtitle="Tell us what excites you and we'll build it into your perfect itinerary." />
    </>
  );
}
