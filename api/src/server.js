import express from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.API_PORT || 3001);

app.use(cors());

const brand = {
  name: "Verdway",
  tagline: "Luxury glamping and guided wild escapes",
  phone: "+(123) 456-789",
  email: "hello@verdway.example",
  hours: "Mon – Sat · 08:00 to 20:00",
  address: "42 Pinefold Road, Cedar Valley",
};

const services = [
  {
    id: "forest-haven",
    title: "Forest Haven Domes",
    blurb: "Glass-fronted domes tucked into old cedar stands, warm all winter.",
    image: "/images/forest-retreat.jpg",
  },
  {
    id: "riverbend",
    title: "Riverbend Canvas Suites",
    blurb: "Canvas suites on a slow river bend, with a private deck each.",
    image: "/images/glamping-tent.jpg",
  },
  {
    id: "ridge-cabin",
    title: "Ridge Line Cabins",
    blurb: "Timber cabins above the treeline, built for long cold sunrises.",
    image: "/images/snow-mountain.jpg",
  },
  {
    id: "lakeside",
    title: "Lakeside Retreats",
    blurb: "Water's-edge lodges with a wood-fired sauna and a rowboat.",
    image: "/images/alpine-lake.jpg",
  },
];

const journeyHighlights = [
  {
    id: "luxury-stays",
    title: "Local Expertise on Every Route",
    blurb:
      "Travel with people who understand the terrain, weather and communities firsthand.",
  },
  {
    id: "low-impact",
    title: "Built to Leave No Trace",
    blurb:
      "Solar power, greywater recovery and sites that pack down without a scar.",
  },
];

const stats = [
  { id: "destinations", label: "Wild destinations", value: 48, suffix: "+" },
  { id: "activities", label: "Guided activities", value: 120, suffix: "+" },
  { id: "support", label: "Guest support", value: 24, suffix: "/7" },
  { id: "guides", label: "Resident guides", value: 36, suffix: "+" },
  { id: "seasons", label: "Seasons running", value: 12, suffix: "+" },
];

const reasons = [
  {
    id: "fireside",
    title: "Local Knowledge",
    blurb:
      "Every route is shaped with people who know the landscape and its stories firsthand.",
  },
  {
    id: "wild-luxury",
    title: "Responsible Routes",
    blurb:
      "We choose quieter paths and local partners to reduce pressure on fragile places.",
  },
  {
    id: "small-groups",
    title: "Never More Than Twelve",
    blurb:
      "Group sizes stay small so the trail stays quiet and the pace stays yours.",
  },
  {
    id: "planning",
    title: "Planned Around You",
    blurb:
      "Tell us what you want from the week and we build the itinerary backwards from it.",
  },
];

const trips = [
  {
    id: "cedar-valley",
    category: "Adventure",
    name: "Cedar Valley Crossing",
    location: "Cedar Valley, Highlands",
    duration: "4 days · 3 nights",
    minAge: 10,
    priceUsd: 1240,
    excerpt:
      "Two high passes, one glacial lake and a sunrise trail above the valley.",
    image: "/images/nepal-mountain-village.jpg",
  },
  {
    id: "salt-flats",
    category: "Luxury",
    name: "Salt Flat Nights",
    location: "Aruna Basin, Altiplano",
    duration: "5 days · 4 nights",
    minAge: 12,
    priceUsd: 1890,
    excerpt:
      "Mirror-flat horizons by day, one of the darkest night skies on record after.",
    image: "/images/himalayan-peaks.jpg",
  },
  {
    id: "monsoon-coast",
    category: "Romance",
    name: "Monsoon Coast Retreat",
    location: "Halvik Coast, Western Isles",
    duration: "3 days · 2 nights",
    minAge: 14,
    priceUsd: 960,
    excerpt:
      "Sea cliffs, quiet coastal paths and dinner cooked over an open fire.",
    image: "/images/mountain-lake.jpg",
  },
  {
    id: "riverlands",
    category: "Wildlife",
    name: "Riverlands Expedition",
    location: "Oxbow Riverlands, Interior",
    duration: "4 days · 3 nights",
    minAge: 10,
    priceUsd: 1385,
    excerpt:
      "Dawn paddles through flooded forest with a naturalist reading the banks.",
    image: "/images/forest-retreat.jpg",
  },
];

const showcase = {
  heading: "Trips built where comfort and wilderness actually overlap",
  blurb:
    "We spend the off-season walking routes and testing sites, so the week you book is one we already know by heart.",
  happyGuests: 250,
  rating: 4.8,
  ratingScale: 5,
  image: "/images/valley-panorama.jpg",
  tags: [
    "Himalayan Routes",
    "Guided Trekking",
    "Dark Sky Walks",
    "Wildlife Watching",
    "Coastal Retreats",
    "Short Guided Journeys",
  ],
};

const whatWeDo = {
  image: "/images/alpine-ridge.jpg",
  checklist: [
    "Wilderness that still feels genuinely wild.",
    "Thoughtful pacing that never dulls the adventure.",
    "Weeks designed to be remembered, not survived.",
  ],
  cards: [
    {
      id: "family",
      title: "Family & Group Escapes",
      blurb:
        "Sites and routes that work when the group spans three generations.",
    },
    {
      id: "romance",
      title: "Two-Person Retreats",
      blurb: "Quiet corners, late breakfasts and no fixed schedule at all.",
    },
    {
      id: "eco",
      title: "Low-Impact Travel",
      blurb: "Journeys that leave each place in better shape than we found it.",
    },
  ],
};

const plans = [
  {
    id: "weekend",
    name: "Weekend Escape",
    blurb: "Two nights under canvas, breakfast outdoors and trail access.",
    priceUsd: 199,
    period: "2 nights",
    featured: false,
    includes: [
      "Canvas suite with full bedding",
      "Outdoor breakfast each morning",
      "Marked trail access from camp",
    ],
  },
  {
    id: "explorer",
    name: "Adventure Explorer",
    blurb: "Three nights with a resident guide and two led activities daily.",
    priceUsd: 349,
    period: "3 nights",
    featured: true,
    includes: [
      "Everything in Weekend Escape",
      "Two guided activities per day",
      "Shared fireside kitchen dinners",
    ],
  },
  {
    id: "retreat",
    name: "Luxury Retreat",
    blurb: "Five nights in a private dome with a chef and full transfers.",
    priceUsd: 599,
    period: "5 nights",
    featured: false,
    includes: [
      "Private dome with wood-fired sauna",
      "Resident chef and full board",
      "Return transfers from the nearest city",
    ],
  },
];

const guarantees = [
  "Hold a date with no deposit",
  "No booking or card fees",
  "Free changes up to 14 days out",
];

const testimonials = [
  {
    id: "t1",
    quote:
      "We expected to be roughing it and instead had the best sleep of the year. The guides read the weather better than any forecast and moved our route twice without fuss.",
    name: "Amara Osei",
    role: "Booked Cedar Valley Crossing",
  },
  {
    id: "t2",
    quote:
      "Three of us, three very different fitness levels, and somehow nobody felt held back or dragged along. That takes real planning rather than luck.",
    name: "Tomas Brandt",
    role: "Booked Riverlands Expedition",
  },
  {
    id: "t3",
    quote:
      "The salt flats at night are the only thing I have seen that photographs worse than it looks. Worth the long drive and then some.",
    name: "Priya Raman",
    role: "Booked Salt Flat Nights",
  },
  {
    id: "t4",
    quote:
      "Quiet, unhurried, and nobody trying to fill every hour with an activity. We came back rested, which almost never happens on a trip.",
    name: "Elena Marchetti",
    role: "Booked Monsoon Coast Retreat",
  },
];

const reviewSummary = { count: 2000, rating: 5 };

const posts = [
  {
    id: "p1",
    category: "Sustainability",
    date: "2026-03-04",
    title: "What low-impact travel actually takes",
    excerpt:
      "A plain breakdown of transport, water, waste and responsible remote travel.",
    image: "/images/wilderness-camp.jpg",
  },
  {
    id: "p2",
    category: "History",
    date: "2026-02-18",
    title: "How mountain journeys became more accessible",
    excerpt: "How outdoor shelter got comfortable without getting heavier.",
    image: "/images/glamping-tent.jpg",
  },
  {
    id: "p3",
    category: "Slow Travel",
    date: "2026-01-29",
    title: "Four days offline is the whole point",
    excerpt:
      "Why we stopped apologising for patchy signal on our most remote routes.",
    image: "/images/mountain-lake.jpg",
  },
];

const footerLinks = {
  quick: ["Home", "About", "Trips", "Journal", "Contact"],
  sites: [
    "Forest Haven Domes",
    "Riverbend Canvas Suites",
    "Ridge Line Cabins",
    "Lakeside Retreats",
    "Dark Sky Camps",
  ],
};

const about = {
  eyebrow: "About us",
  heading: "Wild places, planned properly, without the rough edges",
  blurb:
    "We run a small number of routes and know each one in every season. That is the whole business model, and it is why the journeys work.",
  yearsBadge: 12,
  badgeLabel: "Years guiding wild places",
  checklist: [
    "Itineraries shaped around your pace",
    "Guides who live where they lead",
    "Escapes that hold up years later",
  ],
  quote: "Go far. Sleep well. Leave nothing.",
  image: "/images/nepal-mountain-village.jpg",
  secondaryImage: "/images/alpine-lake.jpg",
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", isAlloy: process.env.IS_ALLOY === "true" });
});

// Kept for backwards compatibility with the original demo page.
app.get("/api/destinations", (_req, res) => {
  res.json({ destinations: trips });
});

app.get("/api/content", (_req, res) => {
  res.json({
    brand,
    about,
    services,
    journeyHighlights,
    stats,
    reasons,
    trips,
    showcase,
    whatWeDo,
    plans,
    guarantees,
    testimonials,
    reviewSummary,
    posts,
    footerLinks,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`verdway api listening on http://localhost:${PORT}`);
});
