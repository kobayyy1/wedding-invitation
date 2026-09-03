'use client';

import { useState, useRef, useEffect } from 'react';

const GLOBE_TILES = [
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `TOP-${i + 1}`,
    yaw: i * 60,
    pitch: 38,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `MID-${i + 1}`,
    yaw: i * 45,
    pitch: 0,
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `BOT-${i + 1}`,
    yaw: i * 60 + 30,
    pitch: -38,
  })),
];

interface Globe3DProps {
  isCoverOpen?: boolean;
}

export default function Globe3D({ isCoverOpen = false }: Globe3DProps) {
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(-12);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;
    const spinLoop = () => {
      if (!isDragging.current && !isCoverOpen) {
        setRotY((prev) => (prev + 0.35) % 360);
      }
      animId = requestAnimationFrame(spinLoop);
    };
    animId = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(animId);
  }, [isCoverOpen]);

  const handleGlobePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handleGlobePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    startPos.current = { x: e.clientX, y: e.clientY };

    setRotY((prev) => (prev + dx * 0.55) % 360);
    setRotX((prev) => Math.max(-50, Math.min(50, prev - dy * 0.4)));
  };

  const handleGlobePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      style={{ perspective: '1100px' }}
      className="relative w-full flex flex-col items-center justify-center my-auto py-2 z-30 touch-none"
    >
      {/* Base Sorot Proyektor Bawah */}
      <div
        style={{
          transform: 'translateY(155px) rotateX(78deg)',
          transformStyle: 'preserve-3d',
        }}
        className="absolute w-72 h-72 flex items-center justify-center pointer-events-none"
      >
        <div className="w-full h-full rounded-full border border-amber-400/25 border-dashed animate-spin [animation-duration:24s]" />
        <div className="absolute w-56 h-56 rounded-full border border-cyan-300/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
        <div className="absolute w-24 h-24 rounded-full bg-amber-300/15 blur-lg" />
      </div>

      {/* Kontainer Bola 3D Putar */}
      <div
        onPointerDown={handleGlobePointerDown}
        onPointerMove={handleGlobePointerMove}
        onPointerUp={handleGlobePointerUp}
        onPointerCancel={handleGlobePointerUp}
        className="relative w-72 h-72 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cincin Giroskop */}
        <div
          style={{ transform: 'rotateX(90deg)', transformStyle: 'preserve-3d' }}
          className="absolute w-64 h-64 rounded-full border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] pointer-events-none"
        />
        <div
          style={{ transform: 'rotateY(0deg)', transformStyle: 'preserve-3d' }}
          className="absolute w-64 h-64 rounded-full border border-dashed border-cyan-300/35 pointer-events-none"
        />
        <div
          style={{ transform: 'rotateY(90deg)', transformStyle: 'preserve-3d' }}
          className="absolute w-64 h-64 rounded-full border border-amber-300/30 pointer-events-none"
        />
        <div
          style={{ transform: 'rotateX(45deg) rotateY(45deg)', transformStyle: 'preserve-3d' }}
          className="absolute w-68 h-68 rounded-full border border-cyan-400/25 pointer-events-none opacity-80"
        />

        {/* Inti Monogram S & W */}
        <div
          style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
          className="absolute w-15 h-15 rounded-full border border-amber-300/80 bg-[#06111f]/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none shadow-[0_0_20px_rgba(251,191,36,0.5)]"
        >
          <span className="text-amber-200 font-serif text-xs font-semibold tracking-wider">
            S&amp;W
          </span>
          <span className="text-[7px] text-cyan-300/90 font-mono tracking-wider mt-0.5">
            20.09.26
          </span>
        </div>

        {/* 20 Petak Foto */}
        {GLOBE_TILES.map((tile) => (
          <div
            key={tile.id}
            style={{
              transform: `rotateY(${tile.yaw}deg) rotateX(${tile.pitch}deg) translateZ(128px)`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            className="absolute w-13 h-17 rounded-lg border border-amber-300/75 bg-[#06111e]/90 backdrop-blur-sm shadow-[0_0_15px_rgba(251,191,36,0.3)] p-[2.5px] pointer-events-none overflow-hidden"
          >
            <div className="w-full h-full rounded-[5px] overflow-hidden relative border border-cyan-400/20 bg-black/40">
              <img
                src="/images/couple-3d.png"
                alt="Silvia & Wahyudi"
                className="w-full h-full object-cover object-top filter brightness-110 contrast-105"
              />
              <div className="absolute inset-x-0 h-3 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent anim-scanline pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-amber-300/15 pointer-events-none" />
              <div className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-amber-300" />
              <div className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-amber-300" />
              <div className="absolute bottom-0.5 left-0.5 w-1 h-1 border-b border-l border-amber-300" />
              <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-amber-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Panduan Sentuh */}
      <div className="flex items-center space-x-1.5 mt-5 opacity-70 pointer-events-none">
        <span className="text-[10px] text-amber-300">‹</span>
        <span className="text-[9px] tracking-[0.2em] text-amber-200/90 uppercase font-sans">
          Putar Galeri 360°
        </span>
        <span className="text-[10px] text-amber-300">›</span>
      </div>
    </div>
  );
}