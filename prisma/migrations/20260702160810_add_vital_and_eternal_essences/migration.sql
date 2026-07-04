-- CreateEnum
CREATE TYPE "EssenceBalanceType" AS ENUM ('VITAL', 'ETERNAL', 'MIXED');

-- AlterTable
ALTER TABLE "EssenceTransaction" ADD COLUMN     "balanceType" "EssenceBalanceType";

-- AlterTable
ALTER TABLE "EssenceWallet" ADD COLUMN     "eternalBalance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastVitalRefillAt" TIMESTAMP(3),
ADD COLUMN     "vitalBalance" INTEGER NOT NULL DEFAULT 0;
