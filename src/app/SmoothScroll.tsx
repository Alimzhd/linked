import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ lenis: null });

/**
 * Hook to access Lenis instance for programmatically scrolling to elements
 */
export const useLenis = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * SmoothScroll Provider
 *
 * Implements Lenis smooth scrolling with lerp interpolation (0.08)
 * as pioneered by Locomotive Studio (Refrensi.md).
 * Uses a centralized requestAnimationFrame loop and respects prefers-reduced-motion.
 */
export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    // Only initialize in client browser environment where Window and addEventListener exist
    if (typeof window === 'undefined' || typeof Window === 'undefined') {
      return;
    }

    let lenis: Lenis | null = null;
    let animationFrameId: number | null = null;

    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      lenis = new Lenis({
        lerp: prefersReducedMotion ? 1 : 0.08,
        smoothWheel: !prefersReducedMotion,
        syncTouch: false,
      });

      lenisRef.current = lenis;
      setLenisInstance(lenis);

      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      };

      animationFrameId = requestAnimationFrame(raf);
    } catch {
      // Graceful fallback for environments without complete DOM/Window implementations
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (lenis) {
        lenis.destroy();
      }
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  // Instant scroll reset to top on route navigation
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
