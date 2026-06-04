import type { Metadata } from "next";
import { Pi } from "@/components/Pi";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/BookingForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Plan your safari with Indlulamithi Safaris & Tours. Send an enquiry, chat on WhatsApp, or email us — we reply fast.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Plan Your Safari"
        subtitle="Send an enquiry below, chat with us on WhatsApp, or email us directly — whatever suits you."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="gold-rule mb-5 block" />
            <h2 className="text-2xl text-foreground">Talk to a safari specialist</h2>
            <p className="mt-3 text-ink-soft">
              We&apos;re happy to help you build the perfect trip. Reach us however
              you prefer — we usually reply within a few hours.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Pi name="pi-map-marker" className="text-xl text-gold-dark" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Visit us</p>
                  <p className="text-sm text-ink-soft">{siteConfig.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Pi name="pi-phone" className="text-xl text-gold-dark" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Call</p>
                  <a href={`tel:${siteConfig.phoneDisplay.replace(/\s/g, "")}`} className="text-sm text-ink-soft hover:text-gold-dark">
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Pi name="pi-envelope" className="text-xl text-gold-dark" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm text-ink-soft hover:text-gold-dark">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <WhatsAppButton />
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl text-foreground">Send an enquiry</h2>
            <BookingForm />
          </div>
        </div>
      </Section>
    </>
  );
}
