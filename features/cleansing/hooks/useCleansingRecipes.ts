"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  CleansingCategory,
  RecipeDifficulty,
} from "@/app/generated/prisma/enums";

const ANONYMOUS_ID_STORAGE_KEY = "mysticstudio.anonymousId";

function getOrCreateAnonymousId() {
  const existingAnonymousId = window.localStorage.getItem(
    ANONYMOUS_ID_STORAGE_KEY,
  );

  if (existingAnonymousId) {
    return existingAnonymousId;
  }

  const anonymousId = crypto.randomUUID();

  window.localStorage.setItem(ANONYMOUS_ID_STORAGE_KEY, anonymousId);
  document.cookie = `${ANONYMOUS_ID_STORAGE_KEY}=${anonymousId}; path=/; max-age=31536000; SameSite=Lax`;

  return anonymousId;
}

export type CleansingRecipe = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: CleansingCategory;
  difficulty: RecipeDifficulty;
  estimatedMinutes: number | null;
  origin: string | null;
  expectedResult: string | null;
  repeatEvery: string | null;
  tags: string[];
  ingredients: string[];
  steps: string[];
  warnings: string | null;
  notes: string | null;
  isPremium: boolean;
  essenceCost: number;
  isUnlocked: boolean;
};

type UseCleansingRecipesOptions = {
  category?: CleansingCategory;
  premium?: boolean;
};

export function useCleansingRecipes(options?: UseCleansingRecipesOptions) {
  const [recipes, setRecipes] = useState<CleansingRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      const anonymousId = getOrCreateAnonymousId();

      params.set("anonymousId", anonymousId);

      if (options?.category) {
        params.set("category", options.category);
      }

      if (typeof options?.premium === "boolean") {
        params.set("premium", String(options.premium));
      }

      const response = await fetch(
        `/api/cleansing-recipes?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("No se pudieron cargar las limpias.");
      }

      const data = (await response.json()) as {
        recipes: CleansingRecipe[];
      };

      setRecipes(data.recipes);

      return data.recipes;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error cargando las limpias.";

      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [options?.category, options?.premium]);

  useEffect(() => {
    void loadRecipes();
  }, [loadRecipes]);

  return {
    recipes,
    isLoading,
    error,
    refreshRecipes: loadRecipes,
  };
}