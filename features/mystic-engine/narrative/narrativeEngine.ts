import type {
  MysticInterpretation,
  MysticReadingInput,
  NarrativeTone,
} from "../core/mystic.types";

type GenerateNarrativeParams = {
  input: MysticReadingInput;
  interpretations: MysticInterpretation[];
  tone?: NarrativeTone;
};

function getToneIntro(tone: NarrativeTone): string {
  const intros: Record<NarrativeTone, string> = {
    CLASSIC: "La lectura muestra un recorrido simbólico claro.",
    POETIC: "Sobre la mesa, los símbolos parecen susurrar una historia antigua.",
    DIRECT: "La lectura señala tres puntos importantes.",
    PSYCHOLOGICAL:
      "Esta lectura puede entenderse como un espejo de tu momento interno.",
    ESOTERIC:
      "Los símbolos revelan una corriente sutil entre pasado, presente y dirección.",
  };

  return intros[tone];
}

export function generateNarrative({
  input,
  interpretations,
  tone = "CLASSIC",
}: GenerateNarrativeParams) {
  const intro = getToneIntro(tone);

  const questionLine = input.question
    ? `Tu pregunta abre el centro de esta lectura: "${input.question}".`
    : "Aunque no formulaste una pregunta específica, la lectura se organiza alrededor de tu energía actual.";

  const body = interpretations
    .map((interpretation) => {
      return `${interpretation.title}: ${interpretation.meaning}`;
    })
    .join("\n\n");

  const advice =
    interpretations.find((item) => item.position === "ADVICE")?.meaning ??
    "El consejo principal es avanzar con atención, sin forzar respuestas inmediatas.";

  const summary = `${intro}\n\n${questionLine}\n\n${body}`;

  return {
    summary,
    advice,
  };
}