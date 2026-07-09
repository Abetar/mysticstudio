"use client";

import FortuneCookieExperience from "@/features/fortune-cookie/components/FortuneCookieExperience";
import GrimoireExperience from "@/features/grimoire/components/GrimoireExperience";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import EssenceEmptyModal from "@/features/essence/components/EssenceEmptyModal";
import { ESSENCE_COST } from "@/features/essence/core/essencePricing";
import { useEssenceWallet } from "@/features/essence/hooks/useEssenceWallet";
import SelectableTarotCards from "@/features/tarot/components/SelectableTarotCards";
import TarotCardFocusModal from "@/features/tarot/components/TarotCardFocusModal";
import TarotCardReadingMessage from "@/features/tarot/components/TarotCardReadingMessage";
import TarotReadingLoader from "@/features/tarot/components/TarotReadingLoader";
import TarotReadingModal from "@/features/tarot/components/TarotReadingModal";
import TarotShuffleAnimation from "@/features/tarot/components/TarotShuffleAnimation";
import { tarotEngine } from "@/features/tarot/core/tarotEngine";
import { tarotReadingEngine } from "@/features/tarot/core/tarotReadingEngine";
import { useGenerateTarotReading } from "@/features/tarot/hooks/useGenerateTarotReading";
import CleansingBookExperience from "@/features/cleansing/components/CleansingBookExperience";
import MysticObjectTray from "./MysticObjectTray";
import { useRouter } from "next/navigation";

type TableMode =
  | "idle"
  | "tarot"
  | "shuffling"
  | "selecting"
  | "fortune"
  | "cleansing"
  | "grimoire";

type ReadingDraft = {
  name?: string;
  birthDate?: string;
  zodiacSign?: string;
  topic?: string;
  question?: string;
};

const positionLabels = {
  PAST: "pasado",
  PRESENT: "presente",
  ADVICE: "consejo",
} as const;

function hasValidReadingDraft(readingDraft: ReadingDraft | null) {
  return Boolean(
    readingDraft?.name?.trim() &&
    readingDraft?.birthDate?.trim() &&
    readingDraft?.zodiacSign?.trim() &&
    readingDraft?.topic?.trim(),
  );
}

export default function MysticTable() {
  const [mode, setMode] = useState<TableMode>("idle");
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);
  const [isEssenceEmptyModalOpen, setIsEssenceEmptyModalOpen] = useState(false);
  const [isReadingInfoRequiredModalOpen, setIsReadingInfoRequiredModalOpen] =
    useState(false);
  const [drawSeed, setDrawSeed] = useState(0);
  const [readingDraft, setReadingDraft] = useState<ReadingDraft | null>(null);

  const router = useRouter();

  const {
    balance,
    spendEssences,
    isSpending,
    error: essenceError,
  } = useEssenceWallet();

  const {
    reading,
    isGenerating,
    error: tarotError,
    generateReading,
    resetReading,
  } = useGenerateTarotReading();

  useEffect(() => {
    const storedDraft = localStorage.getItem("mysticstudio.readingDraft");

    if (!storedDraft) return;

    try {
      setReadingDraft(JSON.parse(storedDraft) as ReadingDraft);
    } catch {
      setReadingDraft(null);
    }
  }, []);

  const drawnCards = useMemo(() => {
    return tarotEngine.drawThree({ allowReversed: true });
  }, [drawSeed]);

  const activeCard =
    activeCardIndex !== null ? drawnCards[activeCardIndex] : null;

  const focusedCard =
    focusedCardIndex !== null ? drawnCards[focusedCardIndex] : null;

  const focusedSelectionOrder =
    focusedCardIndex !== null ? selectedCards.indexOf(focusedCardIndex) + 1 : 0;

  const activeSelectionOrder =
    activeCardIndex !== null ? selectedCards.indexOf(activeCardIndex) + 1 : 0;

  const focusedMessage = focusedCard
    ? tarotReadingEngine.readCard(focusedCard, readingDraft ?? undefined)
    : "";

  const isTarotMode =
    mode === "tarot" || mode === "shuffling" || mode === "selecting";

  const isFortuneMode = mode === "fortune";
  const isCleansingMode = mode === "cleansing";
  const isGrimoireMode = mode === "grimoire";
  const isObjectTrayHidden =
    isTarotMode || isFortuneMode || isCleansingMode || isGrimoireMode;

  const error = tarotError;

  const hasReadingInfo = hasValidReadingDraft(readingDraft);

  function handleShuffle() {
    setSelectedCards([]);
    setActiveCardIndex(null);
    setFocusedCardIndex(null);
    setIsReadingModalOpen(false);
    resetReading();
    setMode("shuffling");

    window.setTimeout(() => {
      setDrawSeed((current) => current + 1);
      setMode("selecting");
    }, 2800);
  }

  function handleSelectCard(cardIndex: number) {
    setSelectedCards((current) => {
      if (current.includes(cardIndex)) {
        setActiveCardIndex(cardIndex);
        return current;
      }

      if (current.length >= 3) return current;

      setActiveCardIndex(cardIndex);
      return [...current, cardIndex];
    });
  }

  function resetToTable() {
    setSelectedCards([]);
    setActiveCardIndex(null);
    setFocusedCardIndex(null);
    setIsReadingModalOpen(false);
    resetReading();
    setMode("idle");
  }

  function handleCompleteReadingInfo() {
    setIsReadingInfoRequiredModalOpen(false);
    router.push("/reading");
  }

  async function handleRevealReading() {
    if (!hasReadingInfo) {
      setIsReadingInfoRequiredModalOpen(true);
      return;
    }

    if (balance < ESSENCE_COST.TAROT) {
      setIsEssenceEmptyModalOpen(true);
      return;
    }

    const updatedWallet = await spendEssences({
      amount: ESSENCE_COST.TAROT,
      module: "TAROT",
      reason: "Tarot reading generation",
    });

    if (!updatedWallet) {
      if (essenceError?.toLowerCase().includes("not enough")) {
        setIsEssenceEmptyModalOpen(true);
      }

      return;
    }

    const generatedReading = await generateReading({
      userContext: readingDraft ?? undefined,
      cards: drawnCards,
    });

    if (generatedReading) {
      setIsReadingModalOpen(true);
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 90, rotateX: 18 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
        className="relative h-[760px] w-full max-w-6xl overflow-hidden rounded-t-[64px] border border-[#8f6334]/35 bg-[#211006] shadow-[0_-40px_160px_rgba(202,112,45,0.22)] sm:h-[730px]"
      >
        <Image
          src="/images/textures/ritual-table-wood-01.png"
          alt=""
          fill
          priority
          sizes="1200px"
          className="object-cover opacity-85"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,190,99,0.18),transparent_32%),radial-gradient(circle_at_15%_18%,rgba(255,159,76,0.12),transparent_24%),radial-gradient(circle_at_90%_20%,rgba(255,194,111,0.08),transparent_22%),linear-gradient(to_bottom,rgba(0,0,0,0.04),rgba(0,0,0,0.34))]" />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.74)]" />

        <motion.div
          animate={{
            opacity: mode === "shuffling" || isGenerating ? 0.35 : 0.12,
            scale: mode === "shuffling" || isGenerating ? 1.18 : 1,
          }}
          transition={{ duration: 0.45 }}
          className="absolute left-1/2 top-[17%] z-20 h-64 w-64 -translate-x-1/2 rounded-full bg-[#d6a75f]/12 blur-3xl"
        />

        <TarotShuffleAnimation isShuffling={mode === "shuffling"} />

        <AnimatePresence>
          {mode === "selecting" ? (
            <SelectableTarotCards
              drawnCards={drawnCards}
              selectedCards={selectedCards}
              onSelectCard={handleSelectCard}
            />
          ) : null}
        </AnimatePresence>

        {!isFortuneMode && !isCleansingMode && !isGrimoireMode ? (
          <motion.button
            type="button"
            onClick={() => {
              if (mode === "idle") setMode("tarot");
            }}
            disabled={mode === "shuffling" || mode === "selecting"}
            animate={{
              x: "-50%",
              y: isTarotMode ? -34 : 0,
              scale: mode === "shuffling" ? 0.94 : isTarotMode ? 1.08 : 1,
              opacity: mode === "shuffling" || mode === "selecting" ? 0.25 : 1,
              pointerEvents:
                mode === "shuffling" || mode === "selecting" ? "none" : "auto",
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute left-1/2 top-[15%] z-40 aspect-[0.72] w-[120px] cursor-pointer sm:top-[17%] sm:w-[190px]"
            aria-label="Tarot"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.025, 1],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/objects/tarot-deck-01.png"
                alt="Tarot deck"
                fill
                priority
                sizes="(max-width: 640px) 140px, 220px"
                className="object-contain drop-shadow-[0_34px_42px_rgba(0,0,0,0.72)]"
              />
            </motion.div>

            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.34em] text-[#caa46a]/70">
              Tarot
            </span>
          </motion.button>
        ) : null}

        <AnimatePresence>
          {!isObjectTrayHidden ? (
            <motion.div
              key="objects"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.45 }}
            >
              <MysticObjectTray
                onSelectGrimoire={() => setMode("grimoire")}
                onSelectFortune={() => setMode("fortune")}
                onSelectCleansing={() => setMode("cleansing")}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {mode === "tarot" ? (
            <motion.div
              key="tarot-controls"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              transition={{ delay: 0.25, duration: 0.65 }}
              className="absolute bottom-[9%] left-1/2 z-[70] w-full max-w-xl -translate-x-1/2 px-6 text-center sm:bottom-[13%]"
            >
              <p className="text-[10px] uppercase tracking-[0.42em] text-[#caa46a]/70">
                Tarot
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#f5ead2] sm:text-4xl">
                Baraja el mazo.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#d7c7aa]/65">
                Cuando estés listo, deja que la mesa mezcle las cartas antes de
                elegir tu primera señal.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-8 py-3 text-xs uppercase tracking-[0.32em] text-[#f8e7c4] shadow-[0_0_40px_rgba(202,164,106,0.16)] transition hover:bg-[#caa46a]/25"
                >
                  Barajar
                </button>

                <button
                  type="button"
                  onClick={resetToTable}
                  className="rounded-full border border-[#caa46a]/20 bg-black/20 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/55 transition hover:bg-black/35"
                >
                  Volver
                </button>
              </div>
            </motion.div>
          ) : null}

          {mode === "fortune" ? (
            <FortuneCookieExperience
              readingDraft={readingDraft}
              onBack={resetToTable}
            />
          ) : null}

          {mode === "cleansing" ? (
            <CleansingBookExperience onBack={resetToTable} />
          ) : null}

          {mode === "grimoire" ? (
            <GrimoireExperience onBack={resetToTable} />
          ) : null}

          {mode === "shuffling" ? (
            <motion.div
              key="shuffling-copy"
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.45 }}
              className="absolute bottom-[13%] left-1/2 z-[70] w-full max-w-xl -translate-x-1/2 px-6 text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.42em] text-[#caa46a]/70">
                La mesa responde
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#f5ead2] sm:text-4xl">
                Las cartas se mezclan.
              </h2>
            </motion.div>
          ) : null}

          {mode === "selecting" ? (
            <motion.div
              key="selecting-copy"
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.55 }}
              className="pointer-events-none absolute bottom-[1.5%] left-1/2 z-[70] w-full max-w-3xl -translate-x-1/2 px-4 text-center sm:bottom-[3%] sm:px-6"
            >
              <p className="text-[10px] uppercase tracking-[0.42em] text-[#caa46a]/70">
                Lectura preparada
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#f5ead2] sm:mt-3 sm:text-4xl">
                {selectedCards.length < 3
                  ? `Elige ${3 - selectedCards.length} ${
                      3 - selectedCards.length === 1 ? "carta" : "cartas"
                    }.`
                  : reading
                    ? "La lectura está lista."
                    : "Las tres cartas están listas."}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#d7c7aa]/65 sm:mt-3 sm:leading-7">
                {isGenerating
                  ? "La mesa está interpretando la relación entre tus cartas."
                  : activeCard
                    ? `${activeCard.card.name} ya tomó su lugar como ${
                        positionLabels[activeCard.position]
                      }.`
                    : "Selecciona las cartas que llamen tu atención. El orden marcará pasado, presente y consejo."}
              </p>

              <div className="pointer-events-auto">
                <AnimatePresence mode="wait">
                  <TarotCardReadingMessage
                    drawnCard={activeCard}
                    selectionOrder={activeSelectionOrder}
                    context={readingDraft ?? undefined}
                    onOpenFocus={() => {
                      if (activeCardIndex !== null) {
                        setFocusedCardIndex(activeCardIndex);
                      }
                    }}
                  />
                </AnimatePresence>
              </div>

              <TarotReadingLoader isVisible={isGenerating} cards={drawnCards} />

              {reading ? (
                <div className="pointer-events-auto mt-5">
                  <button
                    type="button"
                    onClick={() => setIsReadingModalOpen(true)}
                    className="rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#f8e7c4] shadow-[0_0_40px_rgba(202,164,106,0.16)] transition hover:bg-[#caa46a]/25"
                  >
                    Abrir lectura completa
                  </button>
                </div>
              ) : null}

              {error ? (
                <p className="pointer-events-auto mt-3 text-xs text-red-200/80">
                  {error}
                </p>
              ) : null}

              <div className="pointer-events-auto mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleShuffle}
                  disabled={isGenerating || isSpending}
                  className="rounded-full border border-[#caa46a]/25 bg-black/20 px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#d7c7aa]/65 transition hover:bg-black/35 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Volver a barajar
                </button>

                <button
                  type="button"
                  onClick={resetToTable}
                  disabled={isGenerating || isSpending}
                  className="rounded-full border border-[#caa46a]/20 bg-black/20 px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#d7c7aa]/55 transition hover:bg-black/35 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Volver a la mesa
                </button>

                {selectedCards.length === 3 && !reading ? (
                  <button
                    type="button"
                    onClick={handleRevealReading}
                    disabled={isGenerating || isSpending}
                    className="rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#f8e7c4] shadow-[0_0_40px_rgba(202,164,106,0.16)] transition hover:bg-[#caa46a]/25 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {isSpending
                      ? "Invocando..."
                      : isGenerating
                        ? "Revelando..."
                        : hasReadingInfo
                          ? "Revelar lectura"
                          : "Completar datos"}
                  </button>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <TarotCardFocusModal
        drawnCard={focusedCard}
        selectionOrder={focusedSelectionOrder}
        message={focusedMessage}
        onClose={() => setFocusedCardIndex(null)}
      />

      <TarotReadingModal
        isOpen={isReadingModalOpen}
        reading={reading}
        cards={drawnCards}
        readingDraft={readingDraft}
        onClose={() => setIsReadingModalOpen(false)}
      />

      <EssenceEmptyModal
        isOpen={isEssenceEmptyModalOpen}
        requiredAmount={ESSENCE_COST.TAROT}
        currentBalance={balance}
        onClose={() => setIsEssenceEmptyModalOpen(false)}
      />

      <AnimatePresence>
        {isReadingInfoRequiredModalOpen ? (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Cerrar aviso de información requerida"
              onClick={() => setIsReadingInfoRequiredModalOpen(false)}
              className="absolute inset-0 cursor-default"
            />

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 w-full max-w-lg rounded-[32px] border border-[#caa46a]/25 bg-[#0b0608]/95 p-6 text-center text-[#f5ead2] shadow-[0_30px_120px_rgba(0,0,0,0.75)]"
            >
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#caa46a]/70">
                Lectura incompleta
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
                Falta información para leerte las cartas
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#d7c7aa]/75">
                Para revelar una lectura completa necesitamos conocer el
                contexto de la persona a quien se le está leyendo: nombre,
                fecha de nacimiento, signo y tema de consulta.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCompleteReadingInfo}
                  className="w-full rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-7 py-3 text-xs uppercase tracking-[0.24em] text-[#f8e7c4] transition hover:bg-[#caa46a]/25 sm:w-auto"
                >
                  Completar información
                </button>

                <button
                  type="button"
                  onClick={() => setIsReadingInfoRequiredModalOpen(false)}
                  className="w-full rounded-full border border-[#caa46a]/20 bg-black/25 px-7 py-3 text-xs uppercase tracking-[0.24em] text-[#d7c7aa]/65 transition hover:bg-black/40 sm:w-auto"
                >
                  Seguir en la mesa
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
