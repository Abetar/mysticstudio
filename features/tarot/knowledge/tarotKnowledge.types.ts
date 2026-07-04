export type TarotReadingTone = "positive" | "shadow" | "neutral";

export type TarotKnowledgeByTopic = {
  general: string;
  love: string;
  work: string;
  money: string;
  health: string;
  spirituality: string;
};

export type TarotCardKnowledge = {
  cardId: string;
  essence: string;
  keywords: string[];
  upright: TarotKnowledgeByTopic;
  reversed: TarotKnowledgeByTopic;
  warning: string;
  advice: string;
  shadow: string;
};