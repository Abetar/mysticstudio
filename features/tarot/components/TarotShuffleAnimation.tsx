"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type TarotShuffleAnimationProps = {
  isShuffling: boolean;
};

const ghostCards = Array.from({ length: 10 }).map((_, index) => ({
  id: index,
  x: [-8, index % 2 === 0 ? -82 - index * 3 : 82 + index * 3, 0],
  y: [0, index % 3 === 0 ? -28 : 18, 0],
  rotate: [0, index % 2 === 0 ? -18 - index : 18 + index, 0],
  delay: index * 0.035,
}));

export default function TarotShuffleAnimation({
  isShuffling,
}: TarotShuffleAnimationProps) {
  if (!isShuffling) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex items-start justify-center pt-[8%]">
      <div className="relative h-[230px] w-[230px]">
        {ghostCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 0.92,
              filter: "blur(2px)",
            }}
            animate={{
              opacity: [0, 0.95, 0.9, 0],
              x: card.x,
              y: card.y,
              rotate: card.rotate,
              scale: [0.92, 1.04, 1, 0.96],
              filter: ["blur(2px)", "blur(0px)", "blur(0px)", "blur(4px)"],
            }}
            transition={{
              delay: card.delay,
              duration: 1.15,
              ease: "easeInOut",
              repeat: 1,
              repeatType: "mirror",
            }}
            className="absolute left-1/2 top-0 aspect-[0.72] w-[115px] -translate-x-1/2"
          >
            <Image
              src="/images/objects/tarot-deck-01.png"
              alt=""
              fill
              sizes="140px"
              className="object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{ duration: 1.4, repeat: 1 }}
          className="absolute left-1/2 top-20 h-32 w-64 -translate-x-1/2 rounded-full bg-[#d6a75f]/20 blur-3xl"
        />
      </div>
    </div>
  );
}