import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

type WidgetType = "calendar" | "list";

/**
 * Renders a Bokun booking widget. The global loader script (added once in
 * layout.tsx) scans the page for `.bokunWidget` elements and replaces them with
 * the live booking iframe + floating cart.
 *
 * - calendar: a single experience's availability calendar (tour detail pages)
 * - list: a curated product list (tours index / destination pages)
 *
 * Docs: https://docs.bokun.io/en/articles/351-how-to-embed-a-booking-widget
 */
export function BokunWidget({
  type,
  bokunId,
  className,
}: {
  type: WidgetType;
  bokunId?: string;
  className?: string;
}) {
  const uuid = siteConfig.bokunChannelUUID;
  const placeholder = !bokunId || !uuid || uuid.startsWith("00000000");

  if (placeholder) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-dashed border-line bg-muted p-8 text-center text-ink-soft",
          className,
        )}
      >
        <p className="font-medium text-foreground">Online booking widget</p>
        <p className="mt-2 text-sm">
          The Bókun booking widget will appear here once the channel UUID and
          experience ID are configured. In the meantime, please book via WhatsApp
          or the enquiry form.
        </p>
      </div>
    );
  }

  const path =
    type === "calendar"
      ? `experience-calendar/${bokunId}`
      : `experience-list/${bokunId}`;
  const dataSrc = `https://widgets.bokun.io/online-sales/${uuid}/${path}`;

  return (
    <div className={className}>
      <div className="bokunWidget" data-src={dataSrc} />
      <noscript>Please enable JavaScript in your browser to book.</noscript>
    </div>
  );
}
