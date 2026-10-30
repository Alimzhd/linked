import type { Transition, Variants } from 'framer-motion';

export const EASE_MODERN = [0.25, 1, 0.5, 1] as const;
export const EASE_SNAPPY = [0.25, 1, 0.5, 1] as const;
export const EASE_EDITORIAL = [0.25, 1, 0.5, 1] as const;

export const springTactile: Transition = {
  type: 'spring',
  stiffness: 360,
  damping: 28,
  mass: 0.7,
};

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 24,
  mass: 0.9,
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.99 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: index * 0.05, ease: EASE_MODERN },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

export const itemReveal: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_MODERN } },
};

export const uiTransition: Transition = { duration: 0.24, ease: EASE_MODERN };
export const pageTransition: Transition = { duration: 0.28, ease: EASE_MODERN };
