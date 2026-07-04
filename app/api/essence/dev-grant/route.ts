import { NextResponse } from "next/server";
import { grantEternalEssences } from "@/features/essence/core/essenceService";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Dev grants are disabled in production." },
      { status: 403 },
    );
  }

  try {
    const body = (await request.json()) as {
      anonymousId?: string;
      amount?: number;
      packageSlug?: string;
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

    const wallet = await grantEternalEssences({
      anonymousId: body.anonymousId,
      amount: body.amount,
      reason: "Dev essence package grant",
      referenceId: body.packageSlug,
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
    console.error("Failed to grant dev essences:", error);

    return NextResponse.json(
      { error: "Failed to grant dev essences." },
      { status: 500 },
    );
  }
}