"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pi } from "@/components/Pi";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { tours } from "@/content/tours";

type Step = "tour" | "dates" | "guests" | "done";

export function CheckAvailabilityModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("tour");
  const [selectedTour, setSelectedTour] = useState<string>("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  // key-based remount when open toggles resets all state
  const resetKey = open ? "open" : "closed";

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const next = () => {
    if (step === "tour") setStep("dates");
    else if (step === "dates") setStep("guests");
    else if (step === "guests") setStep("done");
  };

  const back = () => {
    if (step === "dates") setStep("tour");
    else if (step === "guests") setStep("dates");
    else if (step === "done") setStep("guests");
  };

  const handleViewTour = () => {
    if (selectedTour) {
      onClose();
      router.push(`/tours/${selectedTour}`);
    }
  };

  if (!open) return null;

  const selectedTourData = tours.find((t) => t.slug === selectedTour);

  return (
    <div
      key={resetKey}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step !== "tour" && (
              <button
                type="button"
                onClick={back}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-muted hover:text-foreground transition-colors"
              >
                <Pi name="pi-arrow-left" className="text-lg" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-foreground">Check Availability</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-muted hover:text-foreground transition-colors"
          >
            <Pi name="pi-times" className="text-lg" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="mt-5 flex items-center gap-2">
          {(["tour", "dates", "guests"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  step === s || (["dates", "guests"].includes(step) && ["dates", "guests"].includes(s))
                    ? "bg-gold text-neutral-900"
                    : "bg-muted text-ink-soft",
                )}
              >
                {i + 1}
              </div>
              {i < 2 && <div className={cn("h-px w-6", step !== "tour" ? "bg-gold" : "bg-line")} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="mt-6">
          {/* Step 1: Pick a tour */}
          {step === "tour" && (
            <div>
              <p className="text-sm text-ink-soft">Select a safari to check availability:</p>
              <div className="mt-3 max-h-60 space-y-2 overflow-y-auto">
                {tours.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => {
                      setSelectedTour(t.slug);
                      setTimeout(next, 200);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all",
                      selectedTour === t.slug
                        ? "border-gold bg-gold/5"
                        : "border-line hover:border-gold/50",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        selectedTour === t.slug ? "border-gold bg-gold" : "border-line",
                      )}
                    >
                      {selectedTour === t.slug && <Pi name="pi-check" className="text-xs text-neutral-900" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-ink-soft">{t.durationDays} days · {t.category}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <Button onClick={next} disabled={!selectedTour}>
                  Continue <Pi name="pi-arrow-right" className="text-sm" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Pick dates */}
          {step === "dates" && (
            <div>
              <p className="text-sm text-ink-soft">When would you like to go?</p>
              <div className="mt-3">
                <label className="block text-xs font-medium text-foreground mb-1.5">Preferred date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </div>
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" onClick={back}>
                  <Pi name="pi-arrow-left" className="text-sm" /> Back
                </Button>
                <Button onClick={next} disabled={!date}>
                  Continue <Pi name="pi-arrow-right" className="text-sm" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Guests */}
          {step === "guests" && (
            <div>
              <p className="text-sm text-ink-soft">How many guests?</p>
              <div className="mt-3">
                <label className="block text-xs font-medium text-foreground mb-1.5">Number of guests</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </div>
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" onClick={back}>
                  <Pi name="pi-arrow-left" className="text-sm" /> Back
                </Button>
                <Button onClick={next}>Check Availability</Button>
              </div>
            </div>
          )}

          {/* Step 4: Done */}
          {step === "done" && selectedTourData && (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                <Pi name="pi-check-circle" className="text-3xl text-gold-dark" />
              </div>
              <h3 className="mt-4 text-xl text-foreground">Ready to check!</h3>
              <div className="mt-4 rounded-xl bg-muted p-4 text-left text-sm">
                <p className="flex justify-between">
                  <span className="text-ink-soft">Tour:</span>
                  <span className="font-medium text-foreground">{selectedTourData.name}</span>
                </p>
                <p className="mt-2 flex justify-between">
                  <span className="text-ink-soft">Date:</span>
                  <span className="font-medium text-foreground">{date ? new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Flexible"}</span>
                </p>
                <p className="mt-2 flex justify-between">
                  <span className="text-ink-soft">Guests:</span>
                  <span className="font-medium text-foreground">{guests}</span>
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Button onClick={handleViewTour} className="w-full">
                  View Tour &amp; Book
                </Button>
                <Button variant="secondary" onClick={back} className="w-full">
                  Adjust details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
