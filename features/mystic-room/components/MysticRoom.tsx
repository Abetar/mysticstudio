"use client";

import { motion } from "framer-motion";
import EssenceBalancePill from "@/features/essence/components/EssenceBalancePill";
import RoomDirector from "../director/RoomDirector";
import MysticTable from "./MysticTable";
import ReadingDraftBadge from "./ReadingDraftBadge";

export default function MysticRoom() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050308] text-[#f5ead2]">
      <RoomDirector />
      <EssenceBalancePill />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(193,122,55,0.18),transparent_34%),linear-gradient(to_bottom,#08050c_0%,#050308_68%,#020103_100%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.38 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,202,128,0.16),transparent_35%)]"
      />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-end px-4 pb-10 pt-16 sm:px-8">
        <div className="w-full max-w-5xl">
          

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="mb-8 text-center"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.46em] text-[#caa46a]">
              Cámara inicial
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              La mesa te estaba esperando.
            </h1>

            {/*
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#d7c7aa]/75">
              Elige una disciplina, formula una pregunta y deja que los símbolos
              tomen su lugar sobre la madera.
            </p>
            */}
          </motion.div>

          <MysticTable />
          {/* <ReadingDraftBadge /> */}
        </div>
      </section>
    </main>
  );
}