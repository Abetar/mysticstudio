"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MysticModule } from "@/app/generated/prisma/client";

const ANONYMOUS_ID_STORAGE_KEY = "mysticstudio.anonymousId";
const ANONYMOUS_ID_COOKIE_KEY = "mysticstudio.anonymousId";
const ANONYMOUS_ID_COOKIE_MAX_AGE_DAYS = 365;

const WALLET_BACKGROUND_REFRESH_INTERVAL_MS = 5 * 60 * 1000;
const UTC_REFILL_REFRESH_OFFSET_MS = 5 * 1000;

type EssenceWallet = {
  id: string;
  balance: number;
  vitalBalance: number;
  eternalBalance: number;
  lastVitalRefillAt: string | null;
};

type SpendEssencesInput = {
  amount: number;
  module: MysticModule;
  reason?: string;
  referenceId?: string;
};

type GrantDevEssencesInput = {
  amount: number;
  packageSlug?: string;
};

type EssenceContextValue = {
  anonymousId: string | null;
  wallet: EssenceWallet | null;
  balance: number;
  vitalBalance: number;
  eternalBalance: number;
  isLoading: boolean;
  isSpending: boolean;
  isGrantingDevEssences: boolean;
  error: string | null;
  refreshWallet: () => Promise<EssenceWallet | null>;
  spendEssences: (input: SpendEssencesInput) => Promise<EssenceWallet | null>;
  grantDevEssences: (
    input: GrantDevEssencesInput,
  ) => Promise<EssenceWallet | null>;
};

const EssenceContext = createContext<EssenceContextValue | null>(null);

function createAnonymousId() {
  return crypto.randomUUID();
}

function getCookieValue(name: string) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  if (!cookie) return null;

  return decodeURIComponent(cookie.split("=")[1] ?? "");
}

function setCookieValue(name: string, value: string) {
  const maxAge = ANONYMOUS_ID_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;

  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function persistAnonymousId(anonymousId: string) {
  localStorage.setItem(ANONYMOUS_ID_STORAGE_KEY, anonymousId);
  setCookieValue(ANONYMOUS_ID_COOKIE_KEY, anonymousId);
}

function getOrCreateAnonymousId() {
  const existingLocalId = localStorage.getItem(ANONYMOUS_ID_STORAGE_KEY);

  if (existingLocalId) {
    setCookieValue(ANONYMOUS_ID_COOKIE_KEY, existingLocalId);
    return existingLocalId;
  }

  const existingCookieId = getCookieValue(ANONYMOUS_ID_COOKIE_KEY);

  if (existingCookieId) {
    localStorage.setItem(ANONYMOUS_ID_STORAGE_KEY, existingCookieId);
    return existingCookieId;
  }

  const newId = createAnonymousId();
  persistAnonymousId(newId);

  return newId;
}

function getMillisecondsUntilNextUtcDay() {
  const now = new Date();

  const nextUtcDay = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    0,
    0,
    0,
  );

  return Math.max(
    nextUtcDay - now.getTime() + UTC_REFILL_REFRESH_OFFSET_MS,
    UTC_REFILL_REFRESH_OFFSET_MS,
  );
}

export function EssenceProvider({ children }: { children: ReactNode }) {
  const [anonymousId, setAnonymousId] = useState<string | null>(null);
  const [wallet, setWallet] = useState<EssenceWallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpending, setIsSpending] = useState(false);
  const [isGrantingDevEssences, setIsGrantingDevEssences] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWallet = useCallback(
    async ({
      showLoading,
      clearExistingError,
    }: {
      showLoading: boolean;
      clearExistingError: boolean;
    }) => {
      if (showLoading) {
        setIsLoading(true);
      }

      if (clearExistingError) {
        setError(null);
      }

      try {
        const resolvedAnonymousId = getOrCreateAnonymousId();

        setAnonymousId(resolvedAnonymousId);

        const response = await fetch("/api/essence/visitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            anonymousId: resolvedAnonymousId,
          }),
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar tu saldo de esencias.");
        }

        const data = (await response.json()) as {
          wallet: EssenceWallet;
        };

        setWallet(data.wallet);

        return data.wallet;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Ocurrió un error cargando tus esencias.";

        setError(message);

        return null;
      } finally {
        if (showLoading) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  const refreshWallet = useCallback(async () => {
    return loadWallet({
      showLoading: true,
      clearExistingError: true,
    });
  }, [loadWallet]);

  const refreshWalletSilently = useCallback(async () => {
    return loadWallet({
      showLoading: false,
      clearExistingError: false,
    });
  }, [loadWallet]);

  const spendEssences = useCallback(
    async (input: SpendEssencesInput) => {
      setIsSpending(true);
      setError(null);

      try {
        const resolvedAnonymousId = anonymousId ?? getOrCreateAnonymousId();

        if (!anonymousId) {
          setAnonymousId(resolvedAnonymousId);
        }

        const response = await fetch("/api/essence/spend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            anonymousId: resolvedAnonymousId,
            amount: input.amount,
            module: input.module,
            reason: input.reason,
            referenceId: input.referenceId,
          }),
        });

        if (!response.ok) {
          const data = (await response.json()) as {
            error?: string;
          };

          throw new Error(data.error ?? "No se pudieron gastar las esencias.");
        }

        const data = (await response.json()) as {
          wallet: EssenceWallet;
        };

        setWallet(data.wallet);

        return data.wallet;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Ocurrió un error gastando tus esencias.";

        setError(message);

        return null;
      } finally {
        setIsSpending(false);
      }
    },
    [anonymousId],
  );

  const grantDevEssences = useCallback(
    async (input: GrantDevEssencesInput) => {
      setIsGrantingDevEssences(true);
      setError(null);

      try {
        const resolvedAnonymousId = anonymousId ?? getOrCreateAnonymousId();

        if (!anonymousId) {
          setAnonymousId(resolvedAnonymousId);
        }

        const response = await fetch("/api/essence/dev-grant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            anonymousId: resolvedAnonymousId,
            amount: input.amount,
            packageSlug: input.packageSlug,
          }),
        });

        if (!response.ok) {
          const data = (await response.json()) as {
            error?: string;
          };

          throw new Error(data.error ?? "No se pudieron agregar Esencias.");
        }

        const data = (await response.json()) as {
          wallet: EssenceWallet;
        };

        setWallet(data.wallet);

        return data.wallet;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Ocurrió un error agregando Esencias.";

        setError(message);

        return null;
      } finally {
        setIsGrantingDevEssences(false);
      }
    },
    [anonymousId],
  );

  useEffect(() => {
    void refreshWallet();
  }, [refreshWallet]);

  useEffect(() => {
    function handleWindowFocus() {
      void refreshWalletSilently();
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void refreshWalletSilently();
      }
    }

    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshWalletSilently]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void refreshWalletSilently();
      }
    }, WALLET_BACKGROUND_REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refreshWalletSilently]);

  useEffect(() => {
    let refillTimeoutId: number | null = null;

    function scheduleNextUtcRefillRefresh() {
      refillTimeoutId = window.setTimeout(() => {
        void refreshWalletSilently();
        scheduleNextUtcRefillRefresh();
      }, getMillisecondsUntilNextUtcDay());
    }

    scheduleNextUtcRefillRefresh();

    return () => {
      if (refillTimeoutId !== null) {
        window.clearTimeout(refillTimeoutId);
      }
    };
  }, [refreshWalletSilently]);

  const value = useMemo<EssenceContextValue>(
    () => ({
      anonymousId,
      wallet,
      balance: wallet?.balance ?? 0,
      vitalBalance: wallet?.vitalBalance ?? 0,
      eternalBalance: wallet?.eternalBalance ?? 0,
      isLoading,
      isSpending,
      isGrantingDevEssences,
      error,
      refreshWallet,
      spendEssences,
      grantDevEssences,
    }),
    [
      anonymousId,
      wallet,
      isLoading,
      isSpending,
      isGrantingDevEssences,
      error,
      refreshWallet,
      spendEssences,
      grantDevEssences,
    ],
  );

  return (
    <EssenceContext.Provider value={value}>{children}</EssenceContext.Provider>
  );
}

export function useEssence() {
  const context = useContext(EssenceContext);

  if (!context) {
    throw new Error("useEssence must be used inside EssenceProvider.");
  }

  return context;
}