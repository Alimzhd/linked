import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Layers, Sliders, Sparkles } from 'lucide-react';
import { soundEngine } from '../lib/sound';

interface AccordionPanelItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details: { label: string; value: string }[];
}

const PANELS: AccordionPanelItem[] = [
  {
    id: 'alloy',
    num: '01',
    title: 'Marine 316L Alloy',
    subtitle: 'Cold-Forged Surgical Grade',
    tag: 'METALLURGY',
    description: 'Baja bedah 316L tahan air, keringat, dan karat. Hipoalergenik untuk kulit sensitif.',
    icon: Shield,
    details: [
      { label: 'ALLOY', value: 'AISI 316L' },
      { label: 'GRADE', value: 'Surgical Safe' },
      { label: 'FINISH', value: 'Mirror Polish' },
    ],
  },
  {
    id: 'heritage',
    num: '02',
    title: '9mm Modular Pitch',
    subtitle: 'Universal Italian Standard',
    tag: 'INTERLOCK',
    description: 'Geometri klasik Florence 1987. Mengunci langsung ke seluruh koleksi charm modular.',
    icon: Layers,
    details: [
      { label: 'PITCH', value: '10mm x 9mm' },
      { label: 'COMPAT', value: 'Universal 9mm' },
      { label: 'CAPACITY', value: '18 Links' },
    ],
  },
  {
    id: 'springs',
    num: '03',
    title: 'Twin Spring Clasp',
    subtitle: 'Tool-Free Resizing',
    tag: 'MECHANICS',
    description: 'Pegas kompresi ganda Grade 304. Pasang, lepas, dan atur ukuran dengan tangan.',
    icon: Sliders,
    details: [
      { label: 'SPRING', value: '0.45mm Wire' },
      { label: 'RATING', value: '50.000+ Siklus' },
      { label: 'TOOLS', value: 'Zero Tools' },
    ],
  },
  {
    id: 'finish',
    num: '04',
    title: 'PVD & Kiln Enamel',
    subtitle: 'Permanent Surface Fusion',
    tag: 'FINISHING',
    description: 'Inlay enamel bakar 800°C dan lapisan titanium PVD. Permukaan rata anti gores.',
    icon: Sparkles,
    details: [
      { label: 'COATING', value: '1.2µm PVD' },
      { label: 'ENAMEL', value: '800°C Kiln' },
      { label: 'SURFACE', value: 'Flush Mount' },
    ],
  },
];

export const AccordionPanels: React.FC = () => {
  const [activePanelId, setActivePanelId] = useState<string>('alloy');
  const reduceMotion = useReducedMotion();

  const handleSelect = (id: string) => {
    if (activePanelId !== id) {
      soundEngine.playHover();
      setActivePanelId(id);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-steel">
        <div>
          <div className="overflow-hidden">
            <motion.h2
              initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold text-2xl sm:text-4xl text-ink tracking-tight"
            >
              Arsitektur Modular LINKED.
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs text-neutral-500 font-mono sm:text-right hidden sm:block"
        >
          Pilih modul untuk melihat spesifikasi
        </motion.div>
      </div>

      {/* Anchored 4-Card Specification Grid: Zero Layout Shifts on Hover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {PANELS.map((panel, idx) => {
          const isActive = activePanelId === panel.id;
          const Icon = panel.icon;

          return (
            <motion.div
              key={panel.id}
              onClick={() => handleSelect(panel.id)}
              onMouseEnter={() => handleSelect(panel.id)}
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative rounded-DEFAULT border p-6 flex flex-col justify-between transition-colors duration-200 cursor-pointer select-none min-h-[360px] ${
                isActive
                  ? 'bg-white border-ink shadow-md ring-1 ring-ink/10'
                  : 'bg-paper border-steel hover:border-neutral-400 hover:bg-white'
              }`}
            >
              {/* Header inside Card */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-steel/60">
                  <span className="font-mono text-sm font-bold text-ink">
                    {panel.num}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                      {panel.tag}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                    )}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="w-8 h-8 rounded-md bg-paper border border-steel flex items-center justify-center text-ink">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-lg text-ink tracking-tight pt-1">
                    {panel.title}
                  </h3>
                  <div className="font-mono text-[11px] text-neutral-500">
                    {panel.subtitle}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                    {panel.description}
                  </p>
                </div>
              </div>

              {/* Fixed Specs List at Bottom */}
              <div className="pt-4 border-t border-steel/60 space-y-1.5">
                {panel.details.map((detail, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center justify-between text-[10px] font-mono"
                  >
                    <span className="text-neutral-500 uppercase">{detail.label}</span>
                    <span className="font-semibold text-ink">{detail.value}</span>
                  </div>
                ))}
                <div className="pt-2 flex items-center justify-between text-[9px] font-mono text-neutral-400">
                  <span>STATUS</span>
                  <span className={isActive ? 'font-bold text-ink' : ''}>
                    {isActive ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionPanels;
