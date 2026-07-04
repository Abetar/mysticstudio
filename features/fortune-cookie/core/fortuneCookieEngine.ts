import type {
  FortuneCategory,
  FortuneSeed,
  FortuneTone,
} from "../types/fortuneCookie.types";

const categories: FortuneCategory[] = [
  "love",
  "career",
  "money",
  "health",
  "spiritual",
  "general",
];

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export const fortuneCookieEngine = {
  generate(): FortuneSeed {
    const tone: FortuneTone =
      Math.random() < 0.5 ? "fortunate" : "challenging";

    return {
      tone,
      category: randomItem(categories),
    };
  },
};