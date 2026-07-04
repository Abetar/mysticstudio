import "dotenv/config";
import { PrismaClient, ProductType } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { tarotCardsSeed } from "../data/tarot.seed";
import { featureFlagsSeed } from "../data/feature-flags.seed";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding MysticStudio...");

  const defaultDeck = await prisma.tarotDeck.upsert({
    where: { slug: "mysticstudio-default" },
    update: {},
    create: {
      name: "MysticStudio Default Deck",
      slug: "mysticstudio-default",
      description:
        "Mazo base de MysticStudio para la experiencia inicial de lectura de tres cartas.",
      isDefault: true,
      isPremium: false,
    },
  });

  for (const card of tarotCardsSeed) {
    const createdCard = await prisma.tarotCard.upsert({
      where: { slug: card.slug },
      update: card,
      create: card,
    });

    await prisma.deckCard.upsert({
      where: {
        deckId_cardId: {
          deckId: defaultDeck.id,
          cardId: createdCard.id,
        },
      },
      update: {},
      create: {
        deckId: defaultDeck.id,
        cardId: createdCard.id,
      },
    });
  }

  for (const flag of featureFlagsSeed) {
    await prisma.featureFlag.upsert({
      where: { key: flag.key },
      update: flag,
      create: flag,
    });
  }

  const premiumDeckProduct = await prisma.product.upsert({
    where: { slug: "premium-decks-access" },
    update: {},
    create: {
      name: "Premium Decks Access",
      slug: "premium-decks-access",
      type: ProductType.DECK,
      description: "Acceso futuro a mazos premium dentro de MysticStudio.",
      isActive: false,
    },
  });

  await prisma.entitlement.upsert({
    where: { key: "access_premium_decks" },
    update: {},
    create: {
      key: "access_premium_decks",
      name: "Access Premium Decks",
      description:
        "Permite usar mazos premium comprados o incluidos en suscripción.",
      productId: premiumDeckProduct.id,
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });