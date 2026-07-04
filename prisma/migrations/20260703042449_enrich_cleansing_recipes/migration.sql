-- CreateEnum
CREATE TYPE "RecipeDifficulty" AS ENUM ('EASY', 'MEDIUM', 'ADVANCED');

-- AlterTable
ALTER TABLE "CleansingRecipe" ADD COLUMN     "difficulty" "RecipeDifficulty" NOT NULL DEFAULT 'EASY',
ADD COLUMN     "estimatedMinutes" INTEGER,
ADD COLUMN     "expectedResult" TEXT,
ADD COLUMN     "origin" TEXT,
ADD COLUMN     "repeatEvery" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
