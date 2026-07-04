export type MysticDiscipline = "TAROT" | "RUNES" | "ASTROLOGY" | "NUMEROLOGY" | "I_CHING" | "RITUALS";

export type MysticTopic =
  | "LOVE"
  | "MONEY"
  | "WORK"
  | "HEALTH"
  | "SPIRITUALITY"
  | "GENERAL";

export type MysticPosition = "PAST" | "PRESENT" | "ADVICE";

export type NarrativeTone =
  | "CLASSIC"
  | "POETIC"
  | "DIRECT"
  | "PSYCHOLOGICAL"
  | "ESOTERIC";

export type MysticSymbol = {
  id: string;
  name: string;
  slug: string;
  discipline: MysticDiscipline;
  imageUrl?: string | null;
  keywords: string[];
  symbolism: string;
};

export type MysticDrawnSymbol = {
  symbol: MysticSymbol;
  position: MysticPosition;
  isReversed?: boolean;
};

export type MysticReadingInput = {
  name?: string;
  birthDate?: string;
  zodiacSign?: string;
  topic: MysticTopic;
  question?: string;
  discipline: MysticDiscipline;
  tone?: NarrativeTone;
};

export type MysticInterpretation = {
  position: MysticPosition;
  symbolName: string;
  title: string;
  meaning: string;
  keywords: string[];
  isReversed?: boolean;
};

export type MysticReadingResult = {
  discipline: MysticDiscipline;
  topic: MysticTopic;
  tone: NarrativeTone;
  symbols: MysticDrawnSymbol[];
  interpretations: MysticInterpretation[];
  summary: string;
  advice: string;
};