import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import {
  unlockGrimoireRitual,
  unlockGrimoireRitualForWalletId,
} from "@/features/essence/core/essenceService";
import { prisma } from "@/lib/prisma/prisma";

type UnlockRequest = {
  anonymousId?: string;
  ritualId: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UnlockRequest;

    if (!body.ritualId) {
      return NextResponse.json(
        { error: "ritualId is required." },
        { status: 400 },
      );
    }

    const session = await getServerSession();

    if (session?.user?.email) {
      const userWallet = await prisma.essenceWallet.findFirst({
        where: {
          user: {
            email: session.user.email,
          },
        },
        select: {
          id: true,
        },
      });

      if (userWallet) {
        const result = await unlockGrimoireRitualForWalletId({
          walletId: userWallet.id,
          ritualId: body.ritualId,
        });

        return NextResponse.json({
          success: true,
          alreadyUnlocked: result.alreadyUnlocked,
          wallet: {
            vitalBalance: result.wallet.vitalBalance,
            eternalBalance: result.wallet.eternalBalance,
            balance: result.wallet.balance,
          },
        });
      }
    }

    if (!body.anonymousId) {
      return NextResponse.json(
        { error: "anonymousId is required for visitor unlock." },
        { status: 400 },
      );
    }

    const result = await unlockGrimoireRitual({
      anonymousId: body.anonymousId,
      ritualId: body.ritualId,
    });

    return NextResponse.json({
      success: true,
      alreadyUnlocked: result.alreadyUnlocked,
      wallet: {
        vitalBalance: result.wallet.vitalBalance,
        eternalBalance: result.wallet.eternalBalance,
        balance: result.wallet.balance,
      },
    });
  } catch (error) {
    console.error("Failed to unlock grimoire ritual:", error);

    if (
      error instanceof Error &&
      error.message === "Not enough eternal essences."
    ) {
      return NextResponse.json({ error: error.message }, { status: 402 });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to unlock grimoire ritual.",
      },
      { status: 500 },
    );
  }
}