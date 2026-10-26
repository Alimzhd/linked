import React from 'react';
import { motion } from 'framer-motion';
import { CharmSvg } from '../../../components/CharmSvg';

/**
 * Scene 02: Charms dropping with stagger (3-6s)
 * 
 * Shows 3 charms (heart, star, letter A) dropping from above and snapping
 * to position with magnetic spring physics. Uses staggered animation
 * with 250ms delay between each charm.
 * 
 * Animation specs:
 * - Initial: y: -60, scale: 0.7, opacity: 0
 * - Animate to: y: 0, scale: 1, opacity: 1
 * - Spring physics: stiffness 500, damping 30
 * - Stagger delay: 250ms
 * 
 * Validates: Requirements 3.4, 3.5, 3.6
 */
export const Scene02: React.FC = () => {
  const charms = [
    { symbol: 'heart', name: 'Heart', delay: 0 },
    { symbol: 'star', name: 'Star', delay: 0.25 },
    { symbol: 'A', name: 'Letter A', delay: 0.5 },
  ];

  return (
    <motion.div
      key="scene-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center space-y-8"
    >
      {/* Charms dropping with magnetic snap */}
      <div className="flex items-center justify-center gap-3">
        {charms.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: -60, scale: 0.7, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{
              delay: item.delay,
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className="w-20 h-20 md:w-28 md:h-28 rounded-lg shadow-md bg-white border border-steel p-2"
          >
            <CharmSvg symbol={item.symbol} name={item.name} />
          </motion.div>
        ))}
      </div>

      {/* Scene messaging */}
      <div className="space-y-2 max-w-md">
        <span className="micro-label text-neutral-400 font-mono">MAGNETIC SNAP · STIFFNESS 500</span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
          Tambah <span className="accent-serif font-normal">Cerita.</span>
        </h2>
        <p className="text-xs md:text-sm text-neutral-600">
          Tempelkan simbol, monogram, atau aksen favoritmu langsung ke gelang.
        </p>
      </div>
    </motion.div>
  );
};
