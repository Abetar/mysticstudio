import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getOrCreateVisitorWallet } from "@/features/essence/core/essenceService";
import { stripe } from "@/features/payments/stripe/stripe";
import { prisma } from "@/lib/prisma/prisma";

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (session.metadata?.type !== "ESSENCE_PACKAGE") return;

  const anonymousId = session.metadata.anonymousId;
  const packageSlug = session.metadata.packageSlug;

  if (!anonymousId || !packageSlug) {
    throw new Error("Missing checkout metadata for essence package.");
  }

  if (session.payment_status !== "paid") {
    throw new Error("Checkout session is not paid.");
  }

  const existingPurchase = await prisma.essencePurchase.findUnique({
    where: {
      stripeSessionId: session.id,
    },
  });

  if (existingPurchase) {
    return;
  }

  const essencePackage = await prisma.essencePackage.findUnique({
    where: { slug: packageSlug },
  });

  if (!essencePackage || !essencePackage.isActive) {
    throw new Error("Essence package not found.");
  }

  const wallet = await getOrCreateVisitorWallet(anonymousId);

  const amountPaid = (session.amount_total ?? 0) / 100;
  const currency = session.currency?.toUpperCase() ?? essencePackage.currency;
  const stripePaymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : null;

  await prisma.$transaction(async (tx) => {
    const purchase = await tx.essencePurchase.create({
      data: {
        walletId: wallet.id,
        packageId: essencePackage.id,
        stripeSessionId: session.id,
        stripePaymentIntentId,
        amountPaid,
        currency,
        essences: essencePackage.essences,
        status: "PAID",
      },
    });

    await tx.essenceWallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        eternalBalance: {
          increment: essencePackage.essences,
        },
        balance: {
          increment: essencePackage.essences,
        },
        transactions: {
          create: {
            amount: essencePackage.essences,
            type: "PURCHASE",
            balanceType: "ETERNAL",
            reason: `Stripe purchase: ${essencePackage.name}`,
            referenceId: purchase.stripeSessionId,
          },
        },
      },
    });
  });
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET environment variable." },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret.trim(),
    );

    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(
        event.data.object as Stripe.Checkout.Session,
      );
    }

    console.log("[stripe:webhook] Processed event:", event.type);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[stripe:webhook] Failed:", error);

    return NextResponse.json(
      { error: "Failed to process Stripe webhook." },
      { status: 400 },
    );
  }
}