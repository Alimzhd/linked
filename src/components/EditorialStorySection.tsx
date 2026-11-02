import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Sliders, Layers } from 'lucide-react';
import { Button } from './Button';
import { soundEngine } from '../lib/sound';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundEngine.playHover()}
      style={style}
      className={`relative overflow-hidden rounded-DEFAULT border border-steel bg-white p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 group ${className}`}
    >
      {/* Interactive Radial Spotlight */}
      {mousePos.active && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(18, 18, 18, 0.04), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export const EditorialStorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax differential offsets
  const parallaxCol1 = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const parallaxCol2 = useTransform(scrollYProgress, [0, 1], [-15, 20]);
  const headerY = useTransform(scrollYProgress, [0, 0.4], [24, 0]);

  return (
    <div ref={sectionRef} className="w-full flex flex-col gap-8 scroll-mt-24">
      {/* Editorial Section Header */}
      <motion.div
        style={reduceMotion ? undefined : { y: headerY }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-steel"
      >
        <div>
          <div className="overflow-hidden">
            <motion.h2
              initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold text-2xl sm:text-4xl text-ink tracking-tight"
            >
              Materials &amp; <span className="font-serif italic font-normal">Craft</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden mt-1">
            <motion.p
              initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-neutral-600 max-w-xl leading-relaxed"
            >
              Presisi baja bedah 316L Italia. Dirakit, disesuaikan, dan tahan lama tanpa kehilangan kilau.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs text-neutral-500 font-mono sm:text-right"
        >
          316L Surgical Alloy · 9mm Standard
        </motion.div>
      </motion.div>

      {/* 4-Card Bento Grid with Differential Parallax: Anchored Coordinates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 01: 316L Metallurgy */}
        <motion.div
          style={reduceMotion ? undefined : { y: parallaxCol1 }}
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard className="min-h-[200px]">
            <div>
              <div className="w-8 h-8 rounded-md bg-paper border border-steel flex items-center justify-center mb-3 text-ink">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-ink mb-1 group-hover:text-neutral-700 transition-colors">
                Marine-Grade 316L
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Paduan austenitik anti-korosi. Kebal air garam, keringat, dan tarnish harian.
              </p>
            </div>
            <div className="pt-3 border-t border-steel text-[10px] text-neutral-500 font-mono mt-3">
              Hipoalergenik &amp; Bebas Karat
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Card 02: 9mm Standard */}
        <motion.div
          style={reduceMotion ? undefined : { y: parallaxCol2 }}
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard className="min-h-[200px]">
            <div>
              <div className="w-8 h-8 rounded-md bg-paper border border-steel flex items-center justify-center mb-3 text-ink">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-ink mb-1 group-hover:text-neutral-700 transition-colors">
                Pitch Standar 9mm
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Standar klasik Florence 1987. Mengunci langsung dengan seluruh modul charm.
              </p>
            </div>
            <div className="pt-3 border-t border-steel text-[10px] text-neutral-500 font-mono mt-3">
              Universal Italian Geometry
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Card 03: Internal Spring Tension */}
        <motion.div
          style={reduceMotion ? undefined : { y: parallaxCol1 }}
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard className="min-h-[200px]">
            <div>
              <div className="w-8 h-8 rounded-md bg-paper border border-steel flex items-center justify-center mb-3 text-ink">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-ink mb-1 group-hover:text-neutral-700 transition-colors">
                Pegas Kompresi Kembar
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Pegas musik internal 304. Regangan fleksibel tanpa perkakas khusus.
              </p>
            </div>
            <div className="pt-3 border-t border-steel text-[10px] text-neutral-500 font-mono mt-3">
              Teruji 50.000+ kali ekspansi
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Card 04: PVD Coating & Enamel */}
        <motion.div
          style={reduceMotion ? undefined : { y: parallaxCol2 }}
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard className="min-h-[200px]">
            <div>
              <div className="w-8 h-8 rounded-md bg-paper border border-steel flex items-center justify-center mb-3 text-ink">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-ink mb-1 group-hover:text-neutral-700 transition-colors">
                PVD &amp; Vitreous Enamel
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Inlay enamel bakar 800°C dan pelapis titanium PVD. Permukaan rata anti gores.
              </p>
            </div>
            <div className="pt-3 border-t border-steel text-[10px] text-neutral-500 font-mono mt-3">
              Anti Pudar &amp; Scratch Flush
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Editorial Streetwear Manifesto Card */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 sm:p-10 rounded-DEFAULT border border-steel bg-paper flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
      >
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 micro-label font-mono text-neutral-500">
            <Sparkles className="w-3.5 h-3.5 text-ink" />
            <span>EDITORIAL MANIFESTO</span>
          </div>
          <h3 className="font-extrabold text-xl sm:text-2xl text-ink leading-snug tracking-tight">
            Rantai statis tidak berubah. LINKED! kanvas modular yang berkembang bersama ceritamu.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Setiap momen dan cerita dirangkai satu per satu ke dalam tautan baja modular abadi.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              soundEngine.playClick();
              const el = document.getElementById('customizer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Mulai Rakit</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditorialStorySection;

