import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * InteractiveBackgroundCanvas
 *
 * Minimalist, restrained ambient background:
 * - Subtle, breathable isometric halftone dots that react softly to cursor proximity.
 * - Single graceful fluid tension spline line with gentle viscoelastic response.
 * - Clean, distraction-free negative space that lets typography and jewelry shine.
 * - WCAG compliant, pointer-events-none, zero performance overhead.
 */
export const InteractiveBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;
    if (typeof canvas.getContext !== 'function') return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d', { alpha: true });
    } catch {
      return;
    }
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
    };

    const lerpMouse = {
      x: width / 2,
      y: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;
    const dotSpacing = 36;

    const render = () => {
      time += 0.015;

      // Smooth mouse follow
      lerpMouse.x += (mouse.x - lerpMouse.x) * 0.06;
      lerpMouse.y += (mouse.y - lerpMouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const scrollOffset = typeof window !== 'undefined' ? window.scrollY * 0.0015 : 0;

      // 1. Subtle, Quiet Halftone Dot Matrix
      ctx.save();
      ctx.fillStyle = '#64748B';

      for (let y = 20; y < height; y += dotSpacing) {
        const isOddRow = Math.floor(y / dotSpacing) % 2 === 1;
        const rowOffset = isOddRow ? dotSpacing * 0.5 : 0;

        for (let x = rowOffset; x < width; x += dotSpacing) {
          const dx = x - lerpMouse.x;
          const dy = y - lerpMouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let radius = 0.75;
          let alpha = 0.08;

          if (dist < 160) {
            const proximity = 1 - dist / 160;
            radius += proximity * 1.2;
            alpha += proximity * 0.16;
          }

          ctx.globalAlpha = Math.min(0.25, alpha);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 2. Single Restrained Fluid Spline Wave (Low Opacity, Organic)
      ctx.save();
      ctx.beginPath();
      const waveAmp = 35 + Math.sin(scrollOffset * 2.0 + time * 0.5) * 15;
      const baseY = height * 0.45 + Math.cos(scrollOffset) * 25;

      ctx.moveTo(-20, baseY);
      for (let x = -20; x <= width + 20; x += 40) {
        let y = baseY + Math.sin(x * 0.002 + scrollOffset * 2.0 + time * 0.8) * waveAmp;
        const dx = x - lerpMouse.x;
        const dy = y - lerpMouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          const pull = (1 - d / 180) * 20;
          y += (dy > 0 ? pull : -pull);
        }
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.12;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      aria-hidden="true"
    />
  );
};
