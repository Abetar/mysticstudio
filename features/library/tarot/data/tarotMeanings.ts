export type TarotMeaning = {
  summary: string;
  keywords: string[];
  generalMeaning: string;
  loveMeaning: string;
  workMeaning: string;
  moneyMeaning: string;
  healthMeaning: string;
  spiritualityMeaning: string;
  reversedMeaning: string;
  symbolism: string;
};

function meaning(
  name: string,
  summary: string,
  keywords: string[],
  core: string,
): TarotMeaning {
  return {
    summary,
    keywords,
    generalMeaning: `${name} representa ${core}. En una lectura señala la energía principal que rodea la pregunta y muestra qué conviene observar con más claridad.`,
    loveMeaning: `En el amor, ${name} habla de ${core.toLowerCase()} aplicado a vínculos, emociones, deseo, distancia o decisiones afectivas.`,
    workMeaning: `En el trabajo, ${name} indica ${core.toLowerCase()} dentro de proyectos, responsabilidades, cambios profesionales o relaciones laborales.`,
    moneyMeaning: `En dinero, ${name} invita a mirar ${core.toLowerCase()} antes de tomar decisiones materiales o financieras.`,
    healthMeaning: `En salud, ${name} debe leerse como símbolo de ${core.toLowerCase()}, nunca como diagnóstico médico.`,
    spiritualityMeaning: `Espiritualmente, ${name} refleja ${core.toLowerCase()} dentro del camino interior y la relación con los propios símbolos.`,
    reversedMeaning: `Invertida, ${name} puede señalar bloqueo, exceso, resistencia o una expresión desequilibrada de ${core.toLowerCase()}.`,
    symbolism: `El simbolismo de ${name} condensa ${core.toLowerCase()} mediante sus imágenes, elementos, postura y relación con el resto de la tirada.`,
  };
}

export const tarotMeanings: Record<string, TarotMeaning> = {
  el_loco: meaning("El Loco", "El Loco representa inicios, libertad, impulso y confianza ante lo desconocido.", ["inicio", "libertad", "riesgo", "camino"], "inicio, libertad y salto hacia lo desconocido"),
  el_mago: meaning("El Mago", "El Mago representa voluntad, habilidad, manifestación y poder personal.", ["voluntad", "acción", "talento", "manifestación"], "voluntad, acción consciente y uso de los propios recursos"),
  la_sacerdotisa: meaning("La Sacerdotisa", "La Sacerdotisa representa intuición, misterio, silencio y conocimiento oculto.", ["intuición", "misterio", "secreto", "sabiduría"], "intuición, silencio y verdad interior"),
  la_emperatriz: meaning("La Emperatriz", "La Emperatriz representa creación, abundancia, belleza y crecimiento.", ["abundancia", "creación", "cuidado", "fertilidad"], "abundancia, cuidado y energía creadora"),
  el_emperador: meaning("El Emperador", "El Emperador representa estructura, autoridad, orden y estabilidad.", ["orden", "autoridad", "estructura", "control"], "estructura, autoridad y construcción firme"),
  el_hierofante: meaning("El Hierofante", "El Hierofante representa tradición, enseñanza, fe y guía espiritual.", ["tradición", "guía", "fe", "enseñanza"], "tradición, aprendizaje y guía establecida"),
  los_enamorados: meaning("Los Enamorados", "Los Enamorados representan elección, vínculo, deseo y alineación de valores.", ["amor", "elección", "unión", "valores"], "elección, vínculo y coherencia emocional"),
  el_carro: meaning("El Carro", "El Carro representa avance, dirección, victoria y fuerza de voluntad.", ["avance", "control", "victoria", "dirección"], "avance, control y dirección decidida"),
  la_fuerza: meaning("La Fuerza", "La Fuerza representa dominio interior, paciencia, valentía y compasión.", ["fortaleza", "paciencia", "valor", "dominio"], "fortaleza interna, paciencia y dominio sereno"),
  el_ermitano: meaning("El Ermitaño", "El Ermitaño representa introspección, búsqueda, soledad sabia y guía interior.", ["introspección", "soledad", "sabiduría", "búsqueda"], "introspección, búsqueda interior y sabiduría silenciosa"),
  la_ruedadelafortuna: meaning("La Rueda de la Fortuna", "La Rueda de la Fortuna representa ciclos, destino, cambios y movimiento inevitable.", ["ciclo", "destino", "cambio", "azar"], "ciclos, cambio y movimiento del destino"),
  la_justicia: meaning("La Justicia", "La Justicia representa verdad, equilibrio, consecuencia y decisiones objetivas.", ["justicia", "verdad", "equilibrio", "karma"], "verdad, equilibrio y consecuencia"),
  el_colgado: meaning("El Colgado", "El Colgado representa pausa, sacrificio, nueva perspectiva y rendición.", ["pausa", "rendición", "perspectiva", "espera"], "pausa, rendición y cambio de perspectiva"),
  la_muerte: meaning("La Muerte", "La Muerte representa cierre, transformación, transición y renacimiento.", ["cierre", "transformación", "renacimiento", "fin"], "cierre, transformación y renacimiento simbólico"),
  la_templanza: meaning("La Templanza", "La Templanza representa equilibrio, sanación, paciencia y armonía.", ["equilibrio", "armonía", "sanación", "paciencia"], "equilibrio, integración y sanación gradual"),
  el_diablo: meaning("El Diablo", "El Diablo representa deseo, ataduras, sombra, tentación y dependencia.", ["deseo", "atadura", "sombra", "tentación"], "deseo, sombra y ataduras conscientes o inconscientes"),
  la_torre: meaning("La Torre", "La Torre representa ruptura, revelación, crisis y caída de estructuras falsas.", ["ruptura", "crisis", "verdad", "liberación"], "ruptura, verdad incómoda y liberación necesaria"),
  la_estrella: meaning("La Estrella", "La Estrella representa esperanza, sanación, inspiración y guía.", ["esperanza", "sanación", "guía", "calma"], "esperanza, sanación y guía después de la tormenta"),
  la_luna: meaning("La Luna", "La Luna representa intuición, confusión, sueños, miedo y mundo inconsciente.", ["intuición", "miedo", "sueños", "confusión"], "intuición, sombra, sueños y verdades ocultas"),
  el_sol: meaning("El Sol", "El Sol representa claridad, alegría, éxito, vitalidad y verdad.", ["claridad", "alegría", "éxito", "vitalidad"], "claridad, vitalidad y verdad revelada"),
  el_juicio: meaning("El Juicio", "El Juicio representa llamado, despertar, evaluación y renacimiento.", ["despertar", "llamado", "renacimiento", "evaluación"], "despertar, llamado interior y decisión definitiva"),
  el_mundo: meaning("El Mundo", "El Mundo representa culminación, logro, integración y cierre exitoso.", ["culminación", "logro", "integración", "plenitud"], "culminación, integración y cierre de ciclo"),

  as_de_bastos: meaning("As de Bastos", "El As de Bastos representa impulso creativo, deseo, inicio y energía vital.", ["inicio", "pasión", "creatividad", "energía"], "chispa creativa, pasión e impulso inicial"),
  dos_de_bastos: meaning("Dos de Bastos", "El Dos de Bastos representa planeación, visión y decisión de expansión.", ["planeación", "visión", "decisión", "futuro"], "visión, estrategia y decisión de crecimiento"),
  tres_de_bastos: meaning("Tres de Bastos", "El Tres de Bastos representa expansión, espera activa y oportunidades en camino.", ["expansión", "espera", "oportunidad", "horizonte"], "expansión, expectativa y apertura de caminos"),
  cuatro_de_bastos: meaning("Cuatro de Bastos", "El Cuatro de Bastos representa celebración, hogar, estabilidad y unión.", ["celebración", "hogar", "estabilidad", "unión"], "celebración, estabilidad y alegría compartida"),
  cinco_de_bastos: meaning("Cinco de Bastos", "El Cinco de Bastos representa competencia, conflicto, tensión y aprendizaje.", ["conflicto", "competencia", "tensión", "reto"], "fricción, competencia y aprendizaje mediante tensión"),
  seis_de_bastos: meaning("Seis de Bastos", "El Seis de Bastos representa victoria, reconocimiento y avance público.", ["victoria", "reconocimiento", "éxito", "orgullo"], "victoria, avance y reconocimiento visible"),
  siete_de_bastos: meaning("Siete de Bastos", "El Siete de Bastos representa defensa, resistencia y posición firme.", ["defensa", "resistencia", "valor", "posición"], "defensa, resistencia y firmeza ante oposición"),
  ocho_de_bastos: meaning("Ocho de Bastos", "El Ocho de Bastos representa rapidez, movimiento, noticias y avance.", ["rapidez", "movimiento", "noticias", "avance"], "movimiento rápido, comunicación y energía en tránsito"),
  nueve_de_bastos: meaning("Nueve de Bastos", "El Nueve de Bastos representa resistencia, cautela y perseverancia.", ["resistencia", "cautela", "defensa", "perseverancia"], "resistencia, vigilancia y fuerza después de pruebas"),
  diez_de_bastos: meaning("Diez de Bastos", "El Diez de Bastos representa carga, responsabilidad excesiva y agotamiento.", ["carga", "responsabilidad", "agotamiento", "presión"], "carga pesada, deber y necesidad de soltar exceso"),
  sota_de_bastos: meaning("Sota de Bastos", "La Sota de Bastos representa entusiasmo, exploración y mensajes creativos.", ["entusiasmo", "exploración", "mensaje", "curiosidad"], "entusiasmo joven, exploración y fuego inicial"),
  caballero_de_bastos: meaning("Caballero de Bastos", "El Caballero de Bastos representa acción, aventura, pasión y movimiento impulsivo.", ["acción", "pasión", "aventura", "impulso"], "acción intensa, aventura y energía impulsiva"),
  reina_de_bastos: meaning("Reina de Bastos", "La Reina de Bastos representa magnetismo, seguridad, pasión y liderazgo cálido.", ["magnetismo", "confianza", "pasión", "liderazgo"], "magnetismo, confianza y fuego creativo maduro"),
  rey_de_bastos: meaning("Rey de Bastos", "El Rey de Bastos representa visión, liderazgo, autoridad creativa y decisión.", ["liderazgo", "visión", "autoridad", "decisión"], "liderazgo visionario, decisión y dominio del fuego"),

  as_de_copas: meaning("As de Copas", "El As de Copas representa amor, apertura emocional, intuición y nacimiento afectivo.", ["amor", "emoción", "apertura", "intuición"], "apertura emocional, amor y nacimiento del sentimiento"),
  dos_de_copas: meaning("Dos de Copas", "El Dos de Copas representa unión, reciprocidad, atracción y acuerdo emocional.", ["unión", "pareja", "reciprocidad", "conexión"], "unión, reciprocidad y encuentro emocional"),
  tres_de_copas: meaning("Tres de Copas", "El Tres de Copas representa amistad, celebración, comunidad y alegría compartida.", ["amistad", "celebración", "comunidad", "alegría"], "amistad, comunidad y celebración compartida"),
  cuatro_de_copas: meaning("Cuatro de Copas", "El Cuatro de Copas representa apatía, introspección e insatisfacción emocional.", ["apatía", "insatisfacción", "reflexión", "oportunidad"], "apatía, introspección y oportunidad ignorada"),
  cinco_de_copas: meaning("Cinco de Copas", "El Cinco de Copas representa pérdida, duelo, arrepentimiento y tristeza.", ["pérdida", "duelo", "arrepentimiento", "tristeza"], "duelo, pérdida y necesidad de mirar lo que permanece"),
  seis_de_copas: meaning("Seis de Copas", "El Seis de Copas representa nostalgia, recuerdos, inocencia y vínculos del pasado.", ["nostalgia", "pasado", "recuerdos", "ternura"], "nostalgia, memoria emocional y regreso simbólico al pasado"),
  siete_de_copas: meaning("Siete de Copas", "El Siete de Copas representa fantasía, opciones, ilusión y confusión emocional.", ["opciones", "fantasía", "ilusión", "confusión"], "opciones, fantasías y necesidad de discernimiento"),
  ocho_de_copas: meaning("Ocho de Copas", "El Ocho de Copas representa retiro, búsqueda interior y abandono de lo vacío.", ["retiro", "búsqueda", "abandono", "camino"], "abandono consciente, búsqueda interior y desapego"),
  nueve_de_copas: meaning("Nueve de Copas", "El Nueve de Copas representa satisfacción, deseo cumplido y bienestar emocional.", ["satisfacción", "deseo", "bienestar", "plenitud"], "satisfacción emocional, deseo cumplido y disfrute"),
  diez_de_copas: meaning("Diez de Copas", "El Diez de Copas representa plenitud afectiva, familia, armonía y felicidad compartida.", ["plenitud", "familia", "armonía", "felicidad"], "armonía emocional, plenitud y felicidad compartida"),
  sota_de_copas: meaning("Sota de Copas", "La Sota de Copas representa sensibilidad, mensaje emocional, ternura e imaginación.", ["sensibilidad", "mensaje", "ternura", "imaginación"], "sensibilidad joven, mensajes emocionales e imaginación"),
  caballero_de_copas: meaning("Caballero de Copas", "El Caballero de Copas representa romanticismo, propuesta, idealismo y movimiento emocional.", ["romance", "propuesta", "idealismo", "emoción"], "romanticismo, búsqueda afectiva e ideal emocional"),
  reina_de_copas: meaning("Reina de Copas", "La Reina de Copas representa intuición emocional, compasión, profundidad y cuidado.", ["intuición", "compasión", "cuidado", "profundidad"], "profundidad emocional, intuición y cuidado sensible"),
  rey_de_copas: meaning("Rey de Copas", "El Rey de Copas representa madurez emocional, equilibrio, contención y sabiduría afectiva.", ["madurez", "equilibrio", "contención", "sabiduría"], "madurez emocional, equilibrio y dominio sensible"),

  as_de_espadas: meaning("As de Espadas", "El As de Espadas representa claridad mental, verdad, decisión e inicio intelectual.", ["claridad", "verdad", "decisión", "mente"], "claridad, verdad y corte mental preciso"),
  dos_de_espadas: meaning("Dos de Espadas", "El Dos de Espadas representa indecisión, bloqueo, tensión mental y elección postergada.", ["indecisión", "bloqueo", "elección", "tensión"], "bloqueo mental, indecisión y necesidad de elegir"),
  tres_de_espadas: meaning("Tres de Espadas", "El Tres de Espadas representa dolor, ruptura, verdad hiriente y duelo mental.", ["dolor", "ruptura", "verdad", "herida"], "dolor emocional, ruptura y verdad difícil"),
  cuatro_de_espadas: meaning("Cuatro de Espadas", "El Cuatro de Espadas representa pausa, descanso, recuperación y silencio mental.", ["descanso", "pausa", "recuperación", "silencio"], "descanso, pausa y recuperación necesaria"),
  cinco_de_espadas: meaning("Cinco de Espadas", "El Cinco de Espadas representa conflicto, derrota, tensión y victoria amarga.", ["conflicto", "derrota", "tensión", "ego"], "conflicto mental, desgaste y victoria sin paz"),
  seis_de_espadas: meaning("Seis de Espadas", "El Seis de Espadas representa transición, viaje, alejamiento y recuperación gradual.", ["transición", "viaje", "alejamiento", "mejora"], "transición, distancia y avance hacia aguas más calmas"),
  siete_de_espadas: meaning("Siete de Espadas", "El Siete de Espadas representa estrategia, ocultamiento, evasión y astucia.", ["estrategia", "ocultamiento", "evasión", "astucia"], "estrategia, discreción y posibles verdades ocultas"),
  ocho_de_espadas: meaning("Ocho de Espadas", "El Ocho de Espadas representa limitación mental, miedo, bloqueo y sensación de encierro.", ["limitación", "miedo", "bloqueo", "encierro"], "bloqueo mental, miedo y percepción de encierro"),
  nueve_de_espadas: meaning("Nueve de Espadas", "El Nueve de Espadas representa ansiedad, culpa, preocupación y tormento mental.", ["ansiedad", "culpa", "preocupación", "insomnio"], "ansiedad, preocupación y carga mental intensa"),
  diez_de_espadas: meaning("Diez de Espadas", "El Diez de Espadas representa final doloroso, agotamiento, traición y cierre inevitable.", ["final", "agotamiento", "traición", "cierre"], "final doloroso, agotamiento y cierre definitivo"),
  sota_de_espadas: meaning("Sota de Espadas", "La Sota de Espadas representa vigilancia, curiosidad, mensaje mental y análisis.", ["vigilancia", "curiosidad", "mensaje", "análisis"], "curiosidad mental, observación y comunicación alerta"),
  caballero_de_espadas: meaning("Caballero de Espadas", "El Caballero de Espadas representa rapidez mental, confrontación, impulso y decisión brusca.", ["rapidez", "confrontación", "impulso", "decisión"], "acción mental rápida, confrontación y determinación intensa"),
  reina_de_espadas: meaning("Reina de Espadas", "La Reina de Espadas representa claridad, independencia, límites y verdad sin adornos.", ["claridad", "independencia", "límites", "verdad"], "claridad, límites y honestidad firme"),
  rey_de_espadas: meaning("Rey de Espadas", "El Rey de Espadas representa autoridad mental, juicio, estrategia y verdad racional.", ["autoridad", "estrategia", "juicio", "razón"], "autoridad mental, estrategia y pensamiento objetivo"),

  as_de_pentaculos: meaning("As de Pentáculos", "El As de Pentáculos representa oportunidad material, semilla, prosperidad e inicio concreto.", ["oportunidad", "prosperidad", "semilla", "inicio"], "oportunidad material, semilla concreta y prosperidad inicial"),
  dos_de_pentaculos: meaning("Dos de Pentáculos", "El Dos de Pentáculos representa equilibrio, adaptación, prioridades y manejo de recursos.", ["equilibrio", "adaptación", "prioridades", "recursos"], "equilibrio práctico, adaptación y manejo de responsabilidades"),
  tres_de_pentaculos: meaning("Tres de Pentáculos", "El Tres de Pentáculos representa colaboración, aprendizaje, oficio y construcción conjunta.", ["colaboración", "oficio", "aprendizaje", "equipo"], "colaboración, oficio y construcción con apoyo"),
  cuatro_de_pentaculos: meaning("Cuatro de Pentáculos", "El Cuatro de Pentáculos representa control, ahorro, apego y protección de recursos.", ["control", "ahorro", "apego", "seguridad"], "control material, apego y necesidad de seguridad"),
  cinco_de_pentaculos: meaning("Cinco de Pentáculos", "El Cinco de Pentáculos representa carencia, dificultad, exclusión y necesidad de ayuda.", ["carencia", "dificultad", "exclusión", "ayuda"], "carencia, dificultad material y búsqueda de apoyo"),
  seis_de_pentaculos: meaning("Seis de Pentáculos", "El Seis de Pentáculos representa generosidad, intercambio, ayuda y equilibrio material.", ["generosidad", "intercambio", "ayuda", "equilibrio"], "intercambio justo, ayuda y equilibrio entre dar y recibir"),
  siete_de_pentaculos: meaning("Siete de Pentáculos", "El Siete de Pentáculos representa paciencia, evaluación, inversión y frutos en proceso.", ["paciencia", "evaluación", "inversión", "frutos"], "paciencia, evaluación y espera de resultados"),
  ocho_de_pentaculos: meaning("Ocho de Pentáculos", "El Ocho de Pentáculos representa trabajo, práctica, disciplina y perfeccionamiento.", ["trabajo", "disciplina", "práctica", "oficio"], "disciplina, práctica y mejora constante"),
  nueve_de_pentaculos: meaning("Nueve de Pentáculos", "El Nueve de Pentáculos representa independencia, logro, refinamiento y abundancia personal.", ["independencia", "logro", "abundancia", "refinamiento"], "independencia, logro material y disfrute refinado"),
  diez_de_pentaculos: meaning("Diez de Pentáculos", "El Diez de Pentáculos representa legado, familia, estabilidad y prosperidad duradera.", ["legado", "familia", "estabilidad", "prosperidad"], "legado, estabilidad material y construcción a largo plazo"),
  sota_de_pentaculos: meaning("Sota de Pentáculos", "La Sota de Pentáculos representa aprendizaje, oportunidad, estudio y semilla práctica.", ["aprendizaje", "oportunidad", "estudio", "semilla"], "aprendizaje práctico, oportunidad y crecimiento material inicial"),
  caballero_de_pentaculos: meaning("Caballero de Pentáculos", "El Caballero de Pentáculos representa constancia, trabajo lento, responsabilidad y compromiso.", ["constancia", "trabajo", "responsabilidad", "compromiso"], "constancia, paciencia y avance metódico"),
  reina_de_pentaculos: meaning("Reina de Pentáculos", "La Reina de Pentáculos representa cuidado, abundancia, hogar, cuerpo y prosperidad práctica.", ["cuidado", "abundancia", "hogar", "prosperidad"], "cuidado material, abundancia práctica y estabilidad nutritiva"),
  rey_de_pentaculos: meaning("Rey de Pentáculos", "El Rey de Pentáculos representa éxito material, estabilidad, liderazgo práctico y seguridad.", ["éxito", "estabilidad", "liderazgo", "seguridad"], "éxito material, estabilidad y dominio práctico"),
};