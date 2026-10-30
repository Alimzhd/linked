import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { InteractiveBackgroundCanvas } from '../InteractiveBackgroundCanvas';

/**
 * BalancedBackground
 *
 * Global ambient canvas wrapper inspired by Lusion Studio & Autarkeia:
 * - Interactive dynamic background canvas with real-time physics and blueprint geometry
 * - Subtle paper noise grain overlay
 * - 4-column editorial grid lines
 * - Warm blush radial glow that follows cursor with lerp interpolation
 */
export function BalancedBackground({ children }: { children: ReactNode }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const field = fieldRef.current;
    if (!field) return;

    let frame = 0;
    let currentX = window.innerWidth * 0.72;
    let currentY = window.innerHeight * 0.28;
    let targetX = currentX;
    let targetY = currentY;

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      field.style.transform = `translate3d(${currentX - 280}px, ${currentY - 280}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div className="site-canvas">
      <div className="site-noise" aria-hidden="true" />
      <div className="site-grid" aria-hidden="true"><i /><i /><i /><i /></div>
      <InteractiveBackgroundCanvas />
      <div ref={fieldRef} className="ambient-field" aria-hidden="true" />
      <div className="site-content">{children}</div>
    </div>
  );
}
