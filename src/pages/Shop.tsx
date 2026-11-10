import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import productsData from '../data/products.json';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { soundEngine } from '../lib/sound';
import { ButtonGroup } from '../components/ui/ButtonGroup';
import { M3ShapeLoader, M3PulsingRings } from '../components/ui/M3Progress';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [renderedCategory, setRenderedCategory] = useState<string>('Semua');
  const [renderedSort, setRenderedSort] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = ['Semua', 'Basic Links', 'Individual Charms', 'Cute', 'Funny', 'Special Edition'];

  const categoryItems = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const handleCategoryChange = (cat: string) => {
    if (cat === selectedCategory) return;
    setSelectedCategory(cat);
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setRenderedCategory(cat);
      setIsFiltering(false);
    }, 280);
    return () => clearTimeout(timer);
  };

  const handleSortChange = (sort: 'default' | 'price-asc' | 'price-desc') => {
    if (sort === sortOrder) return;
    setSortOrder(sort);
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setRenderedSort(sort);
      setIsFiltering(false);
    }, 280);
    return () => clearTimeout(timer);
  };

  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    if (renderedCategory !== 'Semua') {
      list = list.filter((item) => {
        if (renderedCategory === 'Individual Charms') {
          return item.category === 'Individual Charms' || item.id.startsWith('prod-charm');
        }
        return item.category.toLowerCase() === renderedCategory.toLowerCase();
      });
    }

    if (renderedSort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (renderedSort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [renderedCategory, renderedSort]);

  return (
    <div className="layout-container pt-24 md:pt-28 pb-12 space-y-8">
      {/* Page Header with Living Staggered Editorial Entrance */}
      <div className="space-y-3 max-w-2xl">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight"
          >
            Koleksi Gelang & <span className="accent-serif font-normal italic">Modular</span> Charms
          </motion.h1>
        </div>

        <div className="overflow-hidden mt-1">
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-neutral-600 leading-relaxed"
          >
            Temukan starter bracelet siap pakai, paket ekstensi modul, dan charm individual untuk memperkaya rangkaian ceritamu.
          </motion.p>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06, ease: [0.25, 1, 0.5, 1] }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2"
      >
        {/* Category Filter using M3 Expressive Segmented Button Group */}
        <ButtonGroup
          items={categoryItems}
          value={selectedCategory}
          onChange={handleCategoryChange}
          size="sm"
          showCheckmark={true}
          ariaLabel="Kategori Produk"
        />

        {/* Sort Dropdown with M3 Tonal Pill Style */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
          <label htmlFor="sort-select" className="sr-only">
            Urutkan Produk
          </label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => {
              soundEngine.playClick();
              handleSortChange(e.target.value as 'default' | 'price-asc' | 'price-desc');
            }}
            className="text-xs font-medium py-2 px-3.5 rounded-full bg-white text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-1 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <option value="default">Urutan Standar</option>
            <option value="price-asc">Harga: Terendah ke Tertinggi</option>
            <option value="price-desc">Harga: Tertinggi ke Terendah</option>
          </select>
        </div>
      </motion.div>

      {/* Product Grid Area with M3 Expressive Filter Transitions */}
      <div className="relative min-h-[420px]">
        <div className="flex items-center justify-between mb-6">
          <span className="micro-label text-neutral-500 font-mono">
            MENAMPILKAN {filteredProducts.length} PRODUK
          </span>
        </div>

        {/* Pure M3 Expressive Morphing Object Loading Indicator (No box, no text) */}
        <AnimatePresence>
          {isFiltering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none"
            >
              <div className="relative flex items-center justify-center">
                <M3PulsingRings size={96} color="#1E293B" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <M3ShapeLoader size="md" color="#1D192B" showDisc={true} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 text-center rounded-[24px] bg-white shadow-sm space-y-3"
          >
            <Sparkles className="w-6 h-6 text-neutral-400 mx-auto" />
            <p className="text-sm text-neutral-500">Tidak ada produk dalam kategori ini.</p>
            <button
              type="button"
              onClick={() => handleCategoryChange('Semua')}
              className="mt-2 text-xs font-semibold text-ink underline underline-offset-4 cursor-pointer"
            >
              Kembali ke Semua Produk
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="product-grid">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.90 }}
                  transition={{
                    duration: 0.38,
                    delay: Math.min(idx * 0.04, 0.2),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProductCard
                    product={product}
                    shapeVariant={(['leaf', 'arch', 'diagonal', 'squircle'] as const)[idx % 4]}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
