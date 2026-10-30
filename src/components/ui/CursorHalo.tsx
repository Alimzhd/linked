import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * CursorHalo Component
 *
 * Minimalist, elegant magnetic cursor:
 * - Damped magnetic ring tracking the pointer with smooth spring physics.
 * - Center micro-dot accurately tracking current pointer.
 * - Expands with contextual micro-labels over interactive targets (e.g. "Play", "View").
 * - Clean and calm: zero distracting particle trails.
 */
export function CursorHalo() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Main magnetic ring spring
  const ringX = useSpring(rawX, { stiffness: 420, damping: 30, mass: 0.3 });
  const ringY = useSpring(rawY, { stiffness: 420, damping: 30, mass: 0.3 });

  // Center micro-dot spring
  const dotX = useSpring(rawX, { stiffness: 950, damping: 45, mass: 0.08 });
  const dotY = useSpring(rawY, { stiffness: 950, damping: 45, mass: 0.08 });

  const [label, setLabel] = useState('');
  const [isPointerActive, setIsPointerActive] = useState(false);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const onPointerMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setIsPointerActive(true);

      const target = event.target instanceof Element ? event.target : null;
      if (target) {
        const explicitTarget = target.closest<HTMLElement>('[data-cursor], [data-cursor-label]');
        const explicitLabel =
          explicitTarget?.dataset.cursor ||
          explicitTarget?.dataset.cursorLabel ||
          '';

        if (explicitLabel) {
          setLabel(explicitLabel);
        } else {
          setLabel('');
        }
      }
    };

    const onPointerLeave = () => {
      setIsPointerActive(false);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [reduceMotion, rawX, rawY]);

  if (reduceMotion || !isPointerActive) return null;

  return (
    <>
      {/* Center magnetic micro-dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full z-50 pointer-events-none select-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: -3,
          translateY: -3,
          backgroundColor: 'var(--color-ink)',
        }}
        aria-hidden="true"
      />

      {/* Outer magnetic ring with label expansion */}
      <motion.div
        className={`cursor-halo ${label ? 'cursor-halo--active' : ''}`}
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      >
        <span>{label}</span>
      </motion.div>
    </>
  );
}
