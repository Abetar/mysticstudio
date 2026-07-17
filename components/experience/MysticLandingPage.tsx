"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { TAROT_DECK } from "@/features/tarot/core/tarotDeck";

const featuredCardContent: Record<
  string,
  {
    concept: string;
    description: string;
  }
> = {
  "la-muerte": {
    concept: "Transformación",
    description: "Finales, cambios profundos y nuevos comienzos.",
  },
  "la-emperatriz": {
    concept: "Creación",
    description: "Abundancia, fertilidad y poder creativo.",
  },
  "el-loco": {
    concept: "Comienzo",
    description: "Libertad, impulso y caminos desconocidos.",
  },
  "la-luna": {
    concept: "Intuición",
    description: "Misterio, emociones y verdades ocultas.",
  },
  "el-diablo": {
    concept: "Deseo",
    description: "Apegos, tentaciones y límites personales.",
  },
  "la-estrella": {
    concept: "Esperanza",
    description: "Renovación, confianza y claridad.",
  },
};

const featuredOrder = [
  "la-muerte",
  "la-emperatriz",
  "el-loco",
  "la-luna",
  "el-diablo",
  "la-estrella",
];

const featuredCards = TAROT_DECK.filter(
  (card) => card.slug in featuredCardContent,
)
  .map((card) => ({
    ...card,
    ...featuredCardContent[card.slug],
  }))
  .sort(
    (cardA, cardB) =>
      featuredOrder.indexOf(cardA.slug) - featuredOrder.indexOf(cardB.slug),
  );

const libraryTopics = [
  "Significado",
  "Simbolismo",
  "Amor",
  "Trabajo",
  "Dinero",
  "Espiritualidad",
  "Carta invertida",
];

const disciplines = [
  {
    title: "Lecturas de Tarot",
    description: "Una lectura construida alrededor de tu pregunta.",
    image: "/images/objects/tarot-deck-01.png",
  },
  {
    title: "Galletas del Destino",
    description: "Una señal breve cuando no necesitas una lectura completa.",
    image: "/images/objects/fortune-cookie-01.png",
  },
  {
    title: "Libro de Limpias",
    description: "Recetas tradicionales de limpieza y protección.",
    image: "/images/objects/ritual-bowl-01.png",
  },
  {
    title: "El Grimorio",
    description: "Rituales y tradiciones reservadas dentro del Estudio.",
    image: "/images/objects/grimoire-01.png",
  },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const slowReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.95,
      ease: "easeOut",
    },
  },
};

export default function MysticLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050308] text-[#f5ead2]">
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-5 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,120,63,0.19),transparent_42%),linear-gradient(to_bottom,#0b0608,#050308_72%)]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2.4 }}
          className="absolute inset-0 bg-[url('/images/textures/noise.png')]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 0.34, scale: 1 }}
          transition={{ duration: 3.2, ease: "easeOut" }}
          className="pointer-events-none absolute bottom-[-120px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#b66b38]/20 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mb-7 text-xs tracking-[0.36em] text-[#caa46a]"
          >
            MYSTIC STUDIO
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 1.05,
              ease: "easeOut",
            }}
            className="mx-auto max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-7xl lg:text-8xl"
          >
            Explora las 78 cartas
            <br />
            del tarot.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#d7c7aa]/76 sm:text-base"
          >
            Significado, simbolismo e interpretaciones para cada carta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/biblioteca/tarot"
                className="inline-flex rounded-full border border-[#caa46a]/45 bg-[#caa46a]/12 px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] shadow-[0_0_44px_rgba(202,164,106,0.2)] transition hover:bg-[#caa46a]/22"
              >
                Explorar las cartas
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/room"
                className="inline-flex rounded-full border border-[#d7c7aa]/15 bg-[#050308]/40 px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/80 transition hover:border-[#caa46a]/35 hover:text-[#f7e6c3]"
              >
                Entrar al Estudio
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CARTAS DESTACADAS */}
      <section className="relative border-y border-[#caa46a]/10 bg-[#09060c] px-5 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,76,37,0.11),transparent_46%)]" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Comienza por una carta.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#d7c7aa]/70">
              Elige el arcano que más despierte tu curiosidad.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCards.map((card, index) => (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -7 }}
              >
                <Link
                  href={`/biblioteca/tarot/${card.slug}`}
                  className="group flex h-full min-h-[220px] overflow-hidden rounded-[1.8rem] border border-[#caa46a]/14 bg-[#0c070b] shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition hover:border-[#caa46a]/38"
                >
                  <div className="relative w-[43%] min-w-[125px] overflow-hidden bg-[#070407]">
                    <Image
                      src={card.imageSrc}
                      alt={`Carta de tarot ${card.name}`}
                      fill
                      sizes="(max-width: 640px) 43vw, (max-width: 1024px) 22vw, 14vw"
                      className="object-contain p-4 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition duration-500 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(5,3,8,0.42))]" />
                  </div>

                  <div className="flex flex-1 flex-col justify-center px-5 py-6">
                    <p className="text-xs tracking-[0.16em] text-[#caa46a]">
                      {card.concept}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold text-[#f7e6c3]">
                      {card.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/66">
                      {card.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/biblioteca/tarot"
              className="inline-flex rounded-full border border-[#caa46a]/35 bg-[#caa46a]/10 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] transition hover:bg-[#caa46a]/20"
            >
              Ver las 78 cartas
            </Link>
          </div>
        </div>
      </section>

      {/* BIBLIOTECA */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Mucho más que una definición.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#d7c7aa]/70">
              Explora cada carta desde distintas perspectivas.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3"
          >
            {libraryTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-[#caa46a]/15 bg-[#0b070a] px-5 py-3 text-sm text-[#e4d4b7]/78"
              >
                {topic}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-10"
          >
            <Link
              href="/biblioteca/tarot"
              className="inline-flex rounded-full border border-[#d7c7aa]/15 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/78 transition hover:border-[#caa46a]/35 hover:text-[#f7e6c3]"
            >
              Abrir la Biblioteca
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ESTUDIO */}
      <motion.section
        id="estudio"
        variants={slowReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative scroll-mt-10 border-y border-[#caa46a]/10 bg-[#09060c] px-5 py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Entra al Estudio y elige tu experiencia.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#d7c7aa]/74">
              Explora la mesa, descubre sus objetos y comienza cuando algo llame
              tu atención.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/room"
                  className="inline-flex rounded-full border border-[#caa46a]/40 bg-[#caa46a]/10 px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] transition hover:bg-[#caa46a]/20"
                >
                  Entrar al Estudio
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/reading"
                  className="inline-flex rounded-full border border-[#d7c7aa]/15 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/75 transition hover:border-[#caa46a]/35 hover:text-[#f7e6c3]"
                >
                  Preparar una lectura
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={slowReveal}
            whileHover={{ scale: 1.012 }}
            className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-[#caa46a]/18 bg-[#120b0d] shadow-[0_0_80px_rgba(0,0,0,0.55)]"
          >
            <Image
              src="/images/textures/ritual-table-wood-01.png"
              alt="Mesa ritual dentro de Mystic Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover opacity-82"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(5,3,8,0.72))]" />
          </motion.div>
        </div>
      </motion.section>

      {/* DISCIPLINAS */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mb-12 max-w-2xl"
          >
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Cada objeto abre una práctica distinta.
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group rounded-[1.8rem] border border-[#caa46a]/14 bg-[#0c070b] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition hover:border-[#caa46a]/34"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4.5 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative mx-auto mb-6 aspect-square w-32"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="128px"
                    className="object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.7)] transition group-hover:scale-105"
                  />
                </motion.div>

                <h3 className="text-lg font-semibold text-[#f7e6c3]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/66">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FILOSOFÍA */}
      <motion.section
        variants={slowReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative px-5 py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(113,63,30,0.16),transparent_45%)]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Explora. Interpreta. Decide.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#d7c7aa]/72">
            Las cartas pueden ofrecer otra perspectiva. La decisión sigue siendo
            tuya.
          </p>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <section className="px-5 pb-28 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mx-auto max-w-4xl rounded-[2rem] border border-[#caa46a]/18 bg-[#0b070a] px-6 py-14 text-center shadow-[0_0_90px_rgba(202,164,106,0.08)]"
        >
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            ¿Por dónde quieres comenzar?
          </h2>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/biblioteca/tarot"
                className="inline-flex rounded-full border border-[#caa46a]/40 bg-[#caa46a]/10 px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] transition hover:bg-[#caa46a]/20"
              >
                Explorar el tarot
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/room"
                className="inline-flex rounded-full border border-[#d7c7aa]/15 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/75 transition hover:border-[#caa46a]/35 hover:text-[#f7e6c3]"
              >
                Entrar al Estudio
              </Link>
            </motion.div>
          </div>

          <Link
            href="/reading"
            className="mt-6 inline-flex text-sm text-[#caa46a]/75 underline-offset-4 transition hover:text-[#f0c98e] hover:underline"
          >
            Quiero preparar una lectura de tarot
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
