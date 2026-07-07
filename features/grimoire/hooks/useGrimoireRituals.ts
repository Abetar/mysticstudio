"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  GrimoireAccessLevel,
  GrimoireCategory,
} from "@/app/generated/prisma/enums";
import type { GrimoireRitual } from "../types/grimoire.types";

type UseGrimoireRitualsOptions = {
  category?: GrimoireCategory;
  accessLevel?: GrimoireAccessLevel;
};

export function useGrimoireRituals(options?: UseGrimoireRitualsOptions) {
  const [rituals, setRituals] = useState<GrimoireRitual[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRituals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (options?.category) {
        params.set("category", options.category);
      }

      if (options?.accessLevel) {
        params.set("accessLevel", options.accessLevel);
      }

      const queryString = params.toString();

      const response = await fetch(
        `/api/grimoire/rituals${queryString ? `?${queryString}` : ""}`,
      );

      if (!response.ok) {
        throw new Error("No se pudieron cargar los rituales.");
      }

      const data = (await response.json()) as {
        rituals: GrimoireRitual[];
      };

      setRituals(data.rituals);

      return data.rituals;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error cargando el grimorio.";

      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [options?.category, options?.accessLevel]);

  useEffect(() => {
    void loadRituals();
  }, [loadRituals]);

  return {
    rituals,
    isLoading,
    error,
    refreshRituals: loadRituals,
  };
}