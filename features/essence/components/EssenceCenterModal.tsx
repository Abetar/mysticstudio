"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gem, History, ShieldCheck, Sparkles, X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { useEssencePurchases } from "../hooks/useEssencePurchases";
import { useEssenceWallet } from "../hooks/useEssenceWallet";
import EssenceShopModal from "./EssenceShopModal";

const MAX_VITAL_ESSENCES = 15;

type EssenceCenterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function EssenceCenterModal({
  isOpen,
  onClose,
}: EssenceCenterModalProps) {
  const [isShopOpen, setIsShopOpen] = useState(false);

  const { data: session, status } = useSession();

  const { vitalBalance, eternalBalance, balance, isLoading } =
    useEssenceWallet();

  const {
    purchases,
    isLoading: isPurchasesLoading,
    error: purchasesError,
  } = useEssencePurchases();

  const latestPurchases = purchases.slice(0, 4);

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ duration: 0.28 }}
              className="fixed left-1/2 top-1/2 z-[210] w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-[#caa46a]/20 bg-[#09060c] shadow-[0_40px_120px_rgba(0,0,0,.75)]"
            >
              <div className="relative max-h-[90vh] overflow-y-auto px-5 py-6 sm:px-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(202,164,106,.14),transparent_55%)]" />

                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 z-20 rounded-full border border-[#caa46a]/20 p-2 text-[#d7c7aa]/70 transition hover:bg-white/5"
                >
                  <X size={16} />
                </button>

                <div className="relative z-10">
                  <div className="flex justify-center">
                    <Sparkles size={28} className="text-[#caa46a]" />
                  </div>

                  <h2 className="mt-3 text-center text-2xl font-semibold tracking-[-0.04em] text-[#f6ead4] sm:text-3xl">
                    Centro de Esencias
                  </h2>

                  <p className="mx-auto mt-3 max-w-lg text-center text-xs leading-6 text-[#d7c7aa]/70 sm:text-sm">
                    Administra tus Esencias Vitales y Eternas, revisa tus
                    compras recientes y obtén más saldo para continuar tus
                    rituales.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[22px] border border-[#caa46a]/20 bg-black/25 p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#caa46a]/70">
                        <Sparkles size={14} />
                        Vitales
                      </div>

                      <div className="mt-4 text-3xl font-semibold text-[#f8e7c4]">
                        {isLoading
                          ? "..."
                          : `${vitalBalance}/${MAX_VITAL_ESSENCES}`}
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[#d7c7aa]/60">
                        Se recargan diariamente.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-[#caa46a]/20 bg-black/25 p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#caa46a]/70">
                        <Gem size={14} />
                        Eternas
                      </div>

                      <div className="mt-4 text-3xl font-semibold text-[#f8e7c4]">
                        {isLoading ? "..." : eternalBalance}
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[#d7c7aa]/60">
                        Compradas, no expiran.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-[#caa46a]/20 bg-black/25 p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#caa46a]/70">
                        <Sparkles size={14} />
                        Total
                      </div>

                      <div className="mt-4 text-3xl font-semibold text-[#f8e7c4]">
                        {isLoading ? "..." : balance}
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[#d7c7aa]/60">
                        Disponible para módulos.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsShopOpen(true)}
                    className="mt-5 w-full rounded-full border border-[#caa46a]/40 bg-[#caa46a]/15 px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-[#f8e7c4] transition hover:bg-[#caa46a]/25"
                  >
                    Comprar Esencias Eternas
                  </button>

                  <div className="mt-5 rounded-[24px] border border-[#caa46a]/20 bg-black/20 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#f8e7c4]">
                      <ShieldCheck size={16} className="text-[#caa46a]" />
                      {session?.user
                        ? "Progreso sincronizado"
                        : "Guardar progreso"}
                    </div>

                    {status === "loading" ? (
                      <p className="mt-3 text-sm text-[#d7c7aa]/60">
                        Revisando sesión...
                      </p>
                    ) : session?.user ? (
                      <>
                        <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/70">
                          Tus Esencias, compras y desbloqueos quedan ligados a
                          tu cuenta.
                        </p>

                        <p className="mt-2 text-xs text-[#d7c7aa]/50">
                          {session.user.email}
                        </p>

                        <button
                          type="button"
                          onClick={() => signOut()}
                          className="mt-4 rounded-full border border-[#caa46a]/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#f8e7c4] transition hover:bg-white/5"
                        >
                          Cerrar sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="mt-3 text-sm leading-6 text-[#d7c7aa]/70">
                          Sincroniza tus Esencias, compras y recetas
                          desbloqueadas para no perder tu progreso.
                        </p>

                        <button
                          type="button"
                          onClick={() => signIn("google")}
                          className="mt-4 w-full rounded-full border border-[#caa46a]/40 bg-[#caa46a]/15 px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-[#f8e7c4] transition hover:bg-[#caa46a]/25"
                        >
                          Continuar con Google
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mt-7 rounded-[24px] border border-[#caa46a]/20 bg-black/20 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#f8e7c4]">
                      <History size={16} className="text-[#caa46a]" />
                      Compras recientes
                    </div>

                    {isPurchasesLoading ? (
                      <p className="py-8 text-center text-sm text-[#d7c7aa]/60">
                        Cargando historial...
                      </p>
                    ) : purchasesError ? (
                      <p className="py-8 text-center text-sm text-red-300">
                        {purchasesError}
                      </p>
                    ) : latestPurchases.length ? (
                      <div className="mt-4 space-y-3">
                        {latestPurchases.map((purchase) => (
                          <div
                            key={purchase.id}
                            className="rounded-2xl border border-[#caa46a]/10 bg-white/[0.03] px-4 py-3"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-sm font-medium text-[#f8e7c4]">
                                  {purchase.package.name}
                                </p>

                                <p className="mt-1 text-xs text-[#d7c7aa]/60">
                                  {formatDate(purchase.createdAt)} ·{" "}
                                  {purchase.status}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-sm font-semibold text-[#f8e7c4]">
                                  +{purchase.essences}
                                </p>

                                <p className="mt-1 text-xs text-[#d7c7aa]/60">
                                  ${purchase.amountPaid} {purchase.currency}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="py-8 text-center text-sm text-[#d7c7aa]/60">
                        Todavía no tienes compras registradas.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <EssenceShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
      />
    </>
  );
}