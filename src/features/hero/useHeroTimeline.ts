import { useState, useEffect, useRef } from 'react';
import { useAnimation } from 'framer-motion';

/**
 * Scene definitions for the 15-second Hero timeline
 * Each scene has specific timing and duration
 */
export interface Scene {
  id: number;
  label: string;
  startMs: number;
  endMs: number;
  durationMs: number;
  timecode: string;
}

export const SCENES: Scene[] = [
  {
    id: 0,
    label: '01 · LINK',
    startMs: 0,
    endMs: 3000,
    durationMs: 3000,
    timecode: '00:00 - 00:03',
  },
  {
    id: 1,
    label: '02 · CHARM',
    startMs: 3000,
    endMs: 6000,
    durationMs: 3000,
    timecode: '00:03 - 00:06',
  },
  {
    id: 2,
    label: '03 · RAKIT',
    startMs: 6000,
    endMs: 10000,
    durationMs: 4000,
    timecode: '00:06 - 00:10',
  },
  {
    id: 3,
    label: '04 · MIX',
    startMs: 10000,
    endMs: 13000,
    durationMs: 3000,
    timecode: '00:10 - 00:13',
  },
  {
    id: 4,
    label: '05 · MEREK',
    startMs: 13000,
    endMs: 15000,
    durationMs: 2000,
    timecode: '00:13 - 00:15',
  },
];

const TOTAL_DURATION_MS = 15000;

export interface HeroTimelineState {
  currentScene: number;
  currentTimecode: number;
  isPlaying: boolean;
  isTabVisible: boolean;
  prefersReducedMotion: boolean;
}

export interface HeroTimelineControls {
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  seekToScene: (sceneId: number) => void;
  reset: () => void;
}

/**
 * Hook for managing the Hero timeline animation state machine
 * 
 * Implements:
 * - 5 scenes with precise durations: Scene 01 (0-3s), Scene 02 (3-6s), 
 *   Scene 03 (6-10s), Scene 04 (10-13s), Scene 05 (13-15s)
 * - Loop mechanism resetting to Scene 01 at 15000ms
 * - Pause when tab becomes inactive (Page Visibility API)
 * - Pause when Hero scrolls out of viewport (Intersection Observer)
 * - Static poster for prefers-reduced-motion users
 * 
 * **Validates: Requirements 3.1, 3.17**
 */
export const useHeroTimeline = (containerRef?: React.RefObject<HTMLElement>) => {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [currentTimecode, setCurrentTimecode] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  
  const controls = useAnimation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Check prefers-reduced-motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track tab visibility (Page Visibility API)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setIsTabVisible(isVisible);
      
      // Reset start time when tab becomes visible again
      if (isVisible && isPlaying) {
        startTimeRef.current = Date.now() - currentTimecode;
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying, currentTimecode]);

  // Track viewport visibility (Intersection Observer)
  useEffect(() => {
    if (!containerRef?.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInViewport(entry.isIntersecting);
        
        // Reset start time when coming back into viewport
        if (entry.isIntersecting && isPlaying) {
          startTimeRef.current = Date.now() - currentTimecode;
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% visible
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [containerRef, isPlaying, currentTimecode]);

  // Animation state machine - loop through scenes
  useEffect(() => {
    // Don't run animation if reduced motion, not playing, tab hidden, or out of viewport
    if (prefersReducedMotion || !isPlaying || !isTabVisible || !isInViewport) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const currentSceneData = SCENES[currentScene];
    const remainingTime = currentSceneData.endMs - currentTimecode;
    
    // Schedule transition to next scene
    timerRef.current = setTimeout(() => {
      const nextScene = (currentScene + 1) % SCENES.length;
      
      // Loop back to Scene 01 at 15000ms
      if (nextScene === 0) {
        setCurrentTimecode(0);
        startTimeRef.current = Date.now();
      } else {
        setCurrentTimecode(SCENES[nextScene].startMs);
      }
      
      setCurrentScene(nextScene);
    }, remainingTime);

    // Update timecode continuously for smooth progress
    const timecodeInterval = setInterval(() => {
      if (isPlaying && isTabVisible && isInViewport) {
        const elapsed = Date.now() - startTimeRef.current;
        const newTimecode = elapsed % TOTAL_DURATION_MS;
        setCurrentTimecode(newTimecode);
      }
    }, 100); // Update every 100ms for smooth progress

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      clearInterval(timecodeInterval);
    };
  }, [currentScene, currentTimecode, isPlaying, isTabVisible, isInViewport, prefersReducedMotion]);

  // Playback controls
  const play = () => {
    setIsPlaying(true);
    startTimeRef.current = Date.now() - currentTimecode;
    controls.start('playing');
  };

  const pause = () => {
    setIsPlaying(false);
    controls.stop();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seekToScene = (sceneId: number) => {
    if (sceneId >= 0 && sceneId < SCENES.length) {
      const targetScene = SCENES[sceneId];
      setCurrentScene(sceneId);
      setCurrentTimecode(targetScene.startMs);
      startTimeRef.current = Date.now() - targetScene.startMs;
    }
  };

  const reset = () => {
    setCurrentScene(0);
    setCurrentTimecode(0);
    startTimeRef.current = Date.now();
  };

  // Calculate whether animation should be active
  const isActive = isPlaying && isTabVisible && isInViewport && !prefersReducedMotion;

  const state: HeroTimelineState = {
    currentScene,
    currentTimecode,
    isPlaying: isActive,
    isTabVisible,
    prefersReducedMotion,
  };

  const timelineControls: HeroTimelineControls = {
    play,
    pause,
    togglePlayPause,
    seekToScene,
    reset,
  };

  return {
    state,
    controls: timelineControls,
    motionControls: controls,
    scenes: SCENES,
    currentSceneData: SCENES[currentScene],
  };
};
