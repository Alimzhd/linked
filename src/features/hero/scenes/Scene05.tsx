import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/Button';

/**
 * Scene 05: Wordmark reveal and CTA buttons
 * Duration: 13000-15000ms (2 seconds)
 * 
 * Displays:
 * - LINKED! wordmark with mask animation (600ms)
 * - Headline "YOUR WRIST, YOUR STORY."
 * - Two interactive buttons: "Shop Now" (navigate to /shop) and "Start Customizing" (navigate to /customize)
 * - Scene label "05 · MEREK", timecode "00:13 - 00:15"
 * 
 * **Validates: Requirements 3.14, 3.15, 3.16**
 */
export const Scene05: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="scene-05"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center space-y-8"
    >
      {/* Brand badge with mask reveal animation */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 micro-label text-neutral-500 border border-steel bg-white px-3 py-1 rounded-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
          <span>LINKED! · ITALIAN CHARM BRACELET</span>
        </div>

        {/* Headline with mask reveal */}
        <motion.h1
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl font-extrabold text-ink tracking-tighter uppercase"
        >
          YOUR WRIST, <span className="accent-serif font-normal italic">YOUR STORY.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm md:text-base text-neutral-600 max-w-md mx-auto leading-relaxed"
        >
          Gelang kecil, cerita yang tak ada habisnya. Mix your charms, make it yours!
        </motion.p>
      </motion.div>

      {/* CTA Buttons with stagger */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 pt-2"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/shop')}
          className="shadow-md"
        >
          <span>Shop Now</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/customize')}
          className="bg-white/80"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start Customizing</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
