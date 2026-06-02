/** Misc marketing content: guides, testimonials, gallery, and the "why ATSZ" pillars. */

import { demoPhoto } from "@/lib/img";

export type Guide = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const guides: Guide[] = [
  {
    name: "Lead Guide", // PLACEHOLDER — replace with real ATSZ guide
    role: "Senior Safari Guide",
    bio: "Born and raised in the region, our senior guide brings over a decade of tracking experience and a deep passion for conservation.",
    image: demoPhoto("portrait,man,african", 401, 600, 600),
  },
  {
    name: "Wildlife Guide",
    role: "Walking Safari Specialist",
    bio: "A licensed walking guide and keen birder who turns every bush walk into a story about the wilderness around you.",
    image: demoPhoto("portrait,safari,guide", 402, 600, 600),
  },
  {
    name: "Cultural Guide",
    role: "Cultural & Heritage Guide",
    bio: "Connects guests with local communities and the living traditions that make this corner of Africa so special.",
    image: demoPhoto("portrait,woman,african", 403, 600, 600),
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  location: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "An absolutely flawless safari from start to finish. Our guide's knowledge was extraordinary and we felt safe and cared for the entire trip.",
    author: "Sarah & James",
    location: "United Kingdom",
    rating: 5,
  },
  {
    quote:
      "Africa Jungle Safaris organised everything perfectly. Booking on WhatsApp was so easy and they answered every question within minutes.",
    author: "Michael R.",
    location: "United States",
    rating: 5,
  },
  {
    quote:
      "The Okavango by mokoro was the experience of a lifetime. Ethical, professional and genuinely warm people.",
    author: "Lena K.",
    location: "Germany",
    rating: 5,
  },
];

export type Pillar = {
  title: string;
  description: string;
  icon: string; // content icon name (mapped to PrimeIcons in components/Icon.tsx)
};

export const pillars: Pillar[] = [
  {
    title: "Ethical Travel",
    description: "Low-impact safaris that support conservation and local communities.",
    icon: "Leaf",
  },
  {
    title: "Safety First",
    description: "Experienced, licensed guides and well-maintained vehicles on every trip.",
    icon: "ShieldCheck",
  },
  {
    title: "Expert Local Guides",
    description: "Born-and-raised guides who know the land, wildlife and people intimately.",
    icon: "Award",
  },
  {
    title: "Tailor-Made",
    description: "Every itinerary is shaped around you — book online, on WhatsApp or by email.",
    icon: "Sparkles",
  },
];

/** Gallery images (demo imagery from loremFlickr — swap for ATSZ photos later). */
export const gallery: { src: string; alt: string }[] = [
  { src: demoPhoto("elephant,waterhole", 501, 800, 1000), alt: "Elephant herd at a waterhole" },
  { src: demoPhoto("lion,africa", 502, 800, 800), alt: "Lion resting in golden light" },
  { src: demoPhoto("victoria-falls", 503, 800, 800), alt: "The spray of Victoria Falls" },
  { src: demoPhoto("okavango,mokoro", 504, 800, 1000), alt: "Mokoro gliding through the Okavango Delta" },
  { src: demoPhoto("sossusvlei,dune", 505, 800, 800), alt: "Red dunes of Sossusvlei at sunrise" },
  { src: demoPhoto("giraffe,acacia", 506, 800, 800), alt: "Giraffe against an acacia skyline" },
  { src: demoPhoto("zambezi,sunset,cruise", 507, 800, 1000), alt: "Sunset cruise on the Zambezi" },
  { src: demoPhoto("leopard,tree", 508, 800, 800), alt: "Leopard in a tree at dusk" },
];
