"use client";

import { useMemo, useState } from "react";
import type { GrimoireCategory } from "@/app/generated/prisma/enums";
import { useGrimoireRituals } from "../hooks/useGrimoireRituals";

const categories: {
  key: GrimoireCategory | "ALL" | "DARK";
  label: string;
  description: string;
}[] = [
  {
    key: "ALL",
    label: "Todos",
    description: "Todos los rituales publicados del Grimorio.",
  },
  {
    key: "PROTECTION",
    label: "Protección",
    description: "Rituales para resguardo personal, hogar y energía.",
  },
  {
    key: "MONEY",
    label: "Prosperidad",
    description: "Rituales de abundancia, dinero y caminos materiales.",
  },
  {
    key: "LOVE",
    label: "Amor",
    description: "Rituales afectivos, reconciliación y vínculos.",
  },
  {
    key: "CLEANSING",
    label: "Limpieza",
    description: "Procesos de purificación y descarga energética.",
  },
  {
    key: "DARK",
    label: "Rituales Oscuros",
    description: "Prácticas reservadas de influencia, separación o dominio.",
  },
];

const darkCategories: GrimoireCategory[] = [
  "SEPARATION",
  "SWEETENING",
  "BINDING",
  "DOMINATION",
  "RESERVED",
];

export default function GrimoireShelf() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]["key"]>("ALL");

  const { rituals, isLoading, error } = useGrimoireRituals();

  const filteredRituals = useMemo(() => {
    if (selectedCategory === "ALL") return rituals;

    if (selectedCategory === "DARK") {
      return rituals.filter((ritual) =>
        darkCategories.includes(ritual.category),
      );
    }

    return rituals.filter((ritual) => ritual.category === selectedCategory);
  }, [rituals, selectedCategory]);

  const selectedCategoryData =
    categories.find((category) => category.key === selectedCategory) ??
    categories[0];

  return (
    <div className="grid min-h-[520px] gap-5 rounded-[2rem] border border-[#caa46a]/20 bg-[#070407]/92 p-4 shadow-[0_0_90px_rgba(0,0,0,0.65)] backdrop-blur-xl lg:grid-cols-[280px_1fr]">
      <aside className="rounded-[1.5rem] border border-[#caa46a]/12 bg-black/20 p-4">
        <p className="mb-4 text-[10px] uppercase tracking-[0.36em] text-[#caa46a]/70">
          Códices
        </p>

        <div className="space-y-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category.key;
            const isDark = category.key === "DARK";

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => setSelectedCategory(category.key)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-[#caa46a]/40 bg-[#caa46a]/12"
                    : "border-[#caa46a]/10 bg-black/10 hover:border-[#caa46a]/25 hover:bg-black/20"
                } ${isDark ? "shadow-[0_0_32px_rgba(123,45,29,0.12)]" : ""}`}
              >
                <span
                  className={`block text-xs font-semibold uppercase tracking-[0.24em] ${
                    isDark ? "text-[#d7835b]" : "text-[#f5ead2]"
                  }`}
                >
                  {category.label}
                </span>

                <span className="mt-2 block text-xs leading-5 text-[#d7c7aa]/55">
                  {category.description}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="rounded-[1.5rem] border border-[#caa46a]/12 bg-[#0b0709]/70 p-5">
        <p className="text-[10px] uppercase tracking-[0.36em] text-[#caa46a]/70">
          Grimorio
        </p>

        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#f5ead2]">
          {selectedCategoryData.label}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d7c7aa]/65">
          {selectedCategoryData.description}
        </p>

        <div className="mt-7">
          {isLoading ? (
            <p className="text-sm text-[#d7c7aa]/55">
              Cargando páginas del Grimorio...
            </p>
          ) : null}

          {error ? (
            <p className="text-sm text-red-200/80">{error}</p>
          ) : null}

          {!isLoading && !error && filteredRituals.length === 0 ? (
            <div className="rounded-[1.5rem] border border-[#caa46a]/10 bg-black/20 p-6">
              <p className="text-sm leading-7 text-[#d7c7aa]/60">
                Todavía no hay rituales publicados en esta sección.
              </p>
            </div>
          ) : null}

          {!isLoading && !error && filteredRituals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredRituals.map((ritual) => (
                <article
                  key={ritual.id}
                  className="rounded-[1.5rem] border border-[#caa46a]/12 bg-black/20 p-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[#caa46a]/60">
                    {ritual.accessLevel}
                  </p>

                  <h4 className="mt-2 text-xl font-semibold text-[#f7e6c3]">
                    {ritual.title}
                  </h4>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#d7c7aa]/62">
                    {ritual.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-[#caa46a]/70">
                    <span className="rounded-full border border-[#caa46a]/15 px-3 py-1">
                      {ritual.difficulty}
                    </span>

                    {ritual.essenceCost > 0 ? (
                      <span className="rounded-full border border-[#caa46a]/15 px-3 py-1">
                        {ritual.essenceCost} eternas
                      </span>
                    ) : (
                      <span className="rounded-full border border-[#caa46a]/15 px-3 py-1">
                        Gratis
                      </span>
                    )}

                    {ritual.requiresDisclaimer ? (
                      <span className="rounded-full border border-[#7b2d1d]/30 px-3 py-1 text-[#d7835b]">
                        Aviso requerido
                      </span>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}