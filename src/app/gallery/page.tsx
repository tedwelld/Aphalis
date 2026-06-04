import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/Photo";
import { CtaBand } from "@/components/CtaBand";
import { gallery } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from the wild — photography from Indlulamithi Safaris & Tours journeys across Southern Africa.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" subtitle="Moments from the wild, captured on our journeys." />
      <Section>
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {gallery.map((img, i) => (
            <Photo
              key={i}
              src={img.src}
              alt={img.alt}
              className={`w-full rounded-xl ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
            />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
