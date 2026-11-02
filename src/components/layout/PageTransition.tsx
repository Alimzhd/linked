import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * PageTransition
 *
 * Route entrance uses editorial spring physics (mass 1, stiffness 90, damping 15).
 * Clears containing-block transforms on complete so inner sticky elements work.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      id="main-content"
      className="page-shell"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
