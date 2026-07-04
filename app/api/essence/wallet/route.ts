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
      },
    });
  } catch (error) {
    console.error("Essence wallet request failed:", error);

    return NextResponse.json(
      { error: "Failed to get essence wallet." },
      { status: 500 },
    );
  }
}