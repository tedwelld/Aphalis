import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icon";
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
            <div
              key={a.slug}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-sm transition-shadow hover:shadow-md"
            >
              <Photo
                src={a.image}
                alt={a.name}
                className="absolute inset-0 h-full w-full"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow">
                <Icon name={a.icon} className="text-xl text-gold-dark" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h2 className="text-xl text-white">{a.name}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-white/85">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title="See an activity you love?" subtitle="Tell us what excites you and we'll build it into your perfect itinerary." />
    </>
  );
}
