"use client";

import AmbientMediaLayer from "../components/AmbientMediaLayer";
import CandleGlow from "../components/CandleGlow";
import RainLayer from "../components/RainLayer";
import RoomAwakening from "../components/RoomAwakening";
import SmokeLayer from "../components/SmokeLayer";
import AmbientAudioControls from "../components/AmbientAudioControls";
import ReadingInfoModal from "../components/ReadingInfoModal";

export default function RoomDirector() {
  return (
    <>
      <RoomAwakening />
      <RainLayer />
      <SmokeLayer />
      <CandleGlow />
      <AmbientMediaLayer />
      <AmbientAudioControls />
      <ReadingInfoModal />
    </>
  );
}