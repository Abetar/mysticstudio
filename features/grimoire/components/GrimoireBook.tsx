"use client";

import { useMemo, useState } from "react";
import type { GrimoireCategory } from "@/app/generated/prisma/enums";
import { useGrimoireRituals } from "../hooks/useGrimoireRituals";
import type { GrimoireRitual } from "../types/grimoire.types";
import GrimoireChapterPage from "./GrimoireChapterPage";
import GrimoireDisclaimerModal from "./GrimoireDisclaimerModal";
import GrimoireIndexPage, {
  type GrimoireChapterItem,
} from "./GrimoireIndexPage";
import GrimoireLockedPage from "./GrimoireLockedPage";
import GrimoireRitualPage from "./GrimoireRitualPage";

type GrimoireView = "index" | "chapter" | "ritual";

const darkCategories: GrimoireCategory[] = [
  "SEPARATION",
  "SWEETENING",
  "BINDING",
  "DOMINATION",
  "RESERVED",
];

const chapterBase: Omit<GrimoireChapterItem, "count">[] = [
  { id: "PROTECTION", title: "Protección", icon: "✠" },
  { id: "MONEY", title: "Prosperidad", icon: "☉" },
  { id: "LOVE", title: "Amor", icon: "♡" },
  { id: "CLEANSING", title: "Limpieza", icon: "🜄" },
  { id: "DARK", title: "Rituales Oscuros", icon: "⚠" },
];

export default function GrimoireBook() {
  const [view, setView] = useState<GrimoireView>("index");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null,
  );
  const [selectedRitual, setSelectedRitual] =
    useState<GrimoireRitual | null>(null);
  const [pendingDisclaimerRitual, setPendingDisclaimerRitual] =
    useState<GrimoireRitual | null>(null);

  const { rituals, isLoading, error, refreshRituals } = useGrimoireRituals();

  const chapters = useMemo<GrimoireChapterItem[]>((() => {
    return chapterBase.map((chapter) => {
      const count =
        chapter.id === "DARK"
          ? rituals.filter((ritual) => darkCategories.includes(ritual.category))
              .length
          : rituals.filter((ritual) => ritual.category === chapter.id).length;

      return {
        ...chapter,
        count,
      };
    });
  }), [rituals]);

  const selectedChapter = chapters.find(
    (chapter) => chapter.id === selectedChapterId,
  );

  const filteredRituals = useMemo(() => {
    if (!selectedChapterId) return [];

    if (selectedChapterId === "DARK") {
      return rituals.filter((ritual) =>
        darkCategories.includes(ritual.category),
      );
    }

    return rituals.filter((ritual) => ritual.category === selectedChapterId);
  }, [rituals, selectedChapterId]);

  function openRitual(ritual: GrimoireRitual) {
    setSelectedRitual(ritual);
    setPendingDisclaimerRitual(null);
    setView("ritual");
  }

  function handleOpenChapter(chapterId: string) {
    setSelectedChapterId(chapterId);
    setSelectedRitual(null);
    setPendingDisclaimerRitual(null);
    setView("chapter");
  }

  function handleOpenRitual(ritual: GrimoireRitual) {
    if (ritual.requiresDisclaimer && !ritual.hasAcceptedDisclaimer) {
      setPendingDisclaimerRitual(ritual);
      return;
    }

    openRitual(ritual);
  }

  function handleBackToIndex() {
    setSelectedChapterId(null);
    setSelectedRitual(null);
    setPendingDisclaimerRitual(null);
    setView("index");
  }

  function handleBackToChapter() {
    setSelectedRitual(null);
    setPendingDisclaimerRitual(null);
    setView("chapter");
  }

  async function handleRitualUnlocked() {
    if (!selectedRitual) return;

    const refreshedRituals = await refreshRituals();
    const refreshedRitual = refreshedRituals.find(
      (ritual) => ritual.id === selectedRitual.id,
    );

    if (refreshedRitual) {
      setSelectedRitual(refreshedRitual);
    }
  }

  async function handleDisclaimerAccepted() {
    if (!pendingDisclaimerRitual) return;

    const refreshedRituals = await refreshRituals();
    const refreshedRitual =
      refreshedRituals.find(
        (ritual) => ritual.id === pendingDisclaimerRitual.id,
      ) ?? pendingDisclaimerRitual;

    openRitual({
      ...refreshedRitual,
      hasAcceptedDisclaimer: true,
    });
  }

  return (
    <>
      {view === "ritual" && selectedRitual ? (
        selectedRitual.accessLevel !== "PUBLIC" && !selectedRitual.isUnlocked ? (
          <GrimoireLockedPage
            ritual={selectedRitual}
            onBack={handleBackToChapter}
            onUnlocked={handleRitualUnlocked}
          />
        ) : (
          <GrimoireRitualPage
            ritual={selectedRitual}
            onBack={handleBackToChapter}
          />
        )
      ) : view === "chapter" && selectedChapter ? (
        <GrimoireChapterPage
          title={selectedChapter.title}
          rituals={filteredRituals}
          onBack={handleBackToIndex}
          onOpenRitual={handleOpenRitual}
        />
      ) : (
        <GrimoireIndexPage
          chapters={chapters}
          isLoading={isLoading}
          error={error}
          onOpenChapter={handleOpenChapter}
        />
      )}

      <GrimoireDisclaimerModal
        isOpen={Boolean(pendingDisclaimerRitual)}
        onClose={() => setPendingDisclaimerRitual(null)}
        onAccepted={handleDisclaimerAccepted}
      />
    </>
  );
}