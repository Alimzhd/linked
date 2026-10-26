import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import faqData from '../data/faq.json';
import { FAQItem } from '../types';
import { CharmSvg } from '../components/CharmSvg';
import { ChevronDown, Sparkles, Gift, ShieldCheck, HelpCircle } from 'lucide-react';

export const About: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
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
    <div className="layout-container py-12 md:py-20 space-y-20 md:space-y-28">
      {/* 1. Brand Narrative Hero */}
      <section className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="micro-label text-neutral-500">04 · TENTANG LINKED!</span>
          <span className="w-8 h-px bg-steel" />
          <span className="micro-label text-neutral-400">FLORENCE HERITAGE</span>
        </div>

        <h1 className="text-3xl md:text-6xl font-extrabold text-ink tracking-tight">
          Small Charms, <span className="accent-serif font-normal">Big Personality.</span>
        </h1>

        <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
          LINKED! lahir dari apresiasi terhadap desain perhiasan modular Italia era akhir 80-an di Florence. Gelang ini bukan sekadar aksesoris, melainkan kanvas modular yang dapat terus berkembang mengikuti setiap fase hidup dan memorimu.
        </p>

        <div className="pt-2 flex items-center gap-4">
          <Link
            to="/customize"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-ink text-paper px-5 py-3 rounded-DEFAULT hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rakit Gelang Pertamamu</span>
          </Link>
          <Link
            to="/shop"
            className="text-xs font-semibold text-ink underline underline-offset-4 hover:text-neutral-600"
          >
            Jelajahi Koleksi Charm
          </Link>
        </div>
      </section>

      {/* 2. Why Italian Bracelet (Concrete comparison) */}
      <section className="space-y-8">
        <div className="max-w-xl space-y-2">
          <span className="micro-label text-neutral-500 font-mono">KONSTRUKSI & KEUNGGULAN</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Kenapa Gelang Modular <span className="accent-serif font-normal">Italia?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-DEFAULT bg-white border border-steel space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blush flex items-center justify-center text-ink font-bold font-mono text-xs">
                VS
              </span>
              <h3 className="text-lg font-bold text-ink">Bukan Gelang Charm <span className="accent-serif font-normal">Konvensional</span></h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Gelang gantung tradisional bergantung pada tali atau rantai kawat tipis yang mudah tersangkut dan putus saat beraktivitas. LINKED! menggunakan flat modular links 9mm yang menyatu rapi di pergelangan tangan, bebas nyangkut di pakaian, dan sangat nyaman dipakai tidur maupun olahraga.
            </p>
          </div>

          <div className="p-8 rounded-DEFAULT bg-white border border-steel space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-paper border border-steel flex items-center justify-center text-ink">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-ink"><span className="accent-serif font-normal">Surgical</span> Grade Stainless Steel 316L</h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Bukan tembaga berlapis emas imitasi yang mudah pudar dalam hitungan minggu. Material kami adalah baja bedah solid anti-karat yang tidak menghitam kena parfum, lotion, atau air hujan. Polesan logam satin memberikan pantulan mewah alami tanpa lapisan krom beracun.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 3-Step Assembly Guide (How to attach charms) */}
      <section className="space-y-10">
        <div className="max-w-xl space-y-2">
          <span className="micro-label text-neutral-500 font-mono">PANDUAN PERAKITAN MANDIRI</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Cara Pasang & Tukar <span className="accent-serif font-normal">Charm.</span>
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Tidak memerlukan obeng, tang, atau alat khusus. Ikuti tiga langkah mudah berikut menggunakan tanganmu:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assemblySteps.map((step) => (
            <div
              key={step.step}
              className="p-6 md:p-8 rounded-DEFAULT bg-white border border-steel space-y-5 flex flex-col justify-between shadow-xs hover:border-neutral-400 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold font-mono text-neutral-300">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 p-1 rounded border border-steel bg-paper">
                    <CharmSvg symbol={step.symbol} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-ink">{step.title}</h3>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>

              <div className="pt-2 border-t border-steel/60 micro-label text-neutral-400 font-mono">
                LANGKAH {step.step} · LINKED! TUTORIAL
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Packaging & Gift Options */}
      <section className="rounded-DEFAULT border border-steel bg-blush/30 p-8 md:p-14 space-y-8">
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-neutral-700" />
            <span className="micro-label text-neutral-600 font-mono">PILIHAN KEMASAN</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Packaging Elegan untuk <span className="accent-serif font-normal">Hadiah.</span>
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Setiap gelang LINKED! disiapkan dengan standar kemasan protektif agar tiba dalam kondisi sempurna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-DEFAULT bg-white border border-steel space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Standard <span className="accent-serif font-normal">Canvas</span> Pouch</h3>
              <span className="micro-label bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-mono">
                Gratis
              </span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Kantong kanvas katun serut bertekstur lembut untuk penyimpanan gelang harian agar terlindungi dari debu dan goresan saat dibawa bepergian.
            </p>
          </div>

          <div className="p-6 rounded-DEFAULT bg-white border border-neutral-400 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Signature <span className="accent-serif font-normal">Gift</span> Box Set</h3>
              <span className="micro-label bg-blush text-ink px-2 py-0.5 rounded font-mono font-bold">
                +Rp 25.000
              </span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Hardbox tebal bertekstur matte dengan bantalan busa beludru hitam di dalamnya, pita satin penutup, serta kartu ucapan kustom bertuliskan pesan pribadimu.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Accordion FAQ Section */}
      <section id="faq" className="space-y-8 scroll-mt-28">
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-neutral-600" />
            <span className="micro-label text-neutral-500 font-mono">PERTANYAAN UMUM</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            Tanya Jawab <span className="accent-serif font-normal">Seputar</span> LINKED!
          </h2>
        </div>

        <div className="border border-steel rounded-DEFAULT bg-white divide-y divide-steel overflow-hidden shadow-xs">
          {(faqData as FAQItem[]).map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 focus:outline-none focus-visible:bg-neutral-50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-bold text-ink tracking-tight">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-ink' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 md:px-6 md:pb-6 text-xs md:text-sm text-neutral-600 leading-relaxed animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
