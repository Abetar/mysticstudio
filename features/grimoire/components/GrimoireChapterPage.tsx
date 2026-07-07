"use client";

import BookFooter from "@/features/cleansing/components/book/BookFooter";
import BookHeader from "@/features/cleansing/components/book/BookHeader";
import type { GrimoireRitual } from "../types/grimoire.types";
import GrimoireBookPage from "./GrimoireBookPage";

type GrimoireChapterPageProps = {
  title: string;
  rituals: GrimoireRitual[];
  onBack: () => void;
  onOpenRitual: (ritual: GrimoireRitual) => void;
};

export default function GrimoireChapterPage({
  title,
  rituals,
  onBack,
  onOpenRitual,
}: GrimoireChapterPageProps) {
  return (
    <GrimoireBookPage>
      <BookHeader
        eyebrow="Capítulo"
        title={title}
        quote="Cada capítulo guarda una forma distinta de invocar, proteger o influir."
      />

      <div className="mt-8">
        <button
          type="button"
          onClick={onBack}
          className="font-serif text-sm tracking-[0.14em] text-[#3f2412]/75 transition hover:text-[#241005]"
        >
          ← Volver al índice
        </button>

        <div className="mt-8 space-y-5 font-serif">
          {rituals.map((ritual, index) => (
            <button
              key={ritual.id}
              type="button"
              onClick={() => onOpenRitual(ritual)}
              className="group flex w-full items-start gap-4 text-left text-[#2b1308]"
            >
              <span className="mt-1 text-sm text-[#4b2b16]/55">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{ritual.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#4b2b16]/75">
                  {ritual.summary}
                </p>
              </div>

              <span className="mt-1 shrink-0 text-[10px] uppercase tracking-[0.18em] text-[#4b2b16]/65">
                {ritual.accessLevel === "PUBLIC"
                  ? "Gratis"
                  : ritual.isUnlocked
                    ? "Abierto"
                    : `${ritual.essenceCost} eternas`}
              </span>
            </button>
          ))}

          {!rituals.length ? (
            <p className="py-10 text-center text-sm italic text-[#4b2b16]/75">
              Este capítulo todavía no tiene rituales.
            </p>
          ) : null}
        </div>
      </div>

      <BookFooter page={2} totalPages={3} />
    </GrimoireBookPage>
  );
}