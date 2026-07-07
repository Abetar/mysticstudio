"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tarotLibrary } from "@/features/library/tarot/data/tarotLibrary";

export default function LibrarySearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return tarotLibrary
      .filter((card) => {
        const searchableText = [
          card.name,
          card.summary,
          card.generalMeaning,
          card.loveMeaning,
          card.workMeaning,
          card.moneyMeaning,
          card.healthMeaning,
          card.spiritualityMeaning,
          card.reversedMeaning,
          card.symbolism,
          ...card.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-[2rem] border border-[#caa46a]/18 bg-[#0b070a]/90 p-4 shadow-[0_0_70px_rgba(0,0,0,0.35)]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar cartas, símbolos o significados..."
          className="w-full rounded-full border border-[#caa46a]/20 bg-[#050308] px-5 py-4 text-sm text-[#f5ead2] outline-none placeholder:text-[#d7c7aa]/35 focus:border-[#caa46a]/45"
        />

        {results.length > 0 ? (
          <div className="mt-4 space-y-2">
            {results.map((card) => (
              <Link
                key={card.slug}
                href={`/biblioteca/tarot/${card.slug}`}
                className="block rounded-2xl border border-[#caa46a]/10 bg-[#caa46a]/[0.03] px-4 py-3 transition hover:border-[#caa46a]/30 hover:bg-[#caa46a]/[0.07]"
              >
                <p className="text-sm font-semibold text-[#f7e6c3]">
                  {card.name}
                </p>
                <p className="mt-1 line-clamp-1 text-xs text-[#d7c7aa]/60">
                  {card.summary}
                </p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}