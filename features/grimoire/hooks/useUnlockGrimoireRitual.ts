"use client";

import { useState } from "react";

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

export function useUnlockGrimoireRitual() {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function unlockRitual(ritualId: string) {
    try {
      setIsUnlocking(true);
      setError(null);

      const anonymousId = getOrCreateAnonymousId();

      const response = await fetch("/api/grimoire/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anonymousId,
          ritualId,
        }),
      });

      if (response.status === 402) {
        setError("No tienes suficientes Esencias Eternas.");
        return null;
      }

      if (!response.ok) {
        const data = (await response.json()) as {
          error?: string;
        };

        throw new Error(data.error ?? "No se pudo desbloquear el ritual.");
      }

      return (await response.json()) as {
        success: boolean;
        alreadyUnlocked: boolean;
        wallet: {
          vitalBalance: number;
          eternalBalance: number;
          balance: number;
        };
      };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error desbloqueando el ritual.";

      setError(message);
      return null;
    } finally {
      setIsUnlocking(false);
    }
  }

  return {
    unlockRitual,
    isUnlocking,
    error,
    setError,
  };
}