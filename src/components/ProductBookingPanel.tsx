"use client";

import { useState } from "react";
import { Pi } from "@/components/Pi";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BookingModal } from "@/components/BookingModal";

type Props = {
  productId: number;
  title: string;
  priceFrom?: string;
  currency: string;
  durationText?: string;
  availabilities: any[];
  pricingCategories: { id: number; title: string; price: number }[];
  startTimes: string[];
};

export function ProductBookingPanel({
  productId,
  title,
  priceFrom,
  currency,
  durationText,
  availabilities,
  pricingCategories,
  startTimes,
}: Props) {
  const [guests, setGuests] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const selectedDate = availabilities.find((a: any) => !a.soldOut);
  const defaultPrice = selectedDate?.defaultPrice?.amount;
  const displayPrice = priceFrom ?? (defaultPrice ? `${defaultPrice}` : undefined);

  return (
    <>
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="border-b border-line bg-gradient-to-r from-gold/5 to-transparent p-6">
          <p className="text-xs uppercase tracking-wider text-ink-soft">From</p>
          <p className="text-3xl font-semibold text-foreground">
            {displayPrice ? `${displayPrice} ${currency}` : "On request"}
          </p>
          <p className="text-xs text-ink-soft">per person</p>
        </div>

        <div className="p-6 space-y-4">
          {durationText && (
            <div className="flex items-center gap-2 text-sm text-ink-soft">
              <Pi name="pi-clock" className="text-gold-dark" />
              {durationText}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-soft">
              Guests
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-foreground hover:bg-muted transition-colors"
              >
                <Pi name="pi-minus" className="text-sm" />
              </button>
              <span className="w-8 text-center text-lg font-semibold text-foreground">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(Math.min(20, guests + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-foreground hover:bg-muted transition-colors"
              >
                <Pi name="pi-plus" className="text-sm" />
              </button>
            </div>
          </div>

          {pricingCategories.length > 0 && displayPrice && (
            <div className="rounded-xl bg-muted p-4">
              <p className="text-sm font-medium text-foreground">Price breakdown</p>
              {pricingCategories.map((pc) => (
                <div key={pc.id} className="mt-2 flex justify-between text-sm">
                  <span className="text-ink-soft">{pc.title}</span>
                  <span className="text-foreground">{pc.price} {currency}</span>
                </div>
              ))}
              <div className="mt-3 flex justify-between border-t border-line pt-3 text-sm font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-gold-dark">
                  {guests > 0 && pricingCategories.length > 0 && pricingCategories[0].price
                    ? `${guests * pricingCategories[0].price} ${currency}`
                    : "—"}
                </span>
              </div>
            </div>
          )}

          <Button className="w-full" size="lg" onClick={() => setShowModal(true)}>
            <Pi name="pi-calendar" className="text-lg" />
            Book now
          </Button>
        </div>

        <div className="border-t border-line p-6">
          <p className="mb-3 text-xs text-ink-soft">Book directly via:</p>
          <WhatsAppButton details={{ tourName: title }} label="Book on WhatsApp" />
        </div>
      </div>

      <BookingModal
        open={showModal}
        onClose={() => setShowModal(false)}
        productId={productId}
        title={title}
        pricingCategories={pricingCategories}
        startTimes={startTimes}
        currency={currency}
      />
    </>
  );
}
