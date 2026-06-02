import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { DestinationCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { destinations } from "@/content/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore safari destinations across Zimbabwe, Botswana, Namibia and Zambia with ATSZ Safaris.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        title="Safari Destinations"
        subtitle="Four extraordinary countries, endless wild horizons. Where will your story begin?"
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
