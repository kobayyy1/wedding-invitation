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

function WelcomeGuestText() {
  const searchParams = useSearchParams();
  const guestParam = searchParams.get('to');
  const guestName = guestParam ? decodeURIComponent(guestParam.replace(/\+/g, ' ')) : 'Tamu Undangan';

  return (
    <div className="space-y-1">
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-300/90">
        Kepada yang Terhormat
      </p>
      <h3 className="text-xl font-serif text-amber-200 font-semibold tracking-wider drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">
        {guestName}
      </h3>
    </div>
  );
}

export default function CoverGate({ isOpen, onOpen }: CoverGateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });
  const [isInteractingBg, setIsInteractingBg] = useState(false);
  const [isFlocking, setIsFlocking] = useState(false);

  const handlePointerInteractionBg = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || isFlocking) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsInteractingBg(true);
  };

  const handleOpenInvitation = () => {
    if (isFlocking) return;
    setIsFlocking(true);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {}
    }

    // Durasi total perpaduan burung terbang + teks sambutan: 5.5 detik
    setTimeout(() => {
      onOpen();
    }, 5500);
  };

  if (isOpen) return null;

  return (
    <section
      ref={containerRef}
      onPointerDown={handlePointerInteractionBg}
      onPointerMove={handlePointerInteractionBg}
      onPointerLeave={() => setIsInteractingBg(false)}
      style={{ perspective: '1200px' }}
      className={`fixed inset-x-0 top-0 max-w-md mx-auto z-40 h-dvh flex flex-col items-center justify-between p-5 select-none transition-all duration-[2000ms] ease-out ${
        isFlocking ? 'bg-[#060b17]/95' : ''
      }`}
    >
      <SpotlightBg cursorPos={cursorPos} isInteracting={isInteractingBg} />

      {/* Header Cover (Menghilang saat tombol ditekan) */}
      <div
        className={`relative z-20 text-center pt-2 pointer-events-none space-y-1 transition-all duration-700 ${
          isFlocking ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
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

      {/* ======================================================== */}
      {/* 3D GLOBE (BURUNG ORIGAMI TERBANG MELAYANG)               */}
      {/* ======================================================== */}
      <Globe3D isFlocking={isFlocking} />

      {/* ======================================================== */}
      {/* TEKS SAMBUTAN YANG MUNCUL DI TENGAH KEPUNGAN BURUNG      */}
      {/* ======================================================== */}
      {isFlocking && (
        <div className="absolute inset-0 z-35 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <div className="space-y-4 max-w-xs animate-in fade-in zoom-in-90 duration-1000 delay-500 fill-mode-both">
            {/* Lencana Emas */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/40 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.35em] text-amber-200 uppercase">
                Selamat Datang
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
            </div>

            {/* Judul Elegan */}
            <h2 className="text-2xl font-serif text-white tracking-wide leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
              Perayaan Cinta &amp; Bahtera <br />
              <span className="text-amber-300 font-serif italic">Silvia &amp; Wahyudi</span>
            </h2>

            {/* Nama Tamu Spesifik */}
            <Suspense fallback={null}>
              <WelcomeGuestText />
            </Suspense>

            <p className="text-[11px] text-gray-300/90 font-light italic leading-relaxed pt-1">
              &ldquo;Terima kasih telah menjadi bagian dari kisah bahagia kami.&rdquo;
            </p>

            {/* Progress Bar Emas */}
            <div className="w-28 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto mt-2 relative">
              <div className="w-full h-full bg-gradient-to-r from-amber-400 via-cyan-300 to-amber-400 animate-[welcomeBar_4.8s_ease-out_forwards]" />
            </div>
          </div>

          <style jsx>{`
            @keyframes welcomeBar {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(0%); }
            }
          `}</style>
        </div>
      )}

      {/* Footer Cover (Menghilang saat burung terbang) */}
      <div
        className={`relative z-20 text-center space-y-2 pb-2 w-full max-w-xs transition-all duration-700 ${
          isFlocking ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="space-y-0.5">
          <h1 className="text-2xl font-serif text-white tracking-wider leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Silvia Wulandari <br />
            <span className="text-amber-300 font-serif italic font-light text-xl">&</span> Wahyudi
          </h1>

          <p className="text-[10px] tracking-[0.25em] text-amber-200/90 font-medium uppercase pt-0.5">
            Minggu, 20 September 2026
          </p>
        </div>

        <Suspense fallback={<div className="h-7" />}>
          <GuestBadge />
        </Suspense>

        <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent mx-auto pt-0.5" />

        <div className="pt-1">
          <button
            type="button"
            onClick={handleOpenInvitation}
            disabled={isFlocking}
            className="w-full py-3 px-4 rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-amber-500/20 backdrop-blur-md text-amber-100 font-serif text-xs tracking-[0.2em] uppercase hover:bg-amber-400/30 active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.25)] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </section>
  );
}