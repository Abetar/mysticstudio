export default function RainLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.09)_45%,transparent_50%)] bg-[length:120px_120px] animate-[rainSlide_0.9s_linear_infinite]" />
    </div>
  );
}