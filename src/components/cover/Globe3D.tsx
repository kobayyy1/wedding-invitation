'use client';

import { useState, useRef, useEffect } from 'react';

// Lintasan terbang 20 burung origami
const BIRD_TRAJECTORIES = [
  // 6 Burung Atas
  { id: 'T-1', yaw: 0, pitch: 38, tx: -240, ty: -440, tz: 980, rotZ: -22, delay: 0 },
  { id: 'T-2', yaw: 60, pitch: 38, tx: -50, ty: -500, tz: 1040, rotZ: 8, delay: 250 },
  { id: 'T-3', yaw: 120, pitch: 38, tx: 230, ty: -420, tz: 950, rotZ: 25, delay: 500 },
  { id: 'T-4', yaw: 180, pitch: 38, tx: 190, ty: -470, tz: 990, rotZ: 16, delay: 350 },
  { id: 'T-5', yaw: 240, pitch: 38, tx: -70, ty: -520, tz: 1050, rotZ: -10, delay: 150 },
  { id: 'T-6', yaw: 300, pitch: 38, tx: -250, ty: -410, tz: 930, rotZ: -28, delay: 600 },

  // 8 Burung Tengah
  { id: 'M-1', yaw: 0, pitch: 0, tx: -360, ty: -90, tz: 980, rotZ: -35, delay: 300 },
  { id: 'M-2', yaw: 45, pitch: 0, tx: -170, ty: -50, tz: 1080, rotZ: -12, delay: 80 },
  { id: 'M-3', yaw: 90, pitch: 0, tx: 50, ty: -70, tz: 1120, rotZ: 10, delay: 450 },
  { id: 'M-4', yaw: 135, pitch: 0, tx: 220, ty: -30, tz: 1050, rotZ: 24, delay: 220 },
  { id: 'M-5', yaw: 180, pitch: 0, tx: 370, ty: 50, tz: 970, rotZ: 38, delay: 550 },
  { id: 'M-6', yaw: 225, pitch: 0, tx: 190, ty: 90, tz: 1010, rotZ: 18, delay: 700 },
  { id: 'M-7', yaw: 270, pitch: 0, tx: -90, ty: 80, tz: 1090, rotZ: -8, delay: 180 },
  { id: 'M-8', yaw: 315, pitch: 0, tx: -270, ty: 40, tz: 1000, rotZ: -30, delay: 520 },

  // 6 Burung Bawah
  { id: 'B-1', yaw: 30, pitch: -38, tx: -260, ty: 340, tz: 960, rotZ: -38, delay: 120 },
  { id: 'B-2', yaw: 90, pitch: -38, tx: -100, ty: 420, tz: 1050, rotZ: -15, delay: 480 },
  { id: 'B-3', yaw: 150, pitch: -38, tx: 110, ty: 440, tz: 1070, rotZ: 12, delay: 320 },
  { id: 'B-4', yaw: 210, pitch: -38, tx: 270, ty: 350, tz: 940, rotZ: 35, delay: 680 },
  { id: 'B-5', yaw: 270, pitch: -38, tx: 140, ty: 460, tz: 1020, rotZ: 20, delay: 400 },
  { id: 'B-6', yaw: 330, pitch: -38, tx: -190, ty: 390, tz: 980, rotZ: -24, delay: 100 },
];

function OrigamiDove() {
  return (
    <div
      style={{ transformStyle: 'preserve-3d' }}
      className="relative w-20 h-16 flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] drop-shadow-[0_0_24px_rgba(34,211,238,0.5)]"
    >
      {/* Sayap Kiri */}
      <div
        style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
        className="w-10 h-14 anim-origami-left -mr-[1px]"
      >
        <svg viewBox="0 0 50 60" className="w-full h-full overflow-visible">
          <polygon
            points="50,30 5,0 0,40 50,48"
            fill="rgba(251,191,36,0.28)"
            stroke="#fef08a"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polygon
            points="50,30 0,40 32,58 50,48"
            fill="rgba(34,211,238,0.38)"
            stroke="#67e8f9"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Badan & Kepala */}
      <div className="w-2.5 h-12 z-20 flex flex-col items-center">
        <svg viewBox="0 0 16 70" className="w-full h-full overflow-visible">
          <polygon points="8,0 14,14 8,20 2,14" fill="#fffbeb" stroke="#fde047" strokeWidth="1.2" />
          <polygon points="8,20 14,46 8,68 2,46" fill="#fef08a" stroke="#f59e0b" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Sayap Kanan */}
      <div
        style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
        className="w-10 h-14 anim-origami-right -ml-[1px]"
      >
        <svg viewBox="0 0 50 60" className="w-full h-full overflow-visible">
          <polygon
            points="0,30 45,0 50,40 0,48"
            fill="rgba(251,191,36,0.38)"
            stroke="#fef08a"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polygon
            points="0,30 50,40 18,58 0,48"
            fill="rgba(34,211,238,0.28)"
            stroke="#67e8f9"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

interface Globe3DProps {
  isFlocking: boolean;
}

export default function Globe3D({ isFlocking }: Globe3DProps) {
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(-12);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;
    const spinLoop = () => {
      if (!isDragging.current && !isFlocking) {
        setRotY((prev) => (prev + 0.35) % 360);
      }
      animId = requestAnimationFrame(spinLoop);
    };
    animId = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(animId);
  }, [isFlocking]);

  const handleGlobePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isFlocking) return;
    isDragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handleGlobePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || isFlocking) return;
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
    } catch {}
  };

  return (
    <div
      style={{ perspective: '1100px' }}
      className="relative w-full flex flex-col items-center justify-center my-auto py-2 z-30 touch-none overflow-visible"
    >
      <style jsx global>{`
        @keyframes slowOrigamiFlapLeft {
          0% { transform: rotateY(-8deg) rotateZ(-2deg); }
          50% { transform: rotateY(-66deg) rotateZ(7deg); }
          100% { transform: rotateY(-8deg) rotateZ(-2deg); }
        }
        @keyframes slowOrigamiFlapRight {
          0% { transform: rotateY(8deg) rotateZ(2deg); }
          50% { transform: rotateY(66deg) rotateZ(-7deg); }
          100% { transform: rotateY(8deg) rotateZ(2deg); }
        }
        .anim-origami-left {
          animation: slowOrigamiFlapLeft 0.85s cubic-bezier(0.42, 0.05, 0.58, 0.95) infinite alternate;
        }
        .anim-origami-right {
          animation: slowOrigamiFlapRight 0.85s cubic-bezier(0.42, 0.05, 0.58, 0.95) infinite alternate;
        }
      `}</style>

      {/* Proyektor Bawah */}
      <div
        style={{
          transform: 'translateY(155px) rotateX(78deg)',
          transformStyle: 'preserve-3d',
        }}
        className={`absolute w-72 h-72 flex items-center justify-center pointer-events-none transition-all duration-1000 ${
          isFlocking ? 'opacity-0 scale-75 blur-md' : 'opacity-100 scale-100 blur-0'
        }`}
      >
        <div className="w-full h-full rounded-full border border-amber-400/25 border-dashed animate-spin [animation-duration:24s]" />
        <div className="absolute w-56 h-56 rounded-full border border-cyan-300/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
        <div className="absolute w-24 h-24 rounded-full bg-amber-300/15 blur-lg" />
      </div>

      {/* Kontainer Bola 3D */}
      <div
        onPointerDown={handleGlobePointerDown}
        onPointerMove={handleGlobePointerMove}
        onPointerUp={handleGlobePointerUp}
        onPointerCancel={handleGlobePointerUp}
        className="relative w-72 h-72 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none overflow-visible"
        style={{
          transform: isFlocking ? 'rotateX(0deg) rotateY(0deg)' : `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isFlocking ? 'transform 1.8s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none',
        }}
      >
        {/* Cincin Giroskop */}
        <div className={`transition-opacity duration-1000 ${isFlocking ? 'opacity-0' : 'opacity-100'}`}>
          <div
            style={{ transform: 'rotateX(90deg)', transformStyle: 'preserve-3d' }}
            className="absolute w-64 h-64 -translate-x-32 -translate-y-32 rounded-full border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] pointer-events-none"
          />
          <div
            style={{ transform: 'rotateY(0deg)', transformStyle: 'preserve-3d' }}
            className="absolute w-64 h-64 -translate-x-32 -translate-y-32 rounded-full border border-dashed border-cyan-300/35 pointer-events-none"
          />
          <div
            style={{ transform: 'rotateY(90deg)', transformStyle: 'preserve-3d' }}
            className="absolute w-64 h-64 -translate-x-32 -translate-y-32 rounded-full border border-amber-300/30 pointer-events-none"
          />
        </div>

        {/* Inti Monogram */}
        <div
          style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
          className={`absolute w-15 h-15 rounded-full border border-amber-300/80 bg-[#06111f]/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all duration-1000 ${
            isFlocking ? 'scale-0 opacity-0 blur-lg' : 'scale-100 opacity-100 blur-0'
          }`}
        >
          <span className="text-amber-200 font-serif text-xs font-semibold tracking-wider">
            S&amp;W
          </span>
          <span className="text-[7px] text-cyan-300/90 font-mono tracking-wider mt-0.5">
            20.09.26
          </span>
        </div>

        {/* 20 Petak Foto yang Terbang Lambat Menjadi Burung Origami */}
        {BIRD_TRAJECTORIES.map((tile) => {
          const baseSphereTransform = `rotateY(${tile.yaw}deg) rotateX(${tile.pitch}deg) translateZ(128px)`;
          const birdFlightTransform = `translate3d(${tile.tx}px, ${tile.ty}px, ${tile.tz}px) rotateZ(${tile.rotZ}deg) scale(2.4)`;

          return (
            <div
              key={tile.id}
              style={{
                transform: isFlocking ? birdFlightTransform : baseSphereTransform,
                transformStyle: 'preserve-3d',
                transition: isFlocking
                  ? `transform 5.2s cubic-bezier(0.12, 0.85, 0.25, 1) ${tile.delay}ms, opacity 3.8s ease-in ${tile.delay + 1400}ms`
                  : 'none',
                opacity: isFlocking ? 0 : 1,
              }}
              className="absolute w-14 h-18 pointer-events-none overflow-visible flex items-center justify-center"
            >
              {/* Foto Pasangan */}
              <div
                className={`absolute inset-0 w-full h-full rounded-lg border border-amber-300/75 bg-[#06111e]/90 p-[2px] transition-all duration-700 overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.3)] ${
                  isFlocking ? 'opacity-0 scale-75 blur-xs' : 'opacity-100 scale-100 blur-0'
                }`}
              >
                <div className="w-full h-full rounded-[5px] overflow-hidden relative border border-cyan-400/20 bg-black/40">
                  <img
                    src="/images/couple-3d.png"
                    alt="Couple"
                    className="w-full h-full object-cover object-top filter brightness-110 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-amber-300/15" />
                </div>
              </div>

              {/* Origami Dove */}
              <div
                className={`transition-all duration-700 ${
                  isFlocking ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
                }`}
              >
                <OrigamiDove />
              </div>
            </div>
          );
        })}
      </div>

      {/* Petunjuk Sentuh */}
      <div
        className={`flex items-center space-x-1.5 mt-5 opacity-70 pointer-events-none transition-opacity duration-700 ${
          isFlocking ? 'opacity-0' : 'opacity-70'
        }`}
      >
        <span className="text-[10px] text-amber-300">‹</span>
        <span className="text-[9px] tracking-[0.2em] text-amber-200/90 uppercase font-sans">
          Putar Galeri 360°
        </span>
        <span className="text-[10px] text-amber-300">›</span>
      </div>
    </div>
  );
}