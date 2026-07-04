"use client";

import { useState } from "react";
import { getOrCreateAnonymousId } from "@/features/essence/client/anonymousId";
import type { GeneratedFortune } from "../types/fortuneCookie.types";

type GenerateFortuneInput = {
  userContext?: {
    name?: string;
    birthDate?: string;
    zodiacSign?: string;
    topic?: string;
    question?: string;
  };
};

export function useGenerateFortuneCookie() {
  const [fortune, setFortune] = useState<GeneratedFortune | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateFortune(input: GenerateFortuneInput) {
    setIsGenerating(true);
    setError(null);

    try {
      const anonymousId = getOrCreateAnonymousId();

      if (!anonymousId) {
        throw new Error("No se pudo iniciar la sesión anónima.");
      }

      const response = await fetch("/api/fortune-cookie/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...input,
          anonymousId,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo generar la fortuna.");
      }

      const data = (await response.json()) as {
        fortune: GeneratedFortune;
      };

      setFortune(data.fortune);

      return data.fortune;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error generando la fortuna.";

      setError(message);

      return null;
    } finally {
      setIsGenerating(false);
    }
  }

  function resetFortune() {
    setFortune(null);
    setError(null);
    setIsGenerating(false);
  }

  return {
    fortune,
    isGenerating,
    error,
    generateFortune,
    resetFortune,
  };
}