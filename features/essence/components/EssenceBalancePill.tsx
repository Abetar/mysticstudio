"use client";

import { motion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";
import { useState } from "react";
import { useEssenceWallet } from "../hooks/useEssenceWallet";
import EssenceCenterModal from "./EssenceCenterModal";

const MAX_VITAL_ESSENCES = 15;

export default function EssenceBalancePill() {
  const [isCenterOpen, setIsCenterOpen] = useState(false);

  const { vitalBalance, eternalBalance, balance, isLoading } =
    useEssenceWallet();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute right-5 top-5 z-[200] sm:right-8 sm:top-8"
      >
        <button
          type="button"
          onClick={() => setIsCenterOpen(true)}
          title={`${balance} Esencias disponibles`}
          className="flex items-center gap-3 rounded-full border border-[#caa46a]/35 bg-black/35 px-4 py-2 backdrop-blur-xl shadow-[0_0_30px_rgba(202,164,106,0.12)] transition hover:bg-black/45"
        >
          <span className="flex items-center gap-1.5">
            <motion.span
              animate={{
                rotate: [0, -10, 10, -6, 6, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <Sparkles size={15} className="text-[#d8b77a]" />
            </motion.span>

            <span className="text-xs font-medium tracking-[0.1em] text-[#f6e8cb]">
              {isLoading ? "..." : `${vitalBalance}/${MAX_VITAL_ESSENCES}`}
            </span>
          </span>

          <span className="h-4 w-px bg-[#caa46a]/20" />

          <span className="flex items-center gap-1.5">
            <Gem size={14} className="text-[#d8b77a]/80" />

            <span className="text-xs font-medium tracking-[0.1em] text-[#f6e8cb]">
              {isLoading ? "..." : eternalBalance}
            </span>
          </span>
        </button>
      </motion.div>

      <EssenceCenterModal
        isOpen={isCenterOpen}
        onClose={() => setIsCenterOpen(false)}
      />
    </>
  );
}