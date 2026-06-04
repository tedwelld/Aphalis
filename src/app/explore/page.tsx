import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { ExploreView, type ExploreTab } from "./ExploreView";

export const metadata: Metadata = {
  title: "Explore Safaris",
  description:
    "Browse our safari destinations, activities and tours across Zimbabwe, Botswana, Namibia and Zambia — all in one place. Book online, on WhatsApp, or by email.",
};

const valid: ExploreTab[] = ["destinations", "activities", "tours"];

/** Combined Destinations / Activities / Tours page. `?view=` preselects a tab. */
export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const initialTab: ExploreTab = valid.includes(view as ExploreTab)
    ? (view as ExploreTab)
    : "destinations";

  return (
    <>
      <PageHeader
        title="Explore Our Safaris"
        subtitle="Destinations, activities and tours — all in one place. Pick a view to begin."
      />
      {/* key remounts the view when the ?view= query changes so the right tab shows */}
      <ExploreView key={initialTab} initialTab={initialTab} />
      <CtaBand />
    </>
  );
}
