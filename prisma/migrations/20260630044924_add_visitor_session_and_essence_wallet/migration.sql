-- CreateEnum
CREATE TYPE "EssenceTransactionType" AS ENUM ('GRANT_FREE', 'PURCHASE', 'SUBSCRIPTION_GRANT', 'SPEND', 'REFUND', 'VISITOR_MERGE', 'ADMIN_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "MysticModule" AS ENUM ('TAROT', 'FORTUNE_COOKIE', 'CLEANSING_RECIPE', 'CRYSTAL_BALL');

-- CreateTable
CREATE TABLE "VisitorSession" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EssenceWallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "visitorSessionId" TEXT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EssenceWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EssenceTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "EssenceTransactionType" NOT NULL,
    "reason" TEXT,
    "module" "MysticModule",
    "referenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EssenceTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitorSession_anonymousId_key" ON "VisitorSession"("anonymousId");

-- CreateIndex
CREATE UNIQUE INDEX "EssenceWallet_userId_key" ON "EssenceWallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EssenceWallet_visitorSessionId_key" ON "EssenceWallet"("visitorSessionId");

-- AddForeignKey
ALTER TABLE "VisitorSession" ADD CONSTRAINT "VisitorSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssenceWallet" ADD CONSTRAINT "EssenceWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssenceWallet" ADD CONSTRAINT "EssenceWallet_visitorSessionId_fkey" FOREIGN KEY ("visitorSessionId") REFERENCES "VisitorSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssenceTransaction" ADD CONSTRAINT "EssenceTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "EssenceWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
