import type {
  DrawnTarotCard,
  ReadingPosition,
  TarotCardData,
} from "../types/tarot.types";

const POSITIONS: ReadingPosition[] = ["PAST", "PRESENT", "ADVICE"];

export function shuffleDeck<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export function drawThreeCards(cards: TarotCardData[]): DrawnTarotCard[] {
  const shuffled = shuffleDeck(cards);

  return shuffled.slice(0, 3).map((card, index) => ({
    card,
    position: POSITIONS[index],
    isReversed: Math.random() < 0.28,
  }));
}