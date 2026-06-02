import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-serif text-xl font-semibold text-foreground">
            ATSZ <span className="text-gold-dark">Safaris</span>
          </span>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{siteConfig.tagline}</p>
          <div className="mt-5 flex gap-3">
            <SocialIcon href={siteConfig.socials.facebook} label="Facebook"><SocialGlyph name="facebook" /></SocialIcon>
            <SocialIcon href={siteConfig.socials.instagram} label="Instagram"><SocialGlyph name="instagram" /></SocialIcon>
            <SocialIcon href={siteConfig.socials.twitter} label="Twitter"><SocialGlyph name="twitter" /></SocialIcon>
            <SocialIcon href={siteConfig.socials.linkedin} label="LinkedIn"><SocialGlyph name="linkedin" /></SocialIcon>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-soft hover:text-gold-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-ink-soft">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-gold-dark" /> {siteConfig.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-dark" />
              <a href={`tel:${siteConfig.phoneDisplay.replace(/\s/g, "")}`} className="hover:text-gold-dark">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-dark" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-dark">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Ready to go?</h4>
          <p className="mt-4 text-sm text-ink-soft">Book online, on WhatsApp, or by email — we reply fast.</p>
          <div className="mt-4">
            <WhatsAppButton size="sm" />
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-soft sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Crafted with care in {siteConfig.address}.</p>
        </Container>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold hover:text-gold-dark"
    >
      {children}
    </a>
  );
}

/** Minimal inline brand glyphs (lucide-react dropped its brand icons). */
function SocialGlyph({ name }: { name: "facebook" | "instagram" | "twitter" | "linkedin" }) {
  const paths: Record<string, React.ReactNode> = {
    facebook: <path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.3-3H14v-1.5c0-.4.3-.5.5-.5H14V9Z" />,
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.4" cy="7.6" r="1" />
      </>
    ),
    twitter: <path d="M18.9 3h2.7l-5.9 6.8L22.6 21h-6l-4.2-5.5L7.6 21H4.9l6.3-7.2L4 3h6.1l3.8 5.1L18.9 3Zm-2.1 16.2h1.5L8.3 4.7H6.7l10.1 14.5Z" />,
    linkedin: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10.5V16M8 8.1v.01M11.5 16v-3c0-1.3 1-2.2 2.2-2.2s2.3.9 2.3 2.6V16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
