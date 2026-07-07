"use client";

import EssenceShopModal from "@/features/essence/components/EssenceShopModal";
import { useEssence } from "@/features/essence/components/EssenceProvider";
import BookFooter from "@/features/cleansing/components/book/BookFooter";
import BookHeader from "@/features/cleansing/components/book/BookHeader";
import { useState } from "react";
import { useUnlockGrimoireRitual } from "../hooks/useUnlockGrimoireRitual";
import type { GrimoireRitual } from "../types/grimoire.types";
import GrimoireBookPage from "./GrimoireBookPage";

type GrimoireLockedPageProps = {
  ritual: GrimoireRitual;
  onBack: () => void;
  onUnlocked: () => Promise<void>;
};

export default function GrimoireLockedPage({
  ritual,
  onBack,
  onUnlocked,
}: GrimoireLockedPageProps) {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { eternalBalance, refreshWallet } = useEssence();
  const { unlockRitual, isUnlocking, error, setError } =
    useUnlockGrimoireRitual();

  async function handleUnlock() {
    setError(null);

    if (eternalBalance < ritual.essenceCost) {
      setIsShopOpen(true);
      return;
    }

    const result = await unlockRitual(ritual.id);

    if (!result) return;

    await refreshWallet();
    await onUnlocked();
  }

  return (
    <>
      <GrimoireBookPage>
        <BookHeader
          eyebrow="Página Sellada"
          title={ritual.title}
          quote={ritual.summary}
        />

        <div className="mt-8">
          <button
            type="button"
            onClick={onBack}
            className="font-serif text-sm tracking-[0.14em] text-[#3f2412]/75 transition hover:text-[#241005]"
          >
            ← Volver al capítulo
          </button>

          <div className="mt-10 rounded-[28px] border border-[#3f2412]/25 bg-[#3f2412]/10 p-7 text-center shadow-inner">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#3f2412]/25 bg-[#fff7df]/35 text-3xl">
              🔒
            </div>

            <h3 className="mt-6 font-serif text-3xl font-semibold text-[#241005]">
              Esta página permanece sellada
            </h3>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#4b2b16]/80">
              Este ritual requiere desbloqueo con Esencias Eternas antes de
              mostrar sus materiales y procedimiento.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-[#3f2412]/20 bg-[#fff7df]/40 px-5 py-2 font-serif text-sm text-[#3f2412]">
              Acceso: {ritual.essenceCost} Esencias Eternas
            </div>

            <p className="mt-4 font-serif text-xs text-[#4b2b16]/70">
              Tu saldo actual: {eternalBalance} Esencias Eternas
            </p>

            <button
              type="button"
              onClick={handleUnlock}
              disabled={isUnlocking}
              className="mt-7 rounded-full border border-[#3f2412]/30 bg-[#3f2412]/15 px-7 py-3 font-serif text-xs uppercase tracking-[0.22em] text-[#241005] transition hover:bg-[#3f2412]/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUnlocking
                ? "Rompiendo sello..."
                : `Romper sello por ${ritual.essenceCost}`}
            </button>

            {error ? (
              <p className="mt-4 text-sm text-red-950/80">{error}</p>
            ) : null}

            {eternalBalance < ritual.essenceCost ? (
              <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-[#4b2b16]/70">
                No tienes suficientes Esencias Eternas. Puedes obtener más en el
                Centro de Esencias.
              </p>
            ) : null}
          </div>
        </div>

        <BookFooter page={3} totalPages={3} />
      </GrimoireBookPage>

      <EssenceShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
      />
    </>
  );
}