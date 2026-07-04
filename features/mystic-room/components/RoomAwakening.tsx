"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RoomAwakening() {
  const [isAwake, setIsAwake] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsAwake(true);
    }, 6200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isAwake ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-50 flex min-h-dvh items-center justify-center bg-[#020103] px-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: [0, 1, 1, 0.9], scale: [0.92, 1, 1.02, 1] }}
            transition={{ duration: 5.8, ease: "easeInOut" }}
            className="absolute h-52 w-52 rounded-full bg-[#caa46a]/20 blur-3xl sm:h-72 sm:w-72"
          />

          <div className="relative max-w-sm text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -8] }}
              transition={{ duration: 4.4, times: [0, 0.28, 0.78, 1] }}
              className="text-[10px] uppercase tracking-[0.3em] text-[#caa46a] sm:text-xs sm:tracking-[0.48em]"
            >
              La habitación despierta
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 0.8] }}
              transition={{ delay: 0.6, duration: 4.2 }}
              className="mx-auto mt-5 h-px w-40 origin-center bg-[#caa46a]/50 sm:mt-6 sm:w-56"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 5.2, times: [0, 0.28, 0.48, 0.82, 1] }}
              className="mt-5 text-sm leading-7 text-[#d7c7aa]/70 sm:mt-6"
            >
              La lluvia cae sobre el cristal.
              <br />
              La vela encuentra tu pregunta.
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}