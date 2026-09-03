'use client';

interface SpotlightBgProps {
  cursorPos: { x: number; y: number };
  isInteracting: boolean;
}

export default function SpotlightBg({ cursorPos, isInteracting }: SpotlightBgProps) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-85 filter brightness-105 contrast-105 pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url('/images/bg-base.jpg')` }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18)_0%,_rgba(8,13,26,0.35)_65%,_rgba(8,13,26,0.75)_100%)] pointer-events-none" />

      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundImage: `url('/images/bg-reveal.jpg')`,
          opacity: isInteracting ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 180px at ${cursorPos.x}px ${cursorPos.y}px, black 35%, transparent 85%)`,
          maskImage: `radial-gradient(circle 180px at ${cursorPos.x}px ${cursorPos.y}px, black 35%, transparent 85%)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80 pointer-events-none" />
    </>
  );
}