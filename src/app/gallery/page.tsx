import { readdirSync, existsSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { GalleryView } from "./GalleryView";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from the wild — photography from Indlulamithi Safaris & Tours journeys across Southern Africa.",
};

type GalleryItem = { src: string; alt: string; category: string };

function loadGallery(): GalleryItem[] {
  const dir = join(process.cwd(), "public", "insider");
  if (!existsSync(dir)) return [];

  const items: GalleryItem[] = [];
  const folders = readdirSync(dir, { withFileTypes: true });

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;
    const folderPath = join(dir, folder.name);
    const files = readdirSync(folderPath);

    for (const file of files) {
      if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;
      items.push({
        src: `/insider/${encodeURIComponent(folder.name)}/${encodeURIComponent(file)}`,
        alt: file.replace(/\.(jpe?g|png|webp|avif)$/i, "").replace(/[_-]/g, " "),
        category: folder.name,
      });
    }
  }

  return items;
}

export default function GalleryPage() {
  const gallery = loadGallery();

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Moments from the wild, captured on our journeys."
        image="/images/Sunset.jpeg"
      />
      <GalleryView gallery={gallery} />
      <CtaBand />
    </>
  );
}
