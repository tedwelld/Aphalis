"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Brand logo. Renders the Africa Jungle Safaris badge from
 * `/public/images/logo.png`. If that file isn't present yet, it falls back to a
 * styled text wordmark so the header/footer never break.
 *
 * Drop the shared logo image at `public/images/logo.png` to activate it.
 */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/logo.png"
        alt={siteConfig.name}
        onError={() => setFailed(true)}
        className={cn("w-auto object-contain", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "font-serif text-lg font-semibold tracking-tight sm:text-xl",
        variant === "light" ? "text-white" : "text-foreground",
      )}
    >
      Africa Jungle <span className="text-gold-dark">Safaris</span>
    </span>
  );
}
