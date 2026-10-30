import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

/**
 * GeometricParallaxCanvas
 *
 * Ambient, scroll-driven technical drafting & geometry layer inspired by:
 * - Lusion Studio (interactive geometric lines and fluid rotational parallax)
 * - Autarkeia (precision blueprint coordinates, 9mm link silhouettes, and modular ticks)
 * - Wix Studio Jewelry (seamless borderless transitions with sliding accent elements)
 *
 * Rules:
 * - Animate ONLY transform & opacity (GPU 60fps).
 * - Colors strictly within Steel (#E2E8F0, #CBD5E1, #94A3B8) with controlled low opacity.
 * - Zero blur blobs, zero neon gradients, pointer-events-none.
 */
export const GeometricParallaxCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Track global page scroll progress (0.0 to 1.0)
  const { scrollYProgress } = useScroll();

  // Smooth out progress with spring physics for fluid inertia
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Rotations for concentric drafting rings
  const rotateClockwise = useTransform(smoothScroll, [0, 1], [0, 180]);
  const rotateCounter = useTransform(smoothScroll, [0, 1], [0, -140]);

  // Multi-depth vertical parallax offsets
  const parallaxDeep = useTransform(smoothScroll, [0, 1], [0, -320]);
  const parallaxMid = useTransform(smoothScroll, [0, 1], [60, -180]);
  const parallaxGentle = useTransform(smoothScroll, [0, 1], [-20, 120]);

  // Horizontal sliding offsets for geometric pill accents (Wix / Autarkeia inspiration)
  const slideLeft = useTransform(smoothScroll, [0.1, 0.9], [40, -60]);
  const slideRight = useTransform(smoothScroll, [0.1, 0.9], [-40, 60]);

  // Vertical scroll drafting spine progress (path drawing)
  const spinePath = useTransform(smoothScroll, [0.05, 0.95], [0, 1]);

  if (prefersReduced) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Left Vertical Precision Drafting Spine */}
      <div className="hidden lg:block absolute left-8 top-28 bottom-24 w-8 z-0">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Guide Track line */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="100%"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.7"
          />
          {/* Live Progress Draw Line (Thicker 2.5px) */}
          <motion.line
            x1="12"
            y1="0"
            x2="12"
            y2="100%"
            stroke="#475569"
            strokeWidth="2.5"
            style={{ pathLength: spinePath }}
          />
        </svg>

        {/* Micro-label tick markings */}
        <div className="absolute top-1/4 -left-2 flex items-center gap-1.5 opacity-40">
          <span className="w-2 h-px bg-neutral-400" />
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
            01 · ORIGIN
          </span>
        </div>

        <div className="absolute top-1/2 -left-2 flex items-center gap-1.5 opacity-40">
          <span className="w-2 h-px bg-neutral-400" />
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
            02 · CRAFT
          </span>
        </div>

        <div className="absolute top-3/4 -left-2 flex items-center gap-1.5 opacity-40">
          <span className="w-2 h-px bg-neutral-400" />
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
            03 · MODULAR
          </span>
        </div>
      </div>

      {/* 2. Concentric Drafting Orbital Ring - Top Right (Lusion / Architectural feel) */}
      <motion.div
        style={{
          y: parallaxDeep,
          rotate: rotateClockwise,
        }}
        className="hidden md:block absolute -top-16 -right-24 w-96 h-96 opacity-50"
      >
        <svg viewBox="0 0 384 384" className="w-full h-full">
          <circle
            cx="192"
            cy="192"
            r="160"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2.2"
            strokeDasharray="6 6"
          />
          <circle
            cx="192"
            cy="192"
            r="120"
            fill="none"
            stroke="#64748B"
            strokeWidth="2.5"
          />
          <circle
            cx="192"
            cy="192"
            r="80"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeDasharray="2 4"
          />
          {/* Compass crosshairs */}
          <line x1="192" y1="20" x2="192" y2="364" stroke="#64748B" strokeWidth="1.5" />
          <line x1="20" y1="192" x2="364" y2="192" stroke="#64748B" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* 3. Midground Rotating Mechanical Compass - Left Center */}
      <motion.div
        style={{
          y: parallaxMid,
          rotate: rotateCounter,
        }}
        className="hidden md:block absolute top-[45%] -left-20 w-80 h-80 opacity-40"
      >
        <svg viewBox="0 0 320 320" className="w-full h-full">
          <rect
            x="40"
            y="40"
            width="240"
            height="240"
            rx="32"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray="4 8"
          />
          <circle
            cx="160"
            cy="160"
            r="100"
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
          />
          <circle
            cx="160"
            cy="160"
            r="8"
            fill="none"
            stroke="#475569"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* 4. Sliding Modular Pill Frame - Right Floating (Wix & Autarkeia sliding accent) */}
      <motion.div
        style={{
          y: parallaxGentle,
          x: slideLeft,
        }}
        className="hidden lg:flex items-center gap-2 absolute top-[65%] right-12 opacity-30"
      >
        <div className="w-24 h-10 rounded-full border border-neutral-300 flex items-center justify-between px-3">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          <span className="font-mono text-[9px] text-neutral-500">9mm MODUL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
        </div>
      </motion.div>

      {/* 5. Precision Technical Crosshairs in Background Corners */}
      <div className="hidden sm:block absolute top-40 right-16 opacity-30">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="2" x2="12" y2="22" stroke="#94A3B8" strokeWidth="1" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="#94A3B8" strokeWidth="1" />
        </svg>
      </div>

      <div className="hidden sm:block absolute bottom-48 left-16 opacity-30">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="2" x2="12" y2="22" stroke="#94A3B8" strokeWidth="1" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="#94A3B8" strokeWidth="1" />
        </svg>
      </div>

      {/* 6. Lower Floating Blueprint Ring - Bottom Right */}
      <motion.div
        style={{
          y: parallaxMid,
          x: slideRight,
          rotate: rotateClockwise,
        }}
        className="hidden md:block absolute -bottom-20 right-1/4 w-72 h-72 opacity-20"
      >
        <svg viewBox="0 0 288 288" className="w-full h-full">
          <circle
            cx="144"
            cy="144"
            r="128"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1"
            strokeDasharray="8 8"
          />
          <rect
            x="64"
            y="64"
            width="160"
            height="160"
            rx="20"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
};
