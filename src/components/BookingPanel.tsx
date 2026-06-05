"use client";

import { useState } from "react";
import { Pi } from "@/components/Pi";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BookingModal } from "@/components/BookingModal";
import { siteConfig } from "@/lib/siteConfig";

type BookingPanelProps = {
  tourName: string;
  tourUrl: string;
  priceFrom?: string;
  bokunExperienceId?: string;
  durationDays: number;
  category: string;
};

export function BookingPanel({
  tourName,
  tourUrl,
  priceFrom,
  bokunExperienceId,
  durationDays,
  category,
}: BookingPanelProps) {
  const [showModal, setShowModal] = useState(false);

  const bookingDetails = { tourName, tourUrl };

  return (
    <>
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        {/* Price header */}
        <div className="border-b border-line bg-gradient-to-r from-gold/5 to-transparent p-6">
          <p className="text-xs uppercase tracking-wider text-ink-soft">From</p>
          <p className="text-3xl font-semibold text-foreground">{priceFrom ?? "On request"}</p>
          <p className="text-xs text-ink-soft">per person</p>
        </div>

        {/* Quick booking form */}
        <div className="p-6">
          {/* Check availability button — only if Bokun experience is linked */}
          {bokunExperienceId && (
            <Button className="w-full" size="lg" onClick={() => setShowModal(true)}>
              <Pi name="pi-calendar" className="text-lg" />
              Book now
            </Button>
          )}
        </div>

        {/* Trip info */}
        <div className="border-t border-line px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">Duration</span>
            <span className="font-medium text-foreground">{durationDays} days</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-ink-soft">Category</span>
            <span className="font-medium text-foreground">{category}</span>
          </div>
        </div>

        {/* WhatsApp / enquiry */}
        <div className="border-t border-line p-6">
          <p className="mb-3 text-xs text-ink-soft">Or book directly via:</p>
          <div className="flex flex-col gap-3">
            <WhatsAppButton details={bookingDetails} label="Book on WhatsApp" />
          </div>
        </div>
      </div>

      {showModal && (
        <BookingModal
          open={showModal}
          onClose={() => setShowModal(false)}
          productId={Number(bokunExperienceId)}
          title={tourName}
          pricingCategories={[]}
          startTimes={[]}
          currency={siteConfig.bokunDefaultCurrency ?? "USD"}
        />
      )}
    </>
  );
}
