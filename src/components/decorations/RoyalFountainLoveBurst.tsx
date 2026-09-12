'use client';

import { useEffect, useRef, useState } from 'react';

interface RoyalFountainLoveBurstProps {
  isActive: boolean;
}

interface WaterGeyserDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface MegaBurstHeart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  spriteIndex: number;
  rotation: number;
  rotSpeed: number;
  gravity: number;
  swayOffset: number;
  swaySpeed: number;
}

export default function RoyalFountainLoveBurst({ isActive }: RoyalFountainLoveBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isActive) {
      setHasStarted(true);
    }
  }, [isActive]);

  useEffect(() => {
    if (!hasStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Palet Warna Mewah
    const elegantHeartColors = [
      '#FDE68A', // Pale Gold
      '#F59E0B', // 24K Gold
      '#D97706', // Amber
      '#FDA4AF', // Rose Petal
      '#FB7185', // Coral Rose
      '#E11D48', // Imperial Ruby
      '#FFFFFF', // Diamond White
    ];

    const elegantWaterColors = [
      '#FEF08A',
      '#FDE68A',
      '#FDA4AF',
      '#F59E0B',
      '#FFFFFF',
    ];

    // OPTIMASI 1: Pre-render Sprite Hati di Offscreen Canvas (Shadow di-cache sekali)
    const heartSprites: HTMLCanvasElement[] = elegantHeartColors.map((color) => {
      const offCanvas = document.createElement('canvas');
      const s = 64; // Resolusi sprite
      offCanvas.width = s;
      offCanvas.height = s;
      const oCtx = offCanvas.getContext('2d');
      if (!oCtx) return offCanvas;

      oCtx.translate(s / 2, s / 2);
      
      // Glow dipanggang sekali saja di sini (tidak membebani loop)
      oCtx.shadowColor = color;
      oCtx.shadowBlur = 8;
      oCtx.fillStyle = color;

      oCtx.beginPath();
      const sz = 16;
      const topCurve = -sz * 0.3;
      oCtx.moveTo(0, topCurve);
      oCtx.bezierCurveTo(-sz * 0.65, -sz * 0.95, -sz * 1.05, -sz * 0.05, 0, sz * 0.95);
      oCtx.bezierCurveTo(sz * 1.05, -sz * 0.05, sz * 0.65, -sz * 0.95, 0, topCurve);
      oCtx.fill();

      // Kilap kristal putih
      oCtx.shadowBlur = 0;
      oCtx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      oCtx.beginPath();
      oCtx.arc(-sz * 0.25, -sz * 0.25, sz * 0.18, 0, Math.PI * 2);
      oCtx.fill();

      return offCanvas;
    });

    const geyserDroplets: WaterGeyserDroplet[] = [];
    const megaHearts: MegaBurstHeart[] = [];

    let shockwaveRadius = 20;
    let shockwaveAlpha = 0;
    let frameCount = 0;
    let hasExploded = false;
    let animationFrameId: number;

    const triggerMegaExplosion = (peakX: number, peakY: number) => {
      shockwaveRadius = 20;
      shockwaveAlpha = 0.9;

      // Jumlah hati diatur 75 (sangat ramai tapi super ringan)
      const totalHearts = 75;
      for (let i = 0; i < totalHearts; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 11 + 3.5;

        megaHearts.push({
          x: peakX + (Math.random() - 0.5) * 30,
          y: peakY + (Math.random() - 0.5) * 30,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.85 - 3,
          size: Math.random() * 14 + 18,
          alpha: 1,
          decay: Math.random() * 0.005 + 0.004,
          spriteIndex: Math.floor(Math.random() * heartSprites.length),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05,
          gravity: Math.random() * 0.03 + 0.06,
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.04 + 0.02,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      // 1. Semburan Geyser Air (Dibatasi 3 partikel per frame agar ringan)
      if (frameCount < 55) {
        for (let i = 0; i < 3; i++) {
          geyserDroplets.push({
            x: width / 2 + (Math.random() - 0.5) * 35,
            y: height + 10,
            vx: (Math.random() - 0.5) * 3.5,
            vy: -(Math.random() * 8 + 20),
            size: Math.random() * 8 + 8,
            alpha: 1,
            color: elegantWaterColors[Math.floor(Math.random() * elegantWaterColors.length)],
          });
        }
      }

      // Render Geyser (Tanpa shadowBlur dinamis)
      for (let i = geyserDroplets.length - 1; i >= 0; i--) {
        const d = geyserDroplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.45;
        d.alpha -= 0.016;

        if (d.alpha > 0) {
          ctx.globalAlpha = d.alpha;
          ctx.fillStyle = d.color;
          ctx.beginPath();
          ctx.ellipse(d.x, d.y, d.size * 0.5, d.size * 1.1, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          geyserDroplets.splice(i, 1);
        }
      }

      // Ledakan Hati di puncak
      if (frameCount >= 42 && !hasExploded) {
        hasExploded = true;
        triggerMegaExplosion(width / 2, height * 0.28);
      }

      // Cincin Shockwave
      if (shockwaveAlpha > 0) {
        shockwaveRadius += 9;
        shockwaveAlpha -= 0.025;

        ctx.globalAlpha = Math.max(0, shockwaveAlpha);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FDE68A';
        ctx.beginPath();
        ctx.arc(width / 2, height * 0.28, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // OPTIMASI 2: Render Hati Cepat menggunakan drawImage (Zero Bezier Calculation)
      let activeHearts = 0;
      for (let i = megaHearts.length - 1; i >= 0; i--) {
        const h = megaHearts[i];
        if (h.alpha <= 0) continue;

        activeHearts++;
        h.swayOffset += h.swaySpeed;
        h.x += h.vx + Math.sin(h.swayOffset) * 1.1;
        h.y += h.vy;
        h.vy += h.gravity;
        h.vx *= 0.985;
        h.rotation += h.rotSpeed;
        h.alpha -= h.decay;

        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rotation);
        ctx.globalAlpha = Math.max(0, h.alpha);
        
        // Menempelkan sprite yang sudah jadi
        const sprite = heartSprites[h.spriteIndex];
        ctx.drawImage(sprite, -h.size, -h.size, h.size * 2, h.size * 2);
        ctx.restore();
      }

      ctx.globalAlpha = 1;

      if (frameCount < 55 || geyserDroplets.length > 0 || activeHearts > 0 || shockwaveAlpha > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        setHasStarted(false);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasStarted]);

  if (!hasStarted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50 select-none"
    />
  );
}