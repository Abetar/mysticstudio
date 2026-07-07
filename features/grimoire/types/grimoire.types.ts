import type {
  GrimoireAccessLevel,
  GrimoireCategory,
  RecipeDifficulty,
} from "@/app/generated/prisma/enums";

export type GrimoireRitual = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: GrimoireCategory;
  accessLevel: GrimoireAccessLevel;
  difficulty: RecipeDifficulty;
  estimatedMinutes: number | null;
  origin: string | null;
  intention: string | null;
  expectedResult: string | null;
  repeatEvery: string | null;
  tags: string[];
  ingredients: string[];
  steps: string[];
  warnings: string | null;
  notes: string | null;
  essenceCost: number;
  requiresDisclaimer: boolean;
  disclaimerVersion: string | null;
  isUnlocked: boolean;
  hasAcceptedDisclaimer: boolean;
};