'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SpotlightBg from './SpotlightBg';
import Globe3D from './Globe3D';

interface CoverGateProps {
  isOpen: boolean;
  onOpen: () => void;
}

function GuestBadge() {
  const searchParams = useSearchParams();
  const guestParam = searchParams.get('to');
  const guestName = guestParam ? decodeURIComponent(guestParam.replace(/\+/g, ' ')) : 'Tamu Undangan';

  return (
    <div className="space-y-1 my-1">
      <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-200/80 font-mono">
        Spesial untuk:
      </p>
      <div className="inline-block px-4 py-1 rounded-full border border-amber-300/40 bg-amber-500/10 backdrop-blur-md">
        <p className="text-xs font-serif text-amber-200 font-semibold tracking-wider">
          {guestName}
        </p>
      </div>
    </div>
  );
}

export default function CoverGate({ isOpen, onOpen }: CoverGateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });
  const [isInteractingBg, setIsInteractingBg] = useState(false);

  const handlePointerInteractionBg = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsInteractingBg(true);
  };

  return (
    <section
      ref={containerRef}
      onPointerDown={handlePointerInteractionBg}
      onPointerMove={handlePointerInteractionBg}
      onPointerLeave={() => setIsInteractingBg(false)}
      className={`fixed inset-x-0 top-0 max-w-md mx-auto z-40 h-dvh flex flex-col items-center justify-between p-5 transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isOpen
          ? '-translate-y-full opacity-0 pointer-events-none scale-95 blur-sm'
          : 'translate-y-0 opacity-100 pointer-events-auto scale-100 blur-0'
      }`}
    >
      <style jsx global>{`
        @keyframes scanlineMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes gyroCounterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .anim-scanline {
          animation: scanlineMove 2.8s linear infinite;
        }
        .anim-gyro-slow {
          animation: gyroCounterSpin 32s linear infinite;
        }
      `}</style>

      {/* Layer Spotlight */}
      <SpotlightBg cursorPos={cursorPos} isInteracting={isInteractingBg} />

      {/* Header Cover */}
      <div className="relative z-20 text-center pt-2 pointer-events-none space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-amber-300/40 bg-black/40 backdrop-blur-md shadow-sm">
          <span className="w-1 h-1 rounded-full bg-amber-300" />
          <span className="text-[8px] tracking-[0.35em] text-amber-200 uppercase font-serif">
            The Wedding of
          </span>
          <span className="w-1 h-1 rounded-full bg-amber-300" />
        </div>
        <p className="text-[9px] uppercase tracking-[0.25em] text-cyan-200/80 font-light">
          Walimatul &apos;Urs
        </p>
      </div>

      {/* 3D Globe */}
      <Globe3D isCoverOpen={isOpen} />

      {/* Footer Cover: Pasangan, Nama Tamu Personal & Tombol Buka */}
      <div className="relative z-20 text-center space-y-2 pb-2 w-full max-w-xs">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-serif text-white tracking-wider leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Silvia Wulandari <br />
            <span className="text-amber-300 font-serif italic font-light text-xl">&</span> Wahyudi
          </h1>

          <p className="text-[10px] tracking-[0.25em] text-amber-200/90 font-medium uppercase pt-0.5">
            Minggu, 20 September 2026
          </p>
        </div>

        {/* Badge Nama Tamu Terpersonalisasi */}
        <Suspense fallback={<div className="h-7" />}>
          <GuestBadge />
        </Suspense>

        <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent mx-auto pt-0.5" />

        <div className="pt-1">
          <button
            type="button"
            onClick={onOpen}
            className="w-full py-3 px-4 rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-amber-500/20 backdrop-blur-md text-amber-100 font-serif text-xs tracking-[0.2em] uppercase hover:bg-amber-400/30 active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.25)] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </section>
  );
}