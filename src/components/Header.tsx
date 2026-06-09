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
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* Logo — far left */}
        <Link href="/">
          <Logo className="h-10 sm:h-14" />
        </Link>

        {/* Nav center */}
        <nav className="hidden items-center gap-7 lg:flex">
          {[...siteConfig.navLeft, ...siteConfig.navRight].map((item) => (
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

        {/* Right: cart + theme */}
        <div className="flex items-center gap-5">
          <CartButton onClick={() => setCartOpen(true)} />
          <ThemeToggle />
        </div>
      </Container>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
