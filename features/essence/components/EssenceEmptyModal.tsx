"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import EssenceShopModal from "./EssenceShopModal";

type EssenceEmptyModalProps = {
  isOpen: boolean;
  requiredAmount: number;
  currentBalance: number;
  onClose: () => void;
};

export default function EssenceEmptyModal({
  isOpen,
  requiredAmount,
  currentBalance,
  onClose,
}: EssenceEmptyModalProps) {
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 px-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative w-full max-w-xl overflow-hidden rounded-[34px] border border-[#caa46a]/30 bg-[#08050c]/95 p-7 text-center text-[#f5ead2] shadow-[0_0_120px_rgba(202,164,106,0.18)] sm:p-9"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(202,164,106,0.18),transparent_44%)]" />

              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.46em] text-[#caa46a]/70">
                  Esencias agotadas
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  La mesa necesita más energía.
                </h2>

                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#d7c7aa]/70">
                  Esta experiencia requiere {requiredAmount}{" "}
                  {requiredAmount === 1 ? "Esencia" : "Esencias"}.
                  Actualmente tienes {currentBalance}.
                </p>

                <div className="mx-auto mt-7 max-w-sm rounded-[24px] border border-[#caa46a]/20 bg-black/30 px-5 py-4 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#caa46a]/60">
                    Próximo paso
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#d7c7aa]/75">
                    Puedes recargar Esencias para continuar el ritual.
                  </p>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setIsShopOpen(true)}
                    className="rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-8 py-3 text-xs uppercase tracking-[0.3em] text-[#f8e7c4] transition hover:bg-[#caa46a]/25"
                  >
                    Obtener Esencias
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-[#caa46a]/20 bg-black/20 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/65 transition hover:bg-black/35"
                  >
                    Volver
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <EssenceShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
      />
    </>
  );
}