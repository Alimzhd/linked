import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { revealVariants } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

/**
 * Reveal
 *
 * Scroll-triggered reveal animation wrapper using Framer Motion's whileInView.
 * Staggered delays via the index prop for sequential content reveals.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      custom={index}
      variants={revealVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
    >
      {children}
    </motion.div>
  );
}
