"use client";

import { useEffect, useState } from "react";

type ReadingDraft = {
  name: string;
  birthDate: string;
  zodiacSign: string;
  topic: string;
  question: string;
};

const topicLabels: Record<string, string> = {
  LOVE: "Amor",
  MONEY: "Dinero",
  WORK: "Trabajo",
  HEALTH: "Salud",
  SPIRITUALITY: "Espiritualidad",
  GENERAL: "General",
};

export default function ReadingDraftBadge() {
  const [draft, setDraft] = useState<ReadingDraft | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawDraft = window.localStorage.getItem(
        "mysticstudio.readingDraft",
      );

      if (rawDraft) {
        setDraft(JSON.parse(rawDraft) as ReadingDraft);
      }
    } catch {
      window.localStorage.removeItem("mysticstudio.readingDraft");
      setDraft(null);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  if (!hasLoaded) {
    return null;
  }

  if (!draft) {
    return (
      <div className="mb-6 rounded-3xl border border-[#caa46a]/20 bg-black/25 px-5 py-4 text-center text-sm text-[#d7c7aa]/70">
        No hay una lectura preparada.{" "}
        <a href="/reading" className="text-[#f1c57d] underline">
          Preparar lectura
        </a>
      </div>
    );
  }

  return (
    <div className="mb-6 mt-6 rounded-3xl border border-[#caa46a]/20 bg-black/25 px-5 py-4 text-center text-sm text-[#d7c7aa]/75">
      <span className="text-[#f5ead2]">{draft.name}</span> ·{" "}
      <span>{draft.zodiacSign}</span> ·{" "}
      <span>{topicLabels[draft.topic] ?? draft.topic}</span>

      {draft.question ? (
        <p className="mx-auto mt-2 max-w-2xl italic text-[#d7c7aa]/55">
          “{draft.question}”
        </p>
      ) : null}
    </div>
  );
}