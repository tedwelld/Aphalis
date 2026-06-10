/**
 * Central brand + contact configuration for Indlulamithi Safaris & Tours.
 *
 * Values prefixed with NEXT_PUBLIC_ are read from the environment so they can be
 * set per-deployment on Vercel without code changes. The literals below are
 * sensible PLACEHOLDERS — replace them (or set the env vars) with the company's
 * real Bokun channel UUID, WhatsApp number, and contact details before launch.
 */

export const siteConfig = {
  name: "Indlulamithi Safaris & Tours",
  shortName: "Indlulamithi",
  tagline: "Explore the wild — ethical African safaris, crafted by expert local guides.",
  description:
    "Indlulamithi Safaris & Tours offers unforgettable, ethical safari experiences across Zimbabwe, Botswana, Namibia and Zambia — game drives, boat cruises, walking safaris and more. Book online, on WhatsApp, or by email.",
  url: "https://www.indlulamithisafaris.com",
  locale: "en",

  // Contact (PLACEHOLDERS — replace with the company's real details)
  email: "bookings@indlulamithisafaris.com",
  phoneDisplay: "+263 78 927 6807",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "263789276807", // E.164, digits only (+263 78 927 6807)
  address: "Victoria Falls, Zimbabwe",

  // Bokun
  bokunChannelUUID:
    process.env.NEXT_PUBLIC_BOKUN_CHANNEL_UUID ??
    "00000000-0000-0000-0000-000000000000",
  /** Bokun product-list id for the "featured / most sold" section. */
  bokunFeaturedListId: process.env.NEXT_PUBLIC_BOKUN_FEATURED_LIST_ID ?? "",
  /** Default currency for Bokun API pricing queries. */
  bokunDefaultCurrency: process.env.NEXT_PUBLIC_BOKUN_DEFAULT_CURRENCY ?? "USD",

  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  // Header is split around the centered logo.
  navLeft: [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Gallery", href: "/gallery" },
  ],
  navRight: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
