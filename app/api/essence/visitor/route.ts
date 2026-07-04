import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { getOrCreateVisitorWallet } from "@/features/essence/core/essenceService";
import { mergeVisitorIntoUser } from "@/features/identity/core/mergeVisitorIntoUser";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      anonymousId?: string;
    };

    if (!body.anonymousId) {
      return NextResponse.json(
        { error: "anonymousId is required." },
        { status: 400 },
      );
    }

    const session = await getServerSession();

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          id: true,
        },
      });

      if (user) {
        await mergeVisitorIntoUser({
          anonymousId: body.anonymousId,
          userId: user.id,
        });

        const userWallet = await prisma.essenceWallet.findUnique({
          where: {
            userId: user.id,
          },
        });

        if (userWallet) {
          return NextResponse.json({
            wallet: {
              id: userWallet.id,
              balance: userWallet.balance,
              vitalBalance: userWallet.vitalBalance,
              eternalBalance: userWallet.eternalBalance,
              lastVitalRefillAt: userWallet.lastVitalRefillAt
                ? userWallet.lastVitalRefillAt.toISOString()
                : null,
            },
          });
        }
      }
    }

    const wallet = await getOrCreateVisitorWallet(body.anonymousId);

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
    console.error("Failed to initialize visitor wallet:", error);

    return NextResponse.json(
      { error: "Failed to initialize visitor wallet." },
      { status: 500 },
    );
  }
}