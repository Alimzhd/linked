import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import faqData from '../data/faq.json';
import { FAQItem } from '../types';
import { CharmSvg } from '../components/CharmSvg';
import { ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../lib/sound';

export const About: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    soundEngine.playClick();
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const assemblySteps = [
    {
      step: '01',
      title: 'Rentangkan Dua Modul',
      desc: 'Pegang dua link yang bersebelahan dengan jari telunjuk dan ibu jari. Tarik perlahan ke arah luar berlawanan untuk meregangkan pegas internal link sekitar 2–3 mm.',
      symbol: 'plain',
    },
    {
      step: '02',
      title: 'Lepaskan Kait Geser',
      desc: 'Saat pegas meregang, geser salah satu link ke arah atas diagonal. Pengait baja internal akan meluncur keluar dari rel modul sampingnya.',
      symbol: 'bevel',
    },
    {
      step: '03',
      title: 'Selipkan Charm Baru',
      desc: 'Arahkan pengait charm pilihanmu ke dalam celah rel modul gelang, lalu tekan perlahan ke dalam hingga terdengar klik halus tanda pegas mengunci rapat.',
      symbol: 'heart',
    },
  ];

  return (
    <div className="layout-container py-12 md:py-20 space-y-20 md:space-y-28 overflow-hidden">
      {/* 1. Brand Narrative Hero with Living Staggered Editorial Entrance */}
      <div className="space-y-6 max-w-3xl">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-6xl font-extrabold text-ink tracking-tight"
          >
            Small Charms, <span className="accent-serif font-normal italic">Big Personality.</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mt-1">
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-neutral-700 leading-relaxed"
          >
            LINKED! lahir dari apresiasi terhadap desain perhiasan modular Italia era akhir 80-an di Florence. Gelang ini bukan sekadar aksesoris, melainkan kanvas modular yang dapat terus berkembang mengikuti setiap fase hidup dan memorimu.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/customize"
            data-cursor="Build"
            onMouseEnter={() => soundEngine.playHover()}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-ink text-paper px-5 py-3 rounded-DEFAULT hover:bg-neutral-800 transition-all hover:shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rakit Gelang Pertamamu</span>
          </Link>
          <Link
            to="/shop"
            data-cursor="Shop"
            className="text-xs font-semibold text-ink underline underline-offset-4 hover:text-neutral-600 transition-colors"
          >
            Jelajahi Koleksi Charm
          </Link>
        </motion.div>
      </div>

      {/* 2. Why Italian Bracelet (Concrete comparison) with Staggered Viewport Entrance */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-2"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Kenapa Gelang Modular <span className="accent-serif font-normal italic">Italia?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-8 rounded-DEFAULT bg-white border border-steel space-y-4 shadow-xs hover:shadow-lg hover:border-neutral-400 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blush flex items-center justify-center text-ink font-bold font-mono text-xs shadow-xs">
                VS
              </span>
              <h3 className="text-lg font-bold text-ink">Bukan Gelang Charm <span className="accent-serif font-normal italic">Konvensional</span></h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Gelang gantung tradisional bergantung pada tali atau rantai kawat tipis yang mudah tersangkut dan putus saat beraktivitas. LINKED! menggunakan flat modular links 9mm yang menyatu rapi di pergelangan tangan, bebas nyangkut di pakaian, dan sangat nyaman dipakai tidur maupun olahraga.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-8 rounded-DEFAULT bg-white border border-steel space-y-4 shadow-xs hover:shadow-lg hover:border-neutral-400 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-paper border border-steel flex items-center justify-center text-ink shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-ink"><span className="accent-serif font-normal italic">Surgical</span> Grade Stainless Steel 316L</h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Bukan tembaga berlapis emas imitasi yang mudah pudar dalam hitungan minggu. Material kami adalah baja bedah solid anti-karat yang tidak menghitam kena parfum, lotion, atau air hujan. Polesan logam satin memberikan pantulan mewah alami tanpa lapisan krom beracun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. 3-Step Assembly Guide with Interactive Progression Cards */}
      <section className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-2"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Cara Pasang & Tukar <span className="accent-serif font-normal italic">Charm.</span>
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Tidak memerlukan obeng, tang, atau alat khusus. Ikuti tiga langkah mudah berikut menggunakan tanganmu:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assemblySteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => soundEngine.playHover()}
              className="group p-6 md:p-8 rounded-DEFAULT bg-white border border-steel space-y-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-neutral-400 transition-all duration-300 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold font-mono text-neutral-300 group-hover:text-ink transition-colors duration-300">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 p-1 rounded-DEFAULT border border-steel bg-paper group-hover:rotate-6 transition-transform duration-300 shadow-xs">
                    <CharmSvg symbol={step.symbol} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-ink">{step.title}</h3>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>

              <div className="pt-2 border-t border-steel/60 micro-label text-neutral-400 font-mono flex items-center justify-between">
                <span>LANGKAH {step.step}</span>
                <span className="text-neutral-500">TUTORIAL</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Packaging & Gift Options with Tactile Presence */}
      <motion.section
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-DEFAULT border border-steel bg-blush/30 p-8 md:p-14 space-y-8"
      >
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Packaging Elegan untuk <span className="accent-serif font-normal italic">Hadiah.</span>
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Setiap gelang LINKED! disiapkan dengan standar kemasan protektif agar tiba dalam kondisi sempurna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-DEFAULT bg-white border border-steel space-y-3 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Standard <span className="accent-serif font-normal italic">Canvas</span> Pouch</h3>
              <span className="micro-label bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-mono">
                Gratis
              </span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Kantong kanvas katun serut bertekstur lembut untuk penyimpanan gelang harian agar terlindungi dari debu dan goresan saat dibawa bepergian.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-DEFAULT bg-white border border-neutral-400 space-y-3 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Signature <span className="accent-serif font-normal italic">Gift</span> Box Set</h3>
              <span className="micro-label bg-blush text-ink px-2 py-0.5 rounded font-mono font-bold">
                +Rp 25.000
              </span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Hardbox tebal bertekstur matte dengan bantalan busa beludru hitam di dalamnya, pita satin penutup, serta kartu ucapan kustom bertuliskan pesan pribadimu.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Accordion FAQ Section with Smooth Spring Toggle */}
      <section id="faq" className="space-y-8 scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-2"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Tanya Jawab <span className="accent-serif font-normal italic">Seputar</span> LINKED!
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="border border-steel rounded-DEFAULT bg-white divide-y divide-steel overflow-hidden shadow-xs"
        >
          {(faqData as FAQItem[]).map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 focus:outline-none focus-visible:bg-neutral-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-bold text-ink tracking-tight">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-ink' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-6 text-xs md:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100/60 pt-2">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};
