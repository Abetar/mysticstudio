"use client";

import Image from "next/image";
import type { DrawnTarotCard } from "@/features/tarot/core/tarot.types";
import type { GeneratedTarotReading } from "@/features/tarot/hooks/useGenerateTarotReading";

type ReadingDraft = {
  name?: string;
  birthDate?: string;
  zodiacSign?: string;
  topic?: string;
  question?: string;
};

type Props = {
  reading: GeneratedTarotReading;
  cards: DrawnTarotCard[];
  readingDraft: ReadingDraft | null;
};

const topicLabels: Record<string, string> = {
  LOVE: "Amor",
  MONEY: "Dinero",
  WORK: "Trabajo",
  HEALTH: "Salud",
  SPIRITUALITY: "Espiritualidad",
  GENERAL: "General",
};

const positionLabels: Record<DrawnTarotCard["position"], string> = {
  PAST: "Pasado",
  PRESENT: "Presente",
  ADVICE: "Consejo",
};

export default function TarotReadingExportCard({
  reading,
  cards,
  readingDraft,
}: Props) {
  return (
    <div className="w-[1080px] bg-[#070407] px-20 py-18 text-[#f5ead2]">
      <div className="rounded-[48px] border border-[#caa46a]/35 bg-[#12080c] p-14 shadow-2xl">
        <p className="text-center text-2xl uppercase tracking-[0.5em] text-[#caa46a]">
          MysticStudio
        </p>

        <h1 className="mt-8 text-center text-6xl font-semibold tracking-[-0.06em]">
          {reading.title}
        </h1>

        <div className="mt-10 rounded-[32px] border border-[#caa46a]/20 bg-black/25 p-8 text-2xl leading-10 text-[#d7c7aa]">
          <p>
            <span className="text-[#caa46a]">Nombre:</span>{" "}
            {readingDraft?.name || "No definido"}
          </p>
          <p>
            <span className="text-[#caa46a]">Tema:</span>{" "}
            {readingDraft?.topic ? topicLabels[readingDraft.topic] : "General"}
          </p>
          <p>
            <span className="text-[#caa46a]">Signo:</span>{" "}
            {readingDraft?.zodiacSign || "No definido"}
          </p>
          <p>
            <span className="text-[#caa46a]">Pregunta:</span>{" "}
            {readingDraft?.question?.trim() || "Lectura general"}
          </p>
        </div>

        <p className="mt-10 text-3xl leading-[1.45] text-[#d7c7aa]">
          {reading.summary}
        </p>

        <div className="mt-12 grid grid-cols-3 gap-6">
          {cards.map((drawnCard) => {
            const generatedCard = reading.cards.find(
              (item) => item.cardId === drawnCard.card.id,
            );

            return (
              <div
                key={`${drawnCard.card.id}-${drawnCard.position}`}
                className="rounded-[34px] border border-[#caa46a]/25 bg-black/25 p-6"
              >
                <div className="relative mx-auto aspect-[0.66] w-[190px]">
                  <Image
                    src={drawnCard.card.imageSrc}
                    alt={drawnCard.card.name}
                    fill
                    sizes="220px"
                    className={`object-contain ${
                      drawnCard.orientation === "REVERSED" ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <p className="mt-6 text-xl uppercase tracking-[0.3em] text-[#caa46a]">
                  {positionLabels[drawnCard.position]}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  {drawnCard.card.name}
                </h2>

                <p className="mt-2 text-lg uppercase tracking-[0.22em] text-[#d7c7aa]/55">
                  {drawnCard.orientation === "REVERSED" ? "Invertida" : "Normal"}
                </p>

                {generatedCard ? (
                  <p className="mt-6 text-2xl leading-[1.35] text-[#d7c7aa]">
                    {generatedCard.headline}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-[36px] border border-[#caa46a]/25 bg-[#caa46a]/10 p-8">
          <p className="text-xl uppercase tracking-[0.35em] text-[#caa46a]">
            Lectura final
          </p>

          <p className="mt-6 text-3xl leading-[1.45] text-[#f5ead2]">
            {reading.finalReading}
          </p>

          <p className="mt-8 rounded-[28px] border border-[#caa46a]/20 bg-black/25 p-6 text-2xl leading-[1.4] text-[#f7e6c3]">
            {reading.practicalAction}
          </p>
        </div>
      </div>
    </div>
  );
}