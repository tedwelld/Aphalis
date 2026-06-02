/** Activity categories shown as a grid (mirrors the reference site). */

export type Activity = {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
};

export const activities: Activity[] = [
  { slug: "game-drive", name: "Game Drive", description: "Open-vehicle drives in search of the Big Five with expert trackers.", icon: "Binoculars" },
  { slug: "boat-cruise", name: "Boat Cruise", description: "Sunset cruises on the Zambezi and Chobe rivers.", icon: "Ship" },
  { slug: "bush-walk", name: "Bush Walk", description: "Guided walking safaris that bring the wilderness to life on foot.", icon: "Footprints" },
  { slug: "mokoro-excursion", name: "Mokoro Excursion", description: "Glide silently through the Okavango Delta by traditional canoe.", icon: "Waves" },
  { slug: "cultural-village", name: "Cultural Village", description: "Meet local communities and experience living traditions.", icon: "Home" },
  { slug: "white-water-rafting", name: "White Water Rafting", description: "Take on the legendary rapids below Victoria Falls.", icon: "Waves" },
  { slug: "helicopter-flight", name: "Helicopter Flight", description: "Soar above the Falls for the 'Flight of Angels'.", icon: "Plane" },
  { slug: "quad-biking", name: "Quad Biking", description: "Explore the bush and riverine trails on quad bikes.", icon: "Bike" },
  { slug: "boma-dinner", name: "Boma Dinner", description: "Traditional open-air feasts under the African stars.", icon: "Utensils" },
  { slug: "national-park", name: "National Park", description: "Full-day excursions into the region's iconic parks.", icon: "Trees" },
  { slug: "bungee-jumping", name: "Bungee Jumping", description: "Leap from the Victoria Falls Bridge — 111 metres of thrill.", icon: "MoveDown" },
  { slug: "rock-painting", name: "Rock Painting", description: "Discover ancient San rock art in the Matobo Hills.", icon: "Palette" },
];
