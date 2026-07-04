-- CreateTable
CREATE TABLE "CleansingRecipeUnlock" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CleansingRecipeUnlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CleansingRecipeUnlock_walletId_recipeId_key" ON "CleansingRecipeUnlock"("walletId", "recipeId");

-- AddForeignKey
ALTER TABLE "CleansingRecipeUnlock" ADD CONSTRAINT "CleansingRecipeUnlock_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "EssenceWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleansingRecipeUnlock" ADD CONSTRAINT "CleansingRecipeUnlock_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CleansingRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
