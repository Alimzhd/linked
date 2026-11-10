import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MarqueeTickerProps {
  items?: string[];
  speed?: number; // seconds
  direction?: 'left' | 'right';
  className?: string;
}

const DEFAULT_ITEMS = [
  '316L SURGICAL STEEL',
  'UNIVERSAL 9MM ITALIAN STANDARD',
  '50,000+ CYCLE SPRING TESTED',
  'MOLYBDENUM STABILIZED',
  'TOOL-FREE CUSTOM SNAP',
  'KILN-FIRED VITREOUS ENAMEL',
  'NICKEL SAFE & WATERPROOF',
];

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = DEFAULT_ITEMS,
  speed = 30,
  direction = 'left',
  className = '',
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={`w-full overflow-hidden bg-neutral-100/70 py-3 select-none ${className}`}>
        <div className="flex flex-wrap items-center justify-center gap-6 px-4">
          {items.slice(0, 4).map((text, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-neutral-600">
                {text}
              </span>
              <span className="text-neutral-400 text-xs">+</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-neutral-100/70 py-3.5 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-paper to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-paper to-transparent z-10" />

      <div className="flex w-fit">
        <motion.div
          className="flex shrink-0 items-center gap-8 pr-8"
          animate={{
            x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
          }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: speed,
          }}
        >
          {[...items, ...items].map((text, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-neutral-700">
                {text}
              </span>
              <span className="text-neutral-400 text-xs">+</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeTicker;

