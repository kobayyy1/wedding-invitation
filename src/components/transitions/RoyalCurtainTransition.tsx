'use client';

import { useEffect, useState } from 'react';

interface RoyalCurtainTransitionProps {
  isActive: boolean;
  onTransitionComplete: () => void;
}

export default function RoyalCurtainTransition({
  isActive,
  onTransitionComplete,
}: RoyalCurtainTransitionProps) {
  // Tahap animasi: 'idle' -> 'closing' -> 'sealed' -> 'opening' -> 'done'
  const [phase, setPhase] = useState<'idle' | 'closing' | 'sealed' | 'opening' | 'done'>('idle');

  useEffect(() => {
    if (isActive) {
      setPhase('closing');

      // Fase 1: Tirai menutup dari samping (0.6s)
      const sealTimer = setTimeout(() => {
        setPhase('sealed');
      }, 700);

      // Fase 2: Segel emas bersinar & pergantian konten terjadi di latar (1.8s)
      const openTimer = setTimeout(() => {
        setPhase('opening');
      }, 2100);

      // Fase 3: Tirai menyibak terbuka penuh (2.8s)
      const completeTimer = setTimeout(() => {
        setPhase('done');
        onTransitionComplete();
      }, 2900);

      return () => {
        clearTimeout(sealTimer);
        clearTimeout(openTimer);
        clearTimeout(completeTimer);
      };
    } else {
      setPhase('idle');
    }
  }, [isActive, onTransitionComplete]);

  if (phase === 'idle' || phase === 'done') return null;

  const isClosed = phase === 'closing' || phase === 'sealed';

  return (
    <div className="fixed inset-x-0 top-0 max-w-md mx-auto h-dvh z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      <style jsx global>{`
        @keyframes sealGlowPulse {
          0%, 100% { transform: scale(0.96); filter: drop-shadow(0 0 15px rgba(197,160,89,0.5)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 28px rgba(197,160,89,0.85)); }
        }
      `}</style>

      {/* ======================================================== */}
      {/* SAYAP TIRAI KIRI                                         */}
      {/* ======================================================== */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#0C243B] via-[#143B5E] to-[#1E4E78] border-r-2 border-[#C5A059] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isClosed ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Pola Damask Mewah pada Sayap Kiri */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#DFC384_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
        <div className="absolute top-0 bottom-0 right-3 w-[1px] bg-[#C5A059]/40" />
      </div>

      {/* ======================================================== */}
      {/* SAYAP TIRAI KANAN                                        */}
      {/* ======================================================== */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0C243B] via-[#143B5E] to-[#1E4E78] border-l-2 border-[#C5A059] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isClosed ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#DFC384_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
        <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-[#C5A059]/40" />
      </div>

      {/* ======================================================== */}
      {/* STAMP & JUDUL INTERLUDE DI TENGAH PERTEMUAN PINTU        */}
      {/* ======================================================== */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center text-center px-6 space-y-4 transition-all duration-500 ${
          phase === 'sealed'
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-75'
        }`}
      >
        {/* Segel Medali Emas */}
        <div className="relative w-20 h-20 flex items-center justify-center animate-[sealGlowPulse_2s_infinite]">
          {/* Cincin Luar Berputar */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#DFC384] animate-spin [animation-duration:16s]" />
          
          {/* Badan Medali Emas */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8C6D2E] via-[#C5A059] to-[#DFC384] p-1 shadow-[0_6px_25px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0E263E] border border-[#DFC384] flex flex-col items-center justify-center text-white">
              <span className="font-serif text-lg tracking-widest text-[#DFC384] font-bold">
                S&amp;W
              </span>
              <span className="text-[6px] font-mono tracking-[0.25em] text-white/80 uppercase">
                Royal Gate
              </span>
            </div>
          </div>
        </div>

        {/* Teks Judul Babak Antara */}
        <div className="space-y-1">
          <p className="text-[9.5px] font-mono tracking-[0.3em] uppercase text-[#DFC384] font-semibold">
            Menuju Babak II
          </p>
          <h3 className="text-xl font-serif text-white tracking-wider font-bold drop-shadow-md">
            Rangkaian Acara &amp; RSVP
          </h3>
          <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mt-1" />
        </div>

        <p className="text-[11px] text-sky-100/80 font-light italic tracking-wide">
          Membuka lembaran jadwal bahagia kami...
        </p>
      </div>
    </div>
  );
}