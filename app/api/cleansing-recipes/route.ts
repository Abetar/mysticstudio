import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { CleansingCategory } from "@/app/generated/prisma/enums";
import { getUnlockedCleansingRecipeIds } from "@/features/essence/core/essenceService";
import { prisma } from "@/lib/prisma/prisma";

async function getUnlockedRecipeIds(anonymousId: string | null) {
  const session = await getServerSession();

  console.log("[cleansing-recipes] session email:", session?.user?.email);

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

    console.log("[cleansing-recipes] userWallet:", userWallet);

    if (userWallet) {
      const unlocks = await prisma.cleansingRecipeUnlock.findMany({
        where: {
          walletId: userWallet.id,
        },
        select: {
          recipeId: true,
        },
      });

      console.log("[cleansing-recipes] unlocks:", unlocks);

      return unlocks.map((unlock) => unlock.recipeId);
    }
  }

  if (!anonymousId) return [];

  const visitorUnlocks = await getUnlockedCleansingRecipeIds(anonymousId);

  console.log("[cleansing-recipes] visitor unlocks:", visitorUnlocks);

  return visitorUnlocks;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") as CleansingCategory | null;
    const premium = searchParams.get("premium");
    const anonymousId = searchParams.get("anonymousId");

    const recipes = await prisma.cleansingRecipe.findMany({
      where: {
        isPublished: true,
        ...(category ? { category } : {}),
        ...(premium === "true" ? { isPremium: true } : {}),
        ...(premium === "false" ? { isPremium: false } : {}),
      },
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        category: true,
        difficulty: true,
        estimatedMinutes: true,
        origin: true,
        expectedResult: true,
        repeatEvery: true,
        tags: true,
        ingredients: true,
        steps: true,
        warnings: true,
        notes: true,
        isPremium: true,
        essenceCost: true,
      },
    });

    const unlockedRecipeIds = await getUnlockedRecipeIds(anonymousId);

    console.log(
      "[cleansing-recipes] unlockedRecipeIds:",
      unlockedRecipeIds,
    );

    const unlockedRecipeIdSet = new Set(unlockedRecipeIds);

    const recipesWithAccess = recipes.map((recipe) => ({
      ...recipe,
      isUnlocked: !recipe.isPremium || unlockedRecipeIdSet.has(recipe.id),
    }));

    return NextResponse.json({
      recipes: recipesWithAccess,
    });
  } catch (error) {
    console.error("Failed to load cleansing recipes:", error);

    return NextResponse.json(
      {
        error: "Failed to load cleansing recipes.",
      },
      {
        status: 500,
      },
    );
  }
}