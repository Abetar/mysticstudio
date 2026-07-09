"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { ambientAudioManager } from "@/lib/audio/ambientAudioManager";

export default function AmbientAudioControls() {
  const [isEnabled, setIsEnabled] = useState(false);

  function handleToggleAudio() {
    const nextStatus = ambientAudioManager.toggle();
    setIsEnabled(nextStatus);
  }

  const Icon = isEnabled ? Volume2 : VolumeX;

  return (
    <button
      type="button"
      onClick={handleToggleAudio}
      aria-label={isEnabled ? "Ambiente activo" : "Activar ambiente"}
      title={isEnabled ? "Ambiente activo" : "Activar ambiente"}
      className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full border border-[#caa46a]/30 bg-black/35 text-[#f7e6c3]/80 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-[#caa46a]/60 hover:bg-[#caa46a]/10 sm:h-auto sm:w-auto sm:px-4 sm:py-3 sm:text-center sm:text-[10px] sm:uppercase sm:tracking-[0.24em]"
    >
      <Icon size={22} className="sm:hidden" />

      <span className="hidden sm:inline">
        {isEnabled ? "Ambiente activo" : "Activar ambiente"}
      </span>
    </button>
  );
}