import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * InteractiveBackgroundCanvas — Material 3 Expressive & Material You Edition
 *
 * Implements Google's Material 3 Expressive design language:
 * 1. M3 Expressive Shape Morphing:
 *    - Physics-based continuous shape interpolation between signature M3 shapes:
 *      * Shape 0: M3 4-Leaf Clover / Scalloped Squircle (Android 14/15 Widget)
 *      * Shape 1: M3 Continuous G2 Squircle (Italian 9mm Modular Link)
 *      * Shape 2: M3 8-Petal Sunny Starburst (Material You Expressive Flower)
 *      * Shape 3: M3 Soft Stadium Pill
 * 2. Expressive Spring Physics:
 *    - Damped harmonic oscillator tracking scroll velocity and cursor momentum.
 * 3. Dynamic Line Drawing:
 *    - Organic contour curves with variable pen pressure and rounded M3 caps.
 * 4. High-Contrast Halftone Matrix:
 *    - Breathing tactile dot grid with scroll-linked optical interference ripples.
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

    // Mouse and spring kinematics
    const mouse = { x: width * 0.72, y: height * 0.38 };
    const springMouse = { x: width * 0.72, y: height * 0.38, vx: 0, vy: 0 };

    // Scroll spring tracking
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let scrollVelocity = 0;
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    let time = 0;
    const dotSpacing = 32;

    // Helper: Material 3 Expressive parametric shape radius calculator
    // Evaluates polar radius r(angle) smoothly transitioning across M3 shape keys
    const getM3ExpressiveRadius = (angle: number, phase: number, baseRadius: number) => {
      // Shape 0: M3 4-Leaf Clover / Scallop (Android Widget): r = R * (1 + 0.28 * cos(4 * theta))
      const shapeClover = 1 + 0.26 * Math.cos(4 * angle);

      // Shape 1: M3 G2 Continuous Squircle: r = R * (1 + 0.14 * cos(4 * theta + PI))
      const shapeSquircle = 1 + 0.12 * Math.cos(4 * angle + Math.PI);

      // Shape 2: M3 Sunny Starburst / Flower: r = R * (1 + 0.22 * cos(8 * angle))
      const shapeSunny = 1 + 0.22 * Math.cos(8 * angle);

      // Shape 3: M3 Stadium Pill (elliptical elongation):
      const shapePill = 1 + 0.20 * Math.cos(2 * angle);

      // Interpolate along continuous scroll timeline (4 stages)
      const clampedPhase = Math.max(0, Math.min(3, phase * 3));
      const stage = Math.floor(clampedPhase);
      const frac = clampedPhase - stage;
      // Smooth M3 expressive easing curve: cubic-bezier(0.2, 0, 0, 1) approximation
      const easeFrac = frac * frac * (3 - 2 * frac);

      let factor = shapeClover;
      if (stage === 0) {
        factor = shapeClover * (1 - easeFrac) + shapeSquircle * easeFrac;
      } else if (stage === 1) {
        factor = shapeSquircle * (1 - easeFrac) + shapeSunny * easeFrac;
      } else {
        factor = shapeSunny * (1 - easeFrac) + shapePill * easeFrac;
      }

      return baseRadius * factor;
    };

    const render = () => {
      time += 0.016;

      // 1. M3 Expressive Spring physics for mouse (mass: 1, stiffness: 120, damping: 14)
      const mouseStiffness = 0.08;
      const mouseDamping = 0.72;
      const fX = (mouse.x - springMouse.x) * mouseStiffness;
      const fY = (mouse.y - springMouse.y) * mouseStiffness;
      springMouse.vx = (springMouse.vx + fX) * mouseDamping;
      springMouse.vy = (springMouse.vy + fY) * mouseDamping;
      springMouse.x += springMouse.vx;
      springMouse.y += springMouse.vy;

      // 2. Track smooth scroll progress & velocity
      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;

      const docHeight = typeof document !== 'undefined'
        ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        : 1;
      targetScrollProgress = Math.min(1, Math.max(0, currentScrollY / docHeight));
      // Smooth spring lerp for scroll
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      const scrollOffset = currentScrollY * 0.0016;

      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // LAYER 1: MATERIAL 3 EXPRESSIVE HALFTONE DOT MATRIX
      // -----------------------------------------------------------------------
      ctx.save();
      ctx.fillStyle = '#334155'; // Material 3 On-Surface dark slate

      const dotOffsetY = (currentScrollY * 0.24) % dotSpacing;

      for (let y = -dotSpacing + dotOffsetY; y < height + dotSpacing; y += dotSpacing) {
        const rowIdx = Math.floor((y - dotOffsetY) / dotSpacing);
        const isOddRow = Math.abs(rowIdx) % 2 === 1;
        const rowOffset = isOddRow ? dotSpacing * 0.5 : 0;

        for (let x = rowOffset; x < width + dotSpacing; x += dotSpacing) {
          const dx = x - springMouse.x;
          const dy = y - springMouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Undulating breathing wave matching M3 organic rhythm
          const wave = Math.sin(x * 0.0075 + y * 0.0075 + scrollOffset * 3.5 + time * 1.1);
          let radius = 1.3 + wave * 0.45;
          let alpha = 0.15 + (wave + 1) * 0.045;

          // Interactive magnetic spring flare near cursor
          if (dist < 190) {
            const proximity = 1 - dist / 190;
            radius += proximity * 2.4;
            alpha += proximity * 0.34;
          }

          ctx.globalAlpha = Math.min(0.48, Math.max(0.08, alpha));
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.6, radius), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // LAYER 2: MATERIAL YOU ORGANIC LINE-DRAWING (DYNAMIC CONTOUR DRAFTING)
      // -----------------------------------------------------------------------
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Path A: Primary Viscoelastic Contour Spline
      ctx.beginPath();
      const waveAmp = 42 + Math.sin(scrollOffset * 2.8 + time * 0.6) * 22;
      const baseY = height * 0.48 + Math.cos(scrollOffset * 1.4) * 35;

      ctx.moveTo(-50, baseY);
      for (let x = -50; x <= width + 50; x += 32) {
        let y = baseY + Math.sin(x * 0.0024 + scrollOffset * 2.4 + time * 0.8) * waveAmp;
        const dx = x - springMouse.x;
        const dy = y - springMouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 220) {
          const pull = (1 - d / 220) * 36;
          y += dy > 0 ? pull : -pull;
        }
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.24;
      ctx.stroke();

      // Path B: M3 Line Drawing that actively draws & stretches with scroll depth
      const lineProgressX = width * Math.min(1, currentScrollProgress * 1.15);
      const dynamicY = height * 0.78 + Math.sin(time * 0.9) * 14;

      ctx.beginPath();
      ctx.moveTo(0, dynamicY);
      // Soft wave leading towards current scroll position
      for (let x = 0; x <= lineProgressX; x += 28) {
        const ny = dynamicY + Math.sin(x * 0.006 + time * 1.5) * 6;
        ctx.lineTo(x, ny);
      }
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.28;
      ctx.stroke();
      ctx.setLineDash([]);

      // Material 3 Expressive Lead Pulse Orb
      ctx.beginPath();
      ctx.arc(lineProgressX, dynamicY, 4.5 + Math.sin(time * 3) * 1, 0, Math.PI * 2);
      ctx.fillStyle = '#1E293B';
      ctx.globalAlpha = 0.55;
      ctx.fill();

      // Soft secondary echo ring
      ctx.beginPath();
      ctx.arc(lineProgressX, dynamicY, 10 + Math.sin(time * 3) * 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.25;
      ctx.stroke();

      // Path C: Subtle vertical architectural alignment guide
      const axisX = width * 0.15 + Math.sin(scrollOffset * 0.8) * 15;
      ctx.beginPath();
      ctx.moveTo(axisX, 0);
      ctx.lineTo(axisX, height);
      ctx.setLineDash([4, 10]);
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.18;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // -----------------------------------------------------------------------
      // LAYER 3: MATERIAL 3 EXPRESSIVE MORPHING OBJECT (CLOVER -> SQUIRCLE -> FLOWER -> PILL)
      // -----------------------------------------------------------------------
      ctx.save();
      // Center position with floating spring kinematics and parallax drift
      const objCenterX = width * 0.80 + Math.sin(time * 0.55) * 20;
      const objCenterY = height * 0.36 + (currentScrollY * 0.14) % height;
      const velocitySquash = Math.min(18, Math.abs(scrollVelocity) * 0.4);
      const baseSize = 88 + Math.sin(time * 0.6) * 6 + velocitySquash;

      ctx.translate(objCenterX, objCenterY);
      // Continuous smooth rotation driven by scroll + gentle idle spin
      ctx.rotate(scrollOffset * 1.1 + time * 0.18);

      // Render outer Material 3 Expressive Morphing Shape (64 high-resolution sampled vertices)
      ctx.beginPath();
      const numSteps = 72;
      for (let i = 0; i <= numSteps; i++) {
        const theta = (i / numSteps) * Math.PI * 2;
        const r = getM3ExpressiveRadius(theta, currentScrollProgress, baseSize);
        const vx = Math.cos(theta) * r;
        const vy = Math.sin(theta) * r * 0.92; // Subtle M3 isometric tilt

        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();

      // M3 Outer Stroke: Clean, crisp, architectural line weight
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.26;
      ctx.stroke();

      // M3 Inner Concentric Morphing Core (Counter-rotating with spring scale)
      ctx.beginPath();
      ctx.rotate(-time * 0.35);
      const innerBaseSize = baseSize * 0.52;
      for (let i = 0; i <= numSteps; i++) {
        const theta = (i / numSteps) * Math.PI * 2;
        const r = getM3ExpressiveRadius(theta, currentScrollProgress, innerBaseSize);
        const vx = Math.cos(theta) * r;
        const vy = Math.sin(theta) * r;

        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.22;
      ctx.stroke();
      ctx.setLineDash([]);

      // Material You Expressive Center Focus Reticle
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#1E293B';
      ctx.globalAlpha = 0.45;
      ctx.fill();

      // Precision crosshairs
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 10);
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.32;
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

export default InteractiveBackgroundCanvas;
