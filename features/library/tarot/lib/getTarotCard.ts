import { tarotLibrary } from "../data/tarotLibrary";

export function getTarotCard(slug: string) {
  return tarotLibrary.find((card) => card.slug === slug) ?? null;
}

export function getAllTarotCards() {
  return tarotLibrary;
}