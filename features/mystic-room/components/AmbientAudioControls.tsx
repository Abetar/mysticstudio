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
      className="fixed bottom-5 right-5 z-[80] rounded-full border border-[#caa46a]/30 bg-black/35 px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[#f7e6c3]/80 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-[#caa46a]/60 hover:bg-[#caa46a]/10"
    >
      {isEnabled ? "Ambiente activo" : "Activar ambiente"}
    </button>
  );
}