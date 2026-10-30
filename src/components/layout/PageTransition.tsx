import { motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { EASE_MODERN } from '../../lib/motion';

/**
 * PageTransition
 *
 * Seamless, flash-free editorial page entrance on route changes.
 * Eliminates blank white screen gap with immediate entrance and subtle elevation lift.
 * Crucially clears containing-block transforms upon completion so that
 * inner `position: sticky` elements work properly in all browsers.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [isComplete, setIsComplete] = useState(false);

  return (
    <motion.main
      id="main-content"
      className="page-shell"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_MODERN } }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, transition: { duration: 0.08, ease: 'easeOut' } }}
      onAnimationComplete={() => setIsComplete(true)}
      style={isComplete ? { transform: 'none' } : undefined}
    >
      {children}
    </motion.main>
  );
}
