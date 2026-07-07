"use client";

import { motion } from "framer-motion";
import LibrarySearch from "@/features/library/components/LibrarySearch";
import { tarotLibrary } from "../data/tarotLibrary";
import Link from "next/link";
import TarotLibraryCard from "./TarotLibraryCard";

export default function TarotLibraryIndex() {
  return (
    <main className="min-h-screen bg-[#050308] text-[#f5ead2]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-[#caa46a]">
            Biblioteca
          </p>

          <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Cartas del Tarot
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#d7c7aa]/75">
            Explora el significado de cada una de las cartas del tarot. Descubre
            su simbolismo, interpretación, mensajes y contexto antes de
            llevarlas a una lectura dentro del estudio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mb-14"
        >
          <LibrarySearch />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/biblioteca"
            className="inline-flex items-center justify-center rounded-full border border-[#d7c7aa]/15 bg-transparent px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/80 transition hover:border-[#caa46a]/35 hover:text-[#f7e6c3]"
          >
            Volver a la Biblioteca
          </Link>

          <Link
            href="/reading"
            className="inline-flex items-center justify-center rounded-full border border-[#caa46a]/35 bg-[#caa46a]/10 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] transition hover:bg-[#caa46a]/20"
          >
            Entrar al Estudio
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.04,
              },
            },
          }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {tarotLibrary.map((card) => (
            <motion.div
              key={card.slug}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                  scale: 0.96,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <TarotLibraryCard card={card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
