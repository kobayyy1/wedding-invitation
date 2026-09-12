'use client';

// Lintasan terbang 20 burung/kupu-kupu origami ke arah kamera
const BIRD_TRAJECTORIES = [
  // 6 Atas
  { id: 'T-1', tx: -240, ty: -440, tz: 980, rotZ: -22, delay: 0 },
  { id: 'T-2', tx: -50, ty: -500, tz: 1040, rotZ: 8, delay: 250 },
  { id: 'T-3', tx: 230, ty: -420, tz: 950, rotZ: 25, delay: 500 },
  { id: 'T-4', tx: 190, ty: -470, tz: 990, rotZ: 16, delay: 350 },
  { id: 'T-5', tx: -70, ty: -520, tz: 1050, rotZ: -10, delay: 150 },
  { id: 'T-6', tx: -250, ty: -410, tz: 930, rotZ: -28, delay: 600 },

  // 8 Tengah
  { id: 'M-1', tx: -360, ty: -90, tz: 980, rotZ: -35, delay: 300 },
  { id: 'M-2', tx: -170, ty: -50, tz: 1080, rotZ: -12, delay: 80 },
  { id: 'M-3', tx: 50, ty: -70, tz: 1120, rotZ: 10, delay: 450 },
  { id: 'M-4', tx: 220, ty: -30, tz: 1050, rotZ: 24, delay: 220 },
  { id: 'M-5', tx: 370, ty: 50, tz: 970, rotZ: 38, delay: 550 },
  { id: 'M-6', tx: 190, ty: 90, tz: 1010, rotZ: 18, delay: 700 },
  { id: 'M-7', tx: -90, ty: 80, tz: 1090, rotZ: -8, delay: 180 },
  { id: 'M-8', tx: -270, ty: 40, tz: 1000, rotZ: -30, delay: 520 },

  // 6 Bawah
  { id: 'B-1', tx: -260, ty: 340, tz: 960, rotZ: -38, delay: 120 },
  { id: 'B-2', tx: -100, ty: 420, tz: 1050, rotZ: -15, delay: 480 },
  { id: 'B-3', tx: 110, ty: 440, tz: 1070, rotZ: 12, delay: 320 },
  { id: 'B-4', tx: 270, ty: 350, tz: 940, rotZ: 35, delay: 680 },
  { id: 'B-5', tx: 140, ty: 460, tz: 1020, rotZ: 20, delay: 400 },
  { id: 'B-6', tx: -190, ty: 390, tz: 980, rotZ: -24, delay: 100 },
];

function OrigamiDove() {
  return (
    <div
      style={{ transformStyle: 'preserve-3d' }}
      className="relative w-16 h-14 flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(251,191,36,0.85)] drop-shadow-[0_0_24px_rgba(34,211,238,0.6)]"
    >
      {/* Sayap Kiri */}
      <div
        style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
        className="w-8 h-12 anim-origami-left -mr-[1px]"
      >
        <svg viewBox="0 0 50 60" className="w-full h-full overflow-visible">
          <polygon
            points="50,30 5,0 0,40 50,48"
            fill="rgba(251,191,36,0.35)"
            stroke="#fef08a"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polygon
            points="50,30 0,40 32,58 50,48"
            fill="rgba(34,211,238,0.45)"
            stroke="#67e8f9"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Tubuh & Kepala */}
      <div className="w-2 h-10 z-20 flex flex-col items-center">
        <svg viewBox="0 0 16 70" className="w-full h-full overflow-visible">
          <polygon points="8,0 14,14 8,20 2,14" fill="#fffbeb" stroke="#fde047" strokeWidth="1.2" />
          <polygon points="8,20 14,46 8,68 2,46" fill="#fef08a" stroke="#f59e0b" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Sayap Kanan */}
      <div
        style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
        className="w-8 h-12 anim-origami-right -ml-[1px]"
      >
        <svg viewBox="0 0 50 60" className="w-full h-full overflow-visible">
          <polygon
            points="0,30 45,0 50,40 0,48"
            fill="rgba(251,191,36,0.45)"
            stroke="#fef08a"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polygon
            points="0,30 50,40 18,58 0,48"
            fill="rgba(34,211,238,0.35)"
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
  if (!isFlocking) return null;

  return (
    <div
      style={{ perspective: '1100px' }}
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 overflow-hidden"
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
        @keyframes cinematicFlightPath {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.2) rotateZ(0deg);
          }
          15% {
            opacity: 1;
            transform: translate3d(calc(var(--tx) * 0.15), calc(var(--ty) * 0.15), calc(var(--tz) * 0.15)) scale(0.9) rotateZ(calc(var(--rotZ) * 0.3));
          }
          75% {
            opacity: 0.95;
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--tx), var(--ty), var(--tz)) scale(2.6) rotateZ(var(--rotZ));
          }
        }
        .anim-origami-left {
          animation: slowOrigamiFlapLeft 0.75s cubic-bezier(0.42, 0.05, 0.58, 0.95) infinite alternate;
        }
        .anim-origami-right {
          animation: slowOrigamiFlapRight 0.75s cubic-bezier(0.42, 0.05, 0.58, 0.95) infinite alternate;
        }
        .anim-dove-burst {
          animation: cinematicFlightPath 4.8s cubic-bezier(0.16, 0.85, 0.28, 1) forwards;
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }
      `}</style>

      {/* 20 Kupu-kupu/Burung Berhamburan dari Titik Pusat */}
      {BIRD_TRAJECTORIES.map((bird) => (
        <div
          key={bird.id}
          style={
            {
              '--tx': `${bird.tx}px`,
              '--ty': `${bird.ty}px`,
              '--tz': `${bird.tz}px`,
              '--rotZ': `${bird.rotZ}deg`,
              animationDelay: `${bird.delay}ms`,
            } as React.CSSProperties
          }
          className="absolute anim-dove-burst flex items-center justify-center"
        >
          <OrigamiDove />
        </div>
      ))}
    </div>
  );
}