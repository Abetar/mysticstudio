"use client";

import { useEffect, useState } from "react";
import { useEssence } from "../components/EssenceProvider";

export type EssencePurchase = {
  id: string;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  amountPaid: number;
  currency: string;
  essences: number;
  status: string;
  createdAt: string;
  package: {
    name: string;
    slug: string;
    badge: string | null;
  };
};

export function useEssencePurchases() {
  const { anonymousId } = useEssence();

  const [purchases, setPurchases] = useState<EssencePurchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!anonymousId) return;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/essence/purchases?anonymousId=${anonymousId}`,
        );

        if (!response.ok) {
          throw new Error("No se pudo cargar el historial.");
        }

        const data = (await response.json()) as {
          purchases: EssencePurchase[];
        };

        setPurchases(data.purchases);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error cargando historial.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, [anonymousId]);

  return {
    purchases,
    isLoading,
    error,
  };
}