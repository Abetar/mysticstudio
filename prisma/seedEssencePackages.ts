import "dotenv/config";
import { prisma } from "../lib/prisma/prisma";

const essencePackages = [
  {
    name: "Chispa",
    slug: "chispa",
    essences: 15,
    price: "19.00",
    currency: "MXN",
    stripePriceId: "price_1TpCVJRPbU5trHr7TXXetumj",
    badge: "Entrada",
    description: "Una pequeña recarga para continuar el ritual.",
    isPopular: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "Iniciado",
    slug: "iniciado",
    essences: 50,
    price: "49.00",
    currency: "MXN",
    stripePriceId: "price_1TpCmpRPbU5trHr7FSIgHgqK",
    badge: null,
    description: "Ideal para explorar MysticStudio con calma.",
    isPopular: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "Buscador",
    slug: "buscador",
    essences: 120,
    price: "99.00",
    currency: "MXN",
    stripePriceId: "price_1TpCnGRPbU5trHr7RFSji2JC",
    badge: "Más popular",
    description: "El equilibrio ideal entre valor y flexibilidad.",
    isPopular: true,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: "Ritual Supremo",
    slug: "ritual-supremo",
    essences: 300,
    price: "199.00",
    currency: "MXN",
    stripePriceId: "price_1TpCnfRPbU5trHr7jhni9WBw",
    badge: "Mejor valor",
    description: "Para sesiones frecuentes y exploración profunda.",
    isPopular: false,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: "Gran Oráculo",
    slug: "gran-oraculo",
    essences: 800,
    price: "399.00",
    currency: "MXN",
    stripePriceId: "price_1TpCo6RPbU5trHr7c1MHea81",
    badge: "Máxima reserva",
    description: "Una reserva amplia para mantener vivo el estudio.",
    isPopular: false,
    isActive: true,
    sortOrder: 5,
  },
];

async function main() {
  for (const essencePackage of essencePackages) {
    await prisma.essencePackage.upsert({
      where: {
        slug: essencePackage.slug,
      },
      update: essencePackage,
      create: essencePackage,
    });
  }

  console.log("✅ Essence packages seeded successfully.");
}

main().catch((error) => {
  console.error("❌ Failed to seed essence packages:", error);
  process.exit(1);
});