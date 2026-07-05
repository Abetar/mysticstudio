import { stripe } from "./stripe";

type CreateEssencePackageCheckoutInput = {
  anonymousId: string;
  packageSlug: string;
  stripePriceId: string;
};

export async function createEssencePackageCheckoutSession(
  input: CreateEssencePackageCheckoutInput,
) {
  const appUrl = process.env.APP_URL;

  // console.log("[Stripe Checkout] APP_URL:", appUrl);

  if (!appUrl) {
    throw new Error("Missing APP_URL environment variable.");
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: input.stripePriceId,
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/room?checkout=success`,
    cancel_url: `${appUrl}/room?checkout=cancelled`,
    metadata: {
      type: "ESSENCE_PACKAGE",
      anonymousId: input.anonymousId,
      packageSlug: input.packageSlug,
    },
  });
}