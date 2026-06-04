import { Pi } from "@/components/Pi";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/** Final call-to-action band offering all three booking channels. */
export function CtaBand({
  title = "Ready to plan your safari?",
  subtitle = "Book online instantly, chat with us on WhatsApp, or send an enquiry — whatever suits you best.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-cream to-muted py-20">
      <Container className="text-center">
        <span className="gold-rule mx-auto mb-6 block" />
        <h2 className="text-3xl sm:text-4xl text-foreground">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/explore?view=tours">Browse &amp; book online</ButtonLink>
          <WhatsAppButton variant="whatsapp" />
          <ButtonLink href="/contact" variant="secondary">
            <Pi name="pi-envelope" className="text-base" /> Email enquiry
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
