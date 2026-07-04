import { NextResponse } from "next/server";
import { getOrCreateVisitorWallet } from "@/features/essence/core/essenceService";

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