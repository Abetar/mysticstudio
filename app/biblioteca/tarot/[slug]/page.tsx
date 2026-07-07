import { notFound } from "next/navigation";
import TarotCardArticle from "@/features/library/tarot/components/TarotCardArticle";
import {
  getAllTarotCards,
  getTarotCard,
} from "@/features/library/tarot/lib/getTarotCard";

type TarotCardPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllTarotCards().map((card) => ({
    slug: card.slug,
  }));
}

export async function generateMetadata({ params }: TarotCardPageProps) {
  const { slug } = await params;
  const card = getTarotCard(slug);

  if (!card) {
    return {
      title: "Carta no encontrada | Mystic Studio",
    };
  }

  return {
    title: `${card.name}: significado en el tarot | Mystic Studio`,
    description: card.summary,
  };
}

export default async function TarotCardPage({ params }: TarotCardPageProps) {
  const { slug } = await params;
  const card = getTarotCard(slug);

  if (!card) {
    notFound();
  }

  return <TarotCardArticle card={card} />;
}