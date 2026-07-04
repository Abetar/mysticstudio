import { NextResponse } from "next/server";

import { getOrCreateVisitorWallet } from "@/features/essence/core/essenceService";
import { prisma } from "@/lib/prisma/prisma";

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

    const wallet = await getOrCreateVisitorWallet(anonymousId);

    const purchases = await prisma.essencePurchase.findMany({
      where: {
        walletId: wallet.id,
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