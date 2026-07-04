"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import EssenceEmptyModal from "@/features/essence/components/EssenceEmptyModal";
import { ESSENCE_COST } from "@/features/essence/core/essencePricing";
import { useEssenceWallet } from "@/features/essence/hooks/useEssenceWallet";
import { useGenerateFortuneCookie } from "../hooks/useGenerateFortuneCookie";
import FortuneCookieModal from "./FortuneCookieModal";

type ReadingDraft = {
  name?: string;
  birthDate?: string;
  zodiacSign?: string;
  topic?: string;
  question?: string;
};

type FortuneCookieExperienceProps = {
  readingDraft?: ReadingDraft | null;
  onBack: () => void;
};

type FortuneStage = "idle" | "shaking" | "opened" | "closing";

export default function FortuneCookieExperience({
  readingDraft,
  onBack,
}: FortuneCookieExperienceProps) {
  const [stage, setStage] = useState<FortuneStage>("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEssenceEmptyModalOpen, setIsEssenceEmptyModalOpen] = useState(false);
  const [hasRegeneratedCookie, setHasRegeneratedCookie] = useState(false);

  const {
    balance,
    spendEssences,
    isSpending,
    error: essenceError,
  } = useEssenceWallet();

  const {
    fortune,
    isGenerating,
    error: fortuneError,
    generateFortune,
    resetFortune,
  } = useGenerateFortuneCookie();

  const isClosing = stage === "closing";
  const isOpened = stage === "opened" || isClosing;
  const isShaking = stage === "shaking" || isGenerating;
  const hasFortune = Boolean(fortune);
  const error = fortuneError;

  async function handleOpenFortune() {
    if (stage !== "idle" || isGenerating || isSpending) return;

    if (balance < ESSENCE_COST.FORTUNE_COOKIE) {
      setIsEssenceEmptyModalOpen(true);
      return;
    }

    const updatedWallet = await spendEssences({
      amount: ESSENCE_COST.FORTUNE_COOKIE,
      module: "FORTUNE_COOKIE",
      reason: "Fortune cookie opening",
    });

    if (!updatedWallet) {
      if (essenceError?.toLowerCase().includes("not enough")) {
        setIsEssenceEmptyModalOpen(true);
      }

      return;
    }

    setStage("shaking");

    const generatedFortune = await generateFortune({
      userContext: readingDraft ?? undefined,
    });

    if (generatedFortune) {
      setStage("opened");

      window.setTimeout(() => {
        setIsModalOpen(true);
      }, 450);
    } else {
      setStage("idle");
    }
  }

  async function handleReset() {
    if (isClosing) return;

    setIsModalOpen(false);
    setStage("closing");

    await new Promise((resolve) => setTimeout(resolve, 650));

    resetFortune();
    setHasRegeneratedCookie(true);
    setStage("idle");
  }

  return (
    <>
      <motion.div
        key="fortune-cookie-experience"
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        transition={{ delay: 0.2, duration: 0.65 }}
        className="absolute inset-0 z-[70] flex flex-col items-center justify-end px-5 pb-[7%] text-center sm:pb-[9%]"
      >
        <div className="pointer-events-none absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full bg-[#f1c27d]/12 blur-3xl" />

        <motion.div
          key={stage === "idle" ? "closed-cookie" : "active-cookie"}
          className="relative mb-7 aspect-square w-[150px] sm:w-[230px]"
          initial={
            stage === "idle" && hasRegeneratedCookie
              ? {
                  opacity: 0,
                  y: 18,
                  scale: 0.88,
                  rotate: -3,
                  filter: "blur(6px)",
                }
              : false
          }
          animate={
            isClosing
              ? {
                  opacity: [1, 0],
                  y: [0, 22],
                  scale: [1, 0.82],
                  rotate: [0, -8],
                  filter: ["blur(0px)", "blur(8px)"],
                }
              : isShaking
                ? {
                    opacity: 1,
                    x: [0, -7, 7, -6, 6, -4, 4, 0],
                    y: [0, -2, 2, -1, 1, 0],
                    rotate: [0, -4, 4, -3, 3, -1, 1, 0],
                    scale: [1, 1.03, 1.02, 1.04, 1],
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 1,
                    y: [0, -3, 0],
                    scale: [1, 1.025, 1],
                    rotate: isOpened ? [0, -0.6, 0.6, 0] : [0, 0, 0],
                    filter: "blur(0px)",
                  }
          }
          transition={
            isClosing
              ? {
                  duration: 0.65,
                  ease: "easeInOut",
                }
              : isShaking
                ? {
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
          }
        >
          <Image
            src={
              isOpened
                ? "/images/objects/fortune-cookie-01-open.png"
                : "/images/objects/fortune-cookie-01.png"
            }
            alt={
              isOpened
                ? "Galleta de la fortuna abierta"
                : "Galleta de la fortuna"
            }
            fill
            priority
            sizes="(max-width: 640px) 170px, 260px"
            className="object-contain drop-shadow-[0_34px_46px_rgba(0,0,0,0.72)]"
          />
        </motion.div>

        <div className="relative z-10 w-full max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#caa46a]/70">
            Fortuna
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#f5ead2] sm:text-4xl">
            {hasFortune && !isClosing
              ? "Tu fortuna está lista."
              : "Rompe la galleta."}
          </h2>

          <AnimatePresence mode="wait">
            {!hasFortune || isClosing ? (
              <motion.p
                key={isClosing ? "closing" : "intro"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#d7c7aa]/65"
              >
                {isClosing
                  ? "La mesa recoge la señal anterior y prepara una nueva galleta."
                  : isShaking
                    ? "La galleta tiembla mientras la señal toma forma."
                    : "La fortuna no predice. Refleja una señal breve: a veces dulce, a veces incómoda."}
              </motion.p>
            ) : (
              <motion.p
                key="ready"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#d7c7aa]/65"
              >
                La galleta se abrió. Tu fortuna está lista para revelarse.
              </motion.p>
            )}
          </AnimatePresence>

          {error ? (
            <p className="mt-4 text-xs text-red-200/80">{error}</p>
          ) : null}

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {!hasFortune || isClosing ? (
              <button
                type="button"
                onClick={handleOpenFortune}
                disabled={stage !== "idle" || isGenerating || isSpending}
                className="rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-8 py-3 text-xs uppercase tracking-[0.32em] text-[#f8e7c4] shadow-[0_0_40px_rgba(202,164,106,0.16)] transition hover:bg-[#caa46a]/25 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {isClosing
                  ? "Preparando..."
                  : isSpending
                    ? "Invocando..."
                    : isShaking
                      ? "Abriendo..."
                      : "Abrir fortuna"}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-8 py-3 text-xs uppercase tracking-[0.32em] text-[#f8e7c4] shadow-[0_0_40px_rgba(202,164,106,0.16)] transition hover:bg-[#caa46a]/25"
                >
                  Abrir lectura
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isClosing}
                  className="rounded-full border border-[#caa46a]/20 bg-black/20 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/55 transition hover:bg-black/35 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Nueva fortuna
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onBack}
              disabled={isShaking || isClosing || isSpending}
              className="rounded-full border border-[#caa46a]/20 bg-black/20 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/55 transition hover:bg-black/35 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Volver
            </button>
          </div>
        </div>
      </motion.div>

      <FortuneCookieModal
        isOpen={isModalOpen}
        fortune={fortune}
        onClose={() => setIsModalOpen(false)}
      />

      <EssenceEmptyModal
        isOpen={isEssenceEmptyModalOpen}
        requiredAmount={ESSENCE_COST.FORTUNE_COOKIE}
        currentBalance={balance}
        onClose={() => setIsEssenceEmptyModalOpen(false)}
      />
    </>
  );
}