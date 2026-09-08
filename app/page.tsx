'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CoverGate from '../src/components/cover/CoverGate';
import WelcomeQuote from '../src/components/sections/WelcomeQuote';
import CoupleProfile from '../src/components/sections/CoupleProfile';
import FloralBackground from '../src/components/decorations/FloralBackground';
import RoyalFountainLoveBurst from '../src/components/decorations/RoyalFountainLoveBurst';

function CanvasCrumpleEngine({ onUncrumpled }: { onUncrumpled: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let hasTriggeredCard = false;

    // Optimasi 1: Kunci DPR maksimal di 1.5 agar enteng di layar HP FHD+
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Optimasi 2: Grid 11x15 (ringan di CPU mid-range, siluet kusut tetap tajam)
    const COLS = 11;
    const ROWS = 15;
    const vertices: {
      flatX: number;
      flatY: number;
      crumpleX: number;
      crumpleY: number;
      crumpleZ: number;
    }[] = [];

    const sheetW = Math.min(width * 0.9, 380);
    const sheetH = Math.min(height * 0.8, 640);
    const baseR = Math.min(width, height) * 0.22;

    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS; i++) {
        const u = i / (COLS - 1);
        const v = j / (ROWS - 1);

        const flatX = (u - 0.5) * sheetW;
        const flatY = (v - 0.5) * sheetH;

        const theta = u * Math.PI * 2;
        const phi = v * Math.PI;

        const hash = Math.sin(i * 19.34 + j * 97.52) * 43758.54;
        const noise = (hash - Math.floor(hash)) * 0.8 + 0.6;

        const r = baseR * noise;
        const crumpleX = r * Math.sin(phi) * Math.cos(theta);
        const crumpleY = r * Math.cos(phi);
        const crumpleZ = r * Math.sin(phi) * Math.sin(theta);

        vertices.push({ flatX, flatY, crumpleX, crumpleY, crumpleZ });
      }
    }

    const triangles: [number, number, number][] = [];
    for (let j = 0; j < ROWS - 1; j++) {
      for (let i = 0; i < COLS - 1; i++) {
        const idx = j * COLS + i;
        triangles.push([idx, idx + 1, idx + COLS]);
        triangles.push([idx + 1, idx + COLS + 1, idx + COLS]);
      }
    }

    // Partikel bara emas disesuaikan ke 28 butir (dari 55)
    const embers = Array.from({ length: 28 }, () => ({
      vx: (Math.random() - 0.5) * 460,
      vy: (Math.random() - 0.5) * 460,
      size: Math.random() * 2.8 + 1.2,
      color: Math.random() > 0.3 ? '#FDE68A' : '#FDA4AF',
    }));

    const DURATION = 2700;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION);

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      let uncrumpleT = 0;
      if (progress > 0.14) {
        const raw = (progress - 0.14) / 0.72;
        uncrumpleT = Math.min(1, raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2);
      }

      if (uncrumpleT > 0.72 && !hasTriggeredCard) {
        hasTriggeredCard = true;
        onUncrumpled();
      }

      const tremor =
        progress < 0.18
          ? {
              x: (Math.random() - 0.5) * 3 * (progress / 0.18),
              y: (Math.random() - 0.5) * 3 * (progress / 0.18),
            }
          : { x: 0, y: 0 };

      // Sinar radial ringan
      if (progress > 0.08 && uncrumpleT < 0.95) {
        const rayAlpha = Math.sin(progress * Math.PI) * 0.45;
        ctx.save();
        ctx.translate(centerX + tremor.x, centerY + tremor.y);
        ctx.rotate(progress * 1.8);
        ctx.globalCompositeOperation = 'screen';

        const rayCount = 8; // 8 berkas sinar (hemat resource)
        for (let r = 0; r < rayCount; r++) {
          const angle = (r / rayCount) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, Math.max(width, height) * 0.85, angle - 0.09, angle + 0.09);
          ctx.closePath();
          ctx.fillStyle = `rgba(245, 158, 11, ${rayAlpha * 0.35})`;
          ctx.fill();
        }
        ctx.restore();
      }

      // Pendar inti gumpalan
      if (uncrumpleT < 0.75) {
        const pulse = Math.sin(progress * 14) * 0.28;
        const coreSize = baseR * (1.1 + pulse);
        const coreGlow = ctx.createRadialGradient(
          centerX + tremor.x,
          centerY + tremor.y,
          0,
          centerX + tremor.x,
          centerY + tremor.y,
          coreSize
        );
        coreGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        coreGlow.addColorStop(0.3, 'rgba(253, 230, 138, 0.75)');
        coreGlow.addColorStop(0.7, 'rgba(245, 158, 11, 0.4)');
        coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(centerX + tremor.x, centerY + tremor.y, coreSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rotasi sudut 3D
      const rotX = (1 - uncrumpleT) * (1.4 + Math.sin(progress * 5.2) * 0.8);
      const rotY = (1 - uncrumpleT) * (3.0 + progress * 8.2);
      const rotZ = (1 - uncrumpleT) * Math.sin(progress * 6.2) * 0.7;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      const fov = 850;
      const cameraZ = 460;

      const transformedVertices = vertices.map((v) => {
        const x3d = v.crumpleX * (1 - uncrumpleT) + v.flatX * uncrumpleT;
        const y3d = v.crumpleY * (1 - uncrumpleT) + v.flatY * uncrumpleT;
        const z3d = v.crumpleZ * (1 - uncrumpleT);

        const x1 = x3d * cosY + z3d * sinY;
        const z1 = -x3d * sinY + z3d * cosY;

        const y2 = y3d * cosX - z1 * sinX;
        const z2 = y3d * sinX + z1 * cosX;

        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;

        const pScale = fov / (fov + z2 + cameraZ);
        return {
          x3d: x3,
          y3d: y3,
          z3d: z2,
          screenX: centerX + tremor.x + x3 * pScale,
          screenY: centerY + tremor.y + y3 * pScale,
        };
      });

      const lightAngle = progress * 4.0;
      const lightPos = {
        x: Math.cos(lightAngle) * 0.7,
        y: -0.75,
        z: Math.sin(lightAngle) * 0.7 + 0.85,
      };
      const lLen = Math.hypot(lightPos.x, lightPos.y, lightPos.z);
      lightPos.x /= lLen;
      lightPos.y /= lLen;
      lightPos.z /= lLen;

      const sortedTriangles = [...triangles].sort((a, b) => {
        const zA =
          (transformedVertices[a[0]].z3d +
            transformedVertices[a[1]].z3d +
            transformedVertices[a[2]].z3d) /
          3;
        const zB =
          (transformedVertices[b[0]].z3d +
            transformedVertices[b[1]].z3d +
            transformedVertices[b[2]].z3d) /
          3;
        return zA - zB;
      });

      const canvasMeshAlpha = uncrumpleT > 0.72 ? Math.max(0, 1 - (uncrumpleT - 0.72) / 0.25) : 1;
      ctx.globalAlpha = canvasMeshAlpha;

      for (const tri of sortedTriangles) {
        const v0 = transformedVertices[tri[0]];
        const v1 = transformedVertices[tri[1]];
        const v2 = transformedVertices[tri[2]];

        const e1x = v1.x3d - v0.x3d;
        const e1y = v1.y3d - v0.y3d;
        const e1z = v1.z3d - v0.z3d;

        const e2x = v2.x3d - v0.x3d;
        const e2y = v2.y3d - v0.y3d;
        const e2z = v2.z3d - v0.z3d;

        let nx = e1y * e2z - e1z * e2y;
        let ny = e1z * e2x - e1x * e2z;
        let nz = e1x * e2y - e1y * e2x;
        const nLen = Math.hypot(nx, ny, nz) || 1;
        nx /= nLen;
        ny /= nLen;
        nz /= nLen;

        if (nz < -0.15 && uncrumpleT < 0.65) continue;

        const diffuse = Math.max(0, nx * lightPos.x + ny * lightPos.y + nz * lightPos.z);

        // Pencahayaan ringkas tanpa kalkulasi Blinn-Phong eksponensial berat
        const baseRVal = Math.floor(12 + diffuse * 32);
        const baseGVal = Math.floor(22 + diffuse * 50);
        const baseBVal = Math.floor(48 + diffuse * 75);

        ctx.beginPath();
        ctx.moveTo(v0.screenX, v0.screenY);
        ctx.lineTo(v1.screenX, v1.screenY);
        ctx.lineTo(v2.screenX, v2.screenY);
        ctx.closePath();

        ctx.fillStyle = `rgb(${baseRVal}, ${baseGVal}, ${baseBVal})`;
        ctx.fill();

        if (uncrumpleT < 0.85) {
          const creaseIntensity = (1 - uncrumpleT) * (diffuse * 0.75 + 0.35);
          ctx.strokeStyle = `rgba(253, 230, 138, ${creaseIntensity * 0.85})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;

      // Partikel ringan (tanpa shadowBlur)
      if (uncrumpleT > 0.22 && uncrumpleT < 0.94) {
        const emberT = (uncrumpleT - 0.22) / 0.72;
        for (const ember of embers) {
          const px = centerX + tremor.x + ember.vx * emberT;
          const py = centerY + tremor.y + ember.vy * emberT;
          const alpha = Math.sin(emberT * Math.PI) * 0.85;

          ctx.beginPath();
          ctx.arc(px, py, ember.size * (1 - emberT * 0.2), 0, Math.PI * 2);
          ctx.fillStyle = ember.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onUncrumpled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCleanPaperCard, setShowCleanPaperCard] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('opened') === 'true') {
      setIsOpen(true);
      window.dispatchEvent(new Event('play-wedding-music'));
      setIsRevealing(false);
      window.history.replaceState({}, '', '/');

      setTimeout(() => {
        const profileEl = document.getElementById('couple-profile');
        if (profileEl) {
          profileEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [isOpen]);

  const handleOpenCover = () => {
    window.dispatchEvent(new Event('play-wedding-music'));
    setIsOpen(true);
    setIsRevealing(true);

    setTimeout(() => {
      setIsRevealing(false);
    }, 5500);
  };

  const handleNavigateToAcara = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      router.push('/acara');
    }, 4900);
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#02050B] select-none relative font-sans antialiased">
      <main className="w-full max-w-md bg-gradient-to-b from-[#0B1528] via-[#070D19] to-[#03060E] relative border-x border-[#F59E0B]/30 shadow-[0_0_80px_rgba(0,0,0,0.95)] min-h-screen overflow-hidden text-gray-200">
        <style>{`
          @keyframes luxuryUnrollScroll {
            0% {
              clip-path: inset(0 0 100% 0);
              opacity: 0.1;
              transform: scale(0.98);
            }
            12% {
              opacity: 1;
            }
            100% {
              clip-path: inset(0 0 0% 0);
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes radiantBeamGlide {
            0% { top: -2%; opacity: 0; }
            8% { opacity: 1; }
            85% { opacity: 1; }
            100% { top: 102%; opacity: 0; }
          }

          @keyframes dramaticShockwaveExplosion {
            0% {
              transform: scale(0.2);
              opacity: 0;
              border-width: 10px;
            }
            15% {
              opacity: 0.9;
              border-width: 6px;
            }
            70% {
              transform: scale(2.6);
              opacity: 0.7;
              border-width: 2px;
            }
            100% {
              transform: scale(3.8);
              opacity: 0;
              border-width: 0px;
            }
          }

          @keyframes dramaticCardMotionSequence {
            0% {
              opacity: 0;
              transform: scale3d(0.82, 0.82, 0.82) rotateX(12deg) translateY(24px);
            }
            14% {
              opacity: 1;
              transform: scale3d(1.03, 1.03, 1.03) rotateX(-2deg) translateY(-6px);
            }
            24% {
              transform: scale3d(0.99, 0.99, 0.99) rotateX(1deg) translateY(2px);
            }
            36% {
              transform: scale3d(1, 1, 1) rotateX(0deg) translateY(0px);
            }
            58% {
              transform: scale3d(1.04, 1.04, 1.04) rotateX(-1.5deg) translateY(-6px);
            }
            76% {
              transform: scale3d(1.06, 1.06, 1.06) rotateX(1deg) translateY(3px);
              opacity: 1;
            }
            88% {
              transform: scale3d(1.5, 1.5, 1.5) rotateX(0deg) translateY(-10px);
              opacity: 0.95;
            }
            100% {
              transform: scale3d(4.5, 4.5, 4.5) rotateX(0deg) translateY(-20px);
              opacity: 0;
            }
          }

          @keyframes intenseCardSheen {
            0%, 22% { transform: translateX(-160%) skewX(-25deg); opacity: 0; }
            45% { opacity: 0.7; }
            70% { transform: translateX(220%) skewX(-25deg); opacity: 0; }
            100% { transform: translateX(220%) skewX(-25deg); opacity: 0; }
          }

          @keyframes dramaticFinalFlash {
            0%, 84% { opacity: 0; }
            93% { opacity: 0.95; }
            100% { opacity: 1; }
          }

          .anim-luxury-unroll {
            animation: luxuryUnrollScroll 3s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
          .anim-radiant-beam {
            animation: radiantBeamGlide 3s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
          .anim-shockwave-ring {
            animation: dramaticShockwaveExplosion 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .anim-dramatic-card {
            animation: dramaticCardMotionSequence 3.2s cubic-bezier(0.2, 1, 0.32, 1) forwards;
            transform-style: preserve-3d;
            will-change: transform, opacity;
          }
          .anim-intense-sheen {
            animation: intenseCardSheen 3.2s ease-in-out forwards;
          }
          .anim-final-bloom {
            animation: dramaticFinalFlash 4.9s ease-in forwards;
          }
        `}</style>

        <CoverGate isOpen={isOpen} onOpen={handleOpenCover} />

        {isOpen && (
          <div className="w-full relative min-h-screen">
            <RoyalFountainLoveBurst isActive={isRevealing} />

            {isRevealing && (
              <div className="absolute inset-x-0 z-40 pointer-events-none anim-radiant-beam flex items-center justify-center -translate-y-1/2">
                <div className="absolute inset-x-0 top-1 h-8 bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none" />
                <div className="w-full h-[2.5px] bg-gradient-to-r from-transparent via-[#FFF4D0] to-transparent shadow-[0_0_24px_#F59E0B,0_0_10px_#FDE68A]" />
                <div className="absolute w-24 h-6 bg-radial from-white via-[#FDE68A]/70 to-transparent blur-[3px]" />
                <div className="absolute w-10 h-10 rounded-full border border-white/80 bg-[#F59E0B]/40 blur-xs" />
                <div className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#FFF]" />
              </div>
            )}

            {/* Optimasi 3: Sembunyikan FloralBackground saat transisi kertas berlangsung */}
            <div className={`w-full pb-20 relative ${isRevealing ? 'anim-luxury-unroll' : ''}`}>
              {!isTransitioning && <FloralBackground isRevealing={isRevealing} />}

              <div className="relative z-10">
                <WelcomeQuote isRevealing={isRevealing} />
                <CoupleProfile isRevealing={isRevealing} />

                <div className="px-5 pt-4 pb-10 flex flex-col items-center text-center">
                  <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent mb-5 opacity-80" />
                  <p className="text-[11px] font-mono tracking-widest text-[#FDE68A]/80 uppercase mb-3 drop-shadow-xs">
                    Lanjutkan Lembar Acara
                  </p>
                  <button
                    type="button"
                    onClick={handleNavigateToAcara}
                    disabled={isTransitioning}
                    className="group relative w-full py-3.5 px-6 rounded-2xl border-2 border-[#F59E0B] bg-gradient-to-r from-[#111C33] via-[#1A2E4E] to-[#111C33] text-white shadow-[0_8px_28px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.45)] active:scale-98 transition-all flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="font-serif text-sm tracking-wider font-bold">
                      {isTransitioning ? 'Membuka Lembaran Acara...' : 'Rangkaian Acara & Tanda Kasih'}
                    </span>
                    <span className="text-base text-[#FDE68A] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {isTransitioning && (
              <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-[#02050B]/95 backdrop-blur-xl overflow-hidden [perspective:1400px]">
                <CanvasCrumpleEngine onUncrumpled={() => setShowCleanPaperCard(true)} />

                {showCleanPaperCard && (
                  <div className="absolute w-72 h-72 rounded-full border-4 border-[#FDE68A] shadow-[0_0_40px_#F59E0B] anim-shockwave-ring pointer-events-none z-45" />
                )}

                {showCleanPaperCard && (
                  <div className="relative z-50 w-[92vw] max-w-sm h-[80vh] max-h-[660px] rounded-[28px] bg-gradient-to-b from-[#111C33] via-[#0B1528] to-[#040810] border-2 border-[#F59E0B] shadow-[0_0_80px_rgba(245,158,11,0.7)] anim-dramatic-card flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                    <div className="absolute inset-2.5 rounded-[22px] border border-[#FDE68A]/45 pointer-events-none z-10" />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent w-3/5 h-full anim-intense-sheen pointer-events-none z-20" />

                    <div className="relative z-30 flex flex-col items-center gap-4">
                      <div className="relative w-18 h-18 rounded-full border-2 border-[#FDE68A] bg-gradient-to-b from-[#B45309] via-[#92400E] to-[#78350F] flex items-center justify-center shadow-[0_0_30px_#F59E0B]">
                        <span className="text-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                          ⚜️
                        </span>
                        <div className="absolute inset-0 rounded-full border border-amber-300 animate-ping opacity-60" />
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono tracking-[0.42em] text-[#FDE68A] uppercase font-extrabold block drop-shadow-xs">
                          Lembaran Bahagia
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-wide drop-shadow-[0_2px_16px_rgba(245,158,11,0.75)]">
                          Rangkaian Acara
                        </h3>
                        <p className="text-[10px] font-mono text-[#FDA4AF] tracking-[0.28em] uppercase font-bold pt-0.5">
                          Silvia &amp; Wahyudi
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-3 pt-2">
                        <span className="w-14 h-[1.5px] bg-gradient-to-r from-transparent via-[#FDE68A] to-[#F59E0B]" />
                        <div className="w-2.5 h-2.5 rotate-45 bg-[#FDE68A] shadow-[0_0_8px_#F59E0B]" />
                        <span className="w-14 h-[1.5px] bg-gradient-to-l from-transparent via-[#FDE68A] to-[#F59E0B]" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="fixed inset-0 bg-[#070D19] anim-final-bloom pointer-events-none z-55" />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}