"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TarotLibraryCard as TarotLibraryCardType } from "../types/tarotLibrary.types";

type TarotLibraryCardProps = {
  card: TarotLibraryCardType;
};

export default function TarotLibraryCard({
  card,
}: TarotLibraryCardProps) {
  return (
    <Link href={`/biblioteca/tarot/${card.slug}`}>
      <motion.article
        whileHover={{
          y: -8,
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.25,
        }}
        className="group cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl border border-[#caa46a]/15 bg-[#0a070b] transition-all duration-300 group-hover:border-[#caa46a]/40 group-hover:shadow-[0_0_40px_rgba(202,164,106,0.15)]">
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={card.image}
              alt={card.name}
              fill
              sizes="220px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050308] via-transparent to-transparent opacity-70" />
          </div>

          <div className="p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#caa46a]/80">
              {card.arcana === "major"
                ? "Arcano Mayor"
                : "Arcano Menor"}
            </p>

            <h3 className="mt-2 text-xl font-semibold text-[#f5ead2]">
              {card.name}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#d7c7aa]/70">
              {card.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {card.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[#caa46a]/15 bg-[#caa46a]/5 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#caa46a]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}