import { motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { M3_EASE_EMPHASIZED_DECELERATE } from '../../lib/motion';

/**
 * PageTransition
 *
 * Material 3 Expressive route entrance using M3 Emphasized Decelerate:
 * cubic-bezier(0.05, 0.7, 0.1, 1.0).
 * Crucially clears containing-block transforms upon animation completion so that
 * inner `position: sticky` and `position: fixed` elements work cleanly across all browsers.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [isComplete, setIsComplete] = useState(false);

  return (
    <motion.main
      id="main-content"
      className="page-shell focus:outline-none"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: M3_EASE_EMPHASIZED_DECELERATE,
      }}
      onAnimationComplete={() => setIsComplete(true)}
      style={isComplete ? { transform: 'none' } : undefined}
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
