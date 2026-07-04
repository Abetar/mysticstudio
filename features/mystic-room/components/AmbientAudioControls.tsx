"use client";

import { useState } from "react";
import { ambientAudioManager } from "@/lib/audio/ambientAudioManager";

export default function AmbientAudioControls() {
  const [isEnabled, setIsEnabled] = useState(false);

  function handleToggleAudio() {
    const nextStatus = ambientAudioManager.toggle();
    setIsEnabled(nextStatus);
  }

  return (
    <button
      type="button"
      onClick={handleToggleAudio}
      className="fixed bottom-5 left-1/2 z-[80] w-[calc(100vw-2.5rem)] -translate-x-1/2 rounded-full border border-[#caa46a]/30 bg-black/35 px-4 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#f7e6c3]/80 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-[#caa46a]/60 hover:bg-[#caa46a]/10 sm:left-auto sm:right-5 sm:w-auto sm:translate-x-0 sm:tracking-[0.24em]"
    >
      {isEnabled ? "Ambiente activo" : "Activar ambiente"}
    </button>
  );
}