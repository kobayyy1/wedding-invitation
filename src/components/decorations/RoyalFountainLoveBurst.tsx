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
  color: string;
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

    // Palet Elegan: Champagne Gold, Antique Bronze, Royal Sapphire, Porcelain Ice, & Pearl
    const elegantHeartColors = [
      '#DFC384', // Champagne Gold
      '#C5A059', // Rich Antique Gold
      '#E9D39E', // Pale Gold Sparkle
      '#2B587E', // Royal Porcelain Sapphire
      '#4E7C9F', // Classic Ceramic Blue
      '#8DB3CE', // Soft Ice Glaze
      '#FFFFFF', // Opal Pearl White
    ];

    const elegantWaterColors = [
      '#EAF3FA', // Pure Ice Foam
      '#BED8EC', // Frosted Porcelain Blue
      '#DFC384', // Champagne Water Sparkle
      '#FFFFFF', // Crystal Drop
      '#8CB5D3', // Soft Mineral Blue
    ];

    const geyserDroplets: WaterGeyserDroplet[] = [];
    const megaHearts: MegaBurstHeart[] = [];

    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;
    let frameCount = 0;
    let hasExploded = false;
    let animationFrameId: number;

    const drawMegaHeart = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rot: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.globalAlpha = Math.max(0, alpha);
      c.fillStyle = color;
      c.shadowColor = color;
      c.shadowBlur = 12;

      c.beginPath();
      const topCurve = -size * 0.3;
      c.moveTo(0, topCurve);
      c.bezierCurveTo(-size * 0.65, -size * 0.95, -size * 1.05, -size * 0.05, 0, size * 0.95);
      c.bezierCurveTo(size * 1.05, -size * 0.05, size * 0.65, -size * 0.95, 0, topCurve);
      c.fill();

      // Kilap kristal kaca lembut (Opal Glass Glaze)
      c.fillStyle = 'rgba(255, 255, 255, 0.4)';
      c.beginPath();
      c.arc(-size * 0.25, -size * 0.25, size * 0.16, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    const triggerMegaExplosion = (peakX: number, peakY: number) => {
      shockwaveRadius = 20;
      shockwaveAlpha = 0.9;

      const totalHearts = 120;
      for (let i = 0; i < totalHearts; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;

        megaHearts.push({
          x: peakX + (Math.random() - 0.5) * 35,
          y: peakY + (Math.random() - 0.5) * 35,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.85 - 3.5,
          size: Math.random() * 20 + 22,
          alpha: 1,
          decay: Math.random() * 0.004 + 0.003,
          color: elegantHeartColors[Math.floor(Math.random() * elegantHeartColors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.06,
          gravity: Math.random() * 0.04 + 0.07,
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.04 + 0.02,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      // 1. Semburan Geyser Air Kristal
      if (frameCount < 65) {
        for (let i = 0; i < 9; i++) {
          geyserDroplets.push({
            x: width / 2 + (Math.random() - 0.5) * 45,
            y: height + 10,
            vx: (Math.random() - 0.5) * 4.5,
            vy: -(Math.random() * 9 + 21),
            size: Math.random() * 12 + 10,
            alpha: 1,
            color: elegantWaterColors[Math.floor(Math.random() * elegantWaterColors.length)],
          });
        }
      }

      for (let i = geyserDroplets.length - 1; i >= 0; i--) {
        const d = geyserDroplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.42;
        d.alpha -= 0.012;

        if (d.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, d.alpha);
          ctx.fillStyle = d.color;
          ctx.shadowColor = d.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.ellipse(d.x, d.y, d.size * 0.6, d.size * 1.3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          geyserDroplets.splice(i, 1);
        }
      }

      // 2. Ledakan di Ketinggian
      if (frameCount >= 48 && !hasExploded) {
        hasExploded = true;
        triggerMegaExplosion(width / 2, height * 0.28);
      }

      // Cincin Shockwave Emas Champagne Halus
      if (shockwaveAlpha > 0) {
        shockwaveRadius += 10;
        shockwaveAlpha -= 0.022;

        ctx.save();
        ctx.globalAlpha = Math.max(0, shockwaveAlpha);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#DFC384';
        ctx.shadowColor = '#C5A059';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(width / 2, height * 0.28, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render Hati Melayang Berayun
      let activeHearts = 0;
      for (let i = megaHearts.length - 1; i >= 0; i--) {
        const h = megaHearts[i];
        if (h.alpha <= 0) continue;

        activeHearts++;
        h.swayOffset += h.swaySpeed;
        h.x += h.vx + Math.sin(h.swayOffset) * 1.2;
        h.y += h.vy;
        h.vy += h.gravity;
        h.vx *= 0.985;
        h.rotation += h.rotSpeed;
        h.alpha -= h.decay;

        drawMegaHeart(ctx, h.x, h.y, h.size, h.color, h.alpha, h.rotation);
      }

      if (frameCount < 65 || geyserDroplets.length > 0 || activeHearts > 0 || shockwaveAlpha > 0) {
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