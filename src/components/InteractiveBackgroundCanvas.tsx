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
    let smoothDrawProgress = 0;
    let scrollVelocity = 0;
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
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
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    let time = 0;

    // Helper: Material 3 Expressive parametric shape radius calculator
    // Evaluates polar radius r(angle) smoothly transitioning across M3 signature shapes:
    // Shape 0: 4-Leaf Clover / Scallop
    // Shape 1: Rounded Diamond / Rhombus (M3 Shape Overview Principles)
    // Shape 2: Italian 9mm G2 Squircle
    // Shape 3: Sunny 8-Petal Starburst
    // Shape 4: Soft Stadium Pill
    const getM3ExpressiveRadius = (angle: number, phase: number, baseRadius: number, shapeOffset: number = 0) => {
      // Shape 0: M3 4-Leaf Clover / Scallop (Android 14/15 Widget)
      const shapeClover = 1 + 0.26 * Math.cos(4 * angle);

      // Shape 1: M3 Rounded Diamond / Rhombus (Reference: m3.material.io/styles/shape/overview-principles)
      const shapeDiamond = 1 + 0.32 * Math.sin(2 * angle);

      // Shape 2: M3 G2 Continuous Squircle (Modular Italian Link)
      const shapeSquircle = 1 + 0.14 * Math.cos(4 * angle + Math.PI);

      // Shape 3: M3 Sunny 8-Petal Starburst / Flower
      const shapeSunny = 1 + 0.24 * Math.cos(8 * angle);

      // Shape 4: M3 Stadium Pill (elliptical elongation)
      const shapePill = 1 + 0.20 * Math.cos(2 * angle);

      // Interpolate along continuous scroll timeline with shapeOffset across 5 stages
      const effectivePhase = Math.abs((phase * 4 + shapeOffset) % 5);
      const stage = Math.floor(effectivePhase);
      const frac = effectivePhase - stage;
      // Smooth M3 expressive easing curve: cubic-bezier(0.2, 0, 0, 1) approximation
      const easeFrac = frac * frac * (3 - 2 * frac);

      let factor = shapeClover;
      if (stage === 0) {
        factor = shapeClover * (1 - easeFrac) + shapeDiamond * easeFrac;
      } else if (stage === 1) {
        factor = shapeDiamond * (1 - easeFrac) + shapeSquircle * easeFrac;
      } else if (stage === 2) {
        factor = shapeSquircle * (1 - easeFrac) + shapeSunny * easeFrac;
      } else if (stage === 3) {
        factor = shapeSunny * (1 - easeFrac) + shapePill * easeFrac;
      } else {
        factor = shapePill * (1 - easeFrac) + shapeClover * easeFrac;
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

      const isMobile = width < 768;
      const dotSpacing = isMobile ? 48 : 32;
      const dotOffsetY = (currentScrollY * 0.24) % dotSpacing;
      const proximityThreshold = isMobile ? 130 : 190;

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
          let radius = (isMobile ? 0.95 : 1.3) + wave * 0.4;
          let alpha = 0.15 + (wave + 1) * 0.045;

          // Interactive magnetic spring flare near cursor or finger touch
          if (dist < proximityThreshold) {
            const proximity = 1 - dist / proximityThreshold;
            radius += proximity * (isMobile ? 1.8 : 2.4);
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
      // LAYER 2: MATERIAL 3 EXPRESSIVE SOLID SILHOUETTE MORPHING SHAPES
      // Entire area filled with a single solid color (Zero border strokes / No outline)
      // Reference: https://m3.material.io/styles/shape/overview-principles (Image 1)
      // Distributed across multiple anchor points: Top-Left, Center, Mid-Left, Bottom-Right
      // -----------------------------------------------------------------------
      const morphNodes = [
        // Node 0: Top-Left (Atas Kiri) - Solid Blush Silhouette (Starts at 4-Leaf Clover / Diamond)
        {
          x: isMobile ? width * 0.16 : width * 0.12 + Math.sin(time * 0.45) * 14,
          y: isMobile ? height * 0.18 : height * 0.16 + Math.cos(time * 0.45) * 14,
          baseSize: isMobile ? 44 : 72,
          shapeOffset: 0.0,
          rotDir: -1,
          rotSpeed: 0.15,
          color: '#F3D2C1', // Signature warm blush solid fill
          alpha: 0.42,
          hasInnerHole: true,
        },
        // Node 1: Center-Right (Tengah Kanan) - Solid Ink Silhouette (Matches Image 1 directly)
        {
          x: isMobile ? width * 0.84 : width * 0.82 + Math.sin(time * 0.55) * 18,
          y: isMobile ? height * 0.38 : height * 0.35 + (currentScrollY * 0.12) % height,
          baseSize: isMobile ? 54 : 92,
          shapeOffset: 1.0, // Starts at Diamond / Rhombus state
          rotDir: 1,
          rotSpeed: 0.18,
          color: '#1E293B', // Solid ink / dark slate silhouette
          alpha: 0.32,
          hasInnerHole: false,
        },
        // Node 2: Center-Top (Tengah Atas) - Floating Soft M3 Pill / Squircle
        {
          x: isMobile ? width * 0.50 : width * 0.52 + Math.cos(time * 0.35) * 20,
          y: isMobile ? height * 0.10 : height * 0.08 + Math.sin(time * 0.35) * 10,
          baseSize: isMobile ? 36 : 56,
          shapeOffset: 4.0, // Stadium Pill state
          rotDir: -1,
          rotSpeed: 0.12,
          color: '#E2E8F0', // Soft steel tonal fill
          alpha: 0.38,
          hasInnerHole: false,
        },
        // Node 3: Mid-Left (Tengah Bawah Kiri) - Solid Steel-Lavender Silhouette
        {
          x: isMobile ? width * 0.18 : width * 0.20 + Math.cos(time * 0.4) * 16,
          y: isMobile ? height * 0.65 : height * 0.64 + Math.sin(time * 0.4) * 16,
          baseSize: isMobile ? 48 : 76,
          shapeOffset: 2.0, // Italian Squircle state
          rotDir: 1,
          rotSpeed: 0.16,
          color: '#CBD5E1', // Solid steel tonal fill
          alpha: 0.40,
          hasInnerHole: true,
        },
        // Node 4: Bottom-Right (Bawah Kanan) - Solid Warm Sand Silhouette
        {
          x: isMobile ? width * 0.84 : width * 0.80 + Math.sin(time * 0.5) * 12,
          y: isMobile ? height * 0.86 : height * 0.84 + Math.cos(time * 0.5) * 12,
          baseSize: isMobile ? 40 : 64,
          shapeOffset: 3.0, // Sunny Flower / Pill state
          rotDir: -1,
          rotSpeed: 0.22,
          color: '#E8D5CE', // Soft champagne blush
          alpha: 0.44,
          hasInnerHole: false,
        },
      ];

      const velocitySquash = Math.min(16, Math.abs(scrollVelocity) * 0.35);

      morphNodes.forEach((node, nodeIdx) => {
        ctx.save();
        const effectiveSize = node.baseSize + Math.sin(time * 0.7 + nodeIdx) * 4 + velocitySquash * (isMobile ? 0.4 : 0.8);
        ctx.translate(node.x, node.y);
        ctx.rotate((scrollOffset * 1.1 + time * node.rotSpeed) * node.rotDir);

        // 1. Build & Fill Outer Solid Silhouette (Zero Border / Zero Outline)
        ctx.beginPath();
        const numSteps = isMobile ? 48 : 76;
        for (let i = 0; i <= numSteps; i++) {
          const theta = (i / numSteps) * Math.PI * 2;
          const r = getM3ExpressiveRadius(theta, currentScrollProgress, effectiveSize, node.shapeOffset);
          const vx = Math.cos(theta) * r;
          const vy = Math.sin(theta) * r * 0.94; // Subtle isometric perspective

          if (i === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.closePath();

        // Solid Color Fill without any outline stroke
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.fill();

        // 2. Optional Organic Solid Cutout (Negative space core)
        if (node.hasInnerHole) {
          const innerSize = effectiveSize * 0.44;
          ctx.beginPath();
          for (let i = 0; i <= numSteps; i++) {
            const theta = (i / numSteps) * Math.PI * 2;
            const r = getM3ExpressiveRadius(theta, currentScrollProgress, innerSize, node.shapeOffset + 0.5);
            const vx = Math.cos(theta) * r;
            const vy = Math.sin(theta) * r;

            if (i === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
          }
          ctx.closePath();
          // Cutout filled with background paper color to form a solid donut silhouette
          ctx.fillStyle = '#F9F9FB';
          ctx.globalAlpha = 0.95;
          ctx.fill();
        }

        ctx.restore();
      });

      // -----------------------------------------------------------------------
      // LAYER 3: MATERIAL 3 EXPRESSIVE BOLD VERTICAL MORPHING LINE (FORMED BY SCROLL)
      // Aesthetic trajectory with a 360-degree circular loop-the-loop flourish.
      // 1. Line is NOT formed before scroll (0% length when scroll = 0).
      // 2. Morphing duration extended across the scroll journey (maxScrollSpan).
      // 3. No mouse interaction / velocity spikes to guarantee silky smooth jitter-free rendering.
      // 4. Bold M3 Expressive stroke with gradient and smooth leading orb.
      // -----------------------------------------------------------------------
      const maxScrollSpan = Math.max(height * 2.5, docHeight * 0.85);
      const targetDrawProgress = currentScrollY <= 8 ? 0 : Math.min(1.0, currentScrollY / maxScrollSpan);
      smoothDrawProgress += (targetDrawProgress - smoothDrawProgress) * 0.055;

      if (smoothDrawProgress > 0.005) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = isMobile ? 9.5 : 13.5;

        const lineGradient = ctx.createLinearGradient(0, 0, 0, height);
        lineGradient.addColorStop(0, '#C4B5FD'); // Soft lavender
        lineGradient.addColorStop(0.35, '#A5B4FC'); // Periwinkle
        lineGradient.addColorStop(0.7, '#818CF8'); // Vibrant M3 indigo
        lineGradient.addColorStop(1, '#CBD5E1'); // Steel transition

        ctx.strokeStyle = lineGradient;
        ctx.globalAlpha = 0.58;

        // Signature Aesthetic Knots with a complete 360-degree circular loop:
        const LOOP_KNOTS: [number, number][] = [
          [0.48, -0.02], // 0: Guide knot above top
          [0.48, 0.00],  // 1: Top start
          [0.32, 0.10],  // 2: Sweeping left
          [0.24, 0.20],  // 3: Left crest
          [0.36, 0.30],  // 4: Flowing toward center
          // Circular loop-the-loop:
          [0.52, 0.40],  // 5: Loop entrance
          [0.68, 0.40],  // 6: Loop bottom-right
          [0.74, 0.34],  // 7: Loop right apex
          [0.66, 0.26],  // 8: Loop top apex
          [0.52, 0.30],  // 9: Loop top-left
          [0.50, 0.42],  // 10: Loop crossover
          [0.62, 0.54],  // 11: Loop exit downward
          // Lower sweeping S-curve:
          [0.78, 0.70],  // 12: Sweeping right
          [0.70, 0.85],  // 13: Sweeping back down-left
          [0.36, 1.00],  // 14: Bottom exit
          [0.36, 1.02],  // 15: Guide knot below bottom
        ];

        const evalLoopSpline = (u: number): [number, number] => {
          const clampedU = Math.max(0, Math.min(1, u));
          const nSeg = LOOP_KNOTS.length - 3;
          const val = clampedU * nSeg;
          const seg = Math.min(nSeg - 1, Math.floor(val));
          const t = val - seg;
          const t2 = t * t;
          const t3 = t2 * t;

          const p0 = LOOP_KNOTS[seg];
          const p1 = LOOP_KNOTS[seg + 1];
          const p2 = LOOP_KNOTS[seg + 2];
          const p3 = LOOP_KNOTS[seg + 3];

          const nx = 0.5 * (
            (2 * p1[0]) +
            (-p0[0] + p2[0]) * t +
            (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
            (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3
          );

          const ny = 0.5 * (
            (2 * p1[1]) +
            (-p0[1] + p2[1]) * t +
            (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
            (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3
          );

          return [nx * width, ny * height];
        };

        const maxU = smoothDrawProgress;
        const totalSteps = Math.max(20, Math.floor(maxU * 140));
        let lastX = 0;
        let lastY = 0;

        ctx.beginPath();
        for (let i = 0; i <= totalSteps; i++) {
          const u = (i / totalSteps) * maxU;
          const [baseX, baseY] = evalLoopSpline(u);

          // Gentle, elongated low-frequency Material 3 breathing (slow, organic morphing cycle)
          const breathingWave = Math.sin(time * 0.22 + u * 1.8) * (isMobile ? 8 : 15);
          const x = baseX + breathingWave;
          const y = baseY;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          lastX = x;
          lastY = y;
        }
        ctx.stroke();

        // Rounded leading M3 accent orb at the advancing tip
        ctx.beginPath();
        ctx.arc(lastX, lastY, isMobile ? 6 : 8.5, 0, Math.PI * 2);
        ctx.fillStyle = '#8B5CF6';
        ctx.globalAlpha = 0.85;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
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
