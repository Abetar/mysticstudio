import type { DrawnTarotCard } from "./tarot.types";

export type TarotReadingContext = {
  name?: string;
  topic?: string;
  question?: string;
  zodiacSign?: string;
};

const positionLabels: Record<DrawnTarotCard["position"], string> = {
  PAST: "pasado / energía inicial",
  PRESENT: "presente / conflicto",
  ADVICE: "consejo / dirección",
};

function getBaseReading(drawnCard: DrawnTarotCard) {
  const isReversed = drawnCard.orientation === "REVERSED";

  if (drawnCard.position === "PAST") {
    return isReversed
      ? "Esta carta sugiere que vienes cargando una energía que no terminó de cerrarse. Puede haber aprendizaje, pero también una tendencia a repetir patrones si no miras con honestidad lo que ya ocurrió."
      : "Esta carta habla de una base importante en tu historia reciente. Puede señalar impulso, aprendizaje o una experiencia que todavía influye en la forma en que estás viendo esta lectura.";
  }

  if (drawnCard.position === "PRESENT") {
    return isReversed
      ? "En el presente aparece una fricción clara. No necesariamente es una mala señal, pero sí indica bloqueo, tensión o algo que no está fluyendo como debería. Conviene no adornar la situación más de la cuenta."
      : "En el presente hay movimiento, pero también una decisión interna. Esta carta puede mostrar una oportunidad real, siempre que no ignores las señales incómodas que también están sobre la mesa.";
  }

  return isReversed
    ? "Como consejo, esta carta pide cautela. No se trata de detenerte por miedo, sino de no avanzar desde la ansiedad, el orgullo o la necesidad de controlar el resultado."
    : "Como consejo, esta carta apunta hacia una dirección posible. Hay una oportunidad, pero no es automática: requiere intención, claridad y asumir tu parte dentro de lo que estás preguntando.";
}

export const tarotReadingEngine = {
  getPositionLabel(position: DrawnTarotCard["position"]) {
    return positionLabels[position];
  },

  readCard(drawnCard: DrawnTarotCard, _context?: TarotReadingContext) {
    return getBaseReading(drawnCard);
  },
};