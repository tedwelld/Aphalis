/**
 * Central brand + contact configuration for ATSZ Safaris.
 *
 * Values prefixed with NEXT_PUBLIC_ are read from the environment so they can be
 * set per-deployment on Vercel without code changes. The literals below are
 * sensible PLACEHOLDERS — replace them (or set the env vars) with ATSZ's real
 * Bokun channel UUID, WhatsApp number, and contact details before launch.
 */

export const siteConfig = {
  name: "ATSZ Safaris",
  tagline: "Ethical African safaris, crafted by expert local guides.",
  description:
    "ATSZ Safaris offers unforgettable, ethical safari experiences across Zimbabwe, Botswana, Namibia and Zambia — game drives, boat cruises, walking safaris and more. Book online, on WhatsApp, or by email.",
  url: "https://atszsafaris.com",
  locale: "en",

  // Contact (PLACEHOLDERS — replace with ATSZ's real details)
  email: "bookings@atszsafaris.com",
  phoneDisplay: "+263 77 000 0000",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "263770000000", // E.164, digits only
  address: "Victoria Falls, Zimbabwe",

  // Bokun
  bokunChannelUUID:
    process.env.NEXT_PUBLIC_BOKUN_CHANNEL_UUID ??
    "00000000-0000-0000-0000-000000000000",

  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Activities", href: "/activities" },
    { label: "Tours", href: "/tours" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
