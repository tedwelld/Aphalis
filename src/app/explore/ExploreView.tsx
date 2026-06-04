"use client";

import { useState } from "react";
import { Pi } from "@/components/Pi";
import { Section } from "@/components/ui/Section";
import { DestinationCard, TourCard } from "@/components/cards";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { BokunWidget } from "@/components/BokunWidget";
import { destinations } from "@/content/destinations";
import { activities } from "@/content/activities";
import { tours } from "@/content/tours";
import { cn } from "@/lib/cn";

export type ExploreTab = "destinations" | "activities" | "tours";

const tabs: { key: ExploreTab; label: string; icon: string; blurb: string }[] = [
  {
    key: "destinations",
    label: "Destinations",
    icon: "pi-map-marker",
    blurb: "Four extraordinary countries, endless wild horizons. Where will your story begin?",
  },
  {
    key: "activities",
    label: "Activities",
    icon: "pi-compass",
    blurb: "Every way to experience the wild — choose the adventures that move you.",
  },
  {
    key: "tours",
    label: "Tours",
    icon: "pi-ticket",
    blurb: "Hand-crafted itineraries you can book online, on WhatsApp, or by email.",
  },
];

/**
 * Combined Destinations / Activities / Tours view. A dropdown wraps the three
 * former pages — selecting an option swaps the section shown below.
 */
export function ExploreView({ initialTab }: { initialTab: ExploreTab }) {
  const [tab, setTab] = useState<ExploreTab>(initialTab);
  const [open, setOpen] = useState(false);
  const current = tabs.find((t) => t.key === tab)!;

  return (
    <Section>
      {/* Dropdown selector */}
      <div className="mb-12 flex flex-col items-center text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">Explore</p>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="flex items-center gap-3 rounded-full border border-line bg-white px-6 py-3 text-lg font-medium text-foreground shadow-sm transition-colors hover:border-gold"
          >
            <Pi name={current.icon} className="text-gold-dark" />
            {current.label}
            <Pi name="pi-chevron-down" className={cn("text-sm transition-transform", open && "rotate-180")} />
          </button>

          {open && (
            <>
              {/* click-away backdrop */}
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden="true" />
              <ul
                role="listbox"
                className="absolute left-1/2 z-20 mt-2 w-60 -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-white p-1.5 text-left shadow-lg"
              >
                {tabs.map((t) => (
                  <li key={t.key} role="option" aria-selected={t.key === tab}>
                    <button
                      type="button"
                      onClick={() => {
                        setTab(t.key);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-muted",
                        t.key === tab && "bg-muted",
                      )}
                    >
                      <Pi name={t.icon} className="text-gold-dark" />
                      <span className="font-medium text-foreground">{t.label}</span>
                      {t.key === tab && <Pi name="pi-check" className="ml-auto text-gold-dark" />}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <p className="mt-5 max-w-xl text-ink-soft">{current.blurb}</p>
        <span className="gold-rule mt-5" />
      </div>

      {/* Sections */}
      {tab === "destinations" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      )}

      {tab === "activities" && (
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
      )}

      {tab === "tours" && (
        <div className="space-y-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
          <div className="rounded-2xl bg-muted p-6 sm:p-10">
            <h3 className="text-center text-2xl text-foreground">Book Online Instantly</h3>
            <p className="mx-auto mt-2 mb-6 max-w-xl text-center text-ink-soft">
              Check real-time availability and secure your spot through our trusted booking partner.
            </p>
            <BokunWidget type="list" />
          </div>
        </div>
      )}
    </Section>
  );
}
