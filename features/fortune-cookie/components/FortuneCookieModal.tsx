"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { GeneratedFortune } from "../types/fortuneCookie.types";

type FortuneCookieModalProps = {
  isOpen: boolean;
  fortune: GeneratedFortune | null;
  onClose: () => void;
};

export default function FortuneCookieModal({
  isOpen,
  fortune,
  onClose,
}: FortuneCookieModalProps) {
  return (
    <AnimatePresence>
      {isOpen && fortune ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[36px] border border-[#caa46a]/30 bg-[#08050c]/95 p-7 text-[#f5ead2] shadow-[0_0_120px_rgba(202,164,106,0.18)] sm:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(202,164,106,0.18),transparent_42%)]" />

            <div className="relative z-10">
              <p className="text-center text-[10px] uppercase tracking-[0.46em] text-[#caa46a]/70">
                Fortuna revelada
              </p>

              <h2 className="mt-4 text-center text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {fortune.title}
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-center text-lg leading-8 text-[#f8e7c4]">
                {fortune.message}
              </p>

              <div className="mt-8 rounded-[28px] border border-[#caa46a]/20 bg-black/30 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.28em] text-[#caa46a]/60">
                  Reflexión
                </p>
                <p className="mt-3 text-sm leading-7 text-[#d7c7aa]/75">
                  {fortune.reflection}
                </p>

                <div className="mt-6 border-t border-[#caa46a]/15 pt-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#caa46a]/60">
                    Acción
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#d7c7aa]/75">
                    {fortune.action}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#caa46a]/35 bg-[#caa46a]/10 px-8 py-3 text-xs uppercase tracking-[0.3em] text-[#f8e7c4] transition hover:bg-[#caa46a]/20"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}