"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { DrawnTarotCard } from "@/features/tarot/core/tarot.types";

type SelectableTarotCardsProps = {
  drawnCards: DrawnTarotCard[];
  selectedCards: number[];
  onSelectCard: (cardIndex: number) => void;
};

const cardSlots = [
  {
    label: "Carta 1",
    wrapperClass: "left-[13%] top-[7%] sm:left-[27%] sm:top-[9%]",
    rotate: -8,
  },
  {
    label: "Carta 2",
    wrapperClass: "left-1/2 top-[4%] -translate-x-1/2 sm:top-[6%]",
    rotate: 2,
  },
  {
    label: "Carta 3",
    wrapperClass: "right-[13%] top-[7%] sm:right-[27%] sm:top-[9%]",
    rotate: 9,
  },
];

const positionLabels: Record<DrawnTarotCard["position"], string> = {
  PAST: "Pasado",
  PRESENT: "Presente",
  ADVICE: "Consejo",
};

export default function SelectableTarotCards({
  drawnCards,
  selectedCards,
  onSelectCard,
}: SelectableTarotCardsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[55]">
      {drawnCards.map((drawnCard, index) => {
        const slot = cardSlots[index];
        if (!slot) return null;

        const isSelected = selectedCards.includes(index);
        const selectionOrder = selectedCards.indexOf(index) + 1;

        return (
          <motion.button
            key={drawnCard.card.id}
            type="button"
            onClick={() => onSelectCard(index)}
            initial={{ opacity: 0, y: 28, scale: 0.88 }}
            animate={{
              opacity: 1,
              y: isSelected ? -18 : 0,
              scale: isSelected ? 1.05 : 1,
            }}
            whileHover={{
              y: isSelected ? -18 : -8,
              scale: isSelected ? 1.06 : 1.04,
            }}
            transition={{
              delay: 0.2 + index * 0.14,
              duration: 0.55,
              ease: "easeOut",
            }}
            className={`pointer-events-auto absolute aspect-[0.72] w-[96px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#caa46a]/70 sm:w-[132px] ${slot.wrapperClass}`}
            aria-label={`${slot.label}: ${positionLabels[drawnCard.position]}`}
          >
            <motion.div
              animate={{
                rotate: slot.rotate,
                rotateY: isSelected ? 180 : 0,
              }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="pointer-events-none relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src="/images/objects/tarot-deck-01.png"
                  alt={slot.label}
                  fill
                  sizes="(max-width: 640px) 100px, 140px"
                  className="object-contain drop-shadow-[0_26px_34px_rgba(0,0,0,0.72)]"
                />
              </div>

              <div
                className="absolute inset-0"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src={drawnCard.card.imageSrc}
                  alt={drawnCard.card.name}
                  fill
                  sizes="(max-width: 640px) 100px, 140px"
                  className={`object-contain drop-shadow-[0_30px_38px_rgba(0,0,0,0.76)] ${
                    drawnCard.orientation === "REVERSED" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </motion.div>

            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#caa46a]/20 bg-black/35 px-3 py-1 text-[8px] uppercase tracking-[0.22em] text-[#caa46a]/75 backdrop-blur-sm sm:text-[9px]">
              {positionLabels[drawnCard.position]}
            </span>

            {isSelected ? (
              <span className="pointer-events-none absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#caa46a]/60 bg-[#120b10] text-xs text-[#f7e6c3] shadow-[0_0_24px_rgba(202,164,106,0.25)]">
                {selectionOrder}
              </span>
            ) : null}
          </motion.button>
        );
      })}
    </div>
  );
}