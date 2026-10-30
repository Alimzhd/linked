import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Pause, Play, Box } from 'lucide-react';
import { useHeroTimeline } from './useHeroTimeline';
import { Scene01, Scene02, Scene03, Scene04, Scene05 } from './scenes';
import { LusionBracelet3DCanvas } from '../../components/LusionBracelet3DCanvas';

/**
 * HeroReel Component
 * 
 * Implements the 5-scene timeline with interactive 3D WebGL toggle and
 * scroll-linked multi-layer parallax for high-end depth:
 * - Scene 01 (0-3s): 3D Surgical Steel Link with specular shader and drag physics
 * - Scene 02 (3-6s): Charms dropping and snapping
 * - Scene 03 (6-10s): Bracelet assembly and price counter
 * - Scene 04 (10-13s): Charm swap and rotation
 * - Scene 05 (13-15s): Wordmark reveal and CTA buttons
 * - Toggleable full 3D interactive bracelet stage (Lusion Studio & Google Antigravity)
 * - Scroll-linked parallax: background brackets, metadata, and 3D stage move at staggered depths
 */
export const HeroReel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'timeline' | '3d'>('timeline');
  const { state, controls, scenes, currentSceneData } = useHeroTimeline(containerRef);
  
  const { currentScene, prefersReducedMotion, isPlaying } = state;

  // Scroll-linked parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Multi-plane parallax translations
  const parallaxBracketsY = useTransform(smoothScroll, [0, 1], [0, 60]);
  const parallaxStageY = useTransform(smoothScroll, [0, 1], [0, -45]);
  const stageScale = useTransform(smoothScroll, [0, 1], [1, 0.94]);
  const stageOpacity = useTransform(smoothScroll, [0, 0.85], [1, 0.25]);
  const parallaxTopY = useTransform(smoothScroll, [0, 1], [0, -30]);

  // Static poster fallback for reduced motion users
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full min-h-[560px] md:min-h-[640px] bg-paper flex items-center justify-center p-6">
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-neutral-400 pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-neutral-400 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-neutral-400 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-neutral-400 pointer-events-none" />
        
        <div className="layout-container">
          <Scene05 />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-[580px] md:min-h-[680px] transition-colors duration-700 flex items-center overflow-hidden select-none ${
        currentScene === 3 && viewMode === 'timeline' ? 'bg-blush/30' : 'bg-transparent'
      }`}
    >
      {/* Corner Brackets with Parallax Drift (Requirement 3.21) */}
      <motion.div
        style={{ y: parallaxBracketsY }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-neutral-400" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-neutral-400" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-neutral-400" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-neutral-400" />
      </motion.div>

      {/* Top Metadata & Toggle Panel with Parallax */}
      <motion.div
        style={{ y: parallaxTopY }}
        className="absolute top-6 left-6 right-6 md:left-8 md:right-8 flex items-center justify-between text-neutral-500 micro-label z-20"
      >
        {/* Scene label in top-left */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-ink font-bold">
            {viewMode === '3d' ? '3D · INTERACTIVE STAGE' : currentSceneData.label}
          </span>
        </div>
        
        {/* 3D / Timeline Toggle & Timecode */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'timeline' ? '3d' : 'timeline')}
            className={`px-2.5 py-1 rounded-full border text-[10px] font-mono font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
              viewMode === '3d'
                ? 'bg-ink text-paper border-ink'
                : 'bg-white/90 text-neutral-700 border-steel hover:border-neutral-400 hover:text-ink'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>{viewMode === '3d' ? 'BACK TO REEL' : 'VIEW IN 3D'}</span>
          </button>

          {viewMode === 'timeline' && (
            <span className="font-mono hidden sm:inline-block">{currentSceneData.timecode}</span>
          )}
        </div>
      </motion.div>

      {/* Main Stage Container with Parallax Receding Effect */}
      <motion.div
        style={{ y: parallaxStageY, scale: stageScale, opacity: stageOpacity }}
        className="layout-container relative z-10 py-16 w-full"
      >
        <AnimatePresence mode="wait">
          {viewMode === '3d' ? (
            <motion.div
              key="interactive-3d-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-full max-w-2xl bg-white/95 rounded-2xl border border-steel/80 p-4 shadow-xl relative">
                <LusionBracelet3DCanvas
                  mode="bracelet"
                  height="380px"
                  interactive={true}
                  showControls={true}
                />
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                DRAG WITH MOUSE TO ROTATE 360° · REAL-TIME SPECULAR SHINE
              </p>
            </motion.div>
          ) : (
            <div key="timeline-stage">
              <AnimatePresence mode="wait">
                {currentScene === 0 && <Scene01 />}
                {currentScene === 1 && <Scene02 />}
                {currentScene === 2 && <Scene03 />}
                {currentScene === 3 && <Scene04 />}
                {currentScene === 4 && <Scene05 />}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Controls: Dot Navigation & Play/Pause (only in timeline mode) */}
      {viewMode === 'timeline' && (
        <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => controls.seekToScene(scene.id)}
                aria-label={`Navigate to ${scene.label}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentScene === scene.id
                    ? 'w-8 bg-ink'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={controls.togglePlayPause}
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            className="p-1.5 rounded-DEFAULT border border-steel bg-white/80 text-neutral-600 hover:text-ink hover:bg-white text-xs transition-colors flex items-center gap-1 font-mono"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline text-[10px]">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
        </div>
      )}
    </section>
  );
};
