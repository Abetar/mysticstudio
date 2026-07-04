"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { DrawnTarotCard } from "@/features/tarot/core/tarot.types";

const ritualMessages = [
  "La mesa interpreta los símbolos...",
  "Las cartas comienzan a revelar conexiones...",
  "Uniendo pasado, presente y consejo...",
  "El velo empieza a abrirse...",
  "La lectura está tomando forma...",
];

type Props = {
  isVisible: boolean;
  cards: DrawnTarotCard[];
};

export default function TarotReadingLoader({ isVisible, cards }: Props) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % ritualMessages.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed inset-0 z-[135] flex items-center justify-center overflow-hidden bg-[#020103]/88 px-5 text-[#f5ead2] backdrop-blur-2xl"
        >
          <motion.div
            aria-hidden
            animate={{
              opacity: [0.18, 0.42, 0.18],
              scale: [0.9, 1.12, 0.9],
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#caa46a]/25 blur-3xl"
          />

          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#caa46a]/10"
          />

          <div className="relative z-10 w-full max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-[#caa46a]/75"
            >
              MysticStudio
            </motion.p>

            <div className="relative mx-auto mt-10 h-[260px] max-w-xl sm:h-[320px]">
              {cards.map((drawnCard, index) => {
                const positions = [
                  "left-[18%] top-[25%] rotate-[-10deg]",
                  "left-1/2 top-[8%] -translate-x-1/2 rotate-[2deg]",
                  "right-[18%] top-[25%] rotate-[10deg]",
                ];

                return (
                  <motion.div
                    key={`${drawnCard.card.id}-${drawnCard.position}`}
                    initial={{ opacity: 0, y: 30, scale: 0.85 }}
                    animate={{
                      opacity: 1,
                      y: [0, -12, 0],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      opacity: { delay: index * 0.18, duration: 0.5 },
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.25,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.25,
                        ease: "easeInOut",
                      },
                    }}
                    className={`absolute aspect-[0.66] w-[88px] sm:w-[128px] ${positions[index]}`}
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 24px rgba(202,164,106,0.18)",
                          "0 0 70px rgba(202,164,106,0.52)",
                          "0 0 24px rgba(202,164,106,0.18)",
                        ],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        delay: index * 0.35,
                      }}
                      className="relative h-full w-full rounded-xl"
                    >
                      <Image
                        src={drawnCard.card.imageSrc}
                        alt={drawnCard.card.name}
                        fill
                        sizes="140px"
                        className={`object-contain drop-shadow-[0_30px_55px_rgba(0,0,0,0.8)] ${
                          drawnCard.orientation === "REVERSED"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}

              <motion.div
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0.8, 1.25, 0.8],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7d79a]/30 blur-2xl"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.h2
                key={messageIndex}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.45 }}
                className="mx-auto mt-2 max-w-xl text-2xl font-semibold tracking-[-0.04em] sm:text-4xl"
              >
                {ritualMessages[messageIndex]}
              </motion.h2>
            </AnimatePresence>

            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto mt-8 h-px w-64 bg-[#caa46a]/50"
            />

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#d7c7aa]/65">
              No cierres esta ventana. La lectura se abrirá cuando la mesa
              termine de interpretar las cartas.
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}