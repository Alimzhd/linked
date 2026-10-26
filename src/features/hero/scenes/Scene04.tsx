import React from 'react';
import { motion } from 'framer-motion';
import { CharmSvg } from '../../../components/CharmSvg';

/**
 * Scene 04: Charm swap and rotation (10-13 seconds)
 * 
 * Features:
 * - Background transitions to blush (#F4E8E1) - handled by HeroReel container
 * - Two charms swap positions with cross-fade (400ms duration)
 * - Bracelet rotates by 12 degrees
 * - Displays scene message "Ganti kapan saja."
 * - Scene label "04 · MIX & SWAP" and timecode "00:10 - 00:13" - handled by HeroReel metadata
 * 
 * Validates Requirements: 3.10, 3.11, 3.12, 3.13
 */
export const Scene04: React.FC = () => {
  return (
    <motion.div
      key="scene-4"
      initial={{ opacity: 0, rotate: -4 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: 4 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center space-y-6"
    >
      {/* Charm swap animation with 12-degree rotation */}
      <motion.div
        animate={{ rotate: 12 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 py-4"
      >
        {/* Left charm - swaps position with right charm */}
        <motion.div
          animate={{ x: [0, 40, 0] }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-lg border border-steel p-2 shadow-sm"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ 
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: 'easeInOut'
            }}
          >
            <CharmSvg symbol="heart" name="Heart" />
          </motion.div>
        </motion.div>

        {/* Center divider line */}
        <div className="w-8 h-px bg-neutral-400" />

        {/* Right charm - swaps position with left charm */}
        <motion.div
          animate={{ x: [0, -40, 0] }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-lg border border-steel p-2 shadow-sm"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ 
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: 'easeInOut'
            }}
          >
            <CharmSvg symbol="alien" name="Alien" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scene message */}
      <div className="space-y-2 max-w-md">
        <span className="micro-label text-neutral-500 font-mono">MODULAR 100% REPOSITIONABLE</span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
          Ganti <span className="accent-serif font-normal">kapan saja.</span>
        </h2>
        <p className="text-xs md:text-sm text-neutral-600">
          Bongkar dan susun ulang posisi charm hanya dalam hitungan detik.
        </p>
      </div>
    </motion.div>
  );
};
