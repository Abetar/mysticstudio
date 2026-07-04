import { NextResponse } from "next/server";

import { createEssencePackageCheckoutSession } from "@/features/payments/stripe/checkout";
import { prisma } from "@/lib/prisma/prisma";

type CheckoutRequestBody = {
  anonymousId?: string;
  packageSlug?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;

    const anonymousId =
      typeof body.anonymousId === "string" ? body.anonymousId.trim() : "";

    const packageSlug =
      typeof body.packageSlug === "string" ? body.packageSlug.trim() : "";

    if (!anonymousId || !packageSlug) {
      return NextResponse.json(
        { error: "anonymousId and packageSlug are required." },
        { status: 400 },
      );
    }

    const essencePackage = await prisma.essencePackage.findUnique({
      where: { slug: packageSlug },
    });

    if (!essencePackage || !essencePackage.isActive) {
      return NextResponse.json(
        { error: "Essence package not found." },
        { status: 404 },
      );
    }

    if (!essencePackage.stripePriceId) {
      return NextResponse.json(
        { error: "Essence package is missing Stripe price." },
        { status: 400 },
      );
    }

    const checkoutSession = await createEssencePackageCheckoutSession({
      anonymousId,
      packageSlug: essencePackage.slug,
      stripePriceId: essencePackage.stripePriceId,
    });

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    console.error("[payments:checkout:essence-package] Failed:", error);

    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}