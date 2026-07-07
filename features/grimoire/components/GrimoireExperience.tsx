"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import BookStage from "@/features/cleansing/components/book/BookStage";
import GrimoireBook from "./GrimoireBook";

type GrimoireExperienceProps = {
  onBack: () => void;
};

type GrimoireState = "closed" | "opening" | "index";

const CLOSED_GRIMOIRE_IMAGE = "/images/objects/grimoire-01.png";

export default function GrimoireExperience({ onBack }: GrimoireExperienceProps) {
  const [grimoireState, setGrimoireState] = useState<GrimoireState>("closed");

  const isOpen = grimoireState === "index";

  function handleOpenGrimoire() {
    if (grimoireState !== "closed") return;

    setGrimoireState("opening");

    window.setTimeout(() => {
      setGrimoireState("index");
    }, 900);
  }

  return (
    <motion.div
      key="grimoire"
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      transition={{ delay: 0.2, duration: 0.65 }}
      className="absolute inset-0 z-[70] overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-80 w-80 -translate-x-1/2 rounded-full bg-[#7b2d1d]/20 blur-3xl" />

      {!isOpen ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-8 text-center">
          <motion.button
            type="button"
            onClick={handleOpenGrimoire}
            disabled={grimoireState === "opening"}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={
              grimoireState === "opening"
                ? {
                    y: -10,
                    scale: [1, 1.05, 1.16],
                    rotateY: [0, -12, -48],
                    rotateZ: [-4, -2, 0],
                    filter: ["blur(0px)", "blur(0px)", "blur(5px)"],
                  }
                : {
                    y: [0, -6, 0],
                    scale: [1, 1.025, 1],
                    rotate: [-4, -3, -4],
                    filter: "blur(0px)",
                  }
            }
            transition={
              grimoireState === "opening"
                ? { duration: 0.9, ease: "easeInOut" }
                : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative aspect-square w-[190px] cursor-pointer sm:w-[310px]"
            aria-label="Abrir Grimorio"
          >
            <Image
              src={CLOSED_GRIMOIRE_IMAGE}
              alt="Grimorio cerrado"
              fill
              priority
              sizes="(max-width: 640px) 220px, 330px"
              className="object-contain drop-shadow-[0_34px_48px_rgba(0,0,0,0.78)]"
            />
          </motion.button>

          <p className="mt-7 text-[10px] uppercase tracking-[0.42em] text-[#caa46a]/70">
            Archivo ritual
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#f5ead2] sm:text-4xl">
            {grimoireState === "opening"
              ? "El grimorio despierta."
              : "Abre el Grimorio."}
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#d7c7aa]/65">
            Consulta rituales tradicionales, prácticas reservadas y Rituales
            Oscuros del estudio.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleOpenGrimoire}
              disabled={grimoireState === "opening"}
              className="rounded-full border border-[#caa46a]/45 bg-[#7b2d1d]/25 px-8 py-3 text-xs uppercase tracking-[0.32em] text-[#f8e7c4] shadow-[0_0_40px_rgba(123,45,29,0.24)] transition hover:bg-[#7b2d1d]/35 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {grimoireState === "opening" ? "Abriendo..." : "Abrir grimorio"}
            </button>

            <button
              type="button"
              onClick={onBack}
              disabled={grimoireState === "opening"}
              className="rounded-full border border-[#caa46a]/20 bg-black/20 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/65 transition hover:bg-black/35 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Volver
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          key="open-grimoire"
          initial={{ opacity: 0, y: 20, scale: 0.86, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 16, scale: 0.9, filter: "blur(8px)" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <BookStage>
            <GrimoireBook />
          </BookStage>

          <button
            type="button"
            onClick={onBack}
            className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#caa46a]/20 bg-black/30 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/65 backdrop-blur-xl transition hover:bg-black/45"
          >
            Volver a la mesa
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}