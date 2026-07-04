"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEssence } from "../components/EssenceProvider";
import { useEssencePackages } from "../hooks/useEssencePackages";

type EssenceShopModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EssenceShopModal({
  isOpen,
  onClose,
}: EssenceShopModalProps) {
  const { packages, isLoading, error } = useEssencePackages();
  const { anonymousId } = useEssence();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleBuyPackage(packageSlug: string) {
    try {
      setIsRedirecting(true);
      setCheckoutError(null);

      if (!anonymousId) {
        throw new Error("No se pudo identificar tu sesión.");
      }

      const response = await fetch("/api/payments/checkout/essence-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anonymousId,
          packageSlug,
        }),
      });

      const data = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? "No se pudo iniciar el pago.");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error iniciando el pago.";

      setCheckoutError(message);
      setIsRedirecting(false);
    }
  }

  return (
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
            className="fixed left-1/2 top-1/2 z-[210] w-[94vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-[#caa46a]/20 bg-[#09060c] shadow-[0_40px_120px_rgba(0,0,0,.75)]"
          >
            <div className="relative max-h-[90vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
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
                  Obtener Esencias Eternas
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-center text-xs leading-6 text-[#d7c7aa]/70 sm:text-sm">
                  Las Esencias Eternas sirven para continuar usando módulos
                  cuando se agotan tus Vitales y para desbloquear contenido
                  premium permanente.
                </p>

                {checkoutError ? (
                  <div className="mt-5 rounded-2xl border border-red-400/25 bg-red-950/30 px-4 py-3 text-center text-sm text-red-200">
                    {checkoutError}
                  </div>
                ) : null}

                {isLoading ? (
                  <div className="py-14 text-center text-sm text-[#d7c7aa]/70">
                    Cargando paquetes...
                  </div>
                ) : error ? (
                  <div className="py-14 text-center text-sm text-red-300">
                    {error}
                  </div>
                ) : (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {packages.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className={`relative flex min-h-[245px] flex-col overflow-hidden rounded-[22px] border p-4 transition ${
                          item.isPopular
                            ? "border-[#caa46a] bg-[#17110a]"
                            : "border-[#caa46a]/20 bg-black/20"
                        }`}
                      >
                        {item.badge ? (
                          <div className="absolute right-3 top-3 max-w-[120px] rounded-full bg-[#caa46a] px-2.5 py-1 text-center text-[8px] font-semibold uppercase tracking-[0.18em] text-[#120d05]">
                            {item.badge}
                          </div>
                        ) : null}

                        <div className="pr-20">
                          <h3 className="text-lg font-semibold text-[#f7ebd5]">
                            {item.name}
                          </h3>

                          <p className="mt-2 min-h-[40px] text-xs leading-5 text-[#d7c7aa]/70">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-5 text-center">
                          <div className="text-4xl font-bold leading-none text-[#f8e7c4]">
                            {item.essences}
                          </div>

                          <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#caa46a]/70">
                            Esencias Eternas
                          </div>

                          <div className="mt-4 text-2xl font-semibold text-[#f8e7c4]">
                            ${item.price}
                          </div>

                          <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#caa46a]/60">
                            {item.currency}
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={isRedirecting}
                          className="mt-auto w-full rounded-full border border-[#caa46a]/40 bg-[#caa46a]/15 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#f8e7c4] transition hover:bg-[#caa46a]/25 disabled:cursor-not-allowed disabled:opacity-45"
                          onClick={() => handleBuyPackage(item.slug)}
                        >
                          {isRedirecting ? "Redirigiendo..." : "Comprar"}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}