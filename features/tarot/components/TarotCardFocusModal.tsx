"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { DrawnTarotCard } from "@/features/tarot/core/tarot.types";

type TarotCardFocusModalProps = {
  drawnCard: DrawnTarotCard | null;
  selectionOrder: number;
  message: string;
  onClose: () => void;
};

const positionLabels: Record<DrawnTarotCard["position"], string> = {
  PAST: "Pasado / energía inicial",
  PRESENT: "Presente / conflicto",
  ADVICE: "Consejo / dirección",
};

export default function TarotCardFocusModal({
  drawnCard,
  selectionOrder,
  message,
  onClose,
}: TarotCardFocusModalProps) {
  return (
    <AnimatePresence>
      {drawnCard ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Cerrar vista de carta"
            onClick={onClose}
            className="absolute inset-0 cursor-default"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 grid max-h-[92dvh] w-full max-w-5xl gap-5 overflow-y-auto rounded-[32px] border border-[#caa46a]/25 bg-[#0b0608]/95 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.75)] sm:grid-cols-[minmax(220px,360px)_1fr] sm:p-7"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full border border-[#caa46a]/20 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#d7c7aa]/70 transition hover:bg-[#caa46a]/10"
            >
              Cerrar
            </button>

            <div className="flex justify-center pt-10 sm:pt-4">
              <div className="relative aspect-[0.66] w-[min(62vw,230px)] sm:w-full sm:max-w-[330px]">
                <Image
                  src={drawnCard.card.imageSrc}
                  alt={drawnCard.card.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 65vw, 360px"
                  className={`object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.75)] ${
                    drawnCard.orientation === "REVERSED" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center pb-2 text-center sm:pr-4 sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#caa46a]/70">
                Carta {selectionOrder} · {positionLabels[drawnCard.position]}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#f5ead2] sm:text-5xl">
                {drawnCard.card.name}
              </h2>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full border border-[#caa46a]/20 bg-[#caa46a]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#d7c7aa]/75">
                  {drawnCard.orientation === "REVERSED"
                    ? "Invertida"
                    : "Normal"}
                </span>

                <span className="rounded-full border border-[#caa46a]/20 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#d7c7aa]/65">
                  {drawnCard.card.arcana === "MAJOR"
                    ? "Arcano mayor"
                    : "Arcano menor"}
                </span>
              </div>

              <p className="mt-6 text-sm leading-7 text-[#d7c7aa]/78 sm:text-base sm:leading-8">
                {message}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}