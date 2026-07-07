import { prisma } from "../lib/prisma/prisma";

const grimoireRituals = [
  {
    title: "Limpia con huevo",
    slug: "limpia-con-huevo",
    summary:
      "Limpia tradicional con huevo usada en curanderismo popular mexicano para descarga simbólica.",
    category: "CLEANSING",
    accessLevel: "PUBLIC",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "La limpia con huevo es una práctica ampliamente conocida en el curanderismo popular mexicano y latinoamericano. El huevo se usa como elemento simbólico de absorción, lectura ritual y descarga.",
    intention:
      "Retirar simbólicamente pesadez emocional, cansancio, envidia o sensación de carga energética.",
    expectedResult:
      "Sensación de descarga, claridad y cierre simbólico. No sustituye atención médica ni psicológica.",
    repeatEvery:
      "Puede realizarse cuando haya sensación de carga. Evitar repetirla por ansiedad.",
    tags: ["limpia", "huevo", "curanderismo", "descarga"],
    ingredients: [
      "1 huevo fresco a temperatura ambiente",
      "1 vaso de vidrio transparente",
      "Agua potable hasta llenar medio vaso",
      "1 pizca de sal de grano",
      "1 vela blanca opcional",
      "1 paño limpio",
    ],
    steps: [
      "Lava el huevo con cuidado y sécalo con el paño limpio.",
      "Llena el vaso de vidrio hasta la mitad con agua potable.",
      "Coloca el vaso sobre una mesa estable, nunca directamente en el suelo.",
      "Si usas vela, colócala detrás del vaso y enciéndela antes de comenzar.",
      "Toma el huevo con la mano dominante.",
      "Pásalo lentamente desde la coronilla hacia los pies.",
      "Recorre frente, nuca, pecho, abdomen, espalda, brazos y piernas.",
      "Haz siempre movimientos descendentes, como si estuvieras barriendo la carga hacia abajo.",
      "Evita pasar el huevo por heridas, zonas sensibles o piel irritada.",
      "Al terminar, rompe el huevo dentro del vaso con agua.",
      "Añade una pizca de sal al vaso.",
      "Observa el contenido solo como lectura simbólica, no como diagnóstico médico.",
      "Desecha todo por el drenaje o inodoro.",
      "Lava el vaso y no reutilices el huevo.",
    ],
    warnings:
      "No interpretar el huevo como diagnóstico médico. No usar sobre heridas. No consumir el huevo después del ritual.",
    notes:
      "Tradicionalmente se realiza de arriba hacia abajo porque el movimiento representa descarga y retiro.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 1,
  },
  {
    title: "Limpia con ruda",
    slug: "limpia-con-ruda",
    summary:
      "Limpia tradicional con ruda fresca para descarga, protección y retiro simbólico de pesadez.",
    category: "CLEANSING",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 15,
    origin:
      "La ruda es una de las hierbas más usadas en la magia popular de México, España y América Latina. Se asocia con protección, limpieza y defensa contra envidias.",
    intention:
      "Retirar simbólicamente cansancio, envidia, malestar ambiental o carga emocional.",
    expectedResult:
      "Sensación de ligereza, orden y limpieza simbólica del cuerpo.",
    repeatEvery:
      "Una vez por semana como máximo, o después de situaciones emocionalmente pesadas.",
    tags: ["ruda", "limpia", "hierbas", "protección"],
    ingredients: [
      "1 ramo pequeño de ruda fresca",
      "1 vaso de vidrio con agua",
      "1 plato blanco",
      "1 vela blanca opcional",
      "Hilo natural para atar el ramo si está suelto",
    ],
    steps: [
      "Sacude suavemente la ruda para retirar polvo o tierra.",
      "Ata el ramo si está muy suelto.",
      "Coloca el vaso con agua sobre una mesa, a la derecha del plato blanco.",
      "Si usas vela, ponla detrás del vaso y enciéndela con cuidado.",
      "Sostén la ruda con la mano dominante.",
      "Pasa la ruda desde la cabeza hacia los pies con movimientos suaves.",
      "En hombros, pecho y espalda, mueve la ruda hacia afuera como si retiraras carga.",
      "No golpees el cuerpo ni frotes con fuerza.",
      "Al terminar, coloca la ruda usada sobre el plato blanco.",
      "Deja el vaso con agua junto al plato durante unos minutos.",
      "Desecha la ruda fuera de casa o en la basura.",
      "Tira el agua al drenaje y lava el vaso.",
    ],
    warnings:
      "Evitar contacto con ojos, heridas o piel irritada. Algunas personas pueden ser sensibles a la ruda.",
    notes:
      "En muchas prácticas populares la ruda usada en una limpia no se conserva, porque se considera que ya absorbió carga.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 2,
  },
  {
    title: "Sahumerio con copal",
    slug: "sahumerio-con-copal",
    summary:
      "Uso ritual del humo de copal para limpiar y consagrar espacios de forma tradicional.",
    category: "CLEANSING",
    accessLevel: "PUBLIC",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "El copal tiene uso ritual documentado en Mesoamérica. Se ha usado como ofrenda aromática, purificación y acompañamiento ceremonial.",
    intention:
      "Limpiar simbólicamente un espacio mediante humo aromático y recorrido consciente.",
    expectedResult:
      "Ambiente más ordenado, sensación de limpieza ritual y cierre de energía pesada.",
    repeatEvery:
      "Puede realizarse después de discusiones, visitas intensas o antes de iniciar una etapa importante.",
    tags: ["copal", "sahumerio", "limpieza", "mesoamérica"],
    ingredients: [
      "Copal natural",
      "1 sahumador o recipiente resistente al calor",
      "Carbón vegetal para sahumerio",
      "Cerillos de madera",
      "1 recipiente con arena o base resistente al calor",
      "Ventanas ligeramente abiertas",
    ],
    steps: [
      "Abre una ventana antes de comenzar.",
      "Coloca el sahumador sobre una superficie resistente al calor.",
      "Pon el carbón vegetal dentro del sahumador.",
      "Enciende el carbón con cerillos y espera a que tome calor.",
      "Agrega una pequeña cantidad de copal sobre el carbón.",
      "Espera a que el humo comience a elevarse sin saturar el espacio.",
      "Comienza el recorrido en la entrada principal.",
      "Avanza lentamente hacia el interior de la casa o habitación.",
      "Pasa el humo por esquinas, puertas y ventanas con movimientos circulares suaves.",
      "No acerques el sahumador a cortinas, papeles, telas o madera.",
      "Al terminar, coloca el sahumador sobre la base resistente al calor.",
      "Deja enfriar completamente antes de desechar residuos.",
    ],
    warnings:
      "No usar en espacios cerrados sin ventilación. Mantener lejos de niños, mascotas y materiales inflamables.",
    notes:
      "El humo no debe ser excesivo. En la práctica tradicional importa más la intención y el recorrido que saturar el lugar.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 3,
  },
  {
    title: "Baño de romero",
    slug: "bano-de-romero",
    summary:
      "Baño tradicional de hierbas con romero para claridad, limpieza suave y fortalecimiento simbólico.",
    category: "CLEANSING",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 25,
    origin:
      "El romero se ha usado ampliamente en prácticas domésticas y populares por su asociación con claridad, memoria, fortaleza y limpieza.",
    intention:
      "Cerrar una etapa de cansancio o confusión y recuperar claridad simbólica.",
    expectedResult: "Sensación de frescura, orden y renovación personal.",
    repeatEvery: "Una vez por semana o antes de iniciar una etapa importante.",
    tags: ["romero", "baño", "hierbas", "limpieza"],
    ingredients: [
      "1 puño de romero fresco o seco",
      "1 litro de agua",
      "1 olla limpia",
      "1 colador",
      "1 recipiente limpio para enfriar la infusión",
    ],
    steps: [
      "Hierve un litro de agua en una olla limpia.",
      "Cuando el agua hierva, apaga el fuego.",
      "Agrega el romero al agua caliente.",
      "Tapa la olla y deja reposar durante diez minutos.",
      "Cuela la infusión en un recipiente limpio.",
      "Espera a que el agua esté tibia, nunca caliente.",
      "Báñate normalmente primero.",
      "Al final del baño, vierte la infusión del cuello hacia abajo.",
      "No la apliques en ojos, boca, heridas o piel irritada.",
      "Permanece unos minutos en calma antes de secarte.",
      "Desecha los restos de romero.",
    ],
    warnings:
      "No usar si eres alérgico al romero o tienes irritación en la piel.",
    notes:
      "En baños de descarga suele evitarse enjuagar la infusión inmediatamente, pero esto depende de la sensibilidad de la piel.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 4,
  },
  {
    title: "Baño de albahaca",
    slug: "bano-de-albahaca",
    summary:
      "Baño popular de albahaca para armonía, frescura emocional y apertura suave.",
    category: "CLEANSING",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 25,
    origin:
      "La albahaca se usa en prácticas populares como hierba de armonía, dulzura, frescura y apertura de caminos suaves.",
    intention:
      "Refrescar el ánimo después de tensión emocional, discusiones o sensación de bloqueo.",
    expectedResult:
      "Sensación de calma, armonía y disposición emocional más suave.",
    repeatEvery:
      "Puede realizarse cuando haya tensión emocional o después de conflictos.",
    tags: ["albahaca", "baño", "armonía", "limpieza"],
    ingredients: [
      "1 ramo pequeño de albahaca fresca",
      "1 litro de agua",
      "1 olla limpia",
      "1 colador",
      "1 recipiente limpio",
    ],
    steps: [
      "Lava suavemente la albahaca.",
      "Calienta un litro de agua sin dejarla hervir demasiado tiempo.",
      "Apaga el fuego y agrega la albahaca.",
      "Tapa la olla y deja reposar entre siete y diez minutos.",
      "Cuela la preparación.",
      "Espera a que el agua esté tibia.",
      "Báñate normalmente primero.",
      "Vierte la preparación del cuello hacia abajo.",
      "Evita rostro, ojos, heridas o zonas sensibles.",
      "Sécate con una toalla limpia sin frotar demasiado.",
      "Desecha las hojas usadas.",
    ],
    warnings: "No usar en caso de alergia o piel irritada.",
    notes:
      "La albahaca suele usarse cuando se busca suavizar el ambiente, no como limpieza agresiva.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 5,
  },
  {
    title: "Limpieza del hogar con sal",
    slug: "limpieza-del-hogar-con-sal",
    summary:
      "Limpieza doméstica tradicional con sal para purificar simbólicamente el espacio.",
    category: "CLEANSING",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 30,
    origin:
      "La sal se usa en prácticas populares como elemento de purificación, conservación y corte de pesadez.",
    intention:
      "Acompañar la limpieza física del hogar con una acción simbólica de orden y descarga.",
    expectedResult: "Sensación de casa más limpia, ordenada y descargada.",
    repeatEvery:
      "Una vez al mes o después de visitas intensas, discusiones o cambios importantes.",
    tags: ["sal", "hogar", "limpieza", "purificación"],
    ingredients: [
      "Sal de grano",
      "1 cubeta con agua",
      "1 trapeador o paño",
      "Ventanas abiertas",
      "Guantes opcionales",
    ],
    steps: [
      "Primero barre o retira basura visible.",
      "Abre ventanas para ventilar el espacio.",
      "Llena una cubeta con agua limpia.",
      "Agrega un puñado pequeño de sal de grano.",
      "Mezcla el agua con la mano o con el trapeador.",
      "Limpia desde el fondo de la casa hacia la entrada principal.",
      "Pon atención especial en esquinas, pasillos y entrada.",
      "No uses agua con sal sobre superficies delicadas que puedan dañarse.",
      "Tira el agua sucia por el drenaje.",
      "Lava el trapeador o paño después de usarlo.",
    ],
    warnings:
      "La sal puede dañar madera, metales o pisos delicados. Haz una prueba antes.",
    notes:
      "El recorrido de adentro hacia afuera representa sacar la carga del espacio.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 6,
  },
  {
    title: "Limpia con limón y sal",
    slug: "limpia-con-limon-y-sal",
    summary:
      "Práctica popular con limón y sal para corte simbólico, frescura y absorción de carga ambiental.",
    category: "CLEANSING",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 10,
    origin:
      "El limón se usa en prácticas populares como símbolo de corte, frescura y absorción. La sal refuerza el sentido de limpieza y límite.",
    intention:
      "Representar el corte de tensión o pesadez en un espacio específico.",
    expectedResult: "Sensación simbólica de descarga ambiental.",
    repeatEvery:
      "Puede realizarse después de discusiones o cuando una habitación se perciba pesada.",
    tags: ["limón", "sal", "limpia", "descarga"],
    ingredients: [
      "1 limón fresco",
      "1 plato blanco",
      "Sal de grano",
      "1 vaso de vidrio con agua",
    ],
    steps: [
      "Lava el limón y sécalo.",
      "Coloca el plato blanco sobre una mesa o repisa segura.",
      "Haz un pequeño círculo de sal sobre el plato.",
      "Coloca el limón entero al centro del círculo.",
      "Pon el vaso con agua detrás del plato.",
      "Deja el montaje durante una noche.",
      "No consumas el limón después del ritual.",
      "Al día siguiente, tira el limón y la sal.",
      "Desecha el agua por el drenaje.",
      "Lava el plato y el vaso.",
    ],
    warnings:
      "No ingerir los elementos usados. Mantener lejos de mascotas o niños.",
    notes:
      "Algunas tradiciones cortan el limón en cruz; aquí se conserva entero para una práctica más simple y segura.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 7,
  },
  {
    title: "Agua florida para descarga",
    slug: "agua-florida-para-descarga",
    summary:
      "Uso de agua florida para refrescar manos, nuca y espacio después de tensión emocional.",
    category: "CLEANSING",
    accessLevel: "PREMIUM",
    difficulty: "EASY",
    estimatedMinutes: 8,
    origin:
      "El agua florida es una colonia usada ampliamente en prácticas espirituales latinoamericanas para refrescar, limpiar y armonizar ambientes o personas.",
    intention:
      "Refrescar simbólicamente el cuerpo o espacio después de tensión emocional.",
    expectedResult: "Sensación de frescura, ligereza y cierre simbólico.",
    repeatEvery:
      "Cuando se perciba cansancio emocional o después de ambientes pesados.",
    tags: ["agua florida", "descarga", "limpia", "aroma"],
    ingredients: [
      "Agua florida",
      "1 paño limpio",
      "1 vaso con agua",
      "1 mesa limpia",
    ],
    steps: [
      "Coloca el vaso con agua sobre la mesa.",
      "Humedece ligeramente el paño con agua florida.",
      "No empapes el paño.",
      "Pasa el paño por tus manos.",
      "Después pásalo suavemente por la nuca, evitando ojos y mucosas.",
      "Respira profundo mientras nombras aquello que deseas soltar.",
      "Puedes pasar el paño por la mesa o puerta para refrescar el espacio.",
      "Lava el paño al terminar.",
      "Desecha el agua del vaso.",
    ],
    warnings: "No aplicar sobre piel irritada, ojos, boca o heridas.",
    notes:
      "El agua florida se usa más como refresco espiritual que como limpieza pesada.",
    essenceCost: 15,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 8,
  },
  {
    title: "Hilo rojo contra mal de ojo",
    slug: "hilo-rojo-contra-mal-de-ojo",
    summary:
      "Uso popular del hilo rojo como amuleto simbólico contra mal de ojo, envidia o mirada pesada.",
    category: "PROTECTION",
    accessLevel: "PREMIUM",
    difficulty: "EASY",
    estimatedMinutes: 10,
    origin:
      "El hilo rojo aparece en distintas tradiciones populares como amuleto de protección frente a envidia, mirada pesada o mal de ojo. Su uso varía por región y familia.",
    intention:
      "Portar un recordatorio simbólico de resguardo personal y cuidado de la propia energía.",
    expectedResult:
      "Sensación de protección, límite y acompañamiento simbólico.",
    repeatEvery:
      "Cuando el hilo se rompa, se ensucie o pierda sentido simbólico.",
    tags: ["hilo rojo", "mal de ojo", "protección", "amuleto"],
    ingredients: [
      "1 hilo rojo de algodón",
      "1 vaso con agua",
      "1 pizca de sal",
      "1 vela blanca pequeña",
    ],
    steps: [
      "Corta un tramo de hilo rojo suficiente para rodear la muñeca sin apretar.",
      "Coloca el vaso con agua frente a ti y añade una pizca de sal.",
      "Deja el hilo junto al vaso, no dentro del agua.",
      "Enciende la vela blanca y formula una intención breve de protección.",
      "Pide a una persona de confianza que ate el hilo en tu muñeca izquierda.",
      "Haz tres nudos suaves, sin cortar circulación ni apretar.",
      "En cada nudo, repite mentalmente una intención de calma, límite y resguardo.",
      "No conviertas el hilo en objeto de miedo; úsalo como recordatorio simbólico.",
      "Cuando se rompa o caiga, deséchalo y no lo reutilices.",
    ],
    warnings:
      "No apretar la muñeca. Retirar si causa irritación, incomodidad o ansiedad.",
    notes:
      "En muchas familias el hilo debe ser atado por otra persona, porque simboliza protección recibida.",
    essenceCost: 15,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 9,
  },
  {
    title: "Canela de inicio de mes",
    slug: "canela-de-inicio-de-mes",
    summary:
      "Ritual contemporáneo con canela para marcar intención de prosperidad al inicio del mes.",
    category: "MONEY",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 5,
    origin:
      "Soplar canela al inicio de mes es una práctica contemporánea muy difundida en espiritualidad popular para representar entrada de abundancia.",
    intention:
      "Marcar el inicio de un ciclo mensual con intención de trabajo, orden y prosperidad.",
    expectedResult:
      "Sensación de inicio, claridad económica y disposición para actuar.",
    repeatEvery:
      "El primer día del mes, si forma parte de tu práctica personal.",
    tags: ["canela", "prosperidad", "inicio de mes", "abundancia"],
    ingredients: ["Canela en polvo", "Puerta principal", "Manos limpias"],
    steps: [
      "Realiza la práctica el primer día del mes si sigues esa costumbre.",
      "Colócate en la entrada de tu casa, mirando hacia adentro.",
      "Pon una pequeña cantidad de canela en la palma de tu mano.",
      "Formula una intención concreta relacionada con trabajo, orden o prosperidad.",
      "Sopla suavemente la canela hacia el interior de la casa.",
      "No uses grandes cantidades para evitar ensuciar o irritar vías respiratorias.",
      "Después limpia el exceso si queda sobre el piso.",
      "Acompaña el gesto con una acción real de organización financiera.",
    ],
    warnings:
      "Evitar inhalar canela. No soplar cerca de niños, mascotas o personas con sensibilidad respiratoria.",
    notes:
      "Este ritual funciona mejor como marca simbólica de inicio, no como sustituto de planeación económica.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 10,
  },
  {
    title: "Arroz de abundancia para el hogar",
    slug: "arroz-de-abundancia-para-el-hogar",
    summary:
      "Ritual doméstico con arroz como símbolo de alimento, provisión y estabilidad familiar.",
    category: "MONEY",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 10,
    origin:
      "El arroz es símbolo de alimento, fertilidad, provisión y abundancia en muchas culturas. En prácticas domésticas populares se usa como representación de sustento.",
    intention:
      "Crear un recordatorio simbólico de provisión, estabilidad y agradecimiento dentro del hogar.",
    expectedResult:
      "Sensación de orden, gratitud y enfoque en la estabilidad material.",
    repeatEvery:
      "Puede renovarse cada mes o cuando el frasco se ensucie o pierda sentido simbólico.",
    tags: ["arroz", "abundancia", "hogar", "prosperidad"],
    ingredients: [
      "1 frasco pequeño de vidrio limpio",
      "Arroz crudo suficiente para llenar medio frasco",
      "3 monedas limpias",
      "1 hoja de laurel seca",
      "1 pizca pequeña de canela",
    ],
    steps: [
      "Lava y seca bien el frasco antes de usarlo.",
      "Llena el frasco con arroz crudo hasta la mitad.",
      "Introduce las tres monedas limpias dentro del arroz.",
      "Agrega una hoja de laurel seca.",
      "Añade una pizca pequeña de canela.",
      "Cierra el frasco y sostenlo con ambas manos.",
      "Agradece la provisión presente en tu hogar.",
      "Formula una intención sencilla relacionada con estabilidad y buen uso del dinero.",
      "Coloca el frasco en la cocina, comedor o un espacio limpio del hogar.",
      "No lo pongas en el baño ni directamente en el suelo.",
    ],
    warnings:
      "No consumir el arroz después de usarlo en el ritual. Mantener el frasco seco para evitar humedad o plagas.",
    notes:
      "Este ritual funciona como recordatorio de administración y gratitud, no como sustituto de acciones financieras reales.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 11,
  },
  {
    title: "Laurel para intención económica",
    slug: "laurel-para-intencion-economica",
    summary:
      "Ritual con hoja de laurel para enfocar una intención económica concreta.",
    category: "MONEY",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 10,
    origin:
      "El laurel se asocia desde la antigüedad con victoria, logro y buen resultado. En prácticas populares se usa para escribir deseos, peticiones o intenciones.",
    intention:
      "Fijar una intención económica clara sin sustituir trabajo, administración o decisiones prácticas.",
    expectedResult:
      "Claridad sobre una meta económica y sensación de dirección.",
    repeatEvery:
      "Cuando exista una meta económica concreta, evitando hacerlo por ansiedad.",
    tags: ["laurel", "dinero", "prosperidad", "intención"],
    ingredients: [
      "1 hoja de laurel seca",
      "1 lápiz o pluma fina",
      "1 plato resistente al calor",
      "1 vela blanca, verde o amarilla",
      "Cerillos",
    ],
    steps: [
      "Elige una intención económica breve y específica.",
      "Escribe una sola palabra sobre la hoja de laurel, por ejemplo: trabajo, ahorro, clientes o pago.",
      "Coloca la hoja sobre el plato resistente al calor.",
      "Pon la vela detrás del plato, dejando una distancia segura.",
      "Enciende la vela con cerillos.",
      "Lee en voz baja la palabra escrita en la hoja.",
      "Visualiza una acción concreta que puedas hacer para acercarte a esa meta.",
      "Si decides quemar la hoja, hazlo únicamente en un lugar ventilado y seguro.",
      "También puedes guardarla en una libreta o cartera si prefieres no quemarla.",
      "Apaga la vela con cuidado cuando termines.",
    ],
    warnings:
      "No quemar la hoja cerca de telas, papel suelto o superficies inflamables.",
    notes:
      "La parte más importante del ritual es que la intención sea concreta y vaya acompañada de una acción real.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 12,
  },
  {
    title: "Monedas de prosperidad",
    slug: "monedas-de-prosperidad",
    summary:
      "Ritual sencillo con monedas como símbolo de circulación, trabajo y estabilidad material.",
    category: "MONEY",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 12,
    origin:
      "Las monedas funcionan como símbolo directo de intercambio, trabajo, circulación y estabilidad material en distintas prácticas populares.",
    intention:
      "Recordar que la prosperidad requiere movimiento, orden, intercambio justo y cuidado de recursos.",
    expectedResult:
      "Sensación de enfoque económico, gratitud y claridad sobre el uso del dinero.",
    repeatEvery:
      "Puede realizarse al inicio de un mes, semana laboral o proyecto.",
    tags: ["monedas", "prosperidad", "dinero", "abundancia"],
    ingredients: [
      "7 monedas limpias",
      "1 plato pequeño",
      "1 vela blanca o verde",
      "1 vaso de vidrio con agua",
      "1 paño limpio",
    ],
    steps: [
      "Limpia las monedas con un paño seco.",
      "Coloca el plato pequeño al centro de la mesa.",
      "Acomoda las siete monedas en círculo sobre el plato.",
      "Pon el vaso con agua detrás del plato.",
      "Coloca la vela detrás del vaso.",
      "Enciende la vela y observa el círculo de monedas.",
      "Formula una intención relacionada con orden financiero.",
      "Permanece unos minutos en silencio.",
      "Deja las monedas sobre el plato durante una noche si el lugar es seguro.",
      "Después guarda las monedas en un frasco o úsalas conscientemente.",
    ],
    warnings:
      "No dejar velas encendidas sin supervisión. No colocar monedas al alcance de niños pequeños.",
    notes:
      "El número siete se usa con frecuencia en prácticas populares por su carga simbólica, aunque puede variar según tradición.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 13,
  },
  {
    title: "Prosperidad para negocio con laurel y canela",
    slug: "prosperidad-para-negocio-con-laurel-y-canela",
    summary:
      "Ritual de prosperidad para negocio usando laurel, canela y monedas como símbolos de buen flujo.",
    category: "MONEY",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "Laurel y canela son elementos frecuentes en prácticas populares de prosperidad. El laurel representa logro y la canela se asocia con atracción, dulzura y movimiento económico.",
    intention:
      "Preparar simbólicamente un negocio o espacio de trabajo para recibir clientes con orden, claridad y buen trato.",
    expectedResult:
      "Sensación de apertura, orden comercial y enfoque en el servicio.",
    repeatEvery:
      "Puede renovarse cada mes o al iniciar una etapa nueva del negocio.",
    tags: ["negocio", "laurel", "canela", "prosperidad"],
    ingredients: [
      "1 frasco pequeño de vidrio",
      "3 hojas de laurel secas",
      "1 pizca de canela en polvo",
      "3 monedas limpias",
      "1 papel pequeño",
      "1 lápiz",
    ],
    steps: [
      "Limpia físicamente el área de caja, escritorio o entrada del negocio.",
      "Escribe en el papel una intención concreta: buen servicio, clientes correctos, pago justo o ventas constantes.",
      "Dobla el papel hacia ti una vez.",
      "Coloca el papel dentro del frasco.",
      "Añade las tres hojas de laurel.",
      "Agrega las tres monedas limpias.",
      "Añade una pizca pequeña de canela.",
      "Cierra el frasco y sostenlo unos segundos entre tus manos.",
      "Colócalo en un lugar discreto del negocio donde no estorbe.",
      "Cada semana limpia el polvo del frasco y revisa si tus acciones comerciales acompañan la intención.",
    ],
    warnings:
      "No colocar el frasco donde clientes o niños puedan manipularlo. No usar demasiada canela para evitar suciedad o plagas.",
    notes:
      "Este ritual debe acompañarse de atención al cliente, orden del espacio, precios claros y constancia.",
    essenceCost: 50,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 14,
  },
  {
    title: "Abrecaminos económico",
    slug: "abrecaminos-economico",
    summary:
      "Ritual simbólico para abrir oportunidades económicas, laborales o comerciales.",
    category: "MONEY",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "La idea de abrir caminos aparece en espiritualidad popular como metáfora de desbloqueo, oportunidad y retiro de obstáculos.",
    intention:
      "Ordenar la mente antes de buscar trabajo, iniciar ventas, negociar o tomar una decisión económica.",
    expectedResult:
      "Claridad sobre el siguiente paso y sensación de movimiento.",
    repeatEvery:
      "Antes de una búsqueda laboral, negociación, lanzamiento o decisión económica importante.",
    tags: ["abrecaminos", "dinero", "trabajo", "oportunidad"],
    ingredients: [
      "1 vela amarilla o blanca",
      "1 hoja de laurel",
      "1 llave limpia",
      "1 papel pequeño",
      "1 lápiz",
      "1 vaso con agua",
    ],
    steps: [
      "Coloca la llave limpia al centro de la mesa.",
      "Pon la hoja de laurel a la izquierda de la llave.",
      "Coloca el vaso con agua detrás de ambos.",
      "Escribe en el papel el camino que deseas abrir de forma concreta.",
      "Dobla el papel una vez hacia ti.",
      "Coloca el papel debajo de la llave.",
      "Pon la vela detrás del vaso y enciéndela.",
      "Visualiza una acción real que harás en las próximas 24 horas.",
      "Deja la llave sobre el papel durante al menos una hora.",
      "Guarda la llave en un lugar visible durante siete días.",
      "Cumple la acción práctica que escribiste o el ritual queda incompleto.",
    ],
    warnings:
      "No dejar velas sin supervisión. No usar el ritual para evitar responsabilidades prácticas.",
    notes:
      "La llave representa apertura, pero la acción concreta es lo que da dirección al trabajo simbólico.",
    essenceCost: 50,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 15,
  },
  {
    title: "Caja de monedas para ahorro",
    slug: "caja-de-monedas-para-ahorro",
    summary:
      "Ritual de seguimiento con monedas para fortalecer el hábito de ahorro y disciplina económica.",
    category: "MONEY",
    accessLevel: "PREMIUM",
    difficulty: "ADVANCED",
    estimatedMinutes: 30,
    origin:
      "Guardar monedas o billetes con intención aparece en prácticas domésticas de prosperidad como símbolo de acumulación, disciplina y cuidado del recurso.",
    intention:
      "Crear un ritual de seguimiento que refuerce el hábito de ahorrar y observar la relación personal con el dinero.",
    expectedResult:
      "Mayor conciencia sobre ahorro, constancia y administración.",
    repeatEvery:
      "Puede realizarse durante ciclos de siete días, veintiún días o un mes.",
    tags: ["monedas", "ahorro", "prosperidad", "disciplina"],
    ingredients: [
      "1 caja pequeña limpia",
      "7 monedas",
      "1 hoja de laurel",
      "1 pizca de canela",
      "1 papel",
      "1 lápiz",
    ],
    steps: [
      "Limpia la caja y déjala abierta sobre la mesa.",
      "Escribe en el papel una meta de ahorro realista.",
      "Dobla el papel hacia ti y colócalo dentro de la caja.",
      "Añade las siete monedas una por una.",
      "Con cada moneda, nombra una cualidad: orden, paciencia, constancia, claridad, trabajo, cuidado y gratitud.",
      "Agrega la hoja de laurel.",
      "Añade una pizca mínima de canela.",
      "Cierra la caja y colócala en un sitio privado.",
      "Durante siete días, añade una moneda o billete pequeño si puedes.",
      "No abras la caja por ansiedad.",
      "Al final del periodo, cuenta lo reunido y registra qué aprendiste.",
    ],
    warnings:
      "No usar dinero destinado a necesidades básicas. El ritual debe apoyar el ahorro, no crear presión.",
    notes:
      "La caja funciona como símbolo y como herramienta práctica de seguimiento.",
    essenceCost: 120,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 16,
  },
  {
    title: "Ritual de amor propio con vela rosa",
    slug: "ritual-de-amor-propio-con-vela-rosa",
    summary:
      "Ritual suave con vela rosa para cuidado personal, reconciliación interna y ternura hacia uno mismo.",
    category: "LOVE",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 15,
    origin:
      "La vela rosa se asocia en espiritualidad popular con afecto, suavidad, reconciliación emocional y cuidado.",
    intention:
      "Abrir un espacio simbólico de respeto, ternura y cuidado hacia uno mismo.",
    expectedResult:
      "Sensación de calma, autovaloración y cierre emocional suave.",
    repeatEvery:
      "Cuando exista autocrítica intensa, tristeza o necesidad de reconectar contigo.",
    tags: ["amor propio", "vela rosa", "sanación", "cuidado"],
    ingredients: [
      "1 vela rosa",
      "1 espejo pequeño",
      "1 vaso con agua",
      "1 papel",
      "1 lápiz",
    ],
    steps: [
      "Coloca el espejo frente a ti sobre una mesa limpia.",
      "Pon el vaso con agua a un lado del espejo.",
      "Coloca la vela rosa detrás del espejo, dejando distancia segura.",
      "Escribe tres frases de cuidado hacia ti mismo.",
      "Enciende la vela con calma.",
      "Lee las frases en voz baja.",
      "Mírate al espejo sin forzar emoción ni juicio.",
      "Respira profundamente durante unos minutos.",
      "Guarda el papel en una libreta personal.",
      "Apaga la vela con seguridad.",
    ],
    warnings:
      "Si el ejercicio genera angustia intensa, detente y busca apoyo emocional adecuado.",
    notes:
      "El espejo no se usa para juzgar la apariencia, sino para reconocer presencia y cuidado.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 17,
  },
  {
    title: "Cierre de ciclos amorosos",
    slug: "cierre-de-ciclos-amorosos",
    summary:
      "Ritual simbólico para despedir una relación, expectativa o vínculo emocional pendiente.",
    category: "LOVE",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 20,
    origin:
      "Los rituales de cierre simbólico se usan para marcar despedidas, duelos y cambios emocionales.",
    intention:
      "Soltar una expectativa o vínculo desde el respeto, sin negar lo vivido.",
    expectedResult:
      "Sensación de cierre, orden emocional y disposición para avanzar.",
    repeatEvery:
      "Cuando exista una etapa amorosa que necesita ser cerrada simbólicamente.",
    tags: ["cierre", "amor", "duelo", "soltar"],
    ingredients: [
      "1 hoja de papel",
      "1 lápiz",
      "1 vaso con agua",
      "1 vela blanca",
      "1 recipiente seguro si decides romper o quemar el papel",
    ],
    steps: [
      "Escribe lo que deseas cerrar sin insultos ni amenazas.",
      "Coloca el vaso con agua frente al papel.",
      "Pon la vela blanca detrás del vaso.",
      "Enciende la vela con cuidado.",
      "Lee el texto en voz baja una sola vez.",
      "Dobla el papel hacia afuera, como símbolo de despedida.",
      "Puedes romperlo en pedazos si no deseas quemarlo.",
      "Si decides quemarlo, hazlo solo en un recipiente seguro y ventilado.",
      "Tira el agua al drenaje.",
      "Haz una acción práctica de cierre: ordenar recuerdos, borrar un recordatorio o pedir ayuda.",
    ],
    warnings:
      "No hacer este ritual en medio de una crisis emocional intensa. Evita fuego si no tienes un espacio seguro.",
    notes:
      "El cierre no borra la historia; marca una decisión simbólica de no seguir alimentando el mismo ciclo.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 18,
  },
  {
    title: "Fortalecer la comunicación en pareja",
    slug: "fortalecer-la-comunicacion-en-pareja",
    summary:
      "Ritual de armonización para preparar una conversación honesta y respetuosa en pareja.",
    category: "LOVE",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "En prácticas de armonización amorosa se usan velas, miel o flores como símbolos de dulzura, diálogo y disposición afectiva.",
    intention:
      "Acompañar una conversación pendiente con una intención de escucha y respeto.",
    expectedResult:
      "Mayor claridad emocional antes de hablar y disposición a escuchar.",
    repeatEvery:
      "Antes de una conversación importante, evitando usarlo para evitar el diálogo real.",
    tags: ["pareja", "comunicación", "amor", "armonía"],
    ingredients: [
      "1 vela rosa o blanca",
      "2 vasos con agua",
      "1 papel",
      "1 lápiz",
      "1 gota de miel opcional",
    ],
    steps: [
      "Coloca los dos vasos con agua separados por un palmo.",
      "Pon la vela entre ambos vasos, ligeramente hacia atrás.",
      "Escribe en el papel: deseo escuchar y hablar con respeto.",
      "Si usas miel, coloca una gota en una esquina del papel, no sobre la vela.",
      "Dobla el papel una vez y ponlo frente a la vela.",
      "Enciende la vela.",
      "Permanece en silencio unos minutos pensando en lo que necesitas decir sin atacar.",
      "Piensa también en lo que necesitas escuchar.",
      "Al terminar, tira el agua de ambos vasos.",
      "Guarda o desecha el papel según sientas cierre.",
    ],
    warnings:
      "No usar el ritual para manipular, presionar o evitar conversaciones necesarias.",
    notes:
      "La presencia de dos vasos representa dos personas distintas, no una voluntad sometida a otra.",
    essenceCost: 15,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 19,
  },
  {
    title: "Reconciliación simbólica",
    slug: "reconciliacion-simbolica",
    summary:
      "Ritual suave para pedir claridad, humildad y buen trato antes de intentar una reconciliación.",
    category: "LOVE",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 25,
    origin:
      "Los trabajos de reconciliación aparecen en magia popular como formas de pedir suavidad, perdón o armonía, aunque siempre dependen de voluntad y diálogo reales.",
    intention:
      "Preparar emocionalmente una reconciliación sin forzar la respuesta de la otra persona.",
    expectedResult:
      "Mayor claridad emocional y disposición para hablar con respeto.",
    repeatEvery: "Una sola vez antes de buscar una conversación honesta.",
    tags: ["reconciliación", "miel", "amor", "armonía"],
    ingredients: [
      "1 vela rosa",
      "1 vaso con agua",
      "1 papel",
      "1 lápiz",
      "Miel",
      "Canela en polvo",
      "1 plato pequeño",
    ],
    steps: [
      "Escribe en el papel el nombre de la situación que deseas armonizar.",
      "Evita escribir órdenes o frases que busquen controlar a otra persona.",
      "Coloca el papel debajo del vaso con agua.",
      "Pon la vela rosa detrás del vaso.",
      "Coloca una gota pequeña de miel en el plato.",
      "Espolvorea una pizca mínima de canela sobre la miel.",
      "Enciende la vela.",
      "Pide claridad, humildad y buen trato.",
      "Permanece unos minutos en silencio.",
      "Tira el agua y limpia el plato al terminar.",
    ],
    warnings:
      "No usar para insistir donde ya hubo rechazo claro. La reconciliación requiere consentimiento y diálogo real.",
    notes: "Este ritual trabaja la disposición propia, no la voluntad ajena.",
    essenceCost: 50,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 20,
  },
  {
    title: "Alejar relaciones tóxicas",
    slug: "alejar-relaciones-toxicas",
    summary:
      "Ritual simbólico para reforzar límites personales y tomar distancia de vínculos dañinos.",
    category: "LOVE",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "Los rituales de alejamiento suave aparecen en prácticas populares como formas simbólicas de cortar patrones de dependencia, conflicto o apego dañino.",
    intention:
      "Fortalecer una decisión de distancia frente a vínculos que causan daño emocional.",
    expectedResult:
      "Mayor claridad sobre límites personales y sensación de cierre.",
    repeatEvery: "Una vez cuando exista una decisión clara de tomar distancia.",
    tags: ["alejamiento", "límites", "amor", "cierre"],
    ingredients: [
      "1 vela blanca",
      "1 papel",
      "1 lápiz",
      "Sal de grano",
      "1 plato blanco",
      "1 vaso con agua",
    ],
    steps: [
      "Escribe en el papel el patrón que deseas dejar, no insultos contra la persona.",
      "Coloca el papel al centro del plato blanco.",
      "Haz un círculo de sal alrededor del papel.",
      "Pon el vaso con agua detrás del plato.",
      "Coloca la vela blanca detrás del vaso.",
      "Enciende la vela con cuidado.",
      "Di en voz baja: elijo distancia, claridad y cuidado propio.",
      "Permanece unos minutos observando el círculo de sal como símbolo de límite.",
      "Rompe el papel en pedazos pequeños.",
      "Desecha el papel y la sal.",
      "Tira el agua al drenaje y lava el vaso.",
    ],
    warnings:
      "Si existe violencia, amenaza o riesgo, busca apoyo real y redes de seguridad. El ritual no sustituye ayuda profesional ni legal.",
    notes: "El objetivo es reforzar tu límite, no castigar a otra persona.",
    essenceCost: 50,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 21,
  },
  {
    title: "Endulzamiento tradicional suave",
    slug: "endulzamiento-tradicional-suave",
    summary:
      "Trabajo simbólico de dulcificación con miel para armonizar el trato sin imponer voluntad.",
    category: "LOVE",
    accessLevel: "PREMIUM",
    difficulty: "ADVANCED",
    estimatedMinutes: 30,
    origin:
      "Los endulzamientos son conocidos en magia popular latinoamericana y caribeña como trabajos de dulcificación simbólica mediante miel, azúcar, canela o elementos dulces.",
    intention:
      "Representar armonización del trato, suavidad emocional y disposición a la reconciliación sin buscar control.",
    expectedResult:
      "Sensación de calma, dulzura en el trato y disposición a dialogar.",
    repeatEvery:
      "No repetir constantemente. Esperar al menos un ciclo de siete días antes de considerar repetirlo.",
    tags: ["endulzamiento", "miel", "amor", "armonía"],
    ingredients: [
      "1 frasco pequeño de vidrio con tapa",
      "Miel suficiente para cubrir el papel",
      "1 pizca de canela",
      "1 papel pequeño",
      "1 lápiz",
      "1 vela rosa",
      "1 plato para la vela",
    ],
    steps: [
      "Escribe una intención de armonía sin imponer sentimientos ni decisiones.",
      "Dobla el papel hacia ti si trabajas reconciliación personal.",
      "Coloca el papel dentro del frasco.",
      "Cubre el papel con miel.",
      "Agrega una pizca pequeña de canela.",
      "Cierra bien el frasco.",
      "Coloca el frasco frente a la vela rosa.",
      "Pon la vela sobre un plato y enciéndela bajo vigilancia.",
      "Permanece unos minutos pensando en un trato más amable y honesto.",
      "Guarda el frasco en un lugar discreto durante siete días.",
      "Después de siete días, deséchalo de forma limpia si sientes que el ciclo terminó.",
    ],
    warnings:
      "No usar para intentar forzar una relación, insistir ante rechazo o manipular a otra persona.",
    notes:
      "Un endulzamiento suave debe enfocarse en armonía y trato, no en dominio de voluntad.",
    essenceCost: 120,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 22,
  },
  {
    title: "Veladora blanca de resguardo",
    slug: "veladora-blanca-de-resguardo",
    summary:
      "Ritual sencillo con veladora blanca para claridad, calma y protección simbólica.",
    category: "PROTECTION",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 15,
    origin:
      "La vela blanca se usa ampliamente en prácticas devocionales y populares como símbolo de claridad, petición limpia, paz y resguardo.",
    intention:
      "Crear un espacio de calma y pedir protección simbólica para una persona, casa o situación.",
    expectedResult:
      "Sensación de tranquilidad, orden y acompañamiento espiritual.",
    repeatEvery:
      "Cuando se necesite claridad o resguardo, evitando depender compulsivamente de la vela.",
    tags: ["veladora", "protección", "luz", "resguardo"],
    ingredients: [
      "1 veladora blanca",
      "1 plato o base resistente al calor",
      "1 vaso con agua",
      "1 papel pequeño",
      "1 lápiz",
    ],
    steps: [
      "Coloca la veladora sobre una base resistente al calor.",
      "Pon el vaso con agua a la derecha de la veladora.",
      "Escribe en el papel una intención breve de protección.",
      "Dobla el papel una vez hacia ti.",
      "Coloca el papel debajo del vaso, no debajo de la veladora.",
      "Enciende la veladora con cuidado.",
      "Permanece unos minutos en silencio.",
      "Pide claridad, calma y resguardo sin pedir daño contra nadie.",
      "Deja la veladora encendida solo si puedes vigilarla.",
      "Si debes salir o dormir, apágala con seguridad.",
      "Desecha el agua al terminar el ciclo.",
    ],
    warnings:
      "Nunca dejar veladoras encendidas sin supervisión. Mantener lejos de cortinas, madera, papel, niños y mascotas.",
    notes:
      "El vaso de agua acompaña la petición como símbolo de claridad y contención.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 23,
  },
  {
    title: "Resguardo del hogar con laurel",
    slug: "resguardo-del-hogar-con-laurel",
    summary:
      "Práctica doméstica con laurel para protección simbólica de la entrada del hogar.",
    category: "PROTECTION",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 15,
    origin:
      "El laurel se asocia desde la antigüedad con victoria, protección y buen augurio. En prácticas domésticas populares se coloca en puertas, cocinas o rincones como símbolo de resguardo.",
    intention:
      "Bendecir simbólicamente la entrada del hogar y marcar un límite de paz, orden y estabilidad.",
    expectedResult: "Sensación de casa resguardada y entrada protegida.",
    repeatEvery:
      "Renovar cada mes o cuando las hojas se rompan, manchen o pierdan aroma.",
    tags: ["laurel", "hogar", "protección", "entrada"],
    ingredients: [
      "3 hojas de laurel secas",
      "1 hilo natural o listón blanco",
      "1 vaso pequeño con agua",
      "1 vela blanca",
      "1 plato para la vela",
    ],
    steps: [
      "Limpia físicamente la entrada principal de la casa.",
      "Coloca las tres hojas de laurel juntas.",
      "Átalas con el hilo o listón blanco.",
      "Pon el vaso con agua en una mesa cercana a la entrada.",
      "Coloca la vela blanca sobre el plato, detrás del vaso.",
      "Enciende la vela con cuidado.",
      "Sostén el laurel atado entre tus manos.",
      "Formula una intención de paz y resguardo para quienes habitan el lugar.",
      "Coloca el laurel cerca de la entrada, por dentro de la casa.",
      "Evita ponerlo en el suelo o en un lugar donde se moje.",
      "Cambia las hojas cuando se deterioren.",
    ],
    warnings: "No colocar laurel cerca de fuego, enchufes o zonas húmedas.",
    notes:
      "La entrada representa el punto de intercambio entre el hogar y el exterior.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 24,
  },
  {
    title: "Oración de resguardo a San Miguel Arcángel",
    slug: "oracion-de-resguardo-a-san-miguel-arcangel",
    summary:
      "Práctica devocional de protección dirigida a San Miguel Arcángel.",
    category: "PROTECTION",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 12,
    origin:
      "San Miguel Arcángel ocupa un lugar importante en la devoción católica popular como figura de defensa espiritual, justicia y protección frente al mal.",
    intention:
      "Realizar una petición devocional de protección, especialmente antes de una situación difícil o después de sentir carga emocional.",
    expectedResult:
      "Sensación de acompañamiento espiritual, fortaleza y claridad.",
    repeatEvery:
      "Puede realizarse como oración personal cuando se necesite resguardo.",
    tags: ["san miguel", "oración", "protección", "devocional"],
    ingredients: [
      "1 imagen o estampa de San Miguel Arcángel",
      "1 vela blanca o azul",
      "1 vaso de vidrio con agua",
      "1 plato para la vela",
    ],
    steps: [
      "Coloca la estampa sobre una mesa limpia o pequeño altar.",
      "Pon el vaso de agua a la derecha de la estampa.",
      "Coloca la vela sobre el plato frente a la imagen.",
      "Enciende la vela con cuidado.",
      "Respira profundamente antes de comenzar.",
      "Reza una oración tradicional a San Miguel o expresa una petición con tus propias palabras.",
      "Pide protección, claridad y defensa espiritual sin pedir venganza.",
      "Permanece en silencio unos minutos.",
      "Deja que la vela arda solo mientras puedas vigilarla.",
      "Desecha el agua y limpia el espacio al terminar.",
    ],
    warnings:
      "Usar velas con cuidado. Esta práctica es devocional y no sustituye acciones reales de protección o denuncia.",
    notes:
      "En el catolicismo popular, San Miguel suele invocarse como defensor y guía frente a peligro espiritual.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 25,
  },
  {
    title: "Espejo protector de entrada",
    slug: "espejo-protector-de-entrada",
    summary:
      "Ritual con espejo pequeño para marcar un límite simbólico en la entrada del hogar.",
    category: "PROTECTION",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "El espejo se usa en magia popular como símbolo de reflejo, límite y devolución. En contextos domésticos puede colocarse cerca de entradas como recordatorio de protección.",
    intention:
      "Crear un símbolo visual de límite en la entrada del hogar, sin convertirlo en objeto de miedo.",
    expectedResult: "Sensación de resguardo y claridad en el umbral del hogar.",
    repeatEvery:
      "Limpiar el espejo una vez por semana o cuando se perciba cargado.",
    tags: ["espejo", "hogar", "protección", "entrada"],
    ingredients: [
      "1 espejo pequeño limpio",
      "1 paño blanco",
      "1 vaso con agua",
      "1 pizca de sal",
      "1 vela blanca",
      "1 plato para la vela",
    ],
    steps: [
      "Limpia el espejo con el paño blanco hasta retirar polvo o manchas.",
      "Coloca el espejo boca arriba sobre una mesa.",
      "Pon el vaso con agua a un lado del espejo.",
      "Añade una pizca de sal al agua.",
      "Coloca la vela blanca detrás del espejo, sobre un plato.",
      "Enciende la vela con cuidado.",
      "Observa el reflejo de la luz durante unos segundos.",
      "Formula una intención de protección para la entrada del hogar.",
      "Coloca el espejo cerca de la entrada, por dentro de la casa.",
      "No lo coloques apuntando directamente a una cama o lugar de descanso.",
      "Si el espejo se rompe, envuélvelo con cuidado y deséchalo.",
    ],
    warnings:
      "No colocar espejos en zonas donde puedan caer, romperse o cortar a alguien.",
    notes:
      "El espejo no debe vivirse con miedo; funciona como símbolo de límite y atención.",
    essenceCost: 50,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 26,
  },
  {
    title: "Protección de objetos personales",
    slug: "proteccion-de-objetos-personales",
    summary:
      "Consagración simbólica de un objeto personal usado como recordatorio de protección.",
    category: "PROTECTION",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "La consagración de objetos personales aparece en muchas formas de espiritualidad popular: medallas, escapularios, llaves, anillos o amuletos reciben intención y cuidado ritual.",
    intention:
      "Asignar intención protectora a un objeto cotidiano sin atribuirle poder absoluto ni depender de él.",
    expectedResult:
      "Sensación de acompañamiento simbólico y claridad de intención.",
    repeatEvery:
      "Cuando el objeto se ensucie, cambie de dueño o pierda sentido simbólico.",
    tags: ["amuletos", "objetos", "protección", "consagración"],
    ingredients: [
      "1 objeto personal pequeño",
      "1 paño limpio",
      "1 vela blanca",
      "1 vaso con agua",
      "Sal de grano en un plato",
    ],
    steps: [
      "Limpia físicamente el objeto con el paño.",
      "Coloca el plato con sal al centro de la mesa.",
      "Pon el objeto sobre el paño junto al plato.",
      "No entierres el objeto en sal si puede dañarse.",
      "Coloca el vaso con agua detrás del objeto.",
      "Pon la vela blanca detrás del vaso.",
      "Enciende la vela con cuidado.",
      "Di para qué quieres usar ese objeto como recordatorio.",
      "Deja el objeto sobre el paño al menos quince minutos.",
      "Guárdalo contigo o en un lugar especial.",
      "Desecha la sal después del ritual.",
    ],
    warnings:
      "No usar sal directamente sobre objetos delicados, electrónicos, joyería sensible o documentos.",
    notes:
      "La protección se entiende como recordatorio simbólico, no como garantía absoluta.",
    essenceCost: 50,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 27,
  },
  {
    title: "Resguardo nocturno con vaso de agua",
    slug: "resguardo-nocturno-con-vaso-de-agua",
    summary:
      "Práctica doméstica con vaso de agua para calma, descanso y cierre simbólico del día.",
    category: "PROTECTION",
    accessLevel: "PUBLIC",
    difficulty: "EASY",
    estimatedMinutes: 5,
    origin:
      "El vaso de agua junto al descanso aparece en prácticas domésticas como símbolo de absorción, calma y limpieza emocional durante la noche.",
    intention:
      "Acompañar el descanso con un gesto simple de tranquilidad y cierre del día.",
    expectedResult:
      "Sensación de calma antes de dormir y descanso simbólicamente protegido.",
    repeatEvery:
      "Cuando se sienta carga emocional antes de dormir. No usar compulsivamente.",
    tags: ["noche", "agua", "descanso", "protección"],
    ingredients: [
      "1 vaso de vidrio transparente",
      "Agua potable",
      "1 pizca pequeña de sal opcional",
      "Mesa de noche estable",
    ],
    steps: [
      "Llena el vaso con agua hasta tres cuartos.",
      "Si tu tradición lo usa, añade una pizca muy pequeña de sal.",
      "Coloca el vaso en una mesa de noche estable.",
      "No lo pongas debajo de la cama ni directamente en el suelo.",
      "Antes de dormir, respira profundo.",
      "Formula una intención de descanso tranquilo.",
      "Deja el vaso ahí durante la noche.",
      "No bebas esa agua al despertar.",
      "Por la mañana, tírala al drenaje.",
      "Lava el vaso antes de volver a usarlo.",
    ],
    warnings:
      "No colocar el vaso donde pueda caer o derramarse sobre aparatos eléctricos.",
    notes: "El agua funciona como símbolo de calma y contención del descanso.",
    essenceCost: 0,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 28,
  },
  {
    title: "Protección con copal para espacios",
    slug: "proteccion-con-copal-para-espacios",
    summary:
      "Uso de copal para resguardar y limpiar simbólicamente un espacio importante.",
    category: "PROTECTION",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 25,
    origin:
      "El copal tiene uso ritual documentado en Mesoamérica y continúa presente en prácticas ceremoniales, devocionales y domésticas de purificación y ofrenda.",
    intention:
      "Recorrer un espacio con humo aromático como gesto simbólico de limpieza, respeto y resguardo.",
    expectedResult:
      "Sensación de espacio ceremonialmente protegido y ordenado.",
    repeatEvery:
      "Antes de iniciar una etapa importante, después de discusiones o al preparar un altar.",
    tags: ["copal", "protección", "sahumerio", "espacio"],
    ingredients: [
      "Copal natural",
      "Sahumador o recipiente resistente al calor",
      "Carbón vegetal",
      "Cerillos",
      "Ventanas ligeramente abiertas",
      "Base resistente al calor",
    ],
    steps: [
      "Abre una ventana para permitir ventilación.",
      "Coloca el sahumador sobre una superficie resistente al calor.",
      "Enciende el carbón siguiendo medidas de seguridad.",
      "Cuando el carbón esté listo, coloca poca cantidad de copal encima.",
      "Sostén el sahumador con protección para el calor.",
      "Comienza en la entrada del espacio.",
      "Avanza en sentido de las manecillas del reloj si esa es tu costumbre.",
      "Detente unos segundos en esquinas, puertas y ventanas.",
      "Visualiza claridad, respeto y resguardo.",
      "Al terminar, deja enfriar completamente el sahumador.",
      "Desecha residuos solo cuando estén fríos.",
    ],
    warnings:
      "No usar humo cerca de personas con asma, bebés, mascotas sensibles o espacios sin ventilación.",
    notes:
      "En prácticas tradicionales, el copal no se usa solo por aroma; también funciona como ofrenda y elemento de respeto.",
    essenceCost: 50,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 29,
  },
  {
    title: "Baño de sal para descarga",
    slug: "bano-de-sal-para-descarga",
    summary:
      "Baño simbólico con sal para descarga corporal suave y cierre de energía pesada.",
    category: "CLEANSING",
    accessLevel: "PREMIUM",
    difficulty: "MEDIUM",
    estimatedMinutes: 20,
    origin:
      "La sal se usa en prácticas populares de limpieza por su asociación con purificación, conservación y corte simbólico.",
    intention:
      "Descargar simbólicamente el cuerpo después de tensión, discusiones o sensación de pesadez.",
    expectedResult: "Sensación de ligereza y cierre del ciclo de carga.",
    repeatEvery: "No más de una vez por semana. Evitar repetir por ansiedad.",
    tags: ["sal", "baño", "descarga", "limpieza"],
    ingredients: [
      "1 cucharada de sal de grano",
      "1 litro de agua tibia",
      "1 recipiente limpio",
      "1 vela blanca opcional",
    ],
    steps: [
      "Disuelve una cucharada de sal de grano en un litro de agua tibia.",
      "Asegúrate de que el agua no esté caliente.",
      "Báñate normalmente primero.",
      "Al final, vierte el agua con sal del cuello hacia abajo.",
      "Evita ojos, heridas, zonas íntimas o piel irritada.",
      "Permanece unos minutos respirando con calma.",
      "No frotes la piel con fuerza.",
      "Si tu piel queda sensible, enjuaga con agua limpia.",
      "Seca el cuerpo con una toalla limpia.",
      "Desecha cualquier resto de agua.",
    ],
    warnings:
      "No usar en piel irritada, heridas, dermatitis o sensibilidad a la sal.",
    notes:
      "La sal puede ser fuerte para algunas personas; por eso se usa poca cantidad y nunca sobre el rostro.",
    essenceCost: 50,
    requiresDisclaimer: false,
    disclaimerVersion: null,
    isPublished: true,
    sortOrder: 30,
  }
];

async function main() {
  for (const ritual of grimoireRituals) {
    const data = {
      ...ritual,
      tags: [...ritual.tags],
      ingredients: [...ritual.ingredients],
      steps: [...ritual.steps],
    };

    await prisma.grimoireRitual.upsert({
      where: {
        slug: data.slug,
      },
      update: data as any,
      create: data as any,
    });
  }

  const total = await prisma.grimoireRitual.count();
  console.log(
    `✅ Seed completado correctamente. ${total} rituales disponibles en el Grimorio.`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
