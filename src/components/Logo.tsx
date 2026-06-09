import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/indlulamitihilogo.png"
      alt="Indlulamithi Safaris & Tours"
      className={cn("object-contain", className)}
    />
  );
}
