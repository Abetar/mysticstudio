"use client";

import type { RecipeDifficulty } from "@/app/generated/prisma/enums";
import RecipeBadge from "./RecipeBadge";

type RecipeMetadataProps = {
  category: string;
  difficulty: RecipeDifficulty;
  estimatedMinutes: number | null;
  isPremium: boolean;
  essenceCost: number;
};

const difficultyLabels: Record<RecipeDifficulty, string> = {
  EASY: "Fácil",
  MEDIUM: "Intermedia",
  ADVANCED: "Avanzada",
};

const categoryLabels: Record<string, string> = {
  GENERAL: "General",
  PROTECTION: "Protección",
  MONEY: "Dinero",
  LOVE: "Amor",
  HOME: "Hogar",
  BUSINESS: "Negocio",
  ENVY: "Envidia",
  RETREAT: "Retiro",
  ROAD_OPENER: "Abrecaminos",
  EMOTIONAL: "Emocional",
};

const categoryIcons: Record<string, string> = {
  GENERAL: "✨",
  PROTECTION: "🛡",
  MONEY: "💰",
  LOVE: "❤️",
  HOME: "🏠",
  BUSINESS: "🏢",
  ENVY: "🧿",
  RETREAT: "🚪",
  ROAD_OPENER: "🗝",
  EMOTIONAL: "🌙",
};

export default function RecipeMetadata({
  category,
  difficulty,
  estimatedMinutes,
  isPremium,
  essenceCost,
}: RecipeMetadataProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <RecipeBadge
        icon={categoryIcons[category] ?? "📖"}
        label="Categoría"
        value={categoryLabels[category] ?? category}
      />

      <RecipeBadge
        icon="⭐"
        label="Dificultad"
        value={difficultyLabels[difficulty]}
      />

      {estimatedMinutes ? (
        <RecipeBadge
          icon="⏱"
          label="Tiempo"
          value={`${estimatedMinutes} min`}
        />
      ) : null}

      {isPremium ? (
        <RecipeBadge
          icon="🔒"
          label="Premium"
          value={`${essenceCost} Esencias`}
          variant="premium"
        />
      ) : (
        <RecipeBadge
          icon="📖"
          label="Acceso"
          value="Gratis"
        />
      )}
    </div>
  );
}