"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Photo } from "@/components/Photo";
import { Pi } from "@/components/Pi";
import { CheckAvailabilityModal } from "@/components/CheckAvailabilityModal";

export function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="relative isolate min-h-[calc(95svh-5rem)] overflow-hidden">
        <Photo
          src="/images/hero.jpeg"
          alt="African elephants at sunset on the savannah"
          className="absolute inset-0 h-full w-full"
          imgClassName="animate-kenburns"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <Container className="relative z-10 flex min-h-[calc(95svh-5rem)] flex-col items-center justify-center py-28 text-center text-white">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-gold-light sm:text-sm">
            Zimbabwe · Botswana · Namibia · Zambia
          </p>
          <h1 className="max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Discover the Wild Heart of Africa.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-lg italic text-white/90 sm:text-xl">
            Tailor-made safaris across Zimbabwe, Botswana, Namibia &amp; Zambia — led by
            expert local guides.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setShowModal(true)}
              className="bg-white text-neutral-900 hover:bg-gold hover:text-neutral-900"
            >
              <Pi name="pi-calendar" className="text-lg" />
              Check Availability
            </Button>
            <WhatsAppButton size="lg" />
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center text-white/80">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <Pi name="pi-chevron-down" className="animate-bob mt-1 text-lg" />
        </div>
      </section>

      <CheckAvailabilityModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
