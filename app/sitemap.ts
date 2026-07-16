import type { MetadataRoute } from "next";

import { TAROT_DECK } from "@/features/tarot/core/tarotDeck";

const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://mysticstudio.app"
).replace(/\/$/, "");

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: APP_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${APP_URL}/biblioteca`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/biblioteca/tarot`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const tarotPages: MetadataRoute.Sitemap = TAROT_DECK.map((card) => ({
    url: `${APP_URL}/biblioteca/tarot/${createSlug(card.name)}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...tarotPages];
}