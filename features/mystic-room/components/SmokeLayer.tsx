"use client";

import { motion } from "framer-motion";

export default function SmokeLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <motion.div
        animate={{
          x: [-80, 40, -20],
          y: [20, -40, 10],
          opacity: [0.08, 0.18, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[35%] h-72 w-72 rounded-full bg-[#d8c7aa]/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [60, -30, 80],
          y: [40, -20, 20],
          opacity: [0.06, 0.14, 0.08],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-[42%] h-80 w-80 rounded-full bg-[#c0a890]/20 blur-3xl"
      />
    </div>
  );
}