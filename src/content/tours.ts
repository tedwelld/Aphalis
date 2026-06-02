/**
 * Tour landing-page content. Bokun is the source of truth for pricing and
 * availability — each tour maps its slug to a Bokun `experienceId` that drives
 * the calendar booking widget on the tour detail page. Replace the placeholder
 * IDs with real Bokun experience IDs once the channel is set up.
 */

export type Tour = {
  slug: string;
  name: string;
  destinationSlug: string;
  category: "Accommodated" | "Budget" | "Child Friendly" | "Classic" | "Group" | "Nature Walk";
  durationDays: number;
  summary: string;
  description: string;
  highlights: string[];
  priceFrom?: string; // display-only; Bokun holds the real price
  image: string;
  /** Bokun experience id — drives the calendar booking widget. */
  bokunExperienceId?: string;
};

export const tours: Tour[] = [
  {
    slug: "victoria-falls-classic",
    name: "Victoria Falls Classic Discovery",
    destinationSlug: "zimbabwe",
    category: "Classic",
    durationDays: 3,
    summary: "Guided tour of the Falls, a sunset Zambezi cruise and a Hwange game drive.",
    description:
      "Our signature short safari: tour the mighty Victoria Falls with a knowledgeable guide, cruise the Zambezi as the sun sets, and head into Hwange National Park in search of elephant, lion and wild dog. The perfect introduction to the region.",
    highlights: ["Guided Falls tour", "Sunset Zambezi cruise", "Hwange game drive", "All transfers"],
    priceFrom: "$ on request",
    image: "/images/tours/victoria-falls-classic.jpg",
  },
  {
    slug: "okavango-delta-explorer",
    name: "Okavango Delta Explorer",
    destinationSlug: "botswana",
    category: "Accommodated",
    durationDays: 4,
    summary: "Mokoro safaris and game viewing in the heart of the Okavango.",
    description:
      "Venture deep into the Okavango Delta for an immersive water-and-land safari. Glide between islands by mokoro, walk with your guide, and enjoy classic game drives in one of Africa's most pristine ecosystems.",
    highlights: ["Mokoro excursions", "Walking safari", "Delta game drives", "Bush camp"],
    priceFrom: "$ on request",
    image: "/images/tours/okavango-delta-explorer.jpg",
  },
  {
    slug: "chobe-river-safari",
    name: "Chobe River Safari",
    destinationSlug: "botswana",
    category: "Group",
    durationDays: 2,
    summary: "Big-game river cruises and drives in elephant country.",
    description:
      "Chobe National Park hosts one of Africa's largest elephant populations. Cruise the river at golden hour and take morning game drives along the floodplains teeming with wildlife.",
    highlights: ["Chobe river cruise", "Floodplain game drive", "Birdlife", "Sundowners"],
    priceFrom: "$ on request",
    image: "/images/tours/chobe-river-safari.jpg",
  },
  {
    slug: "sossusvlei-dunes-adventure",
    name: "Sossusvlei Dunes Adventure",
    destinationSlug: "namibia",
    category: "Nature Walk",
    durationDays: 5,
    summary: "Climb the world's tallest dunes and explore Deadvlei.",
    description:
      "Witness sunrise over the towering red dunes of Sossusvlei, walk the surreal white pan of Deadvlei, and search for desert-adapted wildlife. A photographer's dream across Namibia's iconic desert landscapes.",
    highlights: ["Dune climbing", "Deadvlei walk", "Desert wildlife", "Stargazing"],
    priceFrom: "$ on request",
    image: "/images/tours/sossusvlei-dunes-adventure.jpg",
  },
  {
    slug: "south-luangwa-walking-safari",
    name: "South Luangwa Walking Safari",
    destinationSlug: "zambia",
    category: "Nature Walk",
    durationDays: 4,
    summary: "Experience Africa on foot in the home of the walking safari.",
    description:
      "South Luangwa is where the walking safari was born. Track game on foot with Zambia's renowned guides, enjoy classic drives, and immerse yourself in one of the continent's wildest valleys.",
    highlights: ["Guided walking safaris", "Game drives", "Expert local guides", "Riverside camp"],
    priceFrom: "$ on request",
    image: "/images/tours/south-luangwa-walking-safari.jpg",
  },
  {
    slug: "family-falls-adventure",
    name: "Family Falls Adventure",
    destinationSlug: "zimbabwe",
    category: "Child Friendly",
    durationDays: 3,
    summary: "A relaxed, child-friendly safari around Victoria Falls.",
    description:
      "Designed for families, this gentle itinerary combines a guided Falls tour, an easy river cruise and a half-day game drive — with plenty of flexibility and comfortable accommodation.",
    highlights: ["Family-paced itinerary", "Falls tour", "Easy river cruise", "Half-day game drive"],
    priceFrom: "$ on request",
    image: "/images/tours/family-falls-adventure.jpg",
  },
];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
export const getToursByDestination = (destinationSlug: string) =>
  tours.filter((t) => t.destinationSlug === destinationSlug);
