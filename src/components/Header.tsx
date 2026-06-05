"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pi } from "@/components/Pi";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CartButton } from "@/components/CartButton";
import { CartModal } from "@/components/CartModal";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLink = (item: { label: string; href: string }) => (
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
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <Container className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left: nav (desktop) / menu button (mobile) */}
        <div className="flex items-center justify-start">
          <nav className="hidden items-center gap-7 lg:flex">
            {siteConfig.navLeft.map(navLink)}
          </nav>
          <button
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Pi name="pi-times" className="text-2xl" /> : <Pi name="pi-bars" className="text-2xl" />}
          </button>
        </div>

        {/* Center: logo */}
        <Link href="/" className="flex justify-center" onClick={() => setOpen(false)}>
          <Logo className="h-14 sm:h-16" />
        </Link>

        {/* Right: nav (desktop) + theme toggle (always) */}
        <div className="flex items-center justify-end gap-5">
          <nav className="hidden items-center gap-7 lg:flex">
            {siteConfig.navRight.map(navLink)}
          </nav>
          <CartButton onClick={() => setCartOpen(true)} />
          <ThemeToggle />
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
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
          </Container>
        </div>
      )}
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
