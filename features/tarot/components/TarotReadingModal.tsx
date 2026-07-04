"use client";

import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import Image from "next/image";
import { useRef, useState } from "react";
import type { DrawnTarotCard } from "@/features/tarot/core/tarot.types";
import TarotReadingExportCard from "@/features/tarot/components/TarotReadingExportCard";
import type { GeneratedTarotReading } from "@/features/tarot/hooks/useGenerateTarotReading";

type ReadingDraft = {
  name?: string;
  birthDate?: string;
  zodiacSign?: string;
  topic?: string;
  question?: string;
};

type TarotReadingModalProps = {
  isOpen: boolean;
  reading: GeneratedTarotReading | null;
  cards: DrawnTarotCard[];
  readingDraft: ReadingDraft | null;
  onClose: () => void;
};

const topicLabels: Record<string, string> = {
  LOVE: "Amor",
  MONEY: "Dinero",
  WORK: "Trabajo",
  HEALTH: "Salud",
  SPIRITUALITY: "Espiritualidad",
  GENERAL: "General",
};

const positionLabels: Record<DrawnTarotCard["position"], string> = {
  PAST: "Pasado",
  PRESENT: "Presente",
  ADVICE: "Consejo",
};

export default function TarotReadingModal({
  isOpen,
  reading,
  cards,
  readingDraft,
  onClose,
}: TarotReadingModalProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!reading) return null;

  async function handleDownloadImage() {
    if (!exportRef.current || !reading) return;

    setIsExporting(true);

    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 1,
        backgroundColor: "#070407",
      });

      const link = document.createElement("a");
      link.download = `mysticstudio-lectura-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[140] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Cerrar lectura completa"
            onClick={onClose}
            className="absolute inset-0 cursor-default"
          />

          <motion.div
            aria-hidden
            animate={{
              opacity: [0.35, 0.65, 0.35],
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none fixed left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#caa46a]/20 blur-3xl"
          />

          <motion.article
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-[34px] border border-[#caa46a]/25 bg-[#090507]/95 p-5 text-[#f5ead2] shadow-[0_40px_160px_rgba(0,0,0,0.8)] sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_50%_0%,rgba(202,164,106,0.18),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full border border-[#caa46a]/20 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#d7c7aa]/70 transition hover:bg-[#caa46a]/10"
            >
              Cerrar
            </button>

            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.42em] text-[#caa46a]/75">
                MysticStudio
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
                {reading.title}
              </h2>

              <div className="mt-6 grid gap-3 rounded-3xl border border-[#caa46a]/15 bg-black/25 p-4 text-sm text-[#d7c7aa]/75 sm:grid-cols-2">
                <p>
                  <span className="text-[#caa46a]/80">Nombre:</span>{" "}
                  {readingDraft?.name || "No definido"}
                </p>
                <p>
                  <span className="text-[#caa46a]/80">Tema:</span>{" "}
                  {readingDraft?.topic
                    ? topicLabels[readingDraft.topic]
                    : "General"}
                </p>
                <p>
                  <span className="text-[#caa46a]/80">Signo:</span>{" "}
                  {readingDraft?.zodiacSign || "No definido"}
                </p>
                <p>
                  <span className="text-[#caa46a]/80">Fecha:</span>{" "}
                  {readingDraft?.birthDate || "No definida"}
                </p>
                <p className="sm:col-span-2">
                  <span className="text-[#caa46a]/80">Pregunta:</span>{" "}
                  {readingDraft?.question?.trim() || "Lectura general"}
                </p>
              </div>

              <p className="mt-6 text-sm leading-7 text-[#d7c7aa]/78 sm:text-base">
                {reading.summary}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {cards.map((drawnCard) => {
                  const generatedCard = reading.cards.find(
                    (item) => item.cardId === drawnCard.card.id,
                  );

                  return (
                    <section
                      key={`${drawnCard.card.id}-${drawnCard.position}`}
                      className="rounded-3xl border border-[#caa46a]/18 bg-black/25 p-4"
                    >
                      <div className="relative mx-auto aspect-[0.66] w-[120px] sm:w-[140px]">
                        <Image
                          src={drawnCard.card.imageSrc}
                          alt={drawnCard.card.name}
                          fill
                          sizes="160px"
                          className={`object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.65)] ${
                            drawnCard.orientation === "REVERSED"
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>

                      <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-[#caa46a]/65">
                        {positionLabels[drawnCard.position]}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                        {drawnCard.card.name}
                      </h3>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#d7c7aa]/45">
                        {drawnCard.orientation === "REVERSED"
                          ? "Invertida"
                          : "Normal"}
                      </p>

                      {generatedCard ? (
                        <>
                          <p className="mt-4 text-sm font-semibold text-[#f7e6c3]">
                            {generatedCard.headline}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/72">
                            {generatedCard.message}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/62">
                            <span className="text-[#caa46a]/80">
                              Advertencia:
                            </span>{" "}
                            {generatedCard.warning}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/72">
                            <span className="text-[#caa46a]/80">Consejo:</span>{" "}
                            {generatedCard.advice}
                          </p>
                        </>
                      ) : null}
                    </section>
                  );
                })}
              </div>

              <div className="mt-8 rounded-3xl border border-[#caa46a]/20 bg-[#caa46a]/10 p-5">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[#caa46a]/70">
                  Lectura final
                </p>

                <p className="mt-4 text-sm leading-7 text-[#f5ead2]/85 sm:text-base sm:leading-8">
                  {reading.finalReading}
                </p>

                <div className="mt-5 rounded-2xl border border-[#caa46a]/15 bg-black/25 p-4 text-sm leading-7 text-[#f7e6c3]/82">
                  {reading.practicalAction}
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  disabled={isExporting}
                  className="rounded-full border border-[#caa46a]/35 bg-black/20 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#f8e7c4] transition hover:bg-[#caa46a]/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isExporting ? "Generando imagen..." : "Descargar imagen"}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#caa46a]/35 bg-[#caa46a]/12 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#f8e7c4] transition hover:bg-[#caa46a]/22"
                >
                  Cerrar lectura
                </button>
              </div>
            </div>
          </motion.article>

          <div className="pointer-events-none fixed -left-[9999px] top-0">
            <div ref={exportRef}>
              <TarotReadingExportCard
                reading={reading}
                cards={cards}
                readingDraft={readingDraft}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}