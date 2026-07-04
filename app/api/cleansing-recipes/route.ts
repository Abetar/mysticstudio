import { NextResponse } from "next/server";
import type { CleansingCategory } from "@/app/generated/prisma/enums";
import { getUnlockedCleansingRecipeIds } from "@/features/essence/core/essenceService";
import { prisma } from "@/lib/prisma/prisma";

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

    const unlockedRecipeIds = anonymousId
      ? await getUnlockedCleansingRecipeIds(anonymousId)
      : [];

    const unlockedRecipeIdSet = new Set(unlockedRecipeIds);

    const recipesWithAccess = recipes.map((recipe) => ({
      ...recipe,
      isUnlocked: !recipe.isPremium || unlockedRecipeIdSet.has(recipe.id),
    }));

    return NextResponse.json({ recipes: recipesWithAccess });
  } catch (error) {
    console.error("Failed to load cleansing recipes:", error);

    return NextResponse.json(
      { error: "Failed to load cleansing recipes." },
      { status: 500 },
    );
  }
}