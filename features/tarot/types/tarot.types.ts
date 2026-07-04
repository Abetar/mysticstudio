export type ReadingTopic =
  | "LOVE"
  | "MONEY"
  | "WORK"
  | "HEALTH"
  | "SPIRITUALITY"
  | "GENERAL";

export type ReadingPosition = "PAST" | "PRESENT" | "ADVICE";

export type TarotCardData = {
  id: string;
  name: string;
  slug: string;
  arcana: string;
  suit: string | null;
  number: number | null;
  imageUrl: string | null;
  generalMeaning: string;
  loveMeaning: string;
  workMeaning: string;
  moneyMeaning: string;
  healthMeaning: string;
  spiritualMeaning: string;
  reversedMeaning: string;
  symbolism: string;
  keywords: string[];
};

export type DrawnTarotCard = {
  card: TarotCardData;
  position: ReadingPosition;
  isReversed: boolean;
};

export type TarotReadingInput = {
  name?: string;
  birthDate?: string;
  zodiacSign?: string;
  topic: ReadingTopic;
  question?: string;
};

export type TarotReadingResult = {
  cards: DrawnTarotCard[];
  summary: string;
  advice: string;
};