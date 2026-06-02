/** Simple in-repo blog content. Swap to a CMS later if needed. */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author: string;
  image: string;
  /** Markdown-ish body rendered as paragraphs (split on blank lines). */
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-visit-hwange",
    title: "The Best Time to Visit Hwange National Park",
    excerpt:
      "When the rains retreat, the elephants gather. Here's how to time your Hwange safari for the very best game viewing.",
    date: "2026-05-12",
    author: "ATSZ Safaris",
    image: "/images/blog/hwange.jpg",
    body: `Hwange is Zimbabwe's largest national park and home to one of Africa's biggest elephant populations.

The dry season — roughly July to October — is prime time. As natural water dries up, wildlife concentrates around pumped waterholes, making sightings reliable and spectacular.

If you prefer lush landscapes and birding, the green season (November to April) rewards patient travellers with dramatic skies and newborn animals.

Whenever you visit, our guides know exactly where to be at the right time of day. Ask us to tailor an itinerary around the season that suits you.`,
  },
  {
    slug: "victoria-falls-beyond-the-falls",
    title: "Victoria Falls: Beyond the Falls",
    excerpt:
      "The Falls are just the beginning. Discover the adventures, cruises and culture that make this one of Africa's great destinations.",
    date: "2026-04-28",
    author: "ATSZ Safaris",
    image: "/images/blog/victoria-falls.jpg",
    body: `Most travellers come for the thundering curtain of water — and it never disappoints.

But Victoria Falls is also a hub of adventure: white-water rafting, helicopter flights, bungee jumping and sunset cruises on the Zambezi.

Add a cultural village visit and a Hwange game drive, and you have a perfectly balanced short safari.

Talk to us about combining the icons into one seamless trip.`,
  },
  {
    slug: "why-walking-safaris",
    title: "Why a Walking Safari Changes Everything",
    excerpt:
      "There's no substitute for experiencing the bush on foot. Here's what makes a walking safari unforgettable.",
    date: "2026-04-02",
    author: "ATSZ Safaris",
    image: "/images/blog/walking-safari.jpg",
    body: `On foot, the bush reveals itself differently. You notice tracks, scents and the small details a vehicle rushes past.

Zambia's South Luangwa is the spiritual home of the walking safari, with guides trained to read the wilderness and keep you safe.

It's immersive, humbling and utterly memorable.

If you're ready to slow down and connect with Africa, a walking safari is the way to do it.`,
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
