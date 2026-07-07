import { prisma } from "@/lib/prisma/prisma";
import type { MysticModule } from "@/app/generated/prisma/enums";

const DAILY_VITAL_ESSENCE_MAX = 15;

function isSameUtcDay(dateA: Date, dateB: Date) {
  return (
    dateA.getUTCFullYear() === dateB.getUTCFullYear() &&
    dateA.getUTCMonth() === dateB.getUTCMonth() &&
    dateA.getUTCDate() === dateB.getUTCDate()
  );
}

export async function getOrCreateVisitorWallet(anonymousId: string) {
  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const visitor = await tx.visitorSession.upsert({
      where: { anonymousId },
      update: { lastSeenAt: now },
      create: { anonymousId },
      include: { wallet: true },
    });

    if (!visitor.wallet) {
      return tx.essenceWallet.create({
        data: {
          visitorSession: { connect: { id: visitor.id } },
          balance: DAILY_VITAL_ESSENCE_MAX,
          vitalBalance: DAILY_VITAL_ESSENCE_MAX,
          eternalBalance: 0,
          lastVitalRefillAt: now,
          transactions: {
            create: {
              amount: DAILY_VITAL_ESSENCE_MAX,
              type: "GRANT_FREE",
              balanceType: "VITAL",
              reason: "Daily starter vital essences",
            },
          },
        },
      });
    }

    const wallet = visitor.wallet;

    const legacyBalanceNeedsMigration =
      wallet.balance > 0 &&
      wallet.vitalBalance === 0 &&
      wallet.eternalBalance === 0;

    if (legacyBalanceNeedsMigration) {
      const migratedVitalBalance = Math.min(
        wallet.balance,
        DAILY_VITAL_ESSENCE_MAX,
      );
      const migratedEternalBalance = Math.max(
        wallet.balance - DAILY_VITAL_ESSENCE_MAX,
        0,
      );

      return tx.essenceWallet.update({
        where: { id: wallet.id },
        data: {
          vitalBalance: migratedVitalBalance,
          eternalBalance: migratedEternalBalance,
          balance: migratedVitalBalance + migratedEternalBalance,
          lastVitalRefillAt: now,
        },
      });
    }

    const shouldRefillVitalEssences =
      !wallet.lastVitalRefillAt || !isSameUtcDay(wallet.lastVitalRefillAt, now);

    if (shouldRefillVitalEssences) {
      const refillAmount = Math.max(
        DAILY_VITAL_ESSENCE_MAX - wallet.vitalBalance,
        0,
      );

      if (refillAmount <= 0) {
        return tx.essenceWallet.update({
          where: { id: wallet.id },
          data: {
            lastVitalRefillAt: now,
            balance: wallet.vitalBalance + wallet.eternalBalance,
          },
        });
      }

      return tx.essenceWallet.update({
        where: { id: wallet.id },
        data: {
          vitalBalance: DAILY_VITAL_ESSENCE_MAX,
          balance: DAILY_VITAL_ESSENCE_MAX + wallet.eternalBalance,
          lastVitalRefillAt: now,
          transactions: {
            create: {
              amount: refillAmount,
              type: "GRANT_FREE",
              balanceType: "VITAL",
              reason: "Daily vital essence refill",
            },
          },
        },
      });
    }

    return tx.essenceWallet.update({
      where: { id: wallet.id },
      data: {
        balance: wallet.vitalBalance + wallet.eternalBalance,
      },
    });
  });
}

export async function spendEssences(input: {
  anonymousId: string;
  amount: number;
  module: MysticModule;
  reason?: string;
  referenceId?: string;
}) {
  if (input.amount <= 0) {
    throw new Error("Essence amount must be greater than zero.");
  }

  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const visitor = await tx.visitorSession.findUnique({
      where: { anonymousId: input.anonymousId },
      include: { wallet: true },
    });

    if (!visitor?.wallet) {
      throw new Error("Visitor wallet not found.");
    }

    let vitalBalance = visitor.wallet.vitalBalance;
    const eternalBalance = visitor.wallet.eternalBalance;

    const shouldRefillVitalEssences =
      !visitor.wallet.lastVitalRefillAt ||
      !isSameUtcDay(visitor.wallet.lastVitalRefillAt, now);

    if (shouldRefillVitalEssences) {
      vitalBalance = DAILY_VITAL_ESSENCE_MAX;
    }

    const totalBalance = vitalBalance + eternalBalance;

    if (totalBalance < input.amount) {
      throw new Error("Not enough essences.");
    }

    const vitalSpent = Math.min(vitalBalance, input.amount);
    const eternalSpent = input.amount - vitalSpent;

    const nextVitalBalance = vitalBalance - vitalSpent;
    const nextEternalBalance = eternalBalance - eternalSpent;
    const nextBalance = nextVitalBalance + nextEternalBalance;

    const balanceType =
      vitalSpent > 0 && eternalSpent > 0
        ? "MIXED"
        : vitalSpent > 0
          ? "VITAL"
          : "ETERNAL";

    return tx.essenceWallet.update({
      where: { id: visitor.wallet.id },
      data: {
        vitalBalance: nextVitalBalance,
        eternalBalance: nextEternalBalance,
        balance: nextBalance,
        lastVitalRefillAt: shouldRefillVitalEssences
          ? now
          : visitor.wallet.lastVitalRefillAt,
        transactions: {
          create: {
            amount: -input.amount,
            type: "SPEND",
            balanceType,
            module: input.module,
            reason: input.reason,
            referenceId: input.referenceId,
          },
        },
      },
    });
  });
}

export async function spendEssencesFromWalletId(input: {
  walletId: string;
  amount: number;
  module: MysticModule;
  reason?: string;
  referenceId?: string;
}) {
  if (input.amount <= 0) {
    throw new Error("Essence amount must be greater than zero.");
  }

  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const wallet = await tx.essenceWallet.findUnique({
      where: { id: input.walletId },
    });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    let vitalBalance = wallet.vitalBalance;
    const eternalBalance = wallet.eternalBalance;

    const shouldRefillVitalEssences =
      !wallet.lastVitalRefillAt || !isSameUtcDay(wallet.lastVitalRefillAt, now);

    if (shouldRefillVitalEssences) {
      vitalBalance = DAILY_VITAL_ESSENCE_MAX;
    }

    const totalBalance = vitalBalance + eternalBalance;

    if (totalBalance < input.amount) {
      throw new Error("Not enough essences.");
    }

    const vitalSpent = Math.min(vitalBalance, input.amount);
    const eternalSpent = input.amount - vitalSpent;

    const nextVitalBalance = vitalBalance - vitalSpent;
    const nextEternalBalance = eternalBalance - eternalSpent;
    const nextBalance = nextVitalBalance + nextEternalBalance;

    const balanceType =
      vitalSpent > 0 && eternalSpent > 0
        ? "MIXED"
        : vitalSpent > 0
          ? "VITAL"
          : "ETERNAL";

    return tx.essenceWallet.update({
      where: { id: wallet.id },
      data: {
        vitalBalance: nextVitalBalance,
        eternalBalance: nextEternalBalance,
        balance: nextBalance,
        lastVitalRefillAt: shouldRefillVitalEssences
          ? now
          : wallet.lastVitalRefillAt,
        transactions: {
          create: {
            amount: -input.amount,
            type: "SPEND",
            balanceType,
            module: input.module,
            reason: input.reason,
            referenceId: input.referenceId,
          },
        },
      },
    });
  });
}


export async function grantEternalEssences(input: {
  anonymousId: string;
  amount: number;
  reason?: string;
  referenceId?: string;
}) {
  if (input.amount <= 0) {
    throw new Error("Essence amount must be greater than zero.");
  }

  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const visitor = await tx.visitorSession.upsert({
      where: { anonymousId: input.anonymousId },
      update: { lastSeenAt: now },
      create: { anonymousId: input.anonymousId },
      include: { wallet: true },
    });

    if (!visitor.wallet) {
      return tx.essenceWallet.create({
        data: {
          visitorSession: { connect: { id: visitor.id } },
          balance: DAILY_VITAL_ESSENCE_MAX + input.amount,
          vitalBalance: DAILY_VITAL_ESSENCE_MAX,
          eternalBalance: input.amount,
          lastVitalRefillAt: now,
          transactions: {
            create: [
              {
                amount: DAILY_VITAL_ESSENCE_MAX,
                type: "GRANT_FREE",
                balanceType: "VITAL",
                reason: "Daily starter vital essences",
              },
              {
                amount: input.amount,
                type: "PURCHASE",
                balanceType: "ETERNAL",
                reason: input.reason ?? "Dev eternal essence grant",
                referenceId: input.referenceId,
              },
            ],
          },
        },
      });
    }

    const nextEternalBalance = visitor.wallet.eternalBalance + input.amount;
    const nextBalance = visitor.wallet.vitalBalance + nextEternalBalance;

    return tx.essenceWallet.update({
      where: { id: visitor.wallet.id },
      data: {
        eternalBalance: nextEternalBalance,
        balance: nextBalance,
        transactions: {
          create: {
            amount: input.amount,
            type: "PURCHASE",
            balanceType: "ETERNAL",
            reason: input.reason ?? "Dev eternal essence grant",
            referenceId: input.referenceId,
          },
        },
      },
    });
  });
}

export async function getUnlockedCleansingRecipeIds(anonymousId: string) {
  const wallet = await getOrCreateVisitorWallet(anonymousId);

  const unlocks = await prisma.cleansingRecipeUnlock.findMany({
    where: {
      walletId: wallet.id,
    },
    select: {
      recipeId: true,
    },
  });

  return unlocks.map((unlock) => unlock.recipeId);
}

export async function unlockCleansingRecipe(input: {
  anonymousId: string;
  recipeId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const visitor = await tx.visitorSession.upsert({
      where: {
        anonymousId: input.anonymousId,
      },
      update: {
        lastSeenAt: now,
      },
      create: {
        anonymousId: input.anonymousId,
      },
      include: {
        wallet: true,
      },
    });

    const wallet =
      visitor.wallet ??
      (await tx.essenceWallet.create({
        data: {
          visitorSession: {
            connect: {
              id: visitor.id,
            },
          },
          balance: DAILY_VITAL_ESSENCE_MAX,
          vitalBalance: DAILY_VITAL_ESSENCE_MAX,
          eternalBalance: 0,
          lastVitalRefillAt: now,
          transactions: {
            create: {
              amount: DAILY_VITAL_ESSENCE_MAX,
              type: "GRANT_FREE",
              balanceType: "VITAL",
              reason: "Daily starter vital essences",
            },
          },
        },
      }));

    const recipe = await tx.cleansingRecipe.findUnique({
      where: {
        id: input.recipeId,
      },
      select: {
        id: true,
        title: true,
        isPremium: true,
        essenceCost: true,
      },
    });

    if (!recipe) {
      throw new Error("Cleansing recipe not found.");
    }

    const existingUnlock = await tx.cleansingRecipeUnlock.findUnique({
      where: {
        walletId_recipeId: {
          walletId: wallet.id,
          recipeId: recipe.id,
        },
      },
    });

    if (existingUnlock) {
      return {
        wallet,
        unlock: existingUnlock,
        recipe,
        alreadyUnlocked: true,
      };
    }

    if (!recipe.isPremium || recipe.essenceCost <= 0) {
      const unlock = await tx.cleansingRecipeUnlock.create({
        data: {
          walletId: wallet.id,
          recipeId: recipe.id,
        },
      });

      return {
        wallet,
        unlock,
        recipe,
        alreadyUnlocked: false,
      };
    }

    if (wallet.eternalBalance < recipe.essenceCost) {
      throw new Error("Not enough eternal essences.");
    }

    const nextEternalBalance = wallet.eternalBalance - recipe.essenceCost;
    const nextBalance = wallet.vitalBalance + nextEternalBalance;

    const updatedWallet = await tx.essenceWallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        eternalBalance: nextEternalBalance,
        balance: nextBalance,
        transactions: {
          create: {
            amount: -recipe.essenceCost,
            type: "SPEND",
            balanceType: "ETERNAL",
            module: "CLEANSING_RECIPE",
            reason: `Unlock cleansing recipe: ${recipe.title}`,
            referenceId: recipe.id,
          },
        },
      },
    });

    const unlock = await tx.cleansingRecipeUnlock.create({
      data: {
        walletId: wallet.id,
        recipeId: recipe.id,
      },
    });

    return {
      wallet: updatedWallet,
      unlock,
      recipe,
      alreadyUnlocked: false,
    };
  });
}

export async function unlockCleansingRecipeForWalletId(input: {
  walletId: string;
  recipeId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.essenceWallet.findUnique({
      where: { id: input.walletId },
    });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    const recipe = await tx.cleansingRecipe.findUnique({
      where: { id: input.recipeId },
      select: {
        id: true,
        title: true,
        isPremium: true,
        essenceCost: true,
      },
    });

    if (!recipe) {
      throw new Error("Cleansing recipe not found.");
    }

    const existingUnlock = await tx.cleansingRecipeUnlock.findUnique({
      where: {
        walletId_recipeId: {
          walletId: wallet.id,
          recipeId: recipe.id,
        },
      },
    });

    if (existingUnlock) {
      return {
        wallet,
        unlock: existingUnlock,
        recipe,
        alreadyUnlocked: true,
      };
    }

    if (!recipe.isPremium || recipe.essenceCost <= 0) {
      const unlock = await tx.cleansingRecipeUnlock.create({
        data: {
          walletId: wallet.id,
          recipeId: recipe.id,
        },
      });

      return {
        wallet,
        unlock,
        recipe,
        alreadyUnlocked: false,
      };
    }

    if (wallet.eternalBalance < recipe.essenceCost) {
      throw new Error("Not enough eternal essences.");
    }

    const updatedWallet = await tx.essenceWallet.update({
      where: { id: wallet.id },
      data: {
        eternalBalance: {
          decrement: recipe.essenceCost,
        },
        balance: {
          decrement: recipe.essenceCost,
        },
        transactions: {
          create: {
            amount: -recipe.essenceCost,
            type: "SPEND",
            balanceType: "ETERNAL",
            module: "CLEANSING_RECIPE",
            reason: `Unlock cleansing recipe: ${recipe.title}`,
            referenceId: recipe.id,
          },
        },
      },
    });

    const unlock = await tx.cleansingRecipeUnlock.create({
      data: {
        walletId: wallet.id,
        recipeId: recipe.id,
      },
    });

    return {
      wallet: updatedWallet,
      unlock,
      recipe,
      alreadyUnlocked: false,
    };
  });
}

export async function unlockGrimoireRitual(input: {
  anonymousId: string;
  ritualId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const visitor = await tx.visitorSession.upsert({
      where: {
        anonymousId: input.anonymousId,
      },
      update: {
        lastSeenAt: now,
      },
      create: {
        anonymousId: input.anonymousId,
      },
      include: {
        wallet: true,
      },
    });

    const wallet =
      visitor.wallet ??
      (await tx.essenceWallet.create({
        data: {
          visitorSession: {
            connect: {
              id: visitor.id,
            },
          },
          balance: DAILY_VITAL_ESSENCE_MAX,
          vitalBalance: DAILY_VITAL_ESSENCE_MAX,
          eternalBalance: 0,
          lastVitalRefillAt: now,
          transactions: {
            create: {
              amount: DAILY_VITAL_ESSENCE_MAX,
              type: "GRANT_FREE",
              balanceType: "VITAL",
              reason: "Daily starter vital essences",
            },
          },
        },
      }));

    const ritual = await tx.grimoireRitual.findUnique({
      where: {
        id: input.ritualId,
      },
      select: {
        id: true,
        title: true,
        accessLevel: true,
        essenceCost: true,
      },
    });

    if (!ritual) {
      throw new Error("Grimoire ritual not found.");
    }

    const existingUnlock = await tx.grimoireRitualUnlock.findUnique({
      where: {
        walletId_ritualId: {
          walletId: wallet.id,
          ritualId: ritual.id,
        },
      },
    });

    if (existingUnlock) {
      return {
        wallet,
        unlock: existingUnlock,
        ritual,
        alreadyUnlocked: true,
      };
    }

    if (ritual.accessLevel === "PUBLIC" || ritual.essenceCost <= 0) {
      const unlock = await tx.grimoireRitualUnlock.create({
        data: {
          walletId: wallet.id,
          ritualId: ritual.id,
        },
      });

      return {
        wallet,
        unlock,
        ritual,
        alreadyUnlocked: false,
      };
    }

    if (wallet.eternalBalance < ritual.essenceCost) {
      throw new Error("Not enough eternal essences.");
    }

    const nextEternalBalance = wallet.eternalBalance - ritual.essenceCost;
    const nextBalance = wallet.vitalBalance + nextEternalBalance;

    const updatedWallet = await tx.essenceWallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        eternalBalance: nextEternalBalance,
        balance: nextBalance,
        transactions: {
          create: {
            amount: -ritual.essenceCost,
            type: "SPEND",
            balanceType: "ETERNAL",
            module: "GRIMOIRE_RITUAL",
            reason: `Unlock grimoire ritual: ${ritual.title}`,
            referenceId: ritual.id,
          },
        },
      },
    });

    const unlock = await tx.grimoireRitualUnlock.create({
      data: {
        walletId: wallet.id,
        ritualId: ritual.id,
      },
    });

    return {
      wallet: updatedWallet,
      unlock,
      ritual,
      alreadyUnlocked: false,
    };
  });
}

export async function unlockGrimoireRitualForWalletId(input: {
  walletId: string;
  ritualId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.essenceWallet.findUnique({
      where: { id: input.walletId },
    });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    const ritual = await tx.grimoireRitual.findUnique({
      where: { id: input.ritualId },
      select: {
        id: true,
        title: true,
        accessLevel: true,
        essenceCost: true,
      },
    });

    if (!ritual) {
      throw new Error("Grimoire ritual not found.");
    }

    const existingUnlock = await tx.grimoireRitualUnlock.findUnique({
      where: {
        walletId_ritualId: {
          walletId: wallet.id,
          ritualId: ritual.id,
        },
      },
    });

    if (existingUnlock) {
      return {
        wallet,
        unlock: existingUnlock,
        ritual,
        alreadyUnlocked: true,
      };
    }

    if (ritual.accessLevel === "PUBLIC" || ritual.essenceCost <= 0) {
      const unlock = await tx.grimoireRitualUnlock.create({
        data: {
          walletId: wallet.id,
          ritualId: ritual.id,
        },
      });

      return {
        wallet,
        unlock,
        ritual,
        alreadyUnlocked: false,
      };
    }

    if (wallet.eternalBalance < ritual.essenceCost) {
      throw new Error("Not enough eternal essences.");
    }

    const updatedWallet = await tx.essenceWallet.update({
      where: { id: wallet.id },
      data: {
        eternalBalance: {
          decrement: ritual.essenceCost,
        },
        balance: {
          decrement: ritual.essenceCost,
        },
        transactions: {
          create: {
            amount: -ritual.essenceCost,
            type: "SPEND",
            balanceType: "ETERNAL",
            module: "GRIMOIRE_RITUAL",
            reason: `Unlock grimoire ritual: ${ritual.title}`,
            referenceId: ritual.id,
          },
        },
      },
    });

    const unlock = await tx.grimoireRitualUnlock.create({
      data: {
        walletId: wallet.id,
        ritualId: ritual.id,
      },
    });

    return {
      wallet: updatedWallet,
      unlock,
      ritual,
      alreadyUnlocked: false,
    };
  });
}