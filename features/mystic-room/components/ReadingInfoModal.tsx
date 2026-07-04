"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ReadingDraft = {
  name?: string;
  birthDate?: string;
  zodiacSign?: string;
  topic?: string;
  question?: string;
};

const topicLabels: Record<string, string> = {
  LOVE: "Amor",
  MONEY: "Dinero",
  WORK: "Trabajo",
  HEALTH: "Salud",
  SPIRITUALITY: "Espiritualidad",
  GENERAL: "General",
};

export default function ReadingInfoModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<ReadingDraft | null>(null);

  useEffect(() => {
    const storedDraft = localStorage.getItem("mysticstudio.readingDraft");

    if (!storedDraft) return;

    try {
      setDraft(JSON.parse(storedDraft) as ReadingDraft);
    } catch {
      setDraft(null);
    }
  }, []);

  function handleRestart() {
    localStorage.removeItem("mysticstudio.readingDraft");
    router.push("/reading");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-1/2 z-[80] w-[calc(100vw-2.5rem)] -translate-x-1/2 rounded-full border border-[#caa46a]/30 bg-black/35 px-4 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#f7e6c3]/80 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-[#caa46a]/60 hover:bg-[#caa46a]/10 sm:bottom-5 sm:left-5 sm:w-auto sm:translate-x-0 sm:tracking-[0.24em]"
      >
        Información de lectura
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Cerrar información de lectura"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 cursor-default"
            />

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl rounded-[32px] border border-[#caa46a]/25 bg-[#0b0608]/95 p-6 text-[#f5ead2] shadow-[0_30px_120px_rgba(0,0,0,0.75)]"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-[#caa46a]/20 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#d7c7aa]/70 transition hover:bg-[#caa46a]/10"
              >
                Cerrar
              </button>

              <p className="text-[10px] uppercase tracking-[0.34em] text-[#caa46a]/70">
                Contexto actual
              </p>

              <h2 className="mt-3 pr-20 text-3xl font-semibold tracking-[-0.05em]">
                Información de lectura
              </h2>

              <div className="mt-6 space-y-3 text-sm text-[#d7c7aa]/78">
                <p>
                  <span className="text-[#caa46a]/80">Nombre:</span>{" "}
                  {draft?.name || "No definido"}
                </p>
                <p>
                  <span className="text-[#caa46a]/80">Fecha:</span>{" "}
                  {draft?.birthDate || "No definida"}
                </p>
                <p>
                  <span className="text-[#caa46a]/80">Signo:</span>{" "}
                  {draft?.zodiacSign || "No definido"}
                </p>
                <p>
                  <span className="text-[#caa46a]/80">Tema:</span>{" "}
                  {draft?.topic ? topicLabels[draft.topic] : "No definido"}
                </p>
                <p>
                  <span className="text-[#caa46a]/80">Pregunta:</span>{" "}
                  {draft?.question?.trim() || "Lectura general"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRestart}
                className="mt-8 w-full rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#f8e7c4] transition hover:bg-[#caa46a]/25"
              >
                Responder preguntas de nuevo
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}