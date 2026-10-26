import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CharmSvg } from '../../../components/CharmSvg';

/**
 * Scene 03: Bracelet Assembly and Curve Morph (6-10s)
 * 
 * Shows 18 links assembling into a bracelet, morphing from straight line to curved shape,
 * with an animated price counter.
 * 
 * Requirements: 3.7, 3.8, 3.9
 */

export const Scene03: React.FC = () => {
  const [displayPrice, setDisplayPrice] = useState(0);
  const finalPrice = 198000;

  // Animate price counter from 0 to final value over 300ms
  useEffect(() => {
    const duration = 300; // ms
    const steps = 60;
    const increment = finalPrice / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayPrice(finalPrice);
        clearInterval(timer);
      } else {
        setDisplayPrice(Math.round(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // 18 links total: some with charms (heart at 2, star at 5, A at 8), rest plain
  const links = Array.from({ length: 18 }, (_, i) => {
    let symbol = 'plain';
    if (i === 2) symbol = 'heart';
    else if (i === 5) symbol = 'star';
    else if (i === 8) symbol = 'A';
    return { id: i, symbol };
  });

  // Calculate curved bracelet positioning
  // Links are arranged in an arc to simulate bracelet curve
  const getCurvedPosition = (index: number, total: number) => {
    // Create a gentle arc using sine wave
    const normalizedIndex = index / (total - 1); // 0 to 1
    const xOffset = (normalizedIndex - 0.5) * 100; // Spread horizontally
    const yOffset = Math.sin(normalizedIndex * Math.PI) * 15; // Arc curve
    return { x: xOffset, y: yOffset };
  };

  return (
    <motion.div
      key="scene-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center space-y-6 px-4"
    >
      {/* Bracelet Assembly Container */}
      <div className="relative w-full max-w-3xl py-8 flex items-center justify-center overflow-visible">
        <div className="relative flex items-center justify-center gap-0.5 md:gap-1">
          {links.map((link, i) => {
            const curvedPos = getCurvedPosition(i, links.length);
            
            return (
              <motion.div
                key={link.id}
                initial={{ 
                  scale: 0, 
                  opacity: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: curvedPos.x,
                  y: curvedPos.y,
                }}
                transition={{
                  delay: i * 0.05, // Stagger assembly
                  duration: 0.3,
                  scale: { type: 'spring', stiffness: 400, damping: 25 },
                  x: { delay: 0.5 + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  y: { delay: 0.5 + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                }}
                className="w-7 h-7 md:w-10 md:h-10 shrink-0"
                style={{
                  transformOrigin: 'center center',
                }}
              >
                <CharmSvg symbol={link.symbol} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Price Counter and Content */}
      <div className="space-y-3 max-w-lg">
        {/* Price Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-steel shadow-sm"
        >
          <span className="font-mono text-xs md:text-sm font-bold text-ink">18 Link</span>
          <span className="text-neutral-400">·</span>
          <span className="font-mono text-xs md:text-sm font-bold text-emerald-700">
            Rp {displayPrice.toLocaleString('id-ID')}
          </span>
        </motion.div>

        {/* Scene Message */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Rakit Sendiri. <span className="accent-serif font-normal">Harganya</span> Langsung Terlihat.
          </h2>
          <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
            Tanpa biaya tersembunyi. Rumus harga transparan terhitung otomatis per charm.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
