const batches = {
  major: [
    "el_loco",
    "el_mago",
    "la_sacerdotisa",
    "la_emperatriz",
    "el_emperador",
    "el_hierofante",
    "los_enamorados",
    "el_carro",
    "la_fuerza",
    "el_ermitano",
    "la_ruedadelafortuna",
    "la_justicia",
    "el_colgado",
    "la_muerte",
    "la_templanza",
    "el_diablo",
    "la_torre",
    "la_estrella",
    "la_luna",
    "el_sol",
    "el_juicio",
    "el_mundo",
  ],
  wands: [
    "as_de_bastos",
    "dos_de_bastos",
    "tres_de_bastos",
    "cuatro_de_bastos",
    "cinco_de_bastos",
    "seis_de_bastos",
    "siete_de_bastos",
    "ocho_de_bastos",
    "nueve_de_bastos",
    "diez_de_bastos",
    "sota_de_bastos",
    "caballero_de_bastos",
    "reina_de_bastos",
    "rey_de_bastos",
  ],
  cups: [
    "as_de_copas",
    "dos_de_copas",
    "tres_de_copas",
    "cuatro_de_copas",
    "cinco_de_copas",
    "seis_de_copas",
    "siete_de_copas",
    "ocho_de_copas",
    "nueve_de_copas",
    "diez_de_copas",
    "sota_de_copas",
    "caballero_de_copas",
    "reina_de_copas",
    "rey_de_copas",
  ],
  swords: [
    "as_de_espadas",
    "dos_de_espadas",
    "tres_de_espadas",
    "cuatro_de_espadas",
    "cinco_de_espadas",
    "seis_de_espadas",
    "siete_de_espadas",
    "ocho_de_espadas",
    "nueve_de_espadas",
    "diez_de_espadas",
    "sota_de_espadas",
    "caballero_de_espadas",
    "reina_de_espadas",
    "rey_de_espadas",
  ],
  pentacles: [
    "as_de_pentaculos",
    "dos_de_pentaculos",
    "tres_de_pentaculos",
    "cuatro_de_pentaculos",
    "cinco_de_pentaculos",
    "seis_de_pentaculos",
    "siete_de_pentaculos",
    "ocho_de_pentaculos",
    "nueve_de_pentaculos",
    "diez_de_pentaculos",
    "sota_de_pentaculos",
    "caballero_de_pentaculos",
    "reina_de_pentaculos",
    "rey_de_pentaculos",
  ],
} as const;

const batchName = process.argv[2] as keyof typeof batches | undefined;

if (!batchName || !batches[batchName]) {
  console.error("Usage: pnpm tsx scripts/tarot/generateTarotKnowledgePrompt.ts major|wands|cups|swords|pentacles");
  process.exit(1);
}

const cards = batches[batchName];

const generatedPrompt  = `
You are generating structured tarot knowledge for a premium Spanish tarot web app called MysticStudio.

Return ONLY valid TypeScript code.
No markdown.
No explanation.

Output must be an array of objects matching this shape:

{
  cardId: string;
  essence: string;
  keywords: string[];
  upright: {
    general: string;
    love: string;
    work: string;
    money: string;
    health: string;
    spirituality: string;
  };
  reversed: {
    general: string;
    love: string;
    work: string;
    money: string;
    health: string;
    spirituality: string;
  };
  warning: string;
  advice: string;
  shadow: string;
}

Rules:
- Spanish only.
- Each field must be concise but specific.
- Avoid generic positivity.
- Include both opportunity and risk.
- Do not claim certainty about the future.
- Do not give medical, legal, financial or mental health diagnosis.
- Health text must stay reflective and non-medical.
- Money text must be practical and non-financial-advice.
- Love text must avoid manipulation or fatalism.
- Spirituality text must be symbolic, grounded and non-dogmatic.
- Use a tone that is elegant, direct, mature and slightly mystical.
- No emojis.
- No filler phrases like "confía en el universo".
- Each string should be 18 to 32 words.
- keywords must contain 5 to 8 short Spanish keywords.
- cardId must exactly match one of the requested ids.
- Do not include imports or exports.
- Do not wrap in a variable.
- Return only the raw array.

Cards to generate:
${cards.map((card) => `- ${card}`).join("\n")}
`.trim();

console.log(generatedPrompt);