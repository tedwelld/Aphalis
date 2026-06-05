"use client";

import { useState, useEffect, useCallback } from "react";
import { Pi } from "@/components/Pi";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/siteConfig";

type PricingCategory = { id: number; title: string; price: number };
type AvailabilitySlot = {
  id: string;
  date: number;
  startTime?: string;
  availabilityCount: number;
  soldOut: boolean;
  pricesByRate: {
    pricePerCategoryUnit?: { id: number; amount: { amount: number } }[];
    pricePerBooking?: { amount: number };
  }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  productId: number;
  title: string;
  pricingCategories: PricingCategory[];
  startTimes: string[];
  currency: string;
};

type Step = "dates" | "times" | "guests" | "details" | "confirm" | "done";



export function BookingModal({
  open,
  onClose,
  productId,
  title,
  pricingCategories,
  startTimes,
  currency,
}: Props) {
  const [step, setStep] = useState<Step>("dates");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState<Record<number, number>>({});
  const [customer, setCustomer] = useState({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const [availabilities, setAvailabilities] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ reference: string; status: string } | null>(null);

  const resetKey = open ? "open" : "closed";

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const sixMonthsOut = new Date(today.getTime() + 180 * 86400000).toISOString().slice(0, 10);

  const fetchAvailability = useCallback(async (date: string) => {
    setLoading(true);
    setError("");
    try {
      const endDate = new Date(new Date(date).getTime() + 7 * 86400000).toISOString().slice(0, 10);
      const res = await fetch(
        `/api/bokun/activity.json/${productId}/availabilities?start=${date}&end=${endDate}&currency=${siteConfig.bokunDefaultCurrency}`,
      );
      if (!res.ok) throw new Error("Failed to fetch availability");
      const data = await res.json();
      setAvailabilities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const availableDates = availabilities.filter((a) => !a.soldOut && a.availabilityCount > 0);
  const slotsForDate = availableDates.filter(
    (a) => new Date(a.date * 1000).toISOString().slice(0, 10) === selectedDate,
  );
  const uniqueTimes = [...new Set(slotsForDate.map((s) => s.startTime).filter((t): t is string => !!t))].sort();

  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0);
  const baseTotal = Object.entries(guests).reduce((sum, [catId, count]) => {
    const cat = pricingCategories.find((c) => c.id === Number(catId));
    return sum + (cat?.price ?? 0) * count;
  }, 0);

  const initGuests = () => {
    const init: Record<number, number> = {};
    pricingCategories.forEach((pc) => {
      init[pc.id] = 0;
    });
    if (pricingCategories.length > 0) init[pricingCategories[0].id] = 1;
    setGuests(init);
  };

  const reset = () => {
    setStep("dates");
    setSelectedDate("");
    setSelectedTime("");
    setAvailabilities([]);
    setError("");
    setBookingResult(null);
    initGuests();
  };

  const next = () => {
    if (step === "dates") setStep(startTimes.length > 0 ? "times" : "guests");
    else if (step === "times") setStep("guests");
    else if (step === "guests") setStep("details");
    else if (step === "details") setStep("confirm");
  };

  const back = () => {
    if (step === "times") setStep("dates");
    else if (step === "guests") setStep(startTimes.length > 0 ? "times" : "dates");
    else if (step === "details") setStep("guests");
    else if (step === "confirm") setStep("details");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const participants = Object.entries(guests)
        .filter(([, count]) => count > 0)
        .map(([catId, count]) => ({
          pricingCategoryId: Number(catId),
          count,
        }));

      const res = await fetch("/api/bokun/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          date: selectedDate,
          startTime: selectedTime || undefined,
          participants,
          customer: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
          },
          notes: customer.notes || undefined,
          channelId: siteConfig.bokunChannelUUID || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Booking failed");
      }

      const data = await res.json();
      setBookingResult({ reference: data.reference, status: data.status });
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  const pickDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime("");
    fetchAvailability(dateStr);
    initGuests();
    setAvailabilities([]);
    next();
  };

  const stepIndicator = (
    <div className="flex items-center gap-2">
      {(["dates", "times", "guests", "details"] as Step[]).filter((s) => s !== "times" || startTimes.length > 0).map((s, i, arr) => {
        const currentIdx = arr.indexOf(step);
        const thisIdx = arr.indexOf(s);
        const isDone = currentIdx > thisIdx;
        const isCurrent = step === s;
        return (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                isDone || isCurrent ? "bg-gold text-neutral-900" : "bg-muted text-ink-soft",
              )}
            >
              {isDone ? <Pi name="pi-check" /> : i + 1}
            </div>
            {thisIdx < arr.length - 1 && (
              <div className={cn("h-px w-6", isDone || isCurrent ? "bg-gold" : "bg-line")} />
            )}
          </div>
        );
      })}
    </div>
  );

  if (!open) return null;

  return (
    <div
      key={resetKey}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step !== "dates" && step !== "done" && (
              <button type="button" onClick={back} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-muted hover:text-foreground transition-colors">
                <Pi name="pi-arrow-left" className="text-lg" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-foreground">
              {step === "done" ? "Booking confirmed!" : `Book: ${title}`}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-muted hover:text-foreground transition-colors">
            <Pi name="pi-times" className="text-lg" />
          </button>
        </div>

        {step !== "done" && <div className="mt-5">{stepIndicator}</div>}

        <div className="mt-6">
          {/* Step 1: Pick a date */}
          {step === "dates" && (
            <div>
              <p className="text-sm text-ink-soft">Select your preferred date:</p>
              <input
                type="date"
                min={todayStr}
                max={sixMonthsOut}
                value={selectedDate}
                onChange={(e) => pickDate(e.target.value)}
                className="mt-3 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </div>
            </div>
          )}

          {/* Step 2: Pick time slot */}
          {step === "times" && (
            <div>
              <p className="text-sm text-ink-soft">
                Available times for <span className="font-medium text-foreground">{new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>:
              </p>
              {loading ? (
                <p className="mt-4 text-sm text-ink-soft">Loading available times...</p>
              ) : uniqueTimes.length > 0 ? (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {uniqueTimes.map((t) => {
                    const slot = slotsForDate.find((s) => s.startTime === t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => { setSelectedTime(t); next(); }}
                        className={cn(
                          "rounded-xl border p-4 text-left transition-all",
                          selectedTime === t
                            ? "border-gold bg-gold/5"
                            : "border-line hover:border-gold/50",
                        )}
                      >
                        <p className="font-medium text-foreground">{t}</p>
                        <p className="text-xs text-ink-soft">{slot?.availabilityCount ?? 0} spots left</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 text-sm text-ink-soft">No times available for this date.</p>
              )}
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" onClick={back}><Pi name="pi-arrow-left" className="text-sm" /> Back</Button>
              </div>
            </div>
          )}

          {/* Step 3: Guests */}
          {step === "guests" && (
            <div>
              <p className="text-sm text-ink-soft">How many guests?</p>
              <div className="mt-4 space-y-4">
                {pricingCategories.map((pc) => (
                  <div key={pc.id} className="flex items-center justify-between rounded-xl border border-line p-4">
                    <div>
                      <p className="font-medium text-foreground">{pc.title}</p>
                      <p className="text-sm text-ink-soft">{pc.price} {currency} {pc.price > 0 && "per person"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => ({ ...g, [pc.id]: Math.max(0, (g[pc.id] ?? 0) - 1) }))}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-foreground hover:bg-muted transition-colors"
                      >
                        <Pi name="pi-minus" className="text-sm" />
                      </button>
                      <span className="w-6 text-center font-semibold text-foreground">{guests[pc.id] ?? 0}</span>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => ({ ...g, [pc.id]: Math.min(20, (g[pc.id] ?? 0) + 1) }))}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-foreground hover:bg-muted transition-colors"
                      >
                        <Pi name="pi-plus" className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {totalGuests > 0 && baseTotal > 0 && (
                <div className="mt-4 flex justify-between rounded-xl bg-muted p-4 text-sm font-semibold">
                  <span className="text-foreground">Estimated total</span>
                  <span className="text-gold-dark">{baseTotal} {currency}</span>
                </div>
              )}
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" onClick={back}><Pi name="pi-arrow-left" className="text-sm" /> Back</Button>
                <Button onClick={next} disabled={totalGuests === 0}>
                  Continue <Pi name="pi-arrow-right" className="text-sm" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Customer details */}
          {step === "details" && (
            <div>
              <p className="text-sm text-ink-soft">Your contact details:</p>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">First name</label>
                    <input
                      type="text"
                      value={customer.firstName}
                      onChange={(e) => setCustomer((c) => ({ ...c, firstName: e.target.value }))}
                      className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Last name</label>
                    <input
                      type="text"
                      value={customer.lastName}
                      onChange={(e) => setCustomer((c) => ({ ...c, lastName: e.target.value }))}
                      className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                    className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                    className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Notes (optional)</label>
                  <textarea
                    value={customer.notes}
                    onChange={(e) => setCustomer((c) => ({ ...c, notes: e.target.value }))}
                    rows={3}
                    className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 resize-none"
                  />
                </div>
              </div>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" onClick={back}><Pi name="pi-arrow-left" className="text-sm" /> Back</Button>
                <Button
                  onClick={next}
                  disabled={!customer.firstName || !customer.lastName || !customer.email || !customer.phone}
                >
                  Review <Pi name="pi-arrow-right" className="text-sm" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Confirm */}
          {step === "confirm" && (
            <div>
              <p className="text-sm text-ink-soft">Review your booking:</p>
              <div className="mt-4 rounded-xl border border-line p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Tour</span>
                  <span className="font-medium text-foreground">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Date</span>
                  <span className="font-medium text-foreground">
                    {new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Time</span>
                    <span className="font-medium text-foreground">{selectedTime}</span>
                  </div>
                )}
                {pricingCategories.filter((pc) => (guests[pc.id] ?? 0) > 0).map((pc) => (
                  <div key={pc.id} className="flex justify-between">
                    <span className="text-ink-soft">{pc.title} × {guests[pc.id]}</span>
                    <span className="text-foreground">{(pc.price * (guests[pc.id] ?? 0))} {currency}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-line pt-3 font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-gold-dark">{baseTotal} {currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Name</span>
                  <span className="text-foreground">{customer.firstName} {customer.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Email</span>
                  <span className="text-foreground">{customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Phone</span>
                  <span className="text-foreground">{customer.phone}</span>
                </div>
                {customer.notes && (
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Notes</span>
                    <span className="text-foreground text-right max-w-[200px]">{customer.notes}</span>
                  </div>
                )}
              </div>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" onClick={back}><Pi name="pi-arrow-left" className="text-sm" /> Back</Button>
                <Button onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Booking..." : "Confirm & book"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: Done */}
          {step === "done" && (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Pi name="pi-check-circle" className="text-3xl text-green-600" />
              </div>
              <h3 className="mt-4 text-xl text-foreground">Booking confirmed!</h3>
              {bookingResult && (
                <div className="mt-4 rounded-xl bg-muted p-4 text-left text-sm">
                  <p className="flex justify-between">
                    <span className="text-ink-soft">Reference</span>
                    <span className="font-medium text-foreground">{bookingResult.reference}</span>
                  </p>
                  <p className="mt-2 flex justify-between">
                    <span className="text-ink-soft">Status</span>
                    <span className="font-medium text-green-600">{bookingResult.status}</span>
                  </p>
                  <p className="mt-4 text-ink-soft">
                    We&apos;ll send a confirmation to <span className="font-medium text-foreground">{customer.email}</span>.
                  </p>
                </div>
              )}
              <div className="mt-6 flex flex-col gap-3">
                <Button onClick={onClose} className="w-full">Done</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
