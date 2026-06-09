import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/indlulamitihilogo.png"
      alt="Indlulamithi Safaris & Tours"
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
