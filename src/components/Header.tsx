"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pi } from "@/components/Pi";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Logo className="h-11" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium text-foreground transition-colors hover:text-gold-dark",
                isActive(item.href) &&
                  "text-gold-dark after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-gold",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton size="sm" label="WhatsApp" />
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Pi name="pi-times" className="text-2xl" /> : <Pi name="pi-bars" className="text-2xl" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted",
                  isActive(item.href) && "text-gold-dark",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 pt-3">
              <WhatsAppButton size="sm" label="Book on WhatsApp" />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
