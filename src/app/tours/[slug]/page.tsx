import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pi } from "@/components/Pi";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";
import { BokunWidget } from "@/components/BokunWidget";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BookingForm } from "@/components/BookingForm";
import { ButtonLink } from "@/components/ui/Button";
import { tours, getTour } from "@/content/tours";
import { getDestination } from "@/content/destinations";
import { siteConfig } from "@/lib/siteConfig";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};
  return { title: t.name, description: t.summary };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const destination = getDestination(tour.destinationSlug);
  const tourUrl = `${siteConfig.url}/tours/${tour.slug}`;
  const bookingDetails = { tourName: tour.name, tourUrl };

  return (
    <>
      <PageHeader title={tour.name} subtitle={tour.summary} image={tour.image} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: details */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{tour.category}</Badge>
              <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
                <Pi name="pi-clock" className="text-base text-gold-dark" /> {tour.durationDays} days
              </span>
              {destination && (
                <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
                  <Pi name="pi-map-marker" className="text-base text-gold-dark" /> {destination.name}
                </span>
              )}
            </div>

            <span className="gold-rule mb-5 mt-6 block" />
            <h2 className="text-3xl text-foreground">Overview</h2>
            <p className="mt-4 text-ink-soft leading-relaxed">{tour.description}</p>

            <h3 className="mt-8 text-xl text-foreground">Highlights</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {tour.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                  <Pi name="pi-check" className="text-sm text-gold-dark" /> {h}
                </li>
              ))}
            </ul>

            {/* Email booking flow */}
            <div className="mt-12">
              <h3 className="text-xl text-foreground">Enquire by email</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Prefer email? Send us the details and we&apos;ll get straight back to you.
              </p>
              <div className="mt-5">
                <BookingForm tourName={tour.name} />
              </div>
            </div>
          </div>

          {/* Right: sticky booking panel */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <p className="text-sm text-ink-soft">From</p>
              <p className="text-2xl font-semibold text-foreground">{tour.priceFrom ?? "On request"}</p>

              <div className="mt-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                  Book & pay online
                </h3>
                <BokunWidget type="calendar" bokunId={tour.bokunExperienceId} />
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <p className="mb-3 text-sm text-ink-soft">Or book directly:</p>
                <div className="flex flex-col gap-3">
                  <WhatsAppButton details={bookingDetails} label="Book on WhatsApp" />
                  <ButtonLink href="#" variant="secondary" className="w-full">
                    See enquiry form below
                  </ButtonLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
