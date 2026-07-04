"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export type BookCategory = {
  id: string;
  title: string;
  icon: string;
  count: number;
};

type BookCategoryListProps = {
  categories: BookCategory[];
  onOpenCategory: (categoryId: string) => void;
};

export default function BookCategoryList({
  categories,
  onOpenCategory,
}: BookCategoryListProps) {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[#6f431f]/25" />

        <span className="font-serif text-lg tracking-[0.22em] text-[#3f2412]">
          Índice
        </span>

        <div className="h-px flex-1 bg-[#6f431f]/25" />
      </div>

      <p className="mt-5 text-center font-serif text-sm italic leading-6 text-[#4b2b16]/80">
        Elige un capítulo para abrir el recetario.
      </p>

      <div className="mt-6 space-y-1">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group flex w-full items-center rounded-lg px-2 py-3 text-left transition hover:bg-[#3f2412]/8"
          >
            <span className="mr-3 text-xl">{category.icon}</span>

            <span className="font-serif text-lg font-medium text-[#2a1508]">
              {category.title}
            </span>

            <div className="mx-4 flex-1 border-b border-dotted border-[#6f431f]/30" />

            <span className="mr-4 font-serif text-sm text-[#3f2412]/75">
              {category.count}
            </span>

            <button
              type="button"
              onClick={() => onOpenCategory(category.id)}
              className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-[#3f2412]/75 transition hover:bg-[#3f2412]/10 hover:text-[#241005]"
            >
              Abrir
              <ChevronRight size={15} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}