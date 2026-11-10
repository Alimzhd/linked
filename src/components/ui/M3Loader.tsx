import React from 'react';
import { motion } from 'framer-motion';
import { M3CircularProgress, M3LinearProgress } from './M3Progress';
import { Sparkles } from 'lucide-react';

export { M3CircularProgress, M3LinearProgress };

interface M3CatalogLoaderProps {
  label?: string;
  className?: string;
}

/**
 * Expressive M3 loading state for catalog and charm data fetching
 */
export const M3CatalogLoader: React.FC<M3CatalogLoaderProps> = ({
  label = 'Memuat Katalog LINKED!...',
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full py-16 flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <M3CircularProgress size="lg" color="#121212" />
        <Sparkles className="w-4 h-4 text-neutral-400 absolute animate-pulse" />
      </div>
      <p className="micro-label text-neutral-500 font-mono tracking-wider">{label}</p>
    </div>
  );
};

interface M3ImageProcessingLoaderProps {
  progress?: number;
  className?: string;
}

/**
 * Expressive M3 loader for image loading, 3D assets, and charm preview generation
 */
export const M3ImageProcessingLoader: React.FC<M3ImageProcessingLoaderProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-6 bg-neutral-100/60 rounded-[20px] space-y-3 ${className}`}
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center"
      >
        <M3CircularProgress size="sm" color="#121212" />
      </motion.div>
      <div className="w-24">
        <M3LinearProgress trackColor="bg-neutral-200" indicatorColor="bg-ink" />
      </div>
      <span className="micro-label text-[10px] text-neutral-400 font-mono">PROSES VISUAL</span>
    </div>
  );
};

/**
 * Tonal Card Skeleton for M3 Expressive data fetching
 */
export const M3CardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-[24px] p-4 shadow-2xs space-y-3 animate-pulse"
        >
          <div className="w-full aspect-square rounded-[18px] bg-neutral-100" />
          <div className="h-3 w-2/3 bg-neutral-200/80 rounded-full" />
          <div className="h-3 w-1/3 bg-neutral-200/60 rounded-full" />
        </div>
      ))}
    </div>
  );
};

