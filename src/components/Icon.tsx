import {
  Binoculars, Ship, Footprints, Waves, Home, Plane, Bike, Utensils, Trees,
  MoveDown, Palette, Leaf, ShieldCheck, Award, Sparkles, HelpCircle,
  type LucideIcon,
} from "lucide-react";

/** Map content icon names (strings) to lucide components, with a safe fallback. */
const icons: Record<string, LucideIcon> = {
  Binoculars, Ship, Footprints, Waves, Home, Plane, Bike, Utensils, Trees,
  MoveDown, Palette, Leaf, ShieldCheck, Award, Sparkles,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? HelpCircle;
  return <Cmp className={className} />;
}
