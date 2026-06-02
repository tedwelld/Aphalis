import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/Photo";
import { demoPhoto } from "@/lib/img";

/** Compact hero banner for inner pages. */
export function PageHeader({
  title,
  subtitle,
  image = demoPhoto("savannah,africa,landscape", 2, 1920, 800),
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate">
      <Photo src={image} alt="" className="absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 to-black/30" />
      <Container className="py-20 text-white sm:py-28">
        <span className="gold-rule mb-5 block" />
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>}
      </Container>
    </section>
  );
}
