import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { soundEngine } from '../lib/sound';

/**
 * ScrollShowcase Component
 *
 * Lusion & WallpaperEngine-inspired Architecture:
 * - Starts as a calm, blank minimalist paper canvas with a central pulsating reticle
 * - Dynamic Circular Iris Reveal: On scroll detection, a small circular aperture expands (0% -> 140%)
 *   swallowing the canvas into the full 316L engineering video box
 * - Expanding optical aperture ring pulses outward as the circle unlocks
 * - All content transitions (fonts, top bar, corner crosses, drafting lines, play button, bottom bar)
 *   have unique, staggered scroll-linked physical entrances
 * - Interactive 3D tilt reaction on mouse move with specular light sheen reflection
 */
export const ScrollShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Track scroll progress across the 240vh anchored track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Subtle Parallax Counter-Drift for Title & Description
  const titleParallaxY = useTransform(smoothProgress, [0, 1], [22, -22]);
  const descParallaxY = useTransform(smoothProgress, [0, 1], [14, -14]);

  // =========================================================================
  // CIRCULAR APERTURE REVEAL PHYSICS (WallpaperEngine & Lusion style)
  // Blank Canvas -> Focal Reticle Point -> Expanding Circle Iris -> Full Box
  // =========================================================================
  const clipRadius = useTransform(smoothProgress, [0.03, 0.32], [0, 140]);
  const cardClipPath = useMotionTemplate`circle(${clipRadius}% at 50% 50%)`;

  // Scale & offset of the video container
  const cardScale = useTransform(smoothProgress, [0.03, 0.32, 0.78, 1], [0.72, 1, 1, 0.96]);
  const containerOffsetY = useTransform(smoothProgress, [0.03, 0.32, 0.78, 1], [60, 0, 0, -24]);
  const cardOpacity = useTransform(smoothProgress, [0.03, 0.12], [0, 1]);

  // Expanding optical aperture ring that pulses outward with the circle reveal
  const apertureRingRadius = useTransform(smoothProgress, [0.02, 0.30], [20, 560]);
  const apertureRingOpacity = useTransform(smoothProgress, [0.02, 0.08, 0.24, 0.32], [0, 0.75, 0.25, 0]);
  const apertureRingScale = useTransform(smoothProgress, [0.02, 0.30], [0.2, 1.25]);

  // Staggered internal content transitions
  const topBarY = useTransform(smoothProgress, [0.10, 0.26], [-20, 0]);
  const topBarOpacity = useTransform(smoothProgress, [0.10, 0.22], [0, 1]);

  const bottomBarY = useTransform(smoothProgress, [0.15, 0.30], [20, 0]);
  const bottomBarOpacity = useTransform(smoothProgress, [0.15, 0.28], [0, 1]);

  const videoScale = useTransform(smoothProgress, [0.06, 0.30], [0.90, 1]);

  const crossScale = useTransform(smoothProgress, [0.16, 0.32], [0, 1]);
  const crossRotate = useTransform(smoothProgress, [0.16, 0.32], [-270, 0]);

  const guideScaleX = useTransform(smoothProgress, [0.18, 0.36], [0, 1]);

  const watchBtnScale = useTransform(smoothProgress, [0.16, 0.34], [0, 1]);
  const watchBtnOpacity = useTransform(smoothProgress, [0.14, 0.26], [0, 1]);

  // Restrained fluid spline wave morphing subtly with scroll
  const splineAmp = useTransform(smoothProgress, [0, 0.5, 1], [20, 60, 30]);

  // =========================================================================
  // 3D TACTILE MOUSE TILT & POLISHED SPECULAR SHEEN (Physical Alive Feel)
  // =========================================================================
  const mouseTiltX = useSpring(0, { stiffness: 140, damping: 22 });
  const mouseTiltY = useSpring(0, { stiffness: 140, damping: 22 });
  const [sheenCoords, setSheenCoords] = useState({ x: 50, y: 50 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseTiltX.set(nx);
    mouseTiltY.set(ny);
    setSheenCoords({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    mouseTiltX.set(0);
    mouseTiltY.set(0);
  };

  const cardRotateX = useTransform(mouseTiltY, [-0.5, 0.5], [6, -6]);
  const cardRotateY = useTransform(mouseTiltX, [-0.5, 0.5], [-8, 8]);

  // Dynamic phase label with audio tick feedback
  const [phaseText, setPhaseText] = useState('PHASE 01 · 9MM MODULE ALIGNMENT');
  useEffect(() => {
    let lastPhase = 1;
    return smoothProgress.on('change', (v) => {
      let currentPhase = 1;
      if (v < 0.33) {
        currentPhase = 1;
        setPhaseText('PHASE 01 · 9MM MODULE ALIGNMENT');
      } else if (v < 0.66) {
        currentPhase = 2;
        setPhaseText('PHASE 02 · INTERNAL SPRING SNAP');
      } else {
        currentPhase = 3;
        setPhaseText('PHASE 03 · INTERLOCKING MODULAR SYSTEM');
      }
      if (currentPhase !== lastPhase) {
        lastPhase = currentPhase;
        soundEngine.playClick();
      }
    });
  }, [smoothProgress]);

  const toggleVideoPlayback = () => {
    soundEngine.playClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      try {
        const promise = videoRef.current.play();
        if (promise && typeof promise.catch === 'function') {
          promise.catch(() => setIsPlaying(false));
        }
      } catch {
        setIsPlaying(false);
      }
    }
  }, []);

  if (prefersReduced) {
    return (
      <section id="home-reel" className="section relative w-full bg-transparent py-20 px-6">
        <div id="home-reel-container" className="home-reel-container layout-container flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <div id="home-reel-container-inner" className="home-reel-container-inner space-y-2">
            <div id="home-reel-content" className="home-reel-content space-y-2">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                02 · CRAFTSMANSHIP
              </span>
              <h4 id="home-reel-title" className="home-reel-title text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
                <div id="home-reel-title-inner">
                  <div id="home-reel-title-line-1" className="inline-block relative">
                    <span className="word inline-block mr-2">SCROLL</span>
                    <span className="word inline-block">TO</span>
                  </div>{' '}
                  <div id="home-reel-title-line-2" className="inline-block relative">
                    <span className="word accent-serif font-normal italic inline-block">ASSEMBLE.</span>
                  </div>
                </div>
              </h4>
              <p id="home-reel-desc" className="home-reel-desc text-xs text-neutral-600 max-w-sm mx-auto">
                Presisi modular baja 316L. Pasang dan tukar charm tanpa alat.
              </p>
            </div>
          </div>
          <div id="home-reel-video-container" className="home-reel-video-container --is-visible w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-steel shadow-xl">
            <div id="home-reel-video-placeholder" className="home-reel-video-placeholder w-full h-full">
              <video
                src="/videos/gemini_generated_video_71fc4d88.mp4"
                controls
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="home-reel"
      className="section relative w-full h-[240vh] bg-transparent select-none"
    >
      {/* Viewport-Locked Sticky Frame */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden z-20">

        {/* Subtle, Calm Background Ambient Geometry */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
          {/* Ambient Ring */}
          <div className="absolute w-[560px] h-[560px] md:w-[720px] md:h-[720px] rounded-full border border-neutral-300/40 opacity-40 pointer-events-none" />

          {/* Fluid Curved Guide Line */}
          <svg className="absolute inset-0 w-full h-full overflow-visible opacity-30" preserveAspectRatio="none">
            <motion.path
              d="M -40,320 Q 480,240 960,320 T 1960,320"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              fill="none"
              style={{
                translateY: splineAmp,
              }}
            />
          </svg>
        </div>

        {/* Luminous Expanding Aperture Ring (Shockwave matching circle iris boundary on scroll) */}
        <motion.div
          style={{
            width: apertureRingRadius,
            height: apertureRingRadius,
            opacity: apertureRingOpacity,
            scale: apertureRingScale,
            pointerEvents: 'none',
          }}
          className="absolute rounded-full border border-neutral-400/50 shadow-[0_0_36px_rgba(148,163,184,0.25)] z-10"
        />

        {/* Foreground Stage: Editorial Reel Content */}
        <div id="home-reel-container" className="home-reel-container relative z-10 w-full max-w-3xl flex flex-col items-center gap-5">
          <div id="home-reel-container-inner" className="home-reel-container-inner w-full flex flex-col items-center">

            {/* Editorial Headline with Word-Level Reveal */}
            <div id="home-reel-content" className="home-reel-content text-center space-y-2 px-4 max-w-lg">
              <div className="inline-flex items-center gap-2">
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
                  02 · CRAFTSMANSHIP
                </span>
                <span className="w-4 h-px bg-steel" />
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                  ASSEMBLY REEL
                </span>
              </div>

              <motion.h4
                id="home-reel-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="home-reel-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight"
              >
                <motion.div
                  id="home-reel-title-inner"
                  style={{ y: titleParallaxY }}
                  className="inline-flex flex-col items-center overflow-visible"
                >
                  <div id="home-reel-title-line-1" className="inline-block relative overflow-visible px-2 py-0.5">
                    <span className="inline-block overflow-hidden py-0.5">
                      <motion.span
                        variants={{
                          hidden: { y: '100%', opacity: 0 },
                          visible: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                        }}
                        className="word inline-block mr-2.5"
                      >
                        SCROLL
                      </motion.span>
                    </span>
                    <span className="inline-block overflow-hidden py-0.5">
                      <motion.span
                        variants={{
                          hidden: { y: '100%', opacity: 0 },
                          visible: { y: '0%', opacity: 1, transition: { duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] } },
                        }}
                        className="word inline-block"
                      >
                        TO
                      </motion.span>
                    </span>
                  </div>

                  <div id="home-reel-title-line-2" className="inline-block relative overflow-visible px-2 py-1">
                    <span className="inline-block overflow-hidden py-0.5">
                      <motion.span
                        variants={{
                          hidden: { y: '100%', opacity: 0, rotate: 2 },
                          visible: { y: '0%', opacity: 1, rotate: 0, transition: { duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] } },
                        }}
                        className="word accent-serif font-normal italic inline-block"
                      >
                        ASSEMBLE.
                      </motion.span>
                    </span>
                  </div>
                </motion.div>
              </motion.h4>

              <motion.p
                id="home-reel-desc"
                style={{ y: descParallaxY }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="home-reel-desc text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto text-center"
              >
                Presisi modular baja 316L. Pasang dan tukar charm tanpa alat.
              </motion.p>
            </div>
          </div>

          {/* Lusion Video Container with Dynamic Circular Iris Reveal & 3D Tilt */}
          <div style={{ perspective: 1200 }} className="w-full flex justify-center">
            <motion.div
              id="home-reel-video-container"
              style={{
                clipPath: cardClipPath,
                scale: cardScale,
                y: containerOffsetY,
                opacity: cardOpacity,
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => {
                setIsHovered(true);
                soundEngine.playHover();
              }}
              onMouseLeave={handleCardMouseLeave}
              className="home-reel-video-container --is-visible w-full bg-white/95 border border-steel rounded-DEFAULT shadow-2xl p-3 sm:p-4 relative group will-change-transform"
            >
              {/* Specular Steel Light Sheen Gliding with Mouse */}
              <div
                className="absolute inset-0 pointer-events-none rounded-DEFAULT transition-opacity duration-300 z-30"
                style={{
                  opacity: isHovered ? 0.35 : 0,
                  background: `radial-gradient(circle 340px at ${sheenCoords.x}% ${sheenCoords.y}%, rgba(255, 255, 255, 0.85), transparent 70%)`,
                }}
              />

              {/* Top Info Bar - Staggered Slide In */}
              <motion.div
                style={{ y: topBarY, opacity: topBarOpacity }}
                className="w-full flex items-center justify-between text-[11px] font-mono text-neutral-500 pb-2.5 border-b border-steel/80 relative z-20"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-ink">MODULAR 9MM CHASSIS</span>
                </div>
                <span className="text-neutral-500 font-mono text-[10px] uppercase">
                  {phaseText}
                </span>
              </motion.div>

              {/* Technical Drafting Crosses & Reveal Lines */}
              <div id="home-reel-video-container-decoration" className="home-reel-video-container-decoration">
                <div id="home-reel-video-container-top" className={`home-reel-video-container-top ${isHovered ? '--is-active' : ''}`}>
                  <motion.span
                    style={{ scale: crossScale, rotate: crossRotate }}
                    className="home-reel-video-container-cross"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                  <div className="home-reel-video-container-svg-wrapper">
                    <motion.div
                      style={{ scaleX: guideScaleX, transformOrigin: 'center' }}
                      className="w-full h-full"
                    >
                      <svg className="w-full h-full" preserveAspectRatio="none">
                        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
                      </svg>
                    </motion.div>
                  </div>
                  <motion.span
                    style={{ scale: crossScale, rotate: crossRotate }}
                    className="home-reel-video-container-cross"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </div>

                <div id="home-reel-video-container-bottom" className={`home-reel-video-container-bottom ${isHovered ? '--is-active' : ''}`}>
                  <motion.span
                    style={{ scale: crossScale, rotate: crossRotate }}
                    className="home-reel-video-container-cross"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                  <div className="home-reel-video-container-svg-wrapper">
                    <motion.div
                      style={{ scaleX: guideScaleX, transformOrigin: 'center' }}
                      className="w-full h-full"
                    >
                      <svg className="w-full h-full" preserveAspectRatio="none">
                        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
                      </svg>
                    </motion.div>
                  </div>
                  <motion.span
                    style={{ scale: crossScale, rotate: crossRotate }}
                    className="home-reel-video-container-cross"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </div>
              </div>

              {/* Video Placeholder & Player */}
              <motion.div
                id="home-reel-video-placeholder"
                style={{ scale: videoScale }}
                className="home-reel-video-placeholder relative w-full aspect-16/9 rounded-DEFAULT overflow-hidden border border-steel my-2.5 bg-neutral-900 shadow-inner z-10"
              >
                <div id="home-reel-video-title" className="home-reel-video-title">
                  <div className="home-reel-video-title-word">LINKED! 316L</div>
                  <div className="home-reel-video-title-word">{phaseText}</div>
                </div>

                <video
                  ref={videoRef}
                  src="/videos/gemini_generated_video_71fc4d88.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                />

                {/* Center Watch / Play Button with Elastic Pop Entry */}
                <motion.button
                  id="home-reel-video-watch-btn"
                  type="button"
                  style={{
                    x: '-50%',
                    y: '-50%',
                    scale: watchBtnScale,
                    opacity: watchBtnOpacity,
                  }}
                  whileHover={{ scale: 1.12, x: '-50%', y: '-50%' }}
                  whileTap={{ scale: 0.94, x: '-50%', y: '-50%' }}
                  onClick={toggleVideoPlayback}
                  data-cursor={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause video perakitan' : 'Watch reel button'}
                >
                  <div id="home-reel-video-watch-btn-base" />
                  <div id="home-reel-video-watch-btn-background" />
                  <svg
                    id="home-reel-video-watch-btn-svg"
                    viewBox="0 0 36 36"
                    aria-hidden="true"
                  >
                    {isPlaying ? (
                      <g fill="currentColor">
                        <rect x="11" y="10" width="4" height="16" rx="1.5" />
                        <rect x="21" y="10" width="4" height="16" rx="1.5" />
                      </g>
                    ) : (
                      <polygon points="13,9 27,18 13,27" fill="currentColor" />
                    )}
                  </svg>
                </motion.button>
              </motion.div>

              {/* Bottom Bar - Staggered Slide In */}
              <motion.div
                style={{ y: bottomBarY, opacity: bottomBarOpacity }}
                className="w-full pt-2.5 border-t border-steel/80 flex items-center justify-between text-xs relative z-20"
              >
                <span className="text-neutral-600 font-medium">
                  Sistem Pegas 9mm · Bebas Karat
                </span>
                <span className="font-mono text-xs font-bold text-ink">
                  18 Links Ready
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
