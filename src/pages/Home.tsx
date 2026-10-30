import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { HeroReel } from '../features/hero/HeroReel';
import { ScrollShowcase } from '../components/ScrollShowcase';
import { ScrollSectionWrapper } from '../components/ScrollSectionWrapper';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import productsData from '../data/products.json';
import { CharmSvg } from '../components/CharmSvg';
import { Sparkles, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../lib/sound';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  // Scroll-linked parallax for Project Section (Featured Collection)
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectScroll } = useScroll({
    target: projectSectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProjectScroll = useSpring(projectScroll, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const headerParallaxY = useTransform(smoothProjectScroll, [0, 1], [-24, 24]);
  const oddCardsY = useTransform(smoothProjectScroll, [0, 1], [32, -32]);
  const evenCardsY = useTransform(smoothProjectScroll, [0, 1], [-20, 20]);
  const decorBadgeY = useTransform(smoothProjectScroll, [0, 1], [-40, 40]);

  // 4 Featured products
  const featuredProducts = productsData.filter((p) => p.isFeatured).slice(0, 4);

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : featuredProducts.length - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev < featuredProducts.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative space-y-0">
      {/* 1. Hero 15-Second Code-Driven Timeline Animation + 3D Toggle */}
      <HeroReel />

      {/* 2. Scroll-Driven Motion Graphic Showcase: Assemble on Scroll */}
      <ScrollShowcase />

      {/* 3. Brand Values - Minimalist Editorial 3-Column with Interactive Living Cards */}
      <ScrollSectionWrapper bg="paper" id="brand-values">
        <div className="layout-container space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="micro-label text-neutral-500 font-mono">03 · STANDAR</span>
              <span className="w-6 h-px bg-neutral-300" />
              <span className="micro-label text-neutral-400 font-mono">ENGINEERING EXCELLENCE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
              Kualitas <span className="accent-serif font-normal italic">Modular</span> Italia.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: '01 / MATERIAL',
                title: 'Baja Bedah 316L',
                desc: 'Tahan air, tidak berkarat, dan nyaman untuk kulit sensitif.',
                tag: 'Anti Karat · Hipoalergenik',
              },
              {
                num: '02 / MEKANISME',
                title: 'Pegas Internal 9mm',
                desc: 'Sistem kait tanpa solder. Pasang dan tukar modul dengan jari.',
                tag: 'Zero Solder · Quick-Snap',
              },
              {
                num: '03 / KALKULASI',
                title: 'Harga Transparan',
                desc: 'Total harga terhitung otomatis. Tanpa biaya tambahan tersembunyi.',
                tag: 'Real-Time · Zero Fee',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onMouseEnter={() => soundEngine.playHover()}
                className="group p-6 bg-white/95 border border-steel rounded-DEFAULT space-y-3 shadow-xs hover:shadow-xl hover:border-neutral-400 transition-all duration-300 relative overflow-hidden"
              >
                {/* Active hover top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-neutral-400 font-bold block">
                    {item.num}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-ink flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-neutral-400" />
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 4. Project Showcase: Featured Collection with Multi-Layer Parallax */}
      <div ref={projectSectionRef} className="relative">
        <ScrollSectionWrapper bg="blush" id="featured-collection">
          <div className="layout-container space-y-8 relative z-10">
            {/* Header with Parallax */}
            <motion.div
              style={prefersReduced ? undefined : { y: headerParallaxY }}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="micro-label text-neutral-600 font-mono">04 · KOLEKSI</span>
                  <span className="w-8 h-px bg-neutral-400" />
                  <span className="micro-label text-neutral-500 font-mono">CURATED EDITIONS</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight mt-1">
                  Koleksi <span className="accent-serif font-normal">Pilihan</span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="p-2.5 rounded-DEFAULT border border-steel bg-white hover:bg-neutral-100 text-ink transition-colors shadow-xs"
                  aria-label="Item sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="p-2.5 rounded-DEFAULT border border-steel bg-white hover:bg-neutral-100 text-ink transition-colors shadow-xs"
                  aria-label="Item berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <Link
                  to="/shop"
                  data-cursor="Shop"
                  className="ml-2 text-xs font-semibold text-ink underline underline-offset-4 hover:text-neutral-600"
                >
                  Lihat Semua
                </Link>
              </div>
            </motion.div>

            {/* 4 Cards Grid with Staggered Parallax Depths */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  style={prefersReduced ? undefined : { y: idx % 2 === 0 ? oddCardsY : evenCardsY }}
                  className={`transition-all duration-300 ${
                    carouselIndex === idx ? 'ring-2 ring-ink ring-offset-2 rounded-DEFAULT' : ''
                  }`}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Dot Indicators & Floating Unboxed Metadata */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-300/40">
              <motion.div
                style={prefersReduced ? undefined : { y: decorBadgeY }}
                className="hidden sm:flex items-center gap-2 text-neutral-500 font-mono text-[10px]"
              >
                <span>316L SURGICAL STEEL</span>
                <span>·</span>
                <span>ITALIAN MODULAR MECHANISM</span>
                <span>·</span>
                <span>WATER RESISTANT</span>
              </motion.div>

              <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
                {featuredProducts.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setCarouselIndex(dotIdx)}
                    aria-label={`Lihat produk unggulan ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      carouselIndex === dotIdx ? 'w-8 bg-ink' : 'w-2 bg-neutral-400 hover:bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollSectionWrapper>
      </div>

      {/* 5. Customizer Teaser - Interactive Studio Card */}
      <ScrollSectionWrapper bg="paper" id="customizer-teaser">
        <div className="layout-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-DEFAULT border border-steel bg-white/95 p-8 md:p-14 relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 micro-label bg-blush text-ink px-3 py-1 rounded-full border border-steel font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>18-SLOT STUDIO</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
                  Rakit Gelangmu <span className="accent-serif font-normal italic">Sendiri.</span>
                </h2>

                <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-lg">
                  Pilih ukuran lengan, susun charm favoritmu, dan lihat kalkulasi harganya secara langsung.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/customize')}
                    className="shadow-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Mulai Rakit</span>
                  </Button>
                  <Link
                    to="/about"
                    data-cursor="Read"
                    className="text-xs font-semibold text-ink underline underline-offset-4 hover:text-neutral-600"
                  >
                    Pelajari Mekanisme
                  </Link>
                </div>
              </div>

              {/* Teaser Visual Preview with Real Photography */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 bg-paper rounded-DEFAULT border border-steel space-y-4 overflow-hidden relative group"
              >
                <div className="w-full aspect-4/3 rounded-DEFAULT overflow-hidden border border-steel relative shadow-xs">
                  <img
                    src="/images/bracelets/duo-bracelets-satin.jpg"
                    alt="Custom Italian Charm Bracelet Studio Preview"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 micro-label bg-white/90 text-ink px-2.5 py-0.5 rounded font-bold border border-steel shadow-xs font-mono">
                    HASIL RAKITAN
                  </div>
                </div>

                <div className="w-full flex items-center justify-between pt-1">
                  <div>
                    <span className="micro-label text-neutral-400 font-mono block">MODULAR 18-SLOT</span>
                    <span className="text-sm font-mono font-bold text-ink">Mulai Rp 99.000</span>
                  </div>
                  <div className="flex items-center -space-x-1">
                    <div className="w-7 h-7 rounded-sm border border-steel bg-white overflow-hidden shadow-xs shrink-0">
                      <CharmSvg symbol="heart" />
                    </div>
                    <div className="w-7 h-7 rounded-sm border border-steel bg-white overflow-hidden shadow-xs shrink-0">
                      <CharmSvg symbol="star" />
                    </div>
                    <div className="w-7 h-7 rounded-sm border border-steel bg-white overflow-hidden shadow-xs shrink-0">
                      <CharmSvg symbol="alien" />
                    </div>
                    <div className="w-7 h-7 rounded-sm border border-steel bg-white overflow-hidden shadow-xs shrink-0">
                      <CharmSvg symbol="plain" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollSectionWrapper>
    </div>
  );
};
