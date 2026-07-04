import { NextResponse } from "next/server";
import { unlockCleansingRecipe } from "@/features/essence/core/essenceService";

type UnlockRequest = {
  anonymousId: string;
  recipeId: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UnlockRequest;

    if (!body.anonymousId) {
      return NextResponse.json(
        { error: "anonymousId is required." },
        { status: 400 },
      );
    }

    if (!body.recipeId) {
      return NextResponse.json(
        { error: "recipeId is required." },
        { status: 400 },
      );
    }

    const result = await unlockCleansingRecipe({
      anonymousId: body.anonymousId,
      recipeId: body.recipeId,
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
    console.error("Failed to unlock cleansing recipe:", error);

    if (
      error instanceof Error &&
      error.message === "Not enough eternal essences."
    ) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 402,
        },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to unlock cleansing recipe.",
      },
      {
        status: 500,
      },
    );
  }
}