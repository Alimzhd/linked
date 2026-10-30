import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import productsData from '../data/products.json';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { soundEngine } from '../lib/sound';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = ['Semua', 'Basic Links', 'Individual Charms', 'Cute', 'Funny', 'Special Edition'];

  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    if (selectedCategory !== 'Semua') {
      list = list.filter((item) => {
        if (selectedCategory === 'Individual Charms') {
          return item.category === 'Individual Charms' || item.id.startsWith('prod-charm');
        }
        return item.category.toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    if (sortOrder === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCategory, sortOrder]);

  const handleCategoryChange = (cat: string) => {
    soundEngine.playClick();
    setSelectedCategory(cat);
  };

  return (
    <div className="layout-container py-12 md:py-16 space-y-10">
      {/* Page Header with Living Staggered Editorial Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="space-y-3 max-w-2xl"
      >
        <div className="flex items-center gap-2">
          <span className="micro-label text-neutral-500 font-mono">02 · SHOP CATALOG</span>
          <span className="w-8 h-px bg-steel" />
          <span className="micro-label text-neutral-400 font-mono">STAINLESS STEEL 316L</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
          Koleksi Gelang & <span className="accent-serif font-normal italic">Modular</span> Charms
        </h1>

        <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
          Temukan starter bracelet siap pakai, paket ekstensi modul, dan charm individual untuk memperkaya rangkaian ceritamu.
        </p>
      </motion.div>

      {/* Filter and Sort Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06, ease: [0.25, 1, 0.5, 1] }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-steel"
      >
        {/* Category Filter Chips with Interactive Springs */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Kategori Produk">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors select-none ${
                  isSelected
                    ? 'bg-ink text-paper border-ink shadow-sm'
                    : 'bg-white text-neutral-700 border-steel hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
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
              setSortOrder(e.target.value as 'default' | 'price-asc' | 'price-desc');
            }}
            className="text-xs font-medium py-1.5 px-3 rounded-DEFAULT border border-steel bg-white text-ink focus:outline-none focus:ring-1 focus:ring-ink transition-shadow"
          >
            <option value="default">Urutan Standar</option>
            <option value="price-asc">Harga: Terendah ke Tertinggi</option>
            <option value="price-desc">Harga: Tertinggi ke Terendah</option>
          </select>
        </div>
      </motion.div>

      {/* Product Grid: 4 columns desktop, 2 columns mobile with Living Layout Stagger */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="micro-label text-neutral-500 font-mono">
            MENAMPILKAN {filteredProducts.length} PRODUK
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 text-center border border-dashed border-steel rounded-DEFAULT bg-white space-y-3"
          >
            <Sparkles className="w-6 h-6 text-neutral-400 mx-auto" />
            <p className="text-sm text-neutral-500">Tidak ada produk dalam kategori ini.</p>
            <button
              type="button"
              onClick={() => handleCategoryChange('Semua')}
              className="mt-2 text-xs font-semibold text-ink underline underline-offset-4"
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
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
