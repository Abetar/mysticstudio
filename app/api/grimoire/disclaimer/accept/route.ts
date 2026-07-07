import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { GrimoireDisclaimerScope } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma/prisma";

type AcceptDisclaimerRequest = {
  version: string;
  scope: GrimoireDisclaimerScope;
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication is required." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as AcceptDisclaimerRequest;

    if (!body.version) {
      return NextResponse.json(
        { error: "version is required." },
        { status: 400 },
      );
    }

    if (!body.scope) {
      return NextResponse.json(
        { error: "scope is required." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 },
      );
    }

    await prisma.grimoireDisclaimerAcceptance.upsert({
      where: {
        userId_version_scope: {
          userId: user.id,
          version: body.version,
          scope: body.scope,
        },
      },
      update: {
        acceptedAt: new Date(),
      },
      create: {
        userId: user.id,
        version: body.version,
        scope: body.scope,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to accept grimoire disclaimer:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to accept grimoire disclaimer.",
      },
      { status: 500 },
    );
  }
}