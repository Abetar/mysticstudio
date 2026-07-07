"use client";

import BookFooter from "@/features/cleansing/components/book/BookFooter";
import BookHeader from "@/features/cleansing/components/book/BookHeader";
import GrimoireBookPage from "./GrimoireBookPage";

export type GrimoireChapterItem = {
  id: string;
  title: string;
  icon: string;
  count: number;
};

type GrimoireIndexPageProps = {
  chapters: GrimoireChapterItem[];
  isLoading: boolean;
  error: string | null;
  onOpenChapter: (chapterId: string) => void;
};

export default function GrimoireIndexPage({
  chapters,
  isLoading,
  error,
  onOpenChapter,
}: GrimoireIndexPageProps) {
  return (
    <GrimoireBookPage>
      <BookHeader
        eyebrow="El Grimorio"
        title="Índice Ritual"
        quote="No todas las páginas responden a cualquier mano."
      />

      {isLoading ? (
        <p className="mt-12 text-center font-serif text-sm italic text-[#4b2b16]/75">
          Cargando índice...
        </p>
      ) : error ? (
        <p className="mt-12 text-center font-serif text-sm italic text-red-950/80">
          {error}
        </p>
      ) : (
        <div className="mt-12 space-y-5 font-serif">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onOpenChapter(chapter.id)}
              className="group flex w-full items-center gap-4 text-left text-[#2b1308]"
            >
              <span className="w-8 text-xl">{chapter.icon}</span>

              <span className="text-lg font-semibold">
                Capítulo {index + 1}. {chapter.title}
              </span>

              <span className="h-px flex-1 border-b border-dotted border-[#3f2412]/35" />

              <span className="text-sm uppercase tracking-[0.18em] text-[#4b2b16]/70">
                {chapter.count} rituales
              </span>
            </button>
          ))}
        </div>
      )}

      <BookFooter page={1} totalPages={3} />
    </GrimoireBookPage>
  );
}