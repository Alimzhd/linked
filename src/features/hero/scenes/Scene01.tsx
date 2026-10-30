import React from 'react';
import { motion } from 'framer-motion';

export const Scene01: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      {/* 3D-styled Steel link chassis with isometric tilt and depth */}
      <motion.div
        initial={{ rotateX: 20, rotateY: -15, scale: 0.9 }}
        animate={{ rotateX: 8, rotateY: -6, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 800, transformStyle: 'preserve-3d' }}
        className="relative w-36 h-36 md:w-48 md:h-48 shadow-2xl"
      >
        <svg
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          role="img"
          aria-label="Surgical Steel Link"
        >
          <defs>
            <linearGradient id="metal-grad-scene01" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="33%" stopColor="#CBD5E1" />
              <stop offset="66%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* Outer Link Body - Drawing animation */}
          <motion.rect
            x="6"
            y="6"
            width="116"
            height="116"
            rx="14"
            fill="url(#metal-grad-scene01)"
            stroke="#94A3B8"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.8, ease: [0.16, 0.1, 0.3, 1] },
              opacity: { duration: 0.6, ease: 'easeOut' }
            }}
          />

          {/* Inner Bevel Border - Delayed appearance */}
          <motion.rect
            x="12"
            y="12"
            width="104"
            height="104"
            rx="10"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              delay: 0.3,
              pathLength: { duration: 0.5, ease: [0.16, 0.1, 0.3, 1] },
              opacity: { duration: 0.3, ease: 'easeOut' }
            }}
          />

          {/* Left Side Pin Cutout */}
          <motion.line
            x1="6"
            y1="36"
            x2="6"
            y2="92"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.3,
              ease: 'easeOut'
            }}
          />

          {/* Right Side Pin Cutout */}
          <motion.line
            x1="122"
            y1="36"
            x2="122"
            y2="92"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.3,
              ease: 'easeOut'
            }}
          />
        </svg>

        {/* Material Label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap micro-label text-neutral-400">
          SURGICAL GRADE 316L
        </div>
      </motion.div>

      {/* Scene Message */}
      <motion.div
        className="space-y-2 max-w-md pt-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
          Satu Modul. <span className="accent-serif font-normal">Baja</span> Murni.
        </h2>
        <p className="text-xs md:text-sm text-neutral-600">
          Semuanya dimulai dari link stainless steel 9mm dengan pegas internal presisi.
        </p>
      </motion.div>
    </div>
  );
};
