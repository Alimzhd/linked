import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  bg?: 'paper' | 'blush' | 'white';
  className?: string;
  id?: string;
}

/**
 * ScrollSectionWrapper
 *
 * Provides smooth, editorial viewport entrance transitions as users scroll down.
 * Inspired by Locomotive Studio and Roavero editorial aesthetics.
 * Respects prefers-reduced-motion to prevent motion sickness.
 */
export const ScrollSectionWrapper: React.FC<ScrollSectionWrapperProps> = ({
  children,
  bg = 'paper',
  className = '',
  id,
}) => {
  const prefersReduced = useReducedMotion();

  const bgClasses: Record<string, string> = {
    paper: 'bg-transparent',
    blush: 'bg-[#F4E8E1]/60',
    white: 'bg-white/80',
  };

  return (
    <motion.section
      id={id}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full ${bgClasses[bg] || 'bg-[#F9F9FB]'} transition-colors duration-500 py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};
