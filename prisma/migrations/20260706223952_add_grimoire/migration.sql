-- CreateEnum
CREATE TYPE "GrimoireCategory" AS ENUM ('PROTECTION', 'MONEY', 'LOVE', 'HOME', 'BUSINESS', 'ROAD_OPENER', 'CLEANSING', 'HEALING', 'DREAMS', 'JUSTICE', 'SEPARATION', 'SWEETENING', 'BINDING', 'DOMINATION', 'OCCULT_TRADITION', 'RESERVED', 'GENERAL');

-- CreateEnum
CREATE TYPE "GrimoireAccessLevel" AS ENUM ('PUBLIC', 'PREMIUM', 'RESERVED');

-- CreateEnum
CREATE TYPE "GrimoireDisclaimerScope" AS ENUM ('RESERVED_GRIMOIRE', 'CONTROVERSIAL_RITUALS');

-- AlterEnum
ALTER TYPE "MysticModule" ADD VALUE 'GRIMOIRE_RITUAL';

-- CreateTable
CREATE TABLE "GrimoireRitual" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" "GrimoireCategory" NOT NULL,
    "accessLevel" "GrimoireAccessLevel" NOT NULL DEFAULT 'PUBLIC',
    "difficulty" "RecipeDifficulty" NOT NULL DEFAULT 'EASY',
    "estimatedMinutes" INTEGER,
    "origin" TEXT,
    "intention" TEXT,
    "expectedResult" TEXT,
    "repeatEvery" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ingredients" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "steps" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "warnings" TEXT,
    "notes" TEXT,
    "essenceCost" INTEGER NOT NULL DEFAULT 0,
    "requiresDisclaimer" BOOLEAN NOT NULL DEFAULT false,
    "disclaimerVersion" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrimoireRitual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrimoireRitualUnlock" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "ritualId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrimoireRitualUnlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrimoireDisclaimerAcceptance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "scope" "GrimoireDisclaimerScope" NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" TEXT,
    "ipHash" TEXT,

    CONSTRAINT "GrimoireDisclaimerAcceptance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GrimoireRitual_slug_key" ON "GrimoireRitual"("slug");

-- CreateIndex
CREATE INDEX "GrimoireRitual_category_idx" ON "GrimoireRitual"("category");

-- CreateIndex
CREATE INDEX "GrimoireRitual_accessLevel_idx" ON "GrimoireRitual"("accessLevel");

-- CreateIndex
CREATE INDEX "GrimoireRitual_isPublished_idx" ON "GrimoireRitual"("isPublished");

-- CreateIndex
CREATE INDEX "GrimoireRitualUnlock_walletId_idx" ON "GrimoireRitualUnlock"("walletId");

-- CreateIndex
CREATE INDEX "GrimoireRitualUnlock_ritualId_idx" ON "GrimoireRitualUnlock"("ritualId");

-- CreateIndex
CREATE UNIQUE INDEX "GrimoireRitualUnlock_walletId_ritualId_key" ON "GrimoireRitualUnlock"("walletId", "ritualId");

-- CreateIndex
CREATE INDEX "GrimoireDisclaimerAcceptance_userId_idx" ON "GrimoireDisclaimerAcceptance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GrimoireDisclaimerAcceptance_userId_version_scope_key" ON "GrimoireDisclaimerAcceptance"("userId", "version", "scope");

-- AddForeignKey
ALTER TABLE "GrimoireRitualUnlock" ADD CONSTRAINT "GrimoireRitualUnlock_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "EssenceWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrimoireRitualUnlock" ADD CONSTRAINT "GrimoireRitualUnlock_ritualId_fkey" FOREIGN KEY ("ritualId") REFERENCES "GrimoireRitual"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrimoireDisclaimerAcceptance" ADD CONSTRAINT "GrimoireDisclaimerAcceptance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
