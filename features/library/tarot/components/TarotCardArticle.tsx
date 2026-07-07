"use client";

import Image from "next/image";
import type { TarotLibraryCard } from "../types/tarotLibrary.types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type TarotCardArticleProps = {
  card: TarotLibraryCard;
};

export default function TarotCardArticle({ card }: TarotCardArticleProps) {
  return (
    <main className="min-h-screen bg-[#050308] text-[#f5ead2]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10">
          <Link
            href="/biblioteca/tarot"
            className="inline-flex items-center gap-2 rounded-full border border-[#caa46a]/20 bg-[#caa46a]/5 px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#caa46a] transition hover:border-[#caa46a]/45 hover:bg-[#caa46a]/10"
          >
            <ArrowLeft size={14} />
            Volver al Tarot
          </Link>
        </div>
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-[#caa46a]/20">
            <Image
              src={card.image}
              alt={card.name}
              fill
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#caa46a]">
              Biblioteca · Tarot
            </p>

            <h1 className="mt-3 text-5xl font-semibold">{card.name}</h1>

            <p className="mt-6 text-lg text-[#d7c7aa]/80">{card.summary}</p>

            <section className="mt-10 space-y-8">
              <article>
                <h2 className="mb-2 text-2xl font-semibold">
                  Significado General
                </h2>

                <p>{card.generalMeaning}</p>
              </article>

              <article>
                <h2 className="mb-2 text-2xl font-semibold">Amor</h2>

                <p>{card.loveMeaning}</p>
              </article>

              <article>
                <h2 className="mb-2 text-2xl font-semibold">Trabajo</h2>

                <p>{card.workMeaning}</p>
              </article>

              <article>
                <h2 className="mb-2 text-2xl font-semibold">Dinero</h2>

                <p>{card.moneyMeaning}</p>
              </article>

              <article>
                <h2 className="mb-2 text-2xl font-semibold">Salud</h2>

                <p>{card.healthMeaning}</p>
              </article>

              <article>
                <h2 className="mb-2 text-2xl font-semibold">Espiritualidad</h2>

                <p>{card.spiritualityMeaning}</p>
              </article>

              <article>
                <h2 className="mb-2 text-2xl font-semibold">
                  Significado Invertido
                </h2>

                <p>{card.reversedMeaning}</p>
              </article>

              <article>
                <h2 className="mb-2 text-2xl font-semibold">Simbolismo</h2>

                <p>{card.symbolism}</p>
              </article>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
