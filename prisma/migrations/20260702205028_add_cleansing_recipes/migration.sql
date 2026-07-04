-- CreateEnum
CREATE TYPE "CleansingCategory" AS ENUM ('PROTECTION', 'MONEY', 'LOVE', 'HOME', 'BUSINESS', 'ENVY', 'RETREAT', 'ROAD_OPENER', 'EMOTIONAL', 'GENERAL');

-- CreateTable
CREATE TABLE "CleansingRecipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" "CleansingCategory" NOT NULL,
    "ingredients" TEXT[],
    "steps" TEXT[],
    "warnings" TEXT,
    "notes" TEXT,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "essenceCost" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CleansingRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CleansingRecipe_slug_key" ON "CleansingRecipe"("slug");
