import React from 'react';
import { motion } from 'framer-motion';
import { M3_EASE_EMPHASIZED } from '../../lib/motion';

interface M3CircularProgressProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
}

/**
 * Material 3 Expressive Indeterminate Circular Progress Indicator
 * Follows M3 Motion Specs & Image 2: rotating track with accelerating/decelerating morphing arc.
 */
export const M3CircularProgress: React.FC<M3CircularProgressProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => {
  const sizeMap = {
    sm: { dimension: 20, strokeWidth: 2.5, radius: 8 },
    md: { dimension: 36, strokeWidth: 3.5, radius: 14 },
    lg: { dimension: 48, strokeWidth: 4, radius: 19 },
  };

  const { dimension, strokeWidth, radius } = sizeMap[size];
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      role="progressbar"
      aria-label="Loading"
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      <svg
        className="w-full h-full animate-spin"
        style={{ animationDuration: '1.4s' }}
        viewBox={`0 0 ${dimension} ${dimension}`}
        fill="none"
      >
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeOpacity={0.15}
        />
        <motion.circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{
            strokeDasharray: `${circumference * 0.15} ${circumference}`,
            strokeDashoffset: 0,
          }}
          animate={{
            strokeDasharray: [
              `${circumference * 0.15} ${circumference}`,
              `${circumference * 0.75} ${circumference}`,
              `${circumference * 0.15} ${circumference}`,
            ],
            strokeDashoffset: [0, -circumference * 0.25, -circumference],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: M3_EASE_EMPHASIZED,
          }}
        />
      </svg>
    </div>
  );
};

interface M3LinearProgressProps {
  className?: string;
  trackColor?: string;
  indicatorColor?: string;
}

/**
 * Material 3 Expressive Indeterminate Linear Progress Bar
 */
export const M3LinearProgress: React.FC<M3LinearProgressProps> = ({
  className = '',
  trackColor = 'bg-steel',
  indicatorColor = 'bg-ink',
}) => {
  return (
    <div
      role="progressbar"
      aria-label="Loading"
      className={`relative w-full h-1 overflow-hidden rounded-full ${trackColor} ${className}`}
    >
      {/* Primary Expanding Bar */}
      <motion.div
        className={`absolute top-0 bottom-0 rounded-full ${indicatorColor}`}
        initial={{ left: '-35%', right: '100%' }}
        animate={{
          left: ['-35%', '100%'],
          right: ['100%', '-90%'],
        }}
        transition={{
          duration: 2.0,
          repeat: Infinity,
          ease: [0.2, 0.0, 0.0, 1.0],
        }}
      />
      {/* Secondary Trailing Bar */}
      <motion.div
        className={`absolute top-0 bottom-0 rounded-full ${indicatorColor}`}
        initial={{ left: '-100%', right: '100%' }}
        animate={{
          left: ['-100%', '100%'],
          right: ['100%', '-10%'],
        }}
        transition={{
          duration: 2.0,
          delay: 0.85,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
      />
    </div>
  );
};

/**
 * Material 3 Expressive Wavy Progress Indicator (Directly from Image 2 & M3 Design Kit)
 * Features a sinusoidal undulating waveform gliding across the track with rounded caps.
 */
export const M3WavyProgress: React.FC<{
  className?: string;
  color?: string;
  trackColor?: string;
  height?: number;
}> = ({
  className = '',
  color = '#121215',
  trackColor = 'rgba(18, 18, 21, 0.12)',
  height = 14,
}) => {
  return (
    <div
      role="progressbar"
      aria-label="Loading"
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 480 16"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Flat Track */}
        <line
          x1="0"
          y1="8"
          x2="480"
          y2="8"
          stroke={trackColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Animated Sinusoidal Waveform Track */}
        <motion.path
          d="M 0 8 Q 15 1, 30 8 T 60 8 T 90 8 T 120 8 T 150 8 T 180 8 T 210 8 T 240 8 T 270 8 T 300 8 T 330 8 T 360 8 T 390 8 T 420 8 T 450 8 T 480 8"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathOffset: 0, pathLength: 0.35 }}
          animate={{
            pathOffset: [0, 1],
            pathLength: [0.25, 0.55, 0.25],
          }}
          transition={{
            pathOffset: { duration: 1.4, repeat: Infinity, ease: 'linear' },
            pathLength: { duration: 2.2, repeat: Infinity, ease: M3_EASE_EMPHASIZED },
          }}
        />
      </svg>
    </div>
  );
};

// Material 3 Expressive Signature Morphing Shapes (24-point cubic Bezier paths)
// Sourced directly from official Google M3 Expressive demo video (m0faip5r-13 - Shape Morph 3.mp4):
// 1. 12-sided Cookie (Scallop) <-> 2. Pebble / Organic Polygon <-> 3. 8-point Sunny <-> 4. Bun (2-lobe horizontal waist) <-> 5. 12-point Burst
export const M3_PATH_COOKIE_12 = "M 91.50 50.00 C 91.50 55.26, 81.31 50.98, 79.46 57.89 C 77.61 64.81, 88.57 66.19, 85.94 70.75 C 83.31 75.31, 76.63 66.50, 71.57 71.57 C 66.50 76.63, 75.31 83.31, 70.75 85.94 C 66.19 88.57, 64.81 77.61, 57.89 79.46 C 50.98 81.31, 55.26 91.50, 50.00 91.50 C 44.74 91.50, 49.02 81.31, 42.11 79.46 C 35.19 77.61, 33.81 88.57, 29.25 85.94 C 24.69 83.31, 33.50 76.63, 28.43 71.57 C 23.37 66.50, 16.69 75.31, 14.06 70.75 C 11.43 66.19, 22.39 64.81, 20.54 57.89 C 18.69 50.98, 8.50 55.26, 8.50 50.00 C 8.50 44.74, 18.69 49.02, 20.54 42.11 C 22.39 35.19, 11.43 33.81, 14.06 29.25 C 16.69 24.69, 23.37 33.50, 28.43 28.43 C 33.50 23.37, 24.69 16.69, 29.25 14.06 C 33.81 11.43, 35.19 22.39, 42.11 20.54 C 49.02 18.69, 44.74 8.50, 50.00 8.50 C 55.26 8.50, 50.98 18.69, 57.89 20.54 C 64.81 22.39, 66.19 11.43, 70.75 14.06 C 75.31 16.69, 66.50 23.37, 71.57 28.43 C 76.63 33.50, 83.31 24.69, 85.94 29.25 C 88.57 33.81, 77.61 35.19, 79.46 42.11 C 81.31 49.02, 91.50 44.74, 91.50 50.00 Z";
export const M3_PATH_PEBBLE = "M 92.55 50.00 C 92.96 57.29, 93.45 54.09, 91.39 61.09 C 89.33 68.09, 90.75 65.27, 86.38 71.00 C 82.01 76.73, 84.17 74.48, 78.28 78.28 C 72.39 82.08, 75.09 80.47, 68.71 82.41 C 62.33 84.34, 65.37 83.38, 59.13 84.09 C 52.90 84.79, 56.10 84.48, 50.00 84.52 C 43.90 84.56, 47.08 84.91, 40.83 84.21 C 34.59 83.52, 37.52 84.54, 31.27 82.44 C 25.02 80.35, 27.46 82.03, 22.08 77.92 C 16.69 73.82, 18.42 76.07, 15.12 70.14 C 11.83 64.21, 12.68 66.84, 12.19 60.13 C 11.71 53.42, 11.65 56.21, 13.67 50.00 C 15.70 43.79, 14.83 46.51, 18.26 41.49 C 21.68 36.48, 20.20 38.95, 23.94 34.96 C 27.69 30.96, 25.79 33.09, 29.51 29.51 C 33.22 25.92, 31.03 27.66, 35.10 24.20 C 39.18 20.73, 36.76 22.05, 41.72 19.11 C 46.69 16.18, 44.06 16.97, 50.00 15.40 C 55.94 13.82, 53.13 13.95, 59.54 14.39 C 65.95 14.83, 63.09 14.15, 69.22 16.70 C 75.36 19.26, 72.67 17.70, 77.95 22.05 C 83.24 26.39, 81.01 24.01, 85.09 29.74 C 89.16 35.47, 87.69 32.48, 90.18 39.23 C 92.67 45.99, 92.15 42.71, 92.55 50.00 Z";
export const M3_PATH_SUNNY_8 = "M 92.50 50.00 C 92.50 55.39, 85.33 52.88, 80.19 58.09 C 75.04 63.30, 77.11 58.30, 77.06 65.62 C 77.02 72.95, 83.86 76.24, 80.05 80.05 C 76.24 83.86, 72.95 77.02, 65.62 77.06 C 58.30 77.11, 63.30 75.04, 58.09 80.19 C 52.88 85.33, 55.39 92.50, 50.00 92.50 C 44.61 92.50, 47.12 85.33, 41.91 80.19 C 36.70 75.04, 41.70 77.11, 34.38 77.06 C 27.05 77.02, 23.76 83.86, 19.95 80.05 C 16.14 76.24, 22.98 72.95, 22.94 65.62 C 22.89 58.30, 24.96 63.30, 19.81 58.09 C 14.67 52.88, 7.50 55.39, 7.50 50.00 C 7.50 44.61, 14.67 47.12, 19.81 41.91 C 24.96 36.70, 22.89 41.70, 22.94 34.38 C 22.98 27.05, 16.14 23.76, 19.95 19.95 C 23.76 16.14, 27.05 22.98, 34.37 22.94 C 41.70 22.89, 36.70 24.96, 41.91 19.81 C 47.12 14.67, 44.61 7.50, 50.00 7.50 C 55.39 7.50, 52.88 14.67, 58.09 19.81 C 63.30 24.96, 58.30 22.89, 65.62 22.94 C 72.95 22.98, 76.24 16.14, 80.05 19.95 C 83.86 23.76, 77.02 27.05, 77.06 34.37 C 77.11 41.70, 75.04 36.70, 80.19 41.91 C 85.33 47.12, 92.50 44.61, 92.50 50.00 Z";
export const M3_PATH_BUN = "M 90.50 50.00 C 90.50 57.04, 91.16 53.77, 89.42 60.56 C 87.69 67.35, 89.36 64.82, 85.29 70.38 C 81.22 75.93, 83.36 74.27, 77.22 77.22 C 71.09 80.17, 73.47 79.07, 66.88 79.23 C 60.28 79.39, 63.05 78.62, 57.42 77.71 C 51.80 76.80, 54.95 76.50, 50.00 76.50 C 45.05 76.50, 48.20 76.80, 42.58 77.71 C 36.95 78.62, 39.72 79.39, 33.13 79.23 C 26.53 79.07, 28.91 80.17, 22.78 77.22 C 16.64 74.27, 18.78 75.93, 14.71 70.38 C 10.64 64.82, 12.31 67.35, 10.58 60.56 C 8.84 53.77, 9.50 57.04, 9.50 50.00 C 9.50 42.96, 8.84 46.23, 10.58 39.44 C 12.31 32.65, 10.64 35.18, 14.71 29.63 C 18.78 24.07, 16.64 25.73, 22.78 22.78 C 28.91 19.83, 26.53 20.93, 33.12 20.77 C 39.72 20.61, 36.95 21.38, 42.58 22.29 C 48.20 23.20, 45.05 23.50, 50.00 23.50 C 54.95 23.50, 51.80 23.20, 57.42 22.29 C 63.05 21.38, 60.28 20.61, 66.88 20.77 C 73.47 20.93, 71.09 19.83, 77.22 22.78 C 83.36 25.73, 81.22 24.07, 85.29 29.62 C 89.36 35.18, 87.69 32.65, 89.42 39.44 C 91.16 46.23, 90.50 42.96, 90.50 50.00 Z";
export const M3_PATH_BURST_12 = "M 93.50 50.00 C 93.50 54.57, 77.54 49.61, 75.60 56.86 C 73.65 64.11, 89.96 67.79, 87.67 71.75 C 85.39 75.71, 74.05 63.43, 68.74 68.74 C 63.43 74.05, 75.71 85.39, 71.75 87.67 C 67.79 89.96, 64.11 73.65, 56.86 75.60 C 49.61 77.54, 54.57 93.50, 50.00 93.50 C 45.43 93.50, 50.39 77.54, 43.14 75.60 C 35.89 73.65, 32.21 89.96, 28.25 87.67 C 24.29 85.39, 36.57 74.05, 31.26 68.74 C 25.95 63.43, 14.61 75.71, 12.33 71.75 C 10.04 67.79, 26.35 64.11, 24.40 56.86 C 22.46 49.61, 6.50 54.57, 6.50 50.00 C 6.50 45.43, 22.46 50.39, 24.40 43.14 C 26.35 35.89, 10.04 32.21, 12.33 28.25 C 14.61 24.29, 25.95 36.57, 31.26 31.26 C 36.57 25.95, 24.29 14.61, 28.25 12.33 C 32.21 10.04, 35.89 26.35, 43.14 24.40 C 50.39 22.46, 45.43 6.50, 50.00 6.50 C 54.57 6.50, 49.61 22.46, 56.86 24.40 C 64.11 26.35, 67.79 10.04, 71.75 12.33 C 75.71 14.61, 63.43 25.95, 68.74 31.26 C 74.05 36.57, 85.39 24.29, 87.67 28.25 C 89.96 32.21, 73.65 35.89, 75.60 43.14 C 77.54 50.39, 93.50 45.43, 93.50 50.00 Z";

// Aliases for backward compatibility
export const M3_PATH_DIAMOND = M3_PATH_BURST_12;
export const M3_PATH_DAISY = M3_PATH_COOKIE_12;
export const M3_PATH_CLOVER = M3_PATH_SUNNY_8;
export const M3_PATH_ARCH = M3_PATH_BUN;
export const M3_PATH_TEARDROP = M3_PATH_PEBBLE;
export const M3_PATH_SQUIRCLE = M3_PATH_COOKIE_12;
export const M3_PATH_PEBBLE_LEGACY = M3_PATH_PEBBLE;
export const M3_PATH_CIRCLE = M3_PATH_SUNNY_8;

/**
 * Material 3 Expressive Shape Morphing Loader
 * Re-architected to exactly match Google M3 Design Video (m0faip5r-13 - Shape Morph 3.mp4):
 * - Circular tonal disc container providing soft volumetric stage
 * - Smooth 24-point cubic Bezier path morphing (12-sided cookie <-> pebble <-> sunny <-> bun <-> burst)
 * - Harmonically coupled spring twist rotation & organic breathing scale
 */
export const M3ShapeLoader: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  discColor?: string;
  showDisc?: boolean;
  className?: string;
}> = ({
  size = 'md',
  color = '#1D192B',
  discColor = 'rgba(234, 221, 255, 0.78)',
  showDisc = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { shape: 'w-6 h-6', disc: 'w-11 h-11' },
    md: { shape: 'w-11 h-11', disc: 'w-20 h-20' },
    lg: { shape: 'w-16 h-16', disc: 'w-28 h-28' },
  };

  const { shape, disc } = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Volumetric Tonal Circular Disc from M3 Video */}
      {showDisc && (
        <motion.div
          className={`absolute rounded-full ${disc} pointer-events-none`}
          style={{ backgroundColor: discColor }}
          animate={{
            scale: [1, 1.03, 0.98, 1.02, 1],
          }}
          transition={{
            duration: 5.0,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Synchronized Morphing & Rotating Vector Core */}
      <motion.div
        className={`${shape} will-change-transform flex items-center justify-center origin-center relative z-10`}
        animate={{
          rotate: [0, 60, 135, 210, 285, 360],
          scale: [1, 1.05, 0.96, 1.04, 0.96, 1],
        }}
        transition={{
          rotate: {
            duration: 5.0,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: {
            duration: 5.0,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full will-change-transform overflow-visible"
        >
          <motion.path
            d={M3_PATH_COOKIE_12}
            fill={color}
            animate={{
              d: [
                M3_PATH_COOKIE_12,
                M3_PATH_PEBBLE,
                M3_PATH_SUNNY_8,
                M3_PATH_BUN,
                M3_PATH_BURST_12,
                M3_PATH_COOKIE_12,
              ],
            }}
            transition={{
              duration: 5.0,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

/**
 * Material 3 Expressive Pulsing Tonal Rings
 * Generates concentric harmonic ripples tracking M3 spring physics.
 */
export const M3PulsingRings: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 80,
  color = '#121215',
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ring 1 */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ backgroundColor: color }}
        animate={{
          scale: [0.6, 1.35],
          opacity: [0.35, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: [0.1, 0.9, 0.2, 1],
        }}
      />
      {/* Ring 2 (delayed phase) */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ backgroundColor: color }}
        animate={{
          scale: [0.6, 1.65],
          opacity: [0.25, 0],
        }}
        transition={{
          duration: 1.8,
          delay: 0.6,
          repeat: Infinity,
          ease: [0.1, 0.9, 0.2, 1],
        }}
      />
    </div>
  );
};

/**
 * M3 Centered Progress Loading Indicator
 * Pure, floating M3 Expressive shape morphing activity loader.
 * No box container, no text — pure living object morphing with harmonic pulsing rings.
 * Reference: https://m3.material.io/blog/building-with-m3-expressive#a581dc8d-0fdc-4357-bfb1-2841fa63809f
 */
export const M3CenteredProgress: React.FC<{
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ active = true, size = 'lg', className = '' }) => {
  if (!active) return null;

  const ringDimensions = size === 'lg' ? 140 : size === 'md' ? 96 : 64;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.24, ease: M3_EASE_EMPHASIZED }}
      className={`fixed inset-0 z-[120] flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-live="polite"
      role="status"
    >
      <div className="relative flex items-center justify-center">
        {/* Soft Concentric Pulsing Tonal Rings */}
        <M3PulsingRings size={ringDimensions} color="#1E293B" />
        {/* Pure M3 Expressive Object Morphing Core with Volumetric Tonal Disc */}
        <div className="absolute inset-0 flex items-center justify-center">
          <M3ShapeLoader size={size} color="#1D192B" showDisc={true} />
        </div>
      </div>
    </motion.div>
  );
};

/**
 * M3 Top Viewport Route Transition Bar (Kept for backwards-compatibility)
 */
export const M3TopRouteProgress: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[6px] pointer-events-none">
      <M3WavyProgress height={6} color="#121215" trackColor="rgba(0,0,0,0.06)" />
    </div>
  );
};
