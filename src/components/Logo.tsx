"use client";

import { useId } from "react";
import { LogoMark } from "@/components/LogoMark";

/**
 * Brand logo — renders the Indlulamithi Safaris & Tours emblem (drawn in
 * `LogoMark`). Size it via `className` height, e.g. `h-14`.
 */
export function Logo({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return <LogoMark idPrefix={uid} className={className} />;
}
