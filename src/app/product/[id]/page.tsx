import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pi } from "@/components/Pi";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Card";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ProductBookingPanel } from "@/components/ProductBookingPanel";
import { getProduct, getAvailabilities } from "@/lib/bokun";
import { siteConfig } from "@/lib/siteConfig";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProduct(Number(id));
    return { title: product.title, description: product.excerpt ?? product.summary };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  let product: Awaited<ReturnType<typeof getProduct>>;
  let availabilities: Awaited<ReturnType<typeof getAvailabilities>>;

  try {
    [product, availabilities] = await Promise.all([
      getProduct(productId),
      getAvailabilities(
        productId,
        new Date().toISOString().slice(0, 10),
        new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10),
        siteConfig.bokunDefaultCurrency,
      ),
    ]);
  } catch {
    notFound();
  }

  const priceRange = availabilities
    .flatMap((a: any) => a.pricesByRate ?? [])
    .flatMap((r: any) => r.pricePerCategoryUnit ?? [])
    .map((p: any) => p.amount?.amount)
    .filter(Boolean);
  const minPrice = priceRange.length ? Math.min(...priceRange) : null;
  const currency = availabilities[0]?.pricesByRate?.[0]?.pricePerCategoryUnit?.[0]?.amount?.currency ?? "USD";

  const photos = (product as any).photos?.length
    ? (product as any).photos.map((p: any) => ({ src: p.originalUrl, alt: product.title }))
    : (product as any).keyPhoto
      ? [{ src: (product as any).keyPhoto.originalUrl, alt: product.title }]
      : [];

  const pricingCategories: { id: number; title: string; price: number }[] =
    (product as any).pricingCategories?.map((pc: any) => {
      const priceInfo = availabilities
        .flatMap((a: any) => a.pricesByRate ?? [])
        .flatMap((r: any) => r.pricePerCategoryUnit ?? [])
        .find((p: any) => p.id === pc.id);
      return { id: pc.id, title: pc.title, price: priceInfo?.amount?.amount ?? 0 };
    }) ?? [];

  const durationText = (product as any).durationText;
  const meetingType = (product as any).meetingType === "MEET_ON_LOCATION" ? "Meet on location" : (product as any).meetingType ?? "N/A";

  const difficultyLabels: Record<string, string> = { EASY: "Easy", MODERATE: "Moderate", HARD: "Hard", CHALLENGING: "Challenging" };
  const difficulty = difficultyLabels[(product as any).difficultyLevel] ?? (product as any).difficultyLevel;

  const inclusions: string[] = (product as any).included ?? (product as any).inclusions ?? [];
  const exclusions: string[] = (product as any).excluded ?? (product as any).exclusions ?? [];

  const startTimes = [...new Set(availabilities.map((a: any) => a.startTime).filter(Boolean))].sort() as string[];

  return (
    <>
      <Section className="!py-0">
        <Container className="!max-w-none !px-0">
          <PhotoGallery images={photos.length ? photos : [{ src: "/images/demo/safari-jeep.jpg", alt: product.title }]} />
        </Container>
      </Section>

      <Section className="!pt-8">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{difficulty || "Activity"}</Badge>
            {durationText && (
              <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
                <Pi name="pi-clock" className="text-base text-gold-dark" /> {durationText}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
              <Pi name="pi-map-marker" className="text-base text-gold-dark" /> {meetingType}
            </span>
            {(product as any).reviewCount > 0 && (
              <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
                <Pi name="pi-star-fill" className="text-base text-gold-dark" /> {(product as any).reviewRating?.toFixed(1)} ({(product as any).reviewCount})
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl text-foreground">{product.title}</h1>
          {(product as any).excerpt && (
            <p className="mt-3 max-w-3xl text-lg text-ink-soft leading-relaxed">{(product as any).excerpt}</p>
          )}
        </Container>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {product.description && (
              <div>
                <span className="gold-rule mb-4 block" />
                <h2 className="text-2xl text-foreground">About this experience</h2>
                <div
                  className="mt-4 text-ink-soft leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {pricingCategories.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl text-foreground">Pricing</h3>
                <div className="mt-4 space-y-3">
                  {pricingCategories.map((pc) => (
                    <div key={pc.id} className="flex items-center justify-between rounded-xl border border-line bg-surface p-4">
                      <span className="font-medium text-foreground">{pc.title}</span>
                      <span className="text-lg font-semibold text-gold-dark">
                        {pc.price ? `${pc.price} ${currency}` : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {startTimes.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl text-foreground">Available start times</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {startTimes.map((t) => (
                    <span key={t} className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {inclusions.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl text-foreground">Included</h3>
                <ul className="mt-4 space-y-2">
                  {inclusions.map((inc: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                      <Pi name="pi-check-circle" className="mt-0.5 text-green-600 shrink-0" />
                      {typeof inc === "string" ? inc : inc.title ?? inc.description ?? String(inc)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exclusions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl text-foreground">Excluded</h3>
                <ul className="mt-4 space-y-2">
                  {exclusions.map((exc: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                      <Pi name="pi-minus-circle" className="mt-0.5 text-ink-soft shrink-0" />
                      {typeof exc === "string" ? exc : exc.title ?? exc.description ?? String(exc)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(product as any).knowBeforeYouGoItems?.length > 0 && (
              <div className="mt-10 rounded-xl border border-gold/30 bg-gold/5 p-6">
                <h3 className="flex items-center gap-2 text-lg text-foreground">
                  <Pi name="pi-info-circle" className="text-gold-dark" /> Know before you go
                </h3>
                <ul className="mt-3 space-y-2">
                  {(product as any).knowBeforeYouGoItems.map((item: any, i: number) => (
                    <li key={i} className="text-sm text-ink-soft">• {item.title ?? item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ProductBookingPanel
              productId={productId}
              title={product.title}
              priceFrom={minPrice ? `${minPrice}` : undefined}
              currency={currency}
              durationText={durationText}
              availabilities={availabilities}
              pricingCategories={pricingCategories}
              startTimes={startTimes}
            />
          </aside>
        </div>
      </Section>
    </>
  );
}
