"use client";

import BookFooter from "@/features/cleansing/components/book/BookFooter";
import BookHeader from "@/features/cleansing/components/book/BookHeader";
import type { GrimoireRitual } from "../types/grimoire.types";
import GrimoireBookPage from "./GrimoireBookPage";

type GrimoireRitualPageProps = {
  ritual: GrimoireRitual;
  onBack: () => void;
};

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-serif text-xl text-[#2a1206]">❦</span>
      <h3 className="font-serif text-2xl font-bold tracking-[-0.02em] text-[#241005]">
        {children}
      </h3>
    </div>
  );
}

export default function GrimoireRitualPage({
  ritual,
  onBack,
}: GrimoireRitualPageProps) {
  return (
    <GrimoireBookPage>
      <button
        type="button"
        onClick={onBack}
        className="mb-7 font-serif text-sm tracking-[0.14em] text-[#2a1206] transition hover:text-[#000]"
      >
        ← Volver al capítulo
      </button>

      <BookHeader eyebrow="Ritual" title={ritual.title} quote={ritual.summary} />

      <div className="mt-10 space-y-10">
        <section>
          <SectionTitle>Propósito</SectionTitle>

          <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[#2f1b10]">
            {ritual.intention ?? ritual.expectedResult ?? ritual.summary}
          </p>
        </section>

        <section>
          <SectionTitle>Materiales</SectionTitle>

          <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#2f1b10]">
            {ritual.ingredients.map((ingredient) => (
              <li key={ingredient} className="flex gap-3">
                <span className="mt-1.5 text-[#241005]">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle>Procedimiento</SectionTitle>

          <ol className="mt-5 space-y-5 text-[15px] leading-8 text-[#2f1b10]">
            {ritual.steps.map((step, index) => (
              <li key={`${index}-${step}`} className="flex gap-4">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2a1206]/35 bg-[#fff3cf]/35 font-serif text-xs font-semibold text-[#241005]">
                  {index + 1}
                </span>

                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {ritual.warnings ? (
          <section className="rounded-2xl border border-[#5b1f12]/30 bg-[#5b1f12]/10 p-5">
            <SectionTitle>Precauciones</SectionTitle>

            <p className="mt-4 text-[15px] leading-8 text-[#2f1b10]">
              {ritual.warnings}
            </p>
          </section>
        ) : null}

        {ritual.notes ? (
          <section>
            <SectionTitle>Notas del Grimorio</SectionTitle>

            <p className="mt-4 text-[15px] leading-8 text-[#2f1b10]">
              {ritual.notes}
            </p>
          </section>
        ) : null}
      </div>

      <BookFooter page={3} totalPages={3} />
    </GrimoireBookPage>
  );
}