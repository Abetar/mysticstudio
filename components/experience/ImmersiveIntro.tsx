"use client";

import { motion } from "framer-motion";

export default function ImmersiveIntro() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#070509] text-[#f5ead2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,120,63,0.2),transparent_46%),linear-gradient(to_bottom,rgba(8,5,10,0.2),#070509_82%)]" />

      <div className="absolute inset-0 opacity-[0.08] bg-[url('/images/textures/noise.png')]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="relative z-10 flex min-h-dvh items-center justify-center px-5 py-12 sm:px-6"
      >
        <section className="w-full max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.2 }}
            className="mb-5 text-[10px] uppercase tracking-[0.34em] text-[#caa46a] sm:mb-6 sm:text-xs sm:tracking-[0.45em]"
          >
            MysticStudio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.3 }}
            className="mx-auto max-w-[11ch] text-[clamp(2.7rem,14vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.07em] sm:max-w-3xl sm:text-6xl sm:leading-[0.95]"
          >
            Toda historia comienza con una pregunta.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.1 }}
            className="mx-auto mt-6 max-w-[31rem] text-sm leading-7 text-[#d7c7aa]/80 sm:text-base"
          >
            Entra a una habitación ritual digital, elige tus símbolos y deja
            que la mesa revele una lectura hecha de atmósfera, intuición y
            narrativa.
          </motion.p>

          <motion.a
            href="/reading"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="mt-9 inline-flex w-full max-w-[260px] justify-center rounded-full border border-[#caa46a]/40 bg-[#caa46a]/10 px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] shadow-[0_0_40px_rgba(202,164,106,0.18)] transition hover:bg-[#caa46a]/20 sm:mt-10 sm:w-auto sm:max-w-none sm:py-3 sm:text-sm"
          >
            Entrar
          </motion.a>
        </section>
      </motion.div>

      <div className="pointer-events-none absolute bottom-[-90px] left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-[#b66b38]/20 blur-3xl sm:bottom-[-120px] sm:h-[300px] sm:w-[300px]" />
    </main>
  );
}