import type { Transition, Variants } from 'framer-motion';

export const EASE_MODERN = [0.25, 1, 0.5, 1] as const;
export const EASE_SNAPPY = [0.25, 1, 0.5, 1] as const;
export const EASE_EDITORIAL = [0.25, 1, 0.5, 1] as const;

/** ─── Google Material 3 Expressive Easing Curves ─── */
export const M3_EASE_EMPHASIZED = [0.2, 0.0, 0.0, 1.0] as const;
export const M3_EASE_EMPHASIZED_DECELERATE = [0.05, 0.7, 0.1, 1.0] as const;
export const M3_EASE_EMPHASIZED_ACCELERATE = [0.3, 0.0, 0.8, 0.15] as const;
export const M3_EASE_STANDARD = [0.2, 0.0, 0.0, 1.0] as const;
export const M3_EASE_STANDARD_DECELERATE = [0.0, 0.0, 0.0, 1.0] as const;
export const M3_EASE_STANDARD_ACCELERATE = [0.3, 0.0, 1.0, 1.0] as const;

/** ─── Google Material 3 Expressive Spring Physics ─── */
export const m3SpringExpressive: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 26,
  mass: 0.8,
};

export const m3SpringBouncy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 22,
  mass: 0.6,
};

export const m3SpringSmooth: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
  mass: 1.0,
};

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

/** Editorial route / overlay physics used by the ASCII motion engine. */
export const springEditorial: Transition = {
  type: 'spring',
  mass: 1,
  stiffness: 90,
  damping: 15,
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
