"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const disciplines = [
  {
    title: "La Baraja",
    description:
      "Lecturas de tarot para explorar preguntas sobre amor, trabajo, dinero, decisiones y crecimiento personal.",
    image: "/images/objects/tarot-deck-01.png",
  },
  {
    title: "Las Galletas del Destino",
    description:
      "Una señal rápida cuando no necesitas una lectura completa, solo una respuesta breve para seguir adelante.",
    image: "/images/objects/fortune-cookie-01.png",
  },
  {
    title: "El Libro de Limpias",
    description:
      "Recetas tradicionales de limpieza, protección y equilibrio energético reunidas en una biblioteca ritual.",
    image: "/images/objects/ritual-bowl-01.png",
  },
  {
    title: "El Grimorio",
    description:
      "Un archivo reservado para rituales, tradiciones ocultistas y prácticas esotéricas con acceso controlado.",
    image: "/images/objects/grimoire-01.png",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const slowReveal: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.15, ease: "easeOut" },
  },
};

export default function MysticLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050308] text-[#f5ead2]">
      <section className="relative flex min-h-screen items-center justify-center px-5 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,120,63,0.18),transparent_42%),linear-gradient(to_bottom,#0b0608,#050308_70%)]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2.4 }}
          className="absolute inset-0 bg-[url('/images/textures/noise.png')]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 0.32, scale: 1 }}
          transition={{ duration: 3.2, ease: "easeOut" }}
          className="pointer-events-none absolute bottom-[-120px] left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#b66b38]/20 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1 }}
            className="mb-6 text-[10px] uppercase tracking-[0.46em] text-[#caa46a]"
          >
            Mystic Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1.15, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl"
          >
            Algunas respuestas no se buscan.
            <br />
            Se revelan.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 1 }}
            className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#d7c7aa]/78 sm:text-base"
          >
            Cruza la puerta de un estudio esotérico digital construido con
            madera oscura, velas, lluvia, símbolos antiguos y disciplinas
            místicas reunidas en un mismo lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 0.9 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/reading"
                className="inline-flex rounded-full border border-[#caa46a]/40 bg-[#caa46a]/10 px-8 py-4 text-xs uppercase tracking-[0.3em] text-[#f7e6c3] shadow-[0_0_44px_rgba(202,164,106,0.18)] transition hover:bg-[#caa46a]/20"
              >
                Entrar al estudio
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/biblioteca"
                className="inline-flex rounded-full border border-[#d7c7aa]/15 bg-[#050308]/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-[#d7c7aa]/80 transition hover:border-[#caa46a]/35 hover:text-[#f7e6c3]"
              >
                Explorar biblioteca
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        variants={slowReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
        className="relative border-y border-[#caa46a]/10 bg-[#09060c] px-5 py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div variants={fadeUp}>
            <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-[#caa46a]">
              El Estudio
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              No es una página de tarot. Es un lugar al que entras.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#d7c7aa]/76">
              Mystic Studio recrea la sensación de visitar un estudio esotérico:
              una mesa ritual, objetos simbólicos, libros antiguos y distintas
              prácticas reunidas para explorar preguntas, señales y tradiciones.
            </p>
          </motion.div>

          <motion.div
            variants={slowReveal}
            whileHover={{ scale: 1.015 }}
            className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-[#caa46a]/18 bg-[#120b0d] shadow-[0_0_80px_rgba(0,0,0,0.55)]"
          >
            <Image
              src="/images/textures/ritual-table-wood-01.png"
              alt="Mesa ritual de madera"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(5,3,8,0.78))]" />
          </motion.div>
        </div>
      </motion.section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mb-12 max-w-2xl"
          >
            <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-[#caa46a]">
              Disciplinas
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Cada objeto abre una práctica distinta.
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.12,
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
                    className="object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.7)] transition group-hover:scale-105"
                  />
                </motion.div>

                <h3 className="text-lg font-semibold text-[#f7e6c3]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/68">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        variants={slowReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative px-5 py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(113,63,30,0.16),transparent_45%)]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-[#caa46a]">
            Biblioteca
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Un archivo vivo de símbolos, cartas y tradiciones.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#d7c7aa]/74">
            La Biblioteca reúne conocimiento esotérico de forma seria, ordenada
            y accesible: significados, prácticas, orígenes, advertencias y
            contexto.
          </p>

          <Link
            href="/biblioteca"
            className="mt-9 inline-flex rounded-full border border-[#caa46a]/35 bg-[#caa46a]/10 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] transition hover:bg-[#caa46a]/20"
          >
            Abrir biblioteca
          </Link>
        </div>
      </motion.section>

      <section className="px-5 pb-28 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mx-auto max-w-3xl rounded-[2rem] border border-[#caa46a]/18 bg-[#0b070a] px-6 py-14 text-center shadow-[0_0_90px_rgba(202,164,106,0.08)]"
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-[#caa46a]">
            Cruzar el umbral
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            El estudio está preparado.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#d7c7aa]/72">
            Solo falta tu primera pregunta.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/reading"
                className="inline-flex rounded-full border border-[#caa46a]/40 bg-[#caa46a]/10 px-8 py-4 text-xs uppercase tracking-[0.3em] text-[#f7e6c3] transition hover:bg-[#caa46a]/20"
              >
                Entrar al estudio
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/biblioteca/tarot"
                className="inline-flex rounded-full border border-[#d7c7aa]/15 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.3em] text-[#d7c7aa]/75 transition hover:border-[#caa46a]/35 hover:text-[#f7e6c3]"
              >
                Ver cartas del tarot
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}