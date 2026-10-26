import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroReel } from '../features/hero/HeroReel';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import productsData from '../data/products.json';
import { CharmSvg } from '../components/CharmSvg';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // 4 Featured products
  const featuredProducts = productsData.filter((p) => p.isFeatured).slice(0, 4);

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : featuredProducts.length - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev < featuredProducts.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-20 md:space-y-28">
      {/* 1. Hero 15-Second Code-Driven Timeline Animation */}
      <HeroReel />

      {/* 2. Brand Value Statement - Prose Narrative */}
      <section className="layout-container space-y-8">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2">
            <span className="micro-label text-neutral-500">01 · BRAND VALUES</span>
            <span className="w-8 h-px bg-steel" />
            <span className="micro-label text-neutral-400">KENAPA LINKED!</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight leading-tight">
            Standar Perhiasan <span className="accent-serif font-normal">Modular</span> Italia.
          </h2>
          
          <div className="space-y-4 text-sm md:text-base text-neutral-600 leading-relaxed">
            <p>
              LINKED! menghidupkan kembali tradisi gelang modular 9mm asal Florence dengan material stainless steel modern yang kokoh dan bebas dipersonalisasi. Tiap link dibuat dari <strong className="text-ink">stainless steel 316L</strong> — logam kualitas bedah yang tahan air, keringat, dan tidak akan berkarat atau menghitam seiring waktu. Hipoalergenik untuk kulit sensitif.
            </p>
            
            <p>
              Mekanisme kunci menggunakan <strong className="text-ink">pegas geser internal 9mm</strong> tanpa rantai kawat tambahan. Tiap modul saling mengunci dengan sistem pegas yang bisa dibongkar pasang dengan jari tanpa alat. Charm duduk flush di dalam link, bukan menggantung seperti gelang konvensional.
            </p>
            
            <p>
              Harga terhitung real-time di layar builder dengan rumus sederhana: <strong className="text-ink">Harga Dasar Gelang + Tambahan Tiap Charm = Total Akhir</strong>. Tidak ada biaya tersembunyi. Bebas coba susunan sebanyak yang kamu mau sebelum memesan.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Carousel (Estra style horizontal slide with dot indicators) */}
      <section className="layout-container space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-steel">
          <div>
            <div className="flex items-center gap-2">
              <span className="micro-label text-neutral-500">02 · KOLEKSI UNGGULAN</span>
              <span className="w-8 h-px bg-steel" />
              <span className="micro-label text-neutral-400">CURATED SELECTION</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight mt-1">
              Rekomendasi <span className="accent-serif font-normal">Pilihan</span> Minggu Ini
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="p-2.5 rounded-DEFAULT border border-steel bg-white hover:bg-neutral-100 text-ink transition-colors"
              aria-label="Item sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="p-2.5 rounded-DEFAULT border border-steel bg-white hover:bg-neutral-100 text-ink transition-colors"
              aria-label="Item berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              to="/shop"
              className="ml-2 text-xs font-semibold text-ink underline underline-offset-4 hover:text-neutral-600"
            >
              Lihat Semua
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`transition-all duration-300 ${
                carouselIndex === idx ? 'ring-2 ring-ink ring-offset-2 rounded-DEFAULT' : ''
              }`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Estra-style Dot Indicators */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {featuredProducts.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCarouselIndex(dotIdx)}
              aria-label={`Lihat produk unggulan ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                carouselIndex === dotIdx ? 'w-8 bg-ink' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. Customizer Teaser: One bracelet preview, one CTA button */}
      <section className="layout-container">
        <div className="rounded-DEFAULT border border-steel bg-white p-8 md:p-14 relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 micro-label bg-blush text-ink px-3 py-1 rounded-full border border-steel">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FITUR ANDALAN · 18-SLOT BUILDER</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
                Rakit Gelangmu <span className="accent-serif font-normal">Sendiri.</span>
              </h2>

              <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-lg">
                Cobalah studio interaktif kami. Pilih ukuran pergelangan tangan (S, M, atau L), pasang dan geser charm favoritmu dengan snap magnetik, lalu lihat hasil visual dan harganya secara langsung.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/customize')}
                  className="shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Customizing</span>
                </Button>
                <Link
                  to="/about"
                  className="text-xs font-semibold text-ink underline underline-offset-4 hover:text-neutral-600"
                >
                  Pelajari Cara Kerja Gelang
                </Link>
              </div>
            </div>

            {/* Teaser Visual Preview */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-paper rounded-xl border border-steel space-y-4">
              <span className="micro-label text-neutral-400 font-mono">CONTOH SUSUNAN 18-SLOT</span>
              <div className="w-full flex items-center justify-center gap-1.5 py-4 overflow-hidden">
                <div className="w-10 h-10"><CharmSvg symbol="plain" /></div>
                <div className="w-10 h-10"><CharmSvg symbol="heart" /></div>
                <div className="w-10 h-10"><CharmSvg symbol="star" /></div>
                <div className="w-10 h-10"><CharmSvg symbol="alien" /></div>
                <div className="w-10 h-10"><CharmSvg symbol="A" /></div>
                <div className="w-10 h-10"><CharmSvg symbol="plain" /></div>
              </div>
              <div className="text-center">
                <span className="text-sm font-mono font-bold text-ink">Total: Rp 159.000</span>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  18 Links · 4 Charm Khusus Terpasang
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
