"use client";

import { useState } from "react";
import {
  GRIMOIRE_DISCLAIMER_VERSION,
  grimoireDisclaimer,
} from "../data/grimoireDisclaimer";

type GrimoireDisclaimerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccepted: () => void;
};

export default function GrimoireDisclaimerModal({
  isOpen,
  onClose,
  onAccepted,
}: GrimoireDisclaimerModalProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const allChecked =
    checkedItems.length === grimoireDisclaimer.confirmations.length;

  function toggleItem(item: string) {
    setCheckedItems((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );
  }

  async function handleAccept() {
    if (!allChecked || isAccepting) return;

    try {
      setIsAccepting(true);
      setError(null);

      const response = await fetch("/api/grimoire/disclaimer/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: GRIMOIRE_DISCLAIMER_VERSION,
          scope: "CONTROVERSIAL_RITUALS",
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as {
          error?: string;
        };

        throw new Error(data.error ?? "No se pudo guardar la aceptación.");
      }

      onAccepted();
      onClose();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error guardando la aceptación.";

      setError(message);
    } finally {
      setIsAccepting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-[2rem] border border-[#7b2d1d]/35 bg-[#0b0607] p-6 text-[#f5ead2] shadow-[0_0_90px_rgba(0,0,0,0.75)]">
        <p className="text-[10px] uppercase tracking-[0.36em] text-[#d7835b]">
          Rituales Oscuros
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
          {grimoireDisclaimer.title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#d7c7aa]/72">
          {grimoireDisclaimer.description}
        </p>

        <div className="mt-6 space-y-3">
          {grimoireDisclaimer.confirmations.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer gap-3 rounded-2xl border border-[#caa46a]/12 bg-black/20 p-4 text-sm leading-6 text-[#d7c7aa]/75"
            >
              <input
                type="checkbox"
                checked={checkedItems.includes(item)}
                onChange={() => toggleItem(item)}
                className="mt-1 h-4 w-4 accent-[#caa46a]"
              />

              <span>{item}</span>
            </label>
          ))}
        </div>

        {error ? (
          <p className="mt-4 text-sm text-red-200/85">{error}</p>
        ) : null}

        <div className="mt-7 flex flex-col justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={isAccepting}
            className="rounded-full border border-[#caa46a]/20 bg-black/20 px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#d7c7aa]/65 transition hover:bg-black/35 disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleAccept}
            disabled={!allChecked || isAccepting}
            className="rounded-full border border-[#7b2d1d]/45 bg-[#7b2d1d]/35 px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#f8e7c4] transition hover:bg-[#7b2d1d]/45 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isAccepting ? "Guardando..." : "Aceptar y abrir"}
          </button>
        </div>
      </div>
    </div>
  );
}