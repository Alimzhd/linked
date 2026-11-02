import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { AsciiHalftoneHero } from '../components/hero/AsciiHalftoneHero';
import { ScrollShowcase } from '../components/ScrollShowcase';
import { AccordionPanels } from '../components/AccordionPanels';
import { EditorialStorySection } from '../components/EditorialStorySection';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import productsData from '../data/products.json';
import { CharmSvg } from '../components/CharmSvg';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundEngine } from '../lib/sound';
import { useCurtainParallax } from '../lib/curtain-scroll';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  // Initialize Lenis momentum scrolling and GSAP differential curtain parallax
  useCurtainParallax();

  // Scroll-linked parallax for Curated Editions Section
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
    soundEngine.playClick();
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : featuredProducts.length - 1));
  };

  const handleNextSlide = () => {
    soundEngine.playClick();
    setCarouselIndex((prev) => (prev < featuredProducts.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative space-y-0">
      {/* LAYER 1: BASE HERO REEL */}
      <section id="hero" className="relative z-10 w-full origin-top will-change-transform">
        <AsciiHalftoneHero />
      </section>

      {/* 2. SCROLL-DRIVEN MOTION GRAPHIC: ASSEMBLE ON SCROLL */}
      <div className="relative z-18 w-full">
        <ScrollShowcase />
      </div>

      {/* LAYER 2: BUILDER STUDIO */}
      <section
        id="customizer"
        className="relative z-20 w-full scroll-mt-20 border-t border-steel bg-paper shadow-[0_-20px_50px_rgba(0,0,0,0.06)] pt-12 sm:pt-16 pb-16 origin-top will-change-transform"
      >
        <div className="layout-container relative z-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-DEFAULT border border-steel bg-white/95 p-8 md:p-14 relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
                  Rakit Gelangmu <span className="accent-serif font-normal italic">Sendiri.</span>
                </h2>

                <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-lg">
                  Pilih ukuran lengan, susun charm favoritmu, dan lihat kalkulasi harganya secara langsung tanpa alat khusus.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      soundEngine.playClick();
                      navigate('/customize');
                    }}
                    className="shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 mr-1 text-blush" />
                    <span>Mulai Rakit</span>
                  </Button>
                  <Link
                    to="/about"
                    data-cursor="Read"
                    onClick={() => soundEngine.playClick()}
                    className="text-xs font-semibold text-ink underline underline-offset-4 hover:text-neutral-600"
                  >
                    Pelajari Mekanisme
                  </Link>
                </div>
              </div>

              {/* Teaser Visual Preview with Responsive Motion Entrance/Outro */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, scale: 0.94, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={prefersReduced ? undefined : { scale: 1.02 }}
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
      </section>

      {/* LAYER 3: ACCORDION SHOWCASE (accordion.net.au inspired layout morphing) */}
      <section
        id="showcase"
        className="relative z-30 w-full scroll-mt-20 -mt-6 sm:-mt-8 rounded-t-[32px] sm:rounded-t-[40px] border-t border-steel bg-white shadow-[0_-25px_60px_rgba(0,0,0,0.08)] pt-12 sm:pt-16 pb-16 px-4 sm:px-8 origin-top will-change-transform"
      >
        <div className="layout-container relative z-10">
          <AccordionPanels />
        </div>
      </section>

      {/* LAYER 4: MATERIALS & CRAFT (Bento Specs with differential parallax) */}
      <section
        id="specs"
        className="relative z-40 w-full scroll-mt-20 -mt-6 sm:-mt-8 rounded-t-[32px] sm:rounded-t-[40px] border-t border-steel bg-paper shadow-[0_-30px_70px_rgba(0,0,0,0.09)] pt-12 sm:pt-16 pb-16 px-4 sm:px-8 origin-top will-change-transform"
      >
        <div className="layout-container relative z-10">
          <EditorialStorySection />
        </div>
      </section>

      {/* LAYER 5: CURATED EDITIONS (Featured Collection with multi-layer parallax) */}
      <div ref={projectSectionRef} className="relative z-50">
        <section
          id="catalog"
          className="relative w-full scroll-mt-20 -mt-6 sm:-mt-8 rounded-t-[32px] sm:rounded-t-[40px] border-t border-steel bg-blush shadow-[0_-30px_70px_rgba(0,0,0,0.08)] pt-12 sm:pt-16 pb-20 origin-top will-change-transform"
        >
          <div className="layout-container space-y-8 relative z-10">
            {/* Header with Parallax & Split-line Masks */}
            <motion.div
              style={prefersReduced ? undefined : { y: headerParallaxY }}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4"
            >
              <div>
                <div className="overflow-hidden">
                  <motion.h2
                    initial={prefersReduced ? false : { y: '100%', opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight"
                  >
                    Koleksi <span className="accent-serif font-normal">Pilihan</span>
                  </motion.h2>
                </div>
              </div>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2"
              >
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
                  onClick={() => soundEngine.playClick()}
                  className="ml-2 text-xs font-semibold text-ink underline underline-offset-4 hover:text-neutral-600"
                >
                  Lihat Semua
                </Link>
              </motion.div>
            </motion.div>

            {/* 4 Cards Grid with Staggered Parallax Depths & Responsive Bidirectional Entry/Outro */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
                initial={prefersReduced ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={prefersReduced ? undefined : { y: decorBadgeY }}
                className="hidden sm:flex items-center gap-2 text-neutral-500 font-mono text-[10px]"
              >
                <span>316L SURGICAL STEEL</span>
                <span>·</span>
                <span>ITALIAN MODULAR MECHANISM</span>
                <span>·</span>
                <span>WATER RESISTANT</span>
              </motion.div>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-2 mx-auto sm:mx-0"
              >
                {featuredProducts.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setCarouselIndex(dotIdx);
                    }}
                    aria-label={`Lihat produk unggulan ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      carouselIndex === dotIdx ? 'w-8 bg-ink' : 'w-2 bg-neutral-400 hover:bg-neutral-600'
                    }`}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
