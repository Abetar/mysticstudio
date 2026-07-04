-- CreateTable
CREATE TABLE "EssencePurchase" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "amountPaid" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "essences" INTEGER NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EssencePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EssencePurchase_stripeSessionId_key" ON "EssencePurchase"("stripeSessionId");

-- CreateIndex
CREATE INDEX "EssencePurchase_walletId_idx" ON "EssencePurchase"("walletId");

-- CreateIndex
CREATE INDEX "EssencePurchase_packageId_idx" ON "EssencePurchase"("packageId");

-- CreateIndex
CREATE INDEX "EssencePurchase_stripePaymentIntentId_idx" ON "EssencePurchase"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "EssencePackage_stripePriceId_idx" ON "EssencePackage"("stripePriceId");

-- CreateIndex
CREATE INDEX "EssenceTransaction_walletId_idx" ON "EssenceTransaction"("walletId");

-- CreateIndex
CREATE INDEX "EssenceTransaction_referenceId_idx" ON "EssenceTransaction"("referenceId");

-- AddForeignKey
ALTER TABLE "EssencePurchase" ADD CONSTRAINT "EssencePurchase_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "EssenceWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssencePurchase" ADD CONSTRAINT "EssencePurchase_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "EssencePackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
