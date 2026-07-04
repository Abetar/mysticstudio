"use client";

import { useState } from "react";
import type { DrawnTarotCard } from "@/features/tarot/core/tarot.types";

export type GeneratedTarotReading = {
  title: string;
  summary: string;
  cards: {
    cardId: string;
    position: string;
    orientation: string;
    headline: string;
    message: string;
    warning: string;
    advice: string;
  }[];
  finalReading: string;
  practicalAction: string;
};

type GenerateReadingInput = {
  userContext?: {
    name?: string;
    birthDate?: string;
    zodiacSign?: string;
    topic?: string;
    question?: string;
  };
  cards: DrawnTarotCard[];
};

export function useGenerateTarotReading() {
  const [reading, setReading] = useState<GeneratedTarotReading | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateReading(input: GenerateReadingInput) {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/tarot/generate-reading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("No se pudo generar la lectura.");
      }

      const data = (await response.json()) as {
        reading: GeneratedTarotReading;
      };

      setReading(data.reading);
      return data.reading;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error generando la lectura.";

      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }

  function resetReading() {
    setReading(null);
    setError(null);
    setIsGenerating(false);
  }

  return {
    reading,
    isGenerating,
    error,
    generateReading,
    resetReading,
  };
}