"use client";

import { motion } from "framer-motion";

export default function CandleGlow() {
  return (
    <>
      <motion.div
        animate={{
          opacity: [0.28, 0.5, 0.34, 0.46, 0.3],
          scale: [1, 1.08, 0.98, 1.05, 1],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[16%] top-[22%] h-52 w-52 rounded-full bg-[#f0a94c]/25 blur-3xl"
      />

      <motion.div
        animate={{
          opacity: [0.18, 0.38, 0.22, 0.34],
          scale: [1, 1.12, 1.04, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[18%] top-[28%] h-44 w-44 rounded-full bg-[#f5c16f]/20 blur-3xl"
      />
    </>
  );
}