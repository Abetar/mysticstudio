import { prisma } from "@/lib/prisma/prisma";

export async function mergeVisitorIntoUser(input: {
  anonymousId: string;
  userId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const visitorSession = await tx.visitorSession.findUnique({
      where: {
        anonymousId: input.anonymousId,
      },
      include: {
        wallet: true,
      },
    });

    if (!visitorSession) {
      return {
        merged: false,
        reason: "VISITOR_SESSION_NOT_FOUND",
      };
    }

    const existingUserWallet = await tx.essenceWallet.findUnique({
      where: {
        userId: input.userId,
      },
    });

    await tx.visitorSession.update({
      where: {
        id: visitorSession.id,
      },
      data: {
        userId: input.userId,
      },
    });

    if (!visitorSession.wallet) {
      return {
        merged: true,
        reason: "VISITOR_LINKED_WITHOUT_WALLET",
      };
    }

    if (!existingUserWallet) {
      const wallet = await tx.essenceWallet.update({
        where: {
          id: visitorSession.wallet.id,
        },
        data: {
          userId: input.userId,
        },
      });

      return {
        merged: true,
        reason: "VISITOR_WALLET_LINKED_TO_USER",
        wallet,
      };
    }

    if (existingUserWallet.id === visitorSession.wallet.id) {
      return {
        merged: true,
        reason: "WALLET_ALREADY_LINKED",
        wallet: existingUserWallet,
      };
    }

    const nextVitalBalance = Math.max(
      existingUserWallet.vitalBalance,
      visitorSession.wallet.vitalBalance,
    );

    const nextEternalBalance =
      existingUserWallet.eternalBalance + visitorSession.wallet.eternalBalance;

    const nextBalance = nextVitalBalance + nextEternalBalance;

    const wallet = await tx.essenceWallet.update({
      where: {
        id: existingUserWallet.id,
      },
      data: {
        vitalBalance: nextVitalBalance,
        eternalBalance: nextEternalBalance,
        balance: nextBalance,
        transactions: {
          create: {
            amount: visitorSession.wallet.eternalBalance,
            type: "VISITOR_MERGE",
            balanceType: "ETERNAL",
            reason: "Merged anonymous visitor wallet into user wallet",
            referenceId: visitorSession.wallet.id,
          },
        },
      },
    });

    await tx.essenceTransaction.updateMany({
      where: {
        walletId: visitorSession.wallet.id,
      },
      data: {
        walletId: existingUserWallet.id,
      },
    });

    await tx.cleansingRecipeUnlock.updateMany({
      where: {
        walletId: visitorSession.wallet.id,
      },
      data: {
        walletId: existingUserWallet.id,
      },
    });

    await tx.essencePurchase.updateMany({
      where: {
        walletId: visitorSession.wallet.id,
      },
      data: {
        walletId: existingUserWallet.id,
      },
    });

    await tx.essenceWallet.delete({
      where: {
        id: visitorSession.wallet.id,
      },
    });

    return {
      merged: true,
      reason: "VISITOR_WALLET_MERGED_INTO_EXISTING_USER_WALLET",
      wallet,
    };
  });
}
