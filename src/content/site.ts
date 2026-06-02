/** Misc marketing content: guides, testimonials, gallery, and the "why ATSZ" pillars. */

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
    image: "/images/guides/guide-1.jpg",
  },
  {
    name: "Wildlife Guide",
    role: "Walking Safari Specialist",
    bio: "A licensed walking guide and keen birder who turns every bush walk into a story about the wilderness around you.",
    image: "/images/guides/guide-2.jpg",
  },
  {
    name: "Cultural Guide",
    role: "Cultural & Heritage Guide",
    bio: "Connects guests with local communities and the living traditions that make this corner of Africa so special.",
    image: "/images/guides/guide-3.jpg",
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
      "ATSZ Safaris organised everything perfectly. Booking on WhatsApp was so easy and they answered every question within minutes.",
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
  icon: string; // lucide-react icon name
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

/** Gallery images (place files under /public/images/gallery). */
export const gallery: { src: string; alt: string }[] = [
  { src: "/images/gallery/elephants.jpg", alt: "Elephant herd at a waterhole" },
  { src: "/images/gallery/lion.jpg", alt: "Lion resting in golden light" },
  { src: "/images/gallery/victoria-falls.jpg", alt: "The spray of Victoria Falls" },
  { src: "/images/gallery/mokoro.jpg", alt: "Mokoro gliding through the Okavango Delta" },
  { src: "/images/gallery/dunes.jpg", alt: "Red dunes of Sossusvlei at sunrise" },
  { src: "/images/gallery/giraffe.jpg", alt: "Giraffe against an acacia skyline" },
  { src: "/images/gallery/sunset-cruise.jpg", alt: "Sunset cruise on the Zambezi" },
  { src: "/images/gallery/leopard.jpg", alt: "Leopard in a tree at dusk" },
];
