/**
 * Destination marketing content. Tours/prices/availability come from Bokun —
 * `bokunProductListId` points at a curated Bokun product-list widget for the
 * region. Set these IDs once ATSZ's Bokun channel is configured.
 */

import { demoPhoto } from "@/lib/img";

export type Destination = {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string; // path under /public/images/destinations or remote URL
  /** Bokun product-list (experience-list) id for this destination, optional */
  bokunProductListId?: string;
};

export const destinations: Destination[] = [
  {
    slug: "zimbabwe",
    name: "Zimbabwe",
    country: "Zimbabwe",
    tagline: "Home of Victoria Falls & Hwange's great herds",
    description:
      "From the thundering spray of Victoria Falls to the elephant-rich plains of Hwange National Park, Zimbabwe is the beating heart of our safaris. Walk with expert guides, cruise the Zambezi at sunset, and witness one of Africa's last great wildernesses.",
    highlights: ["Victoria Falls", "Hwange National Park", "Zambezi River", "Matobo Hills"],
    image: demoPhoto("victoria-falls,zimbabwe", 101, 1200, 900),
  },
  {
    slug: "botswana",
    name: "Botswana",
    country: "Botswana",
    tagline: "Okavango Delta & the wilds of Chobe",
    description:
      "Glide through the channels of the Okavango Delta by mokoro and track big game along the Chobe River, where elephants gather in their thousands. Botswana delivers low-impact, high-reward safaris in pristine wilderness.",
    highlights: ["Okavango Delta", "Chobe National Park", "Mokoro excursions", "Big cats"],
    image: demoPhoto("okavango,delta,botswana", 102, 1200, 900),
  },
  {
    slug: "namibia",
    name: "Namibia",
    country: "Namibia",
    tagline: "Towering dunes & desert-adapted wildlife",
    description:
      "Climb the world's tallest dunes at Sossusvlei, explore the haunting beauty of the Skeleton Coast, and search for desert elephants and rhino in Damaraland. Namibia is raw, vast and unforgettable.",
    highlights: ["Sossusvlei dunes", "Etosha National Park", "Skeleton Coast", "Damaraland"],
    image: demoPhoto("namibia,desert,dunes", 103, 1200, 900),
  },
  {
    slug: "zambia",
    name: "Zambia",
    country: "Zambia",
    tagline: "The birthplace of the walking safari",
    description:
      "Zambia's South Luangwa and Lower Zambezi are legendary for walking safaris and exceptional guiding. Experience Africa on foot, by canoe and on classic game drives, away from the crowds.",
    highlights: ["South Luangwa", "Lower Zambezi", "Walking safaris", "Canoe safaris"],
    image: demoPhoto("zambia,safari,river", 104, 1200, 900),
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);
