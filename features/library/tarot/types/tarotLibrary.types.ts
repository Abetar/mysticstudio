export type TarotSuit =
  | "major"
  | "wands"
  | "cups"
  | "swords"
  | "pentacles";

export interface TarotLibraryCard {
  slug: string;

  name: string;

  image: string;

  suit: TarotSuit;

  arcana: "major" | "minor";

  number?: number;

  summary: string;

  keywords: string[];

  generalMeaning: string;

  loveMeaning: string;

  workMeaning: string;

  moneyMeaning: string;

  healthMeaning: string;

  spiritualityMeaning: string;

  reversedMeaning: string;

  symbolism: string;

  history?: string;

  curiosities?: string[];

  relatedCards?: string[];
}