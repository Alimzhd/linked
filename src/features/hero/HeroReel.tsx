import React, { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useHeroTimeline } from './useHeroTimeline';
import { Scene01, Scene02, Scene03, Scene04, Scene05 } from './scenes';

/**
 * HeroReel Component
 * 
 * Implements the 5-scene SVG timeline with exact timing and controls:
 * - Scene 01 (0-3s): Link drawing
 * - Scene 02 (3-6s): Charms dropping and snapping
 * - Scene 03 (6-10s): Bracelet assembly and price counter
 * - Scene 04 (10-13s): Charm swap and rotation
 * - Scene 05 (13-15s): Wordmark reveal and CTA buttons
 * 
 * Features:
 * - Corner bracket decorations (Task 3.7)
 * - Scene labels and timecodes in metadata panels (Task 3.7)
 * - 5-dot navigation reflecting current scene (Task 3.7)
 * - Play/pause toggle button (Task 3.7)
 * - Pause when out of viewport (Intersection Observer) (Task 3.8)
 * - Pause when tab inactive (Page Visibility API) (Task 3.8)
 * - Static poster for prefers-reduced-motion (Task 3.8)
 * 
 * **Validates: Requirements 3.1, 3.17, 3.18, 3.19, 3.20, 3.21, 3.22, 3.23, 3.24, 3.25**
 */
export const HeroReel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, controls, scenes, currentSceneData } = useHeroTimeline(containerRef);
  
  const { currentScene, prefersReducedMotion, isPlaying } = state;

  // Static poster fallback for reduced motion users (Requirement 3.20)
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full min-h-[560px] md:min-h-[640px] bg-paper border-b border-steel flex items-center justify-center p-6">
        {/* Corner brackets */}
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
      className={`relative w-full min-h-[580px] md:min-h-[680px] transition-colors duration-700 border-b border-steel flex items-center overflow-hidden select-none ${
        currentScene === 3 ? 'bg-blush/40' : 'bg-paper'
      }`}
    >
      {/* Corner Brackets (Requirement 3.21) - 2px borders, neutral-400 */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-neutral-400 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-neutral-400 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-neutral-400 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-neutral-400 pointer-events-none" />

      {/* Top Metadata Panel (Requirements 3.22, 3.23) */}
      <div className="absolute top-6 left-8 right-8 flex items-center justify-between text-neutral-500 micro-label z-20 pointer-events-none">
        {/* Scene label in top-left (Requirement 3.22) */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-ink font-bold">{currentSceneData.label}</span>
        </div>
        
        {/* Timecode in top-right (Requirement 3.23) */}
        <div className="flex items-center gap-4">
          <span className="font-mono">{currentSceneData.timecode}</span>
          <span className="hidden sm:inline-block">15s TIMELINE</span>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="layout-container relative z-10 py-16">
        <AnimatePresence mode="wait">
          {/* Scene 01: Link drawing (0-3s) */}
          {currentScene === 0 && <Scene01 />}

          {/* Scene 02: Charms dropping and snapping (3-6s) */}
          {currentScene === 1 && <Scene02 />}

          {/* Scene 03: Bracelet assembly and price counter (6-10s) */}
          {currentScene === 2 && <Scene03 />}

          {/* Scene 04: Charm swap and rotation (10-13s) */}
          {currentScene === 3 && <Scene04 />}

          {/* Scene 05: Wordmark reveal and CTA buttons (13-15s) */}
          {currentScene === 4 && <Scene05 />}
        </AnimatePresence>
      </div>

      {/* Bottom Controls: Dot Navigation & Play/Pause (Requirements 3.24, 3.25) */}
      <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between z-20">
        {/* 5-dot navigation (Requirement 3.24) */}
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

        {/* Play/pause toggle button (Requirement 3.25) */}
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
    </section>
  );
};
