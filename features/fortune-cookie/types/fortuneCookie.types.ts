export type FortuneTone = "fortunate" | "challenging";

export type FortuneCategory =
  | "love"
  | "career"
  | "money"
  | "health"
  | "spiritual"
  | "general";

export type FortuneSeed = {
  tone: FortuneTone;
  category: FortuneCategory;
};

export type GeneratedFortune = {
  title: string;
  message: string;
  reflection: string;
  action: string;
  tone: FortuneTone;
};