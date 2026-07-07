import type { MysticModule } from "@/app/generated/prisma/client";

export const ESSENCE_COST: Record<MysticModule, number> = {
  TAROT: 5,
  FORTUNE_COOKIE: 1,
  CLEANSING_RECIPE: 2,
  CRYSTAL_BALL: 10,
  GRIMOIRE_RITUAL: 0,
};