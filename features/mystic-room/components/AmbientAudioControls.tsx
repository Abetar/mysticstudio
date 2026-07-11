"use client";

import { useState } from "react";
import {
  CloudRain,
  Flame,
  Music2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  ambientAudioManager,
  type AmbientTrackKey,
} from "@/lib/audio/ambientAudioManager";

type TrackState = Record<AmbientTrackKey, boolean>;

const initialTracks: TrackState = {
  rain: false,
  fire: false,
  music: false,
};

export default function AmbientAudioControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [tracks, setTracks] = useState<TrackState>(initialTracks);

  function handleToggleTrack(track: AmbientTrackKey) {
    const isActive = ambientAudioManager.toggleTrack(track);

    setTracks((current) => ({
      ...current,
      [track]: isActive,
    }));
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir ambiente del estudio"
        title="Ambiente del estudio"
        className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full border border-[#caa46a]/30 bg-black/35 text-[#f7e6c3]/80 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-[#caa46a]/60 hover:bg-[#caa46a]/10 sm:h-auto sm:w-auto sm:px-4 sm:py-3 sm:text-[10px] sm:uppercase sm:tracking-[0.24em]"
      >
        <SlidersHorizontal size={22} className="sm:hidden" />

        <span className="hidden sm:inline">Ambiente del estudio</span>
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Cerrar ambiente del estudio"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[140] bg-black/55 backdrop-blur-sm"
          />

          <div className="fixed bottom-5 right-5 z-[150] w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-[26px] border border-[#caa46a]/25 bg-[#0b070c]/95 p-5 text-[#f5ead2] shadow-[0_30px_100px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#caa46a]/65">
                  Atmósfera
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                  Ambiente del estudio
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#d7c7aa]/65">
                  Activa únicamente los sonidos que quieras escuchar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar"
                className="rounded-full border border-[#caa46a]/20 p-2 text-[#d7c7aa]/65 transition hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <TrackToggle
                icon={<CloudRain size={19} />}
                label="Lluvia"
                description="Lluvia suave sobre el estudio."
                isActive={tracks.rain}
                onClick={() => handleToggleTrack("rain")}
              />

              <TrackToggle
                icon={<Flame size={19} />}
                label="Madera"
                description="Crepitar cálido de la chimenea."
                isActive={tracks.fire}
                onClick={() => handleToggleTrack("fire")}
              />

              <TrackToggle
                icon={<Music2 size={19} />}
                label="Música"
                description="Música ambiental mística."
                isActive={tracks.music}
                onClick={() => handleToggleTrack("music")}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

type TrackToggleProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
};

function TrackToggle({
  icon,
  label,
  description,
  isActive,
  onClick,
}: TrackToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition ${
        isActive
          ? "border-[#caa46a]/55 bg-[#caa46a]/12"
          : "border-[#caa46a]/15 bg-black/20 hover:bg-white/5"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#caa46a]/20 bg-black/25 text-[#caa46a]">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-[#f5ead2]">
          {label}
        </span>

        <span className="mt-0.5 block text-xs leading-5 text-[#d7c7aa]/55">
          {description}
        </span>
      </span>

      <span
        className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
          isActive
            ? "border-[#caa46a]/55 bg-[#caa46a]/35"
            : "border-[#caa46a]/20 bg-black/35"
        }`}
      >
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#f5ead2] transition ${
            isActive ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}