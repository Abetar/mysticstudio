"use client";

import { motion } from "framer-motion";
import {
  tarotReadingEngine,
  type TarotReadingContext,
} from "@/features/tarot/core/tarotReadingEngine";
import type { DrawnTarotCard } from "@/features/tarot/core/tarot.types";

type TarotCardReadingMessageProps = {
  drawnCard: DrawnTarotCard | null;
  selectionOrder: number;
  context?: TarotReadingContext;
  onOpenFocus?: () => void;
};

export default function TarotCardReadingMessage({
  drawnCard,
  selectionOrder,
  context,
  onOpenFocus,
}: TarotCardReadingMessageProps) {
  if (!drawnCard) return null;

  const message = tarotReadingEngine.readCard(drawnCard, context);

  return (
    <motion.div
      key={`${drawnCard.card.id}-${selectionOrder}`}
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto mt-4 max-w-lg rounded-3xl border border-[#caa46a]/20 bg-black/30 px-5 py-4 text-left shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md"
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#caa46a]/70">
        Carta {selectionOrder} ·{" "}
        {tarotReadingEngine.getPositionLabel(drawnCard.position)}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#f5ead2]">
          {drawnCard.card.name}
        </h3>

        <span className="rounded-full border border-[#caa46a]/20 bg-[#caa46a]/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-[#d7c7aa]/70">
          {drawnCard.orientation === "REVERSED" ? "Invertida" : "Normal"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/72">{message}</p>

      {onOpenFocus ? (
        <button
          type="button"
          onClick={onOpenFocus}
          className="mt-4 rounded-full border border-[#caa46a]/25 bg-[#caa46a]/10 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#f7e6c3]/80 transition hover:bg-[#caa46a]/20"
        >
          Ver carta
        </button>
      ) : null}
    </motion.div>
  );
}