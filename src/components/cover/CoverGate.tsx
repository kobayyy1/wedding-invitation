'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SpotlightBg from './SpotlightBg';
import Globe3D from './Globe3D';

interface CoverGateProps {
  isOpen: boolean;
  onOpen: () => void;
}

function GuestRecipient() {
  const searchParams = useSearchParams();
  const guestParam = searchParams.get('to');
  const guestName = guestParam ? decodeURIComponent(guestParam.replace(/\+/g, ' ')) : 'Tamu Undangan';

  return (
    <div className="space-y-1">
      <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-cyan-200/75 font-medium">
        Kepada Yth. Bapak/Ibu/Saudara/i:
      </p>
      <div className="inline-block px-4 py-1.5 rounded-xl border border-[#F59E0B]/40 bg-[#0B1528]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <p className="text-sm font-serif text-[#FDE68A] font-bold tracking-wider">
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

    setTimeout(() => {
      onOpen();
    }, 4800);
  };

  if (isOpen) return null;

  return (
    <section
      ref={containerRef}
      onPointerDown={handlePointerInteractionBg}
      onPointerMove={handlePointerInteractionBg}
      onPointerLeave={() => setIsInteractingBg(false)}
      className={`fixed inset-x-0 top-0 max-w-md mx-auto z-40 h-dvh flex flex-col justify-between items-center px-6 py-8 select-none transition-colors duration-1000 ${
        isFlocking ? 'bg-[#040812]/95' : 'bg-transparent'
      }`}
    >
      <SpotlightBg cursorPos={cursorPos} isInteracting={isInteractingBg} />

      {/* 1. ZONA ATAS (HEADER) */}
      <header
        className={`relative z-20 text-center space-y-2 pointer-events-none transition-all duration-700 ${
          isFlocking ? 'opacity-0 -translate-y-6' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#F59E0B]/50 bg-[#0B1528]/90 backdrop-blur-md shadow-[0_2px_12px_rgba(245,158,11,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          <span className="text-[9px] font-mono tracking-[0.35em] text-[#FDE68A] uppercase font-bold">
            The Wedding of
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-200/80 font-light">
          Walimatul &apos;Urs
        </p>
      </header>

      {/* 2. ELEMEN 3D & KAWANAN TERBANG */}
      <Globe3D isFlocking={isFlocking} />

      {/* 3. ZONA TENGAH (NAMA MEMPELAI) */}
      <div
        className={`relative z-20 w-full text-center my-auto py-2 transition-all duration-700 ${
          isFlocking ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-extrabold tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
            Silvia Wulandari
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
            <div className="w-8 h-8 rounded-full border border-[#FDE68A]/60 bg-[#0B1528] flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.35)]">
              <span className="font-serif italic text-base text-[#FDE68A] font-bold">&amp;</span>
            </div>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent via-[#F59E0B] to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-white font-extrabold tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
            Riyandi Wahyudi
          </h2>

          <div className="pt-2">
            <span className="inline-block text-[10.5px] font-mono tracking-[0.28em] text-[#FDE68A] uppercase font-semibold bg-[#111C33]/70 border border-[#F59E0B]/30 px-4 py-1 rounded-full">
              Minggu, 20 September 2026
            </span>
          </div>
        </div>
      </div>

      {/* 4. ZONA BAWAH (TAMU & TOMBOL) */}
      <footer
        className={`relative z-20 w-full max-w-xs text-center space-y-4 transition-all duration-700 ${
          isFlocking ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <Suspense fallback={<div className="h-10" />}>
          <GuestRecipient />
        </Suspense>

        <button
          type="button"
          onClick={handleOpenInvitation}
          disabled={isFlocking}
          className="w-full py-3.5 px-6 rounded-2xl border-2 border-[#F59E0B] bg-gradient-to-r from-[#0E1A30] via-[#1A2E4E] to-[#0E1A30] text-white font-serif text-xs tracking-[0.25em] uppercase hover:brightness-110 active:scale-95 transition-all shadow-[0_6px_25px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.3)] cursor-pointer flex items-center justify-center gap-2 font-bold"
        >
          <span>Buka Undangan</span>
          <span className="text-[#FDE68A] text-sm">✦</span>
        </button>
      </footer>

      {/* OVERLAY TRANSISI SINEMATIK */}
      {isFlocking && (
        <div className="absolute inset-0 z-35 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <div className="space-y-4 max-w-xs animate-in fade-in zoom-in-95 duration-700">
            <div className="w-14 h-14 mx-auto rounded-full border-2 border-[#FDE68A] bg-gradient-to-b from-[#B45309] to-[#78350F] flex items-center justify-center shadow-[0_0_25px_#F59E0B]">
              <span className="text-2xl">⚜️</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#FDE68A] uppercase font-bold block">
                Membuka Lembaran Bahagia
              </span>
              <h3 className="text-xl font-serif text-white font-bold">
                Silvia &amp; Riyandi
              </h3>
            </div>

            <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto mt-2">
              <div className="w-full h-full bg-gradient-to-r from-[#F59E0B] via-[#FDE68A] to-[#F59E0B] animate-[welcomeBar_4.2s_ease-out_forwards]" />
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
    </section>
  );
}