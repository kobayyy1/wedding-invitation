'use client';

import { useEffect, useRef } from 'react';

interface FloralBackgroundProps {
  isRevealing?: boolean;
}

interface FloatingAmbientHeart {
  x: number;
  y: number;
  baseX: number;
  size: number;
  speed: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  color: string;
  layer: 'bokeh' | 'mid' | 'foreground';
}

export default function FloralBackground({ isRevealing = false }: FloralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Palet Partikel Latar: Emas Murni, Champagne, Ruby, & Bintang Putih
    const luxuryPalette = [
      '#FDE68A', // Pale Gold
      '#F59E0B', // Warm 24K Gold
      '#D97706', // Antique Gold
      '#FDA4AF', // Rose Petal
      '#FB7185', // Soft Ruby
      '#E11D48', // Deep Ruby Spark
      '#FFFFFF', // Opal Star
    ];

    const drawHeart = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rotation: number,
      layer: 'bokeh' | 'mid' | 'foreground'
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = alpha;
      c.fillStyle = color;

      if (layer === 'foreground') {
        c.shadowColor = color;
        c.shadowBlur = 12;
      } else if (layer === 'mid') {
        c.shadowColor = color;
        c.shadowBlur = 6;
      }

      c.beginPath();
      const topCurve = -size * 0.3;
      c.moveTo(0, topCurve);
      c.bezierCurveTo(-size * 0.65, -size * 0.95, -size * 1.05, -size * 0.05, 0, size * 0.95);
      c.bezierCurveTo(size * 1.05, -size * 0.05, size * 0.65, -size * 0.95, 0, topCurve);
      c.fill();

      if (layer === 'foreground') {
        c.fillStyle = 'rgba(255, 255, 255, 0.5)';
        c.beginPath();
        c.arc(-size * 0.22, -size * 0.22, size * 0.16, 0, Math.PI * 2);
        c.fill();
      }

      c.restore();
    };

    const TOTAL_HEARTS = 55;
    const hearts: FloatingAmbientHeart[] = [];

    for (let i = 0; i < TOTAL_HEARTS; i++) {
      const rand = Math.random();
      let layer: 'bokeh' | 'mid' | 'foreground' = 'mid';
      let size = Math.random() * 8 + 12;
      let alpha = Math.random() * 0.3 + 0.4;
      let speed = Math.random() * 0.5 + 0.45;

      if (rand < 0.35) {
        layer = 'bokeh';
        size = Math.random() * 5 + 7;
        alpha = Math.random() * 0.18 + 0.22;
        speed = Math.random() * 0.35 + 0.3;
      } else if (rand > 0.8) {
        layer = 'foreground';
        size = Math.random() * 10 + 20;
        alpha = Math.random() * 0.25 + 0.65;
        speed = Math.random() * 0.6 + 0.75;
      }

      const initialX = Math.random() * (width || 420);
      hearts.push({
        x: initialX,
        baseX: initialX,
        y: Math.random() * (height || 800),
        size,
        speed,
        swayAmplitude: Math.random() * 20 + 10,
        swaySpeed: Math.random() * 0.02 + 0.012,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: (Math.random() - 0.5) * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        alpha,
        color: luxuryPalette[Math.floor(Math.random() * luxuryPalette.length)],
        layer,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      hearts.forEach((h) => {
        h.swayOffset += h.swaySpeed;
        h.x = h.baseX + Math.sin(h.swayOffset) * h.swayAmplitude;
        h.y -= h.speed;
        h.rotation += h.rotSpeed;

        if (h.y < -h.size * 2) {
          h.y = height + h.size * 2;
          h.baseX = Math.random() * width;
          h.x = h.baseX;
          h.swayOffset = Math.random() * Math.PI * 2;
        }

        drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha, h.rotation, h.layer);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <style>{`
        @keyframes floralGentleSway {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(1.8deg) scale(1.02); }
        }
        @keyframes floralGentleSwayRev {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-1.8deg) scale(1.02); }
        }

        .anim-sway-tr {
          animation: floralGentleSway 8s ease-in-out infinite;
          transform-origin: top right;
        }
        .anim-sway-bl {
          animation: floralGentleSwayRev 9s ease-in-out infinite;
          transform-origin: bottom left;
        }
      `}</style>

      {/* GRADIENT DEFINITIONS */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="richGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="sapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A5F" />
            <stop offset="50%" stopColor="#11223B" />
            <stop offset="100%" stopColor="#08101E" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. TEKSTUR DAMASK EMAS BERPENDAR HALUS */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="royalDamask" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M30 5 C20 15 15 25 15 35 C15 45 25 55 30 55 C35 55 45 45 45 35 C45 25 40 15 30 5 Z M30 18 C35 24 37 30 35 36 C33 42 27 42 25 36 C23 30 25 24 30 18 Z"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1"
              />
              <circle cx="30" cy="30" r="3" fill="#FDE68A" />
              <path d="M0 30 Q15 25 30 30 Q45 35 60 30" fill="none" stroke="#F59E0B" strokeWidth="0.6" strokeDasharray="2 2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#royalDamask)" />
        </svg>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 3. BUKET BUNGA KATEDRAL KANAN ATAS (EMAS & NAVY GELAP) */}
      <div className="absolute -top-3 -right-3 w-56 h-56 anim-sway-tr opacity-95 pointer-events-none z-20">
        <svg viewBox="0 0 240 240" fill="none" className="w-full h-full overflow-visible">
          <path
            d="M 230 10 Q 150 20 110 80 T 50 190"
            stroke="url(#richGoldGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="drop-shadow(0 2px 6px rgba(245,158,11,0.3))"
          />
          <path d="M 180 30 Q 130 65 145 105" stroke="#FDE68A" strokeWidth="1.4" opacity="0.85" />
          <path d="M 125 90 Q 75 115 85 160" stroke="url(#richGoldGrad)" strokeWidth="1.5" opacity="0.9" />

          <g filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))">
            <path d="M 200 15 C 170 8 150 28 168 48 C 190 52 210 35 200 15 Z" fill="#14233D" stroke="#F59E0B" strokeWidth="1.2" />
            <path d="M 175 22 Q 185 32 195 38" stroke="#FDE68A" strokeWidth="1" />
            <path d="M 155 45 C 125 38 110 65 130 85 C 150 85 168 68 155 45 Z" fill="#0E1A30" stroke="#FDE68A" strokeWidth="1.2" />
            <path d="M 115 95 C 85 88 72 118 95 138 C 115 138 130 118 115 95 Z" fill="#14233D" stroke="#F59E0B" strokeWidth="1.2" />
          </g>

          <g transform="translate(135, 65) scale(1.15)" filter="drop-shadow(0 4px 12px rgba(245,158,11,0.35))">
            <circle cx="20" cy="20" r="20" fill="#0B1528" stroke="#F59E0B" strokeWidth="1.2" />
            <path d="M 20 0 C 6 10 6 30 20 40 C 34 30 34 10 20 0 Z" fill="#111E36" stroke="#FDE68A" strokeWidth="1.2" />
            <path d="M 0 20 C 10 6 30 6 40 20 C 30 34 10 34 0 20 Z" fill="#111E36" stroke="#FDE68A" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="10" fill="#08101E" stroke="#F59E0B" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="4.5" fill="#F59E0B" />
          </g>

          <g transform="translate(80, 140) scale(0.85)">
            <circle cx="15" cy="15" r="12" fill="#0B1528" stroke="#F59E0B" strokeWidth="1.2" />
            <circle cx="15" cy="15" r="5" fill="#FDE68A" />
          </g>
        </svg>
      </div>

      {/* 4. BUKET BUNGA KATEDRAL KIRI BAWAH */}
      <div className="absolute -bottom-3 -left-3 w-56 h-56 anim-sway-bl opacity-95 pointer-events-none z-20">
        <svg viewBox="0 0 240 240" fill="none" className="w-full h-full overflow-visible">
          <path
            d="M 10 230 Q 90 220 130 160 T 190 50"
            stroke="url(#richGoldGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="drop-shadow(0 2px 6px rgba(245,158,11,0.3))"
          />
          <path d="M 60 210 Q 110 175 95 135" stroke="#FDE68A" strokeWidth="1.4" opacity="0.85" />

          <g filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))">
            <path d="M 40 225 C 70 232 90 212 72 192 C 50 188 30 205 40 225 Z" fill="#14233D" stroke="#F59E0B" strokeWidth="1.2" />
            <path d="M 85 195 C 115 202 130 175 110 155 C 90 155 72 172 85 195 Z" fill="#0E1A30" stroke="#FDE68A" strokeWidth="1.2" />
          </g>

          <g transform="translate(65, 135) scale(1.15)" filter="drop-shadow(0 4px 12px rgba(245,158,11,0.35))">
            <circle cx="20" cy="20" r="19" fill="#0B1528" stroke="#F59E0B" strokeWidth="1.2" />
            <path d="M 20 1 C 7 11 7 29 20 39 C 33 29 33 11 20 1 Z" fill="#111E36" stroke="#FDE68A" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="9" fill="#08101E" stroke="#F59E0B" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="4" fill="#FDE68A" />
          </g>
        </svg>
      </div>
    </div>
  );
}