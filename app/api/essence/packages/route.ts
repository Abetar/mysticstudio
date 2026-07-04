import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET() {
  try {
    const packages = await prisma.essencePackage.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        essences: true,
        price: true,
        currency: true,
        badge: true,
        description: true,
        isPopular: true,
      },
    });

    return NextResponse.json({
      packages: packages.map((essencePackage) => ({
        ...essencePackage,
        price: essencePackage.price.toString(),
      })),
    });
  } catch (error) {
    console.error("Failed to load essence packages:", error);

    return NextResponse.json(
      { error: "Failed to load essence packages." },
      { status: 500 },
    );
  }
}