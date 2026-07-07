import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type {
  GrimoireAccessLevel,
  GrimoireCategory,
} from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma/prisma";

async function getWalletIdForRequest() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return null;
  }

  const wallet = await prisma.essenceWallet.findFirst({
    where: {
      user: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
    },
  });

  return wallet?.id ?? null;
}

async function getAcceptedDisclaimerScopes(userEmail: string | null) {
  if (!userEmail) return new Set<string>();

  const acceptances = await prisma.grimoireDisclaimerAcceptance.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    select: {
      scope: true,
    },
  });

  return new Set(acceptances.map((acceptance) => acceptance.scope));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") as GrimoireCategory | null;
    const accessLevel = searchParams.get(
      "accessLevel",
    ) as GrimoireAccessLevel | null;

    const session = await getServerSession();
    const userEmail = session?.user?.email ?? null;
    const walletId = await getWalletIdForRequest();

    const rituals = await prisma.grimoireRitual.findMany({
      where: {
        isPublished: true,
        ...(category ? { category } : {}),
        ...(accessLevel ? { accessLevel } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        category: true,
        accessLevel: true,
        difficulty: true,
        estimatedMinutes: true,
        origin: true,
        intention: true,
        expectedResult: true,
        repeatEvery: true,
        tags: true,
        ingredients: true,
        steps: true,
        warnings: true,
        notes: true,
        essenceCost: true,
        requiresDisclaimer: true,
        disclaimerVersion: true,
      },
    });

    const unlockedIds = walletId
      ? await prisma.grimoireRitualUnlock.findMany({
          where: {
            walletId,
          },
          select: {
            ritualId: true,
          },
        })
      : [];

    const unlockedIdSet = new Set(
      unlockedIds.map((unlock) => unlock.ritualId),
    );

    const acceptedScopes = await getAcceptedDisclaimerScopes(userEmail);

    const ritualsWithAccess = rituals.map((ritual) => ({
      ...ritual,
      isUnlocked:
        ritual.accessLevel === "PUBLIC" || unlockedIdSet.has(ritual.id),
      hasAcceptedDisclaimer: ritual.requiresDisclaimer
        ? acceptedScopes.has("RESERVED_GRIMOIRE") ||
          acceptedScopes.has("CONTROVERSIAL_RITUALS")
        : true,
    }));

    return NextResponse.json({
      rituals: ritualsWithAccess,
    });
  } catch (error) {
    console.error("Failed to load grimoire rituals:", error);

    return NextResponse.json(
      {
        error: "Failed to load grimoire rituals.",
      },
      {
        status: 500,
      },
    );
  }
}