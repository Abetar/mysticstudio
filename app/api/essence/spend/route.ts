import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { MysticModule } from "@/app/generated/prisma/client";
import {
  spendEssences,
  spendEssencesFromWalletId,
} from "@/features/essence/core/essenceService";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      anonymousId?: string;
      amount?: number;
      module?: MysticModule;
      reason?: string;
      referenceId?: string;
    };

    if (!body.anonymousId) {
      return NextResponse.json(
        { error: "anonymousId is required." },
        { status: 400 },
      );
    }

    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: "amount must be greater than zero." },
        { status: 400 },
      );
    }

    if (!body.module) {
      return NextResponse.json(
        { error: "module is required." },
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
        const wallet = await spendEssencesFromWalletId({
          walletId: userWallet.id,
          amount: body.amount,
          module: body.module,
          reason: body.reason,
          referenceId: body.referenceId,
        });

        return NextResponse.json({
          wallet: {
            id: wallet.id,
            balance: wallet.balance,
            vitalBalance: wallet.vitalBalance,
            eternalBalance: wallet.eternalBalance,
            lastVitalRefillAt: wallet.lastVitalRefillAt
              ? wallet.lastVitalRefillAt.toISOString()
              : null,
          },
        });
      }
    }

    const wallet = await spendEssences({
      anonymousId: body.anonymousId,
      amount: body.amount,
      module: body.module,
      reason: body.reason,
      referenceId: body.referenceId,
    });

    return NextResponse.json({
      wallet: {
        id: wallet.id,
        balance: wallet.balance,
        vitalBalance: wallet.vitalBalance,
        eternalBalance: wallet.eternalBalance,
        lastVitalRefillAt: wallet.lastVitalRefillAt
          ? wallet.lastVitalRefillAt.toISOString()
          : null,
      },
    });
  } catch (error) {
    console.error("Failed to spend essences:", error);

    const message =
      error instanceof Error ? error.message : "Failed to spend essences.";

    return NextResponse.json(
      { error: message },
      {
        status: message === "Not enough essences." ? 400 : 500,
      },
    );
  }
}