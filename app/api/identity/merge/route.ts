import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { mergeVisitorIntoUser } from "@/features/identity/core/mergeVisitorIntoUser";
import { prisma } from "@/lib/prisma/prisma";

type MergeRequestBody = {
  anonymousId?: string;
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as MergeRequestBody;

    const anonymousId =
      typeof body.anonymousId === "string" ? body.anonymousId.trim() : "";

    if (!anonymousId) {
      return NextResponse.json(
        { error: "anonymousId is required." },
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

    const result = await mergeVisitorIntoUser({
      anonymousId,
      userId: user.id,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("[identity:merge] Failed:", error);

    return NextResponse.json(
      { error: "Failed to merge visitor identity." },
      { status: 500 },
    );
  }
}