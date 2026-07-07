import { TAROT_DECK } from "@/features/tarot/core/tarotDeck";
import type { TarotLibraryCard, TarotSuit } from "../types/tarotLibrary.types";
import { tarotMeanings } from "./tarotMeanings";

function normalizeSuit(arcana: string, suit?: string | null): TarotSuit {
  if (arcana === "MAJOR") return "major";

  switch (suit) {
    case "WANDS":
      return "wands";
    case "CUPS":
      return "cups";
    case "SWORDS":
      return "swords";
    case "PENTACLES":
      return "pentacles";
    default:
      return "major";
  }
}

function toSeoSlug(slug: string) {
  return slug.replaceAll("_", "-");
}

function getFallbackText(cardName: string) {
  return `La carta ${cardName} forma parte del tarot y representa una energía simbólica que puede interpretarse según la pregunta, el contexto y las cartas que la acompañan.`;
}

export const tarotLibrary: TarotLibraryCard[] = TAROT_DECK.map((card) => {
  const meaning = tarotMeanings[card.id];
  const fallback = getFallbackText(card.name);

  return {
    slug: toSeoSlug(card.slug),
    name: card.name,
    image: card.imageSrc,
    suit: normalizeSuit(card.arcana, card.suit),
    arcana: card.arcana === "MAJOR" ? "major" : "minor",
    number: card.number,

    summary: meaning?.summary ?? fallback,
    keywords: meaning?.keywords ?? [card.name.toLowerCase(), "tarot", "significado"],

    generalMeaning: meaning?.generalMeaning ?? fallback,
    loveMeaning: meaning?.loveMeaning ?? fallback,
    workMeaning: meaning?.workMeaning ?? fallback,
    moneyMeaning: meaning?.moneyMeaning ?? fallback,
    healthMeaning: meaning?.healthMeaning ?? fallback,
    spiritualityMeaning: meaning?.spiritualityMeaning ?? fallback,
    reversedMeaning: meaning?.reversedMeaning ?? fallback,
    symbolism: meaning?.symbolism ?? fallback,
  };
});