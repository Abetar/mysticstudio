"use client";

import { useMemo, useState } from "react";
import type { CleansingCategory } from "@/app/generated/prisma/enums";
import {
  useCleansingRecipes,
  type CleansingRecipe,
} from "@/features/cleansing/hooks/useCleansingRecipes";
import EssenceShopModal from "@/features/essence/components/EssenceShopModal";
import { useEssence } from "@/features/essence/components/EssenceProvider";
import BookCategoryList, { type BookCategory } from "./BookCategoryList";
import BookFooter from "./BookFooter";
import BookHeader from "./BookHeader";
import BookPage from "./BookPage";
import BookSection from "./BookSection";
import RecipeMetadata from "./RecipeMetadata";

type BookView = "index" | "category" | "recipe";

const ANONYMOUS_ID_STORAGE_KEY = "mysticstudio.anonymousId";

const categoryBase: Omit<BookCategory, "count">[] = [
  { id: "GENERAL", title: "General", icon: "✨" },
  { id: "PROTECTION", title: "Protección", icon: "🛡" },
  { id: "MONEY", title: "Dinero", icon: "💰" },
  { id: "LOVE", title: "Amor", icon: "❤️" },
  { id: "HOME", title: "Hogar", icon: "🏠" },
  { id: "BUSINESS", title: "Negocio", icon: "🏢" },
  { id: "ENVY", title: "Envidia", icon: "🧿" },
  { id: "RETREAT", title: "Retiro", icon: "🚪" },
  { id: "ROAD_OPENER", title: "Abrecaminos", icon: "🗝" },
  { id: "EMOTIONAL", title: "Emocional", icon: "🌙" },
];

export default function CleansingBook() {
  const [view, setView] = useState<BookView>("index");
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CleansingCategory | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<CleansingRecipe | null>(
    null,
  );
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const { anonymousId, eternalBalance, refreshWallet } = useEssence();

  const { recipes, isLoading, error, refreshRecipes } = useCleansingRecipes();

  const categories = useMemo<BookCategory[]>(() => {
    return categoryBase.map((category) => ({
      ...category,
      count: recipes.filter((recipe) => recipe.category === category.id).length,
    }));
  }, [recipes]);

  const selectedCategory = useMemo(() => {
    return categories.find((category) => category.id === selectedCategoryId);
  }, [categories, selectedCategoryId]);

  const filteredRecipes = useMemo(() => {
    if (!selectedCategoryId) return [];
    return recipes.filter((recipe) => recipe.category === selectedCategoryId);
  }, [recipes, selectedCategoryId]);

  function handleOpenCategory(categoryId: string) {
    setSelectedCategoryId(categoryId as CleansingCategory);
    setSelectedRecipe(null);
    setUnlockError(null);
    setView("category");
  }

  function handleOpenRecipe(recipe: CleansingRecipe) {
    setSelectedRecipe(recipe);
    setUnlockError(null);
    setView("recipe");
  }

  function handleBackToIndex() {
    setSelectedRecipe(null);
    setUnlockError(null);
    setView("index");
  }

  function handleBackToCategory() {
    setSelectedRecipe(null);
    setUnlockError(null);
    setView("category");
  }

  async function handleUnlockRecipe(recipe: CleansingRecipe) {
    if (isUnlocking) return;

    setUnlockError(null);

    if (eternalBalance < recipe.essenceCost) {
      setIsShopOpen(true);
      return;
    }

    const resolvedAnonymousId =
      anonymousId ?? window.localStorage.getItem(ANONYMOUS_ID_STORAGE_KEY);

    if (!resolvedAnonymousId) {
      setUnlockError("No se pudo identificar tu sesión mística.");
      return;
    }

    try {
      setIsUnlocking(true);

      const response = await fetch("/api/cleansing-recipes/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anonymousId: resolvedAnonymousId,
          recipeId: recipe.id,
        }),
      });

      if (response.status === 402) {
        setIsShopOpen(true);
        return;
      }

      if (!response.ok) {
        const data = (await response.json()) as {
          error?: string;
        };

        throw new Error(data.error ?? "No se pudo desbloquear la receta.");
      }

      await refreshWallet();

      const refreshedRecipes = await refreshRecipes();
      const refreshedRecipe = refreshedRecipes.find(
        (item) => item.id === recipe.id,
      );

      if (refreshedRecipe) {
        setSelectedRecipe(refreshedRecipe);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error desbloqueando la receta.";

      setUnlockError(message);
    } finally {
      setIsUnlocking(false);
    }
  }

  if (view === "recipe" && selectedRecipe) {
    const isLockedPremiumRecipe =
      selectedRecipe.isPremium && !selectedRecipe.isUnlocked;

    return (
      <>
        <BookPage key={`recipe-page-${selectedRecipe.id}`}>
          <BookHeader
            eyebrow="Receta"
            title={selectedRecipe.title}
            quote={selectedRecipe.summary}
          />

          <RecipeMetadata
            category={selectedRecipe.category}
            difficulty={selectedRecipe.difficulty}
            estimatedMinutes={selectedRecipe.estimatedMinutes}
            isPremium={selectedRecipe.isPremium}
            essenceCost={selectedRecipe.essenceCost}
          />

          <div className="mt-8">
            <button
              type="button"
              onClick={handleBackToCategory}
              className="font-serif text-sm tracking-[0.14em] text-[#3f2412]/75 transition hover:text-[#241005]"
            >
              ← Volver al capítulo
            </button>

            {isLockedPremiumRecipe ? (
              <div className="mt-8 rounded-[24px] border border-[#3f2412]/20 bg-[#3f2412]/10 p-6 text-center shadow-inner">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#3f2412]/25 bg-[#fff7df]/40 text-2xl">
                  🔒
                </div>

                <h3 className="mt-5 font-serif text-2xl font-semibold text-[#241005]">
                  Receta premium bloqueada
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#4b2b16]/80">
                  Esta limpia forma parte del archivo reservado del libro.
                  Puedes ver su resumen y sus métricas, pero los ingredientes,
                  pasos y notas tradicionales se desbloquean con Esencias
                  Eternas.
                </p>

                <div className="mt-5 inline-flex items-center rounded-full border border-[#3f2412]/20 bg-[#fff7df]/40 px-4 py-2 font-serif text-sm text-[#3f2412]">
                  Acceso: {selectedRecipe.essenceCost} Esencias Eternas
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    disabled={isUnlocking}
                    onClick={() => handleUnlockRecipe(selectedRecipe)}
                    className="rounded-full border border-[#3f2412]/30 bg-[#3f2412]/15 px-6 py-3 font-serif text-xs uppercase tracking-[0.2em] text-[#241005] transition hover:bg-[#3f2412]/25 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUnlocking
                      ? "Desbloqueando..."
                      : `Desbloquear por ${selectedRecipe.essenceCost}`}
                  </button>
                </div>

                {unlockError ? (
                  <p className="mt-4 text-sm text-red-950/80">{unlockError}</p>
                ) : null}

                {eternalBalance < selectedRecipe.essenceCost ? (
                  <p className="mt-4 text-xs leading-6 text-[#4b2b16]/70">
                    Saldo actual: {eternalBalance} Esencias Eternas. Necesitas
                    obtener más para desbloquear esta receta.
                  </p>
                ) : null}
              </div>
            ) : (
              <>
                <BookSection title="Propósito" icon="✦">
                  <p>
                    {selectedRecipe.expectedResult ?? selectedRecipe.summary}
                  </p>
                </BookSection>

                <BookSection title="Necesitarás" icon="🧺">
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient) => (
                      <li key={ingredient} className="flex gap-3">
                        <span className="mt-1 text-[#3f2412]/60">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </BookSection>

                <BookSection title="Procedimiento" icon="📜">
                  <ol className="space-y-3">
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={`${index}-${step}`} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3f2412]/20 font-serif text-xs text-[#3f2412]/70">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </BookSection>

                {selectedRecipe.repeatEvery ? (
                  <BookSection title="Frecuencia" icon="📅">
                    <p>{selectedRecipe.repeatEvery}</p>
                  </BookSection>
                ) : null}

                {selectedRecipe.origin ? (
                  <BookSection title="Tradición" icon="📖">
                    <p>{selectedRecipe.origin}</p>
                  </BookSection>
                ) : null}

                {selectedRecipe.notes ? (
                  <BookSection title="Notas tradicionales" icon="🕯">
                    <p>{selectedRecipe.notes}</p>
                  </BookSection>
                ) : null}

                {selectedRecipe.warnings ? (
                  <BookSection title="Precauciones" icon="⚠">
                    <p>{selectedRecipe.warnings}</p>
                  </BookSection>
                ) : null}

                {selectedRecipe.tags.length ? (
                  <BookSection title="Etiquetas" icon="🏷">
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#3f2412]/15 bg-[#3f2412]/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#3f2412]/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </BookSection>
                ) : null}
              </>
            )}
          </div>

          <BookFooter page={3} totalPages={3} />
        </BookPage>

        <EssenceShopModal
          isOpen={isShopOpen}
          onClose={() => setIsShopOpen(false)}
        />
      </>
    );
  }

  if (view === "category" && selectedCategory) {
    return (
      <BookPage key={`category-page-${selectedCategory.id}`}>
        <BookHeader
          eyebrow="Capítulo"
          title={selectedCategory.title}
          quote="Cada receta guarda una forma distinta de limpiar, retirar o armonizar."
        />

        <div className="mt-8">
          <button
            type="button"
            onClick={handleBackToIndex}
            className="font-serif text-sm tracking-[0.14em] text-[#3f2412]/75 transition hover:text-[#241005]"
          >
            ← Volver al índice
          </button>

          <div className="mt-6 space-y-3">
            {filteredRecipes.map((recipe) => (
              <button
                key={recipe.id}
                type="button"
                onClick={() => handleOpenRecipe(recipe)}
                className="group w-full rounded-xl border border-[#3f2412]/15 bg-[#fff7df]/20 px-4 py-4 text-left transition hover:bg-[#3f2412]/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#241005]">
                      {recipe.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#4b2b16]/80">
                      {recipe.summary}
                    </p>
                  </div>

                  {recipe.isPremium ? (
                    <span className="shrink-0 rounded-full border border-[#3f2412]/25 bg-[#3f2412]/10 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#3f2412]">
                      {recipe.isUnlocked
                        ? "Premium · Desbloqueada"
                        : `Premium · ${recipe.essenceCost}`}
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-[#3f2412]/15 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#4b2b16]/70">
                      Gratis
                    </span>
                  )}
                </div>
              </button>
            ))}

            {!filteredRecipes.length ? (
              <p className="py-10 text-center font-serif text-sm italic text-[#4b2b16]/75">
                Este capítulo todavía no tiene recetas.
              </p>
            ) : null}
          </div>
        </div>

        <BookFooter page={2} totalPages={3} />
      </BookPage>
    );
  }

  return (
    <BookPage key="index-page">
      <BookHeader
        eyebrow="Libro de Limpias"
        title="Índice de Limpias"
        quote="Toda limpieza comienza con una intención clara."
      />

      {isLoading ? (
        <p className="mt-12 text-center font-serif text-sm italic text-[#4b2b16]/75">
          Cargando índice...
        </p>
      ) : error ? (
        <p className="mt-12 text-center font-serif text-sm italic text-red-950/80">
          {error}
        </p>
      ) : (
        <BookCategoryList
          categories={categories}
          onOpenCategory={handleOpenCategory}
        />
      )}

      <BookFooter page={1} totalPages={3} />
    </BookPage>
  );
}