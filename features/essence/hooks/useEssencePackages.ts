"use client";

import { useEffect, useState } from "react";

export type EssencePackage = {
  id: string;
  name: string;
  slug: string;
  essences: number;
  price: string;
  currency: string;
  badge: string | null;
  description: string | null;
  isPopular: boolean;
};

export function useEssencePackages() {
  const [packages, setPackages] = useState<EssencePackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadPackages() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/essence/packages");

      if (!response.ok) {
        throw new Error("No se pudieron cargar los paquetes de Esencias.");
      }

      const data = (await response.json()) as {
        packages: EssencePackage[];
      };

      setPackages(data.packages);

      return data.packages;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error cargando los paquetes de Esencias.";

      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadPackages();
  }, []);

  return {
    packages,
    isLoading,
    error,
    refreshPackages: loadPackages,
  };
}