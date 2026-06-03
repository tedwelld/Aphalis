import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Photo } from "@/components/Photo";
// use the site hero image from public/images

export function Hero() {
  return (
    <section className="relative isolate">
      <Photo
        src="/images/hero.jpeg"
        alt="African elephants at sunset on the savannah"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      {/* Light wash to keep text readable on the white-gold theme */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

      <Container className="flex min-h-[80vh] flex-col justify-center py-24 text-white">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold-light">
          Ethical African Safaris
        </p>
        <h1 className="max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Discover the wild heart of Africa
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/90">
          Tailor-made safaris across Zimbabwe, Botswana, Namibia and Zambia — led by
          expert local guides. Book online, on WhatsApp, or by email.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/tours" size="lg">
            Explore Tours
          </ButtonLink>
          <WhatsAppButton size="lg" />
        </div>
      </Container>
    </section>
  );
}
