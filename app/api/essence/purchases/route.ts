import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { getOrCreateVisitorWallet } from "@/features/essence/core/essenceService";
import { prisma } from "@/lib/prisma/prisma";

async function getWalletIdForPurchases(anonymousId: string) {
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
      return userWallet.id;
    }
  }

  const visitorWallet = await getOrCreateVisitorWallet(anonymousId);

  return visitorWallet.id;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const anonymousId = searchParams.get("anonymousId")?.trim();

    if (!anonymousId) {
      return NextResponse.json(
        { error: "anonymousId is required." },
        { status: 400 },
      );
    }

    const walletId = await getWalletIdForPurchases(anonymousId);

    const purchases = await prisma.essencePurchase.findMany({
      where: {
        walletId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        stripeSessionId: true,
        stripePaymentIntentId: true,
        amountPaid: true,
        currency: true,
        essences: true,
        status: true,
        createdAt: true,
        package: {
          select: {
            name: true,
            slug: true,
            badge: true,
          },
        },
      },
    });

    return NextResponse.json({
      purchases: purchases.map((purchase) => ({
        ...purchase,
        amountPaid: Number(purchase.amountPaid),
      })),
    });
  } catch (error) {
    console.error("[essence:purchases] Failed:", error);

    return NextResponse.json(
      { error: "Failed to load essence purchases." },
      { status: 500 },
    );
  }
}