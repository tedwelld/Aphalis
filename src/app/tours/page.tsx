import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TourCard } from "@/components/cards";
import { BokunWidget } from "@/components/BokunWidget";
import { CtaBand } from "@/components/CtaBand";
import { tours } from "@/content/tours";

export const metadata: Metadata = {
  title: "Safari Tours",
  description:
    "Browse and book ATSZ Safari tours across Zimbabwe, Botswana, Namibia and Zambia — online, on WhatsApp, or by email.",
};

export default function ToursPage() {
  return (
    <>
      <PageHeader
        title="Safari Tours"
        subtitle="Hand-crafted itineraries you can book online, on WhatsApp, or by email."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </Section>

      {/* Live availability straight from Bokun */}
      <Section muted>
        <SectionHeading
          eyebrow="Live availability"
          title="Book Online Instantly"
          description="Check real-time availability and secure your spot through our trusted booking partner."
        />
        {/* Set a curated Bokun product-list id here to show all bookable experiences. */}
        <BokunWidget type="list" />
      </Section>

      <CtaBand />
    </>
  );
}
