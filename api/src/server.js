import express from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.API_PORT || 3001);

app.use(cors());

const destinations = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    nights: 6,
    priceUsd: 1840,
    rating: 4.9,
    season: "Cherry blossom · Mar–Apr",
    summary:
      "Temple mornings, tea houses in Gion and a slow ride through the Arashiyama bamboo grove.",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    nights: 5,
    priceUsd: 1210,
    rating: 4.7,
    season: "Warm and dry · May–Sep",
    summary:
      "Tiled facades, tram 28 to Alfama and pastel de nata straight out of the oven.",
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    nights: 8,
    priceUsd: 2460,
    rating: 4.8,
    season: "Alpine summer · Dec–Feb",
    summary:
      "Lake Wakatipu sunrises, Routeburn day hikes and a scenic detour to Milford Sound.",
  },
  {
    id: "marrakesh",
    name: "Marrakesh",
    country: "Morocco",
    nights: 4,
    priceUsd: 980,
    rating: 4.6,
    season: "Mild desert air · Oct–Apr",
    summary:
      "Souk bargaining, riad courtyards and an overnight camp in the Agafay desert.",
  },
  {
    id: "reykjavik",
    name: "Reykjavík",
    country: "Iceland",
    nights: 5,
    priceUsd: 1695,
    rating: 4.8,
    season: "Aurora window · Sep–Mar",
    summary:
      "Golden Circle geysers, black sand beaches and northern lights from a quiet farm road.",
  },
  {
    id: "oaxaca",
    name: "Oaxaca",
    country: "Mexico",
    nights: 6,
    priceUsd: 1130,
    rating: 4.7,
    season: "Festival season · Oct–Nov",
    summary:
      "Mercado breakfasts, mezcal tastings in the valleys and Monte Albán at golden hour.",
  },
];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", isAlloy: process.env.IS_ALLOY === "true" });
});

app.get("/api/destinations", (_req, res) => {
  res.json({ destinations });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`traveldemo api listening on http://localhost:${PORT}`);
});
