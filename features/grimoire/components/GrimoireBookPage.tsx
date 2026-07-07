"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

type GrimoireBookPageProps = {
  children: ReactNode;
};

export default function GrimoireBookPage({ children }: GrimoireBookPageProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -10, x: 20 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      exit={{ opacity: 0, rotateY: 10, x: -20 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative h-full w-full overflow-hidden rounded-[28px] border border-[#4a2613]/35 bg-[#d7b875] shadow-[0_25px_80px_rgba(0,0,0,.55)]"
    >
      <div className="absolute inset-0 bg-[#d7b875]" />

      <div className="absolute inset-0 bg-[url('/images/textures/grimoire-bg.png')] bg-cover bg-center opacity-45" />

      <div className="pointer-events-none absolute inset-0 bg-[#f4dfaa]/28" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#fff4ce]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#9a6b32]/22 to-transparent" />
      <div className="pointer-events-none absolute left-8 bottom-0 top-0 w-px bg-[#3f2412]/18" />
      <div className="pointer-events-none absolute right-8 bottom-0 top-0 w-px bg-[#3f2412]/12" />

      <div
        onScroll={() => setHasScrolled(true)}
        className="grimoire-scrollbar relative z-10 h-full overflow-y-auto px-7 py-6 sm:px-10 sm:py-7"
      >
        {children}
      </div>

      {!hasScrolled ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0.45, 1, 0.45], y: [0, 5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#3f2412]/25 bg-[#f0d595]/75 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#2a1206] shadow-[0_10px_25px_rgba(72,45,18,0.22)] backdrop-blur-sm"
        >
          ↓ Desliza para continuar
        </motion.div>
      ) : null}

      <style jsx>{`
        .grimoire-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(63, 36, 18, 0.72) rgba(63, 36, 18, 0.12);
        }

        .grimoire-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .grimoire-scrollbar::-webkit-scrollbar-track {
          background: rgba(63, 36, 18, 0.12);
          border-radius: 999px;
        }

        .grimoire-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(63, 36, 18, 0.62);
          border-radius: 999px;
          border: 2px solid rgba(240, 213, 149, 0.65);
        }

        .grimoire-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(63, 36, 18, 0.82);
        }
      `}</style>
    </motion.div>
  );
}