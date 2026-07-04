"use client";

type AmbientMediaLayerProps = {
  smokeVideoSrc?: string;
  rainVideoSrc?: string;
};

export default function AmbientMediaLayer({
  smokeVideoSrc = "/videos/smoke-01.webm",
  rainVideoSrc = "/videos/rain-window-01.webm",
}: AmbientMediaLayerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <video
        src={smokeVideoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-screen"
      />

      <video
        src={rainVideoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-[0.08] mix-blend-screen"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,184,92,0.12),transparent_38%),radial-gradient(circle_at_15%_18%,rgba(255,150,58,0.11),transparent_22%),radial-gradient(circle_at_86%_25%,rgba(255,199,117,0.08),transparent_24%)]" />
    </div>
  );
}