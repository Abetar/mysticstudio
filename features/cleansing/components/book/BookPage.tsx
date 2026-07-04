"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

type BookPageProps = {
  children: ReactNode;
};

export default function BookPage({ children }: BookPageProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -10, x: 20 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      exit={{ opacity: 0, rotateY: 10, x: -20 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative h-full w-full overflow-hidden rounded-[28px] border border-[#7f5b32]/30 bg-gradient-to-b from-[#e7d2a3] via-[#dcc28d] to-[#c9a66f] shadow-[0_25px_80px_rgba(0,0,0,.45)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[url('/images/textures/paper-noise.png')]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#fff4d5]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#a5793e]/18 to-transparent" />
      <div className="pointer-events-none absolute left-8 bottom-0 top-0 w-px bg-[#8b6335]/18" />
      <div className="pointer-events-none absolute right-8 bottom-0 top-0 w-px bg-[#8b6335]/12" />

      <div
        onScroll={() => setHasScrolled(true)}
        className="book-scrollbar relative z-10 h-full overflow-y-auto px-7 py-6 sm:px-10 sm:py-7"
      >
        {children}
      </div>

      {!hasScrolled ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0.45, 1, 0.45], y: [0, 5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#7a5428]/20 bg-[#e6cf9b]/75 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#5a3817] shadow-[0_10px_25px_rgba(72,45,18,0.18)] backdrop-blur-sm"
        >
          ↓ Desliza para continuar
        </motion.div>
      ) : null}

      <style jsx>{`
        .book-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(111, 73, 34, 0.7) rgba(111, 73, 34, 0.12);
        }

        .book-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .book-scrollbar::-webkit-scrollbar-track {
          background: rgba(111, 73, 34, 0.12);
          border-radius: 999px;
        }

        .book-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(111, 73, 34, 0.65);
          border-radius: 999px;
          border: 2px solid rgba(230, 207, 155, 0.75);
        }

        .book-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(111, 73, 34, 0.85);
        }
      `}</style>
    </motion.div>
  );
}