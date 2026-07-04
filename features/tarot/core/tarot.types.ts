export type TarotArcana = "MAJOR" | "MINOR";

export type TarotSuit = "WANDS" | "CUPS" | "SWORDS" | "PENTACLES";

export type TarotCardOrientation = "UPRIGHT" | "REVERSED";

export type TarotReadingPosition = "PAST" | "PRESENT" | "ADVICE";

export type TarotCard = {
  id: string;
  name: string;
  slug: string;
  imageSrc: string;
  arcana: TarotArcana;
  suit?: TarotSuit;
  number?: number;
};

export type DrawnTarotCard = {
  card: TarotCard;
  orientation: TarotCardOrientation;
  position: TarotReadingPosition;
};

export type TarotDrawOptions = {
  count?: number;
  allowReversed?: boolean;
};

export type ThreeCardTarotReading = {
  cards: DrawnTarotCard[];
};