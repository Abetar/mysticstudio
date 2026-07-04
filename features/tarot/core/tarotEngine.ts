import { THREE_CARD_POSITIONS } from "./tarotConstants";
import { TAROT_DECK } from "./tarotDeck";
import type {
  DrawnTarotCard,
  TarotCard,
  TarotCardOrientation,
  TarotDrawOptions,
} from "./tarot.types";

function shuffleCards(cards: TarotCard[]): TarotCard[] {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function getRandomOrientation(allowReversed: boolean): TarotCardOrientation {
  if (!allowReversed) return "UPRIGHT";

  return Math.random() < 0.28 ? "REVERSED" : "UPRIGHT";
}

export const tarotEngine = {
  getDeck(): TarotCard[] {
    return [...TAROT_DECK];
  },

  shuffle(cards: TarotCard[] = TAROT_DECK): TarotCard[] {
    return shuffleCards(cards);
  },

  draw(options: TarotDrawOptions = {}): DrawnTarotCard[] {
    const { count = 3, allowReversed = true } = options;

    const shuffled = shuffleCards(TAROT_DECK);

    return shuffled.slice(0, count).map((card, index) => ({
      card,
      orientation: getRandomOrientation(allowReversed),
      position: THREE_CARD_POSITIONS[index] ?? "ADVICE",
    }));
  },

  drawThree(options: Omit<TarotDrawOptions, "count"> = {}): DrawnTarotCard[] {
    return this.draw({
      ...options,
      count: 3,
    });
  },
};