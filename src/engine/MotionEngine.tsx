import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'framer-motion';

export const SPRING_EDITORIAL: Transition = {
  type: 'spring',
  mass: 1,
  stiffness: 90,
  damping: 15,
};

type MotionTrigger = 'charm' | 'category' | 'modal' | 'route';

interface MotionEngineValue {
  triggerHalftone: (kind?: MotionTrigger) => void;
  spring: Transition;
}

const MotionEngineContext = createContext<MotionEngineValue | null>(null);

export function useMotionEngine(): MotionEngineValue {
  const ctx = useContext(MotionEngineContext);
  if (!ctx) {
    return {
      triggerHalftone: () => undefined,
      spring: SPRING_EDITORIAL,
    };
  }
  return ctx;
}

const ASCII_RAMP = ' .:-=+*#%@';

function HalftoneFlash({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let running = true;
    const started = performance.now();
    const duration = 420;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.min(window.innerHeight, 720);
    };
    resize();

    const tick = (now: number) => {
      if (!running) return;
      const t = Math.min(1, (now - started) / duration);
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const cellW = 10;
      const cellH = 14;
      const cols = Math.ceil(width / cellW);
      const rows = Math.ceil(height / cellH);
      ctx.font = '11px "Geist Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const wave = Math.sin(t * Math.PI * 3) * 0.45 + 0.35;
      const alpha = (1 - t) * 0.22;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const n = (Math.sin(x * 0.35 + t * 12) + Math.cos(y * 0.28 - t * 9)) * 0.5 + 0.5;
          const luma = Math.min(1, Math.max(0, n * wave));
          const glyph = ASCII_RAMP[Math.floor(luma * (ASCII_RAMP.length - 1))] ?? ' ';
          ctx.fillStyle = `rgba(18, 18, 18, ${alpha * (0.4 + luma)})`;
          ctx.fillText(glyph, x * cellW + cellW / 2, y * cellH + cellH / 2);
        }
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[80] mix-blend-multiply"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={SPRING_EDITORIAL}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </motion.div>
  );
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [flash, setFlash] = useState(false);
  const timeoutRef = useRef<number>(0);

  const triggerHalftone = useCallback(
    (_kind?: MotionTrigger) => {
      if (reduceMotion) return;
      window.clearTimeout(timeoutRef.current);
      setFlash(true);
      timeoutRef.current = window.setTimeout(() => setFlash(false), 460);
    },
    [reduceMotion]
  );

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  return (
    <MotionEngineContext.Provider value={{ triggerHalftone, spring: SPRING_EDITORIAL }}>
      {children}
      <AnimatePresence>{flash ? <HalftoneFlash active={flash} key="halftone-flash" /> : null}</AnimatePresence>
    </MotionEngineContext.Provider>
  );
}
