import React, { useState, useMemo } from 'react';
import productsData from '../data/products.json';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = ['Semua', 'Basic Links', 'Individual Charms', 'Cute', 'Funny'];

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

  return (
    <div className="layout-container py-12 md:py-16 space-y-10">
      {/* Page Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="micro-label text-neutral-500">02 · SHOP CATALOG</span>
          <span className="w-8 h-px bg-steel" />
          <span className="micro-label text-neutral-400">STAINLESS STEEL 316L</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
          Koleksi Gelang & <span className="accent-serif font-normal">Modular</span> Charms
        </h1>
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
          Temukan starter bracelet siap pakai, paket ekstensi modul, dan charm individual untuk memperkaya rangkaian ceritamu.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-steel">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Kategori Produk">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all select-none ${
                  isSelected
                    ? 'bg-ink text-paper border-ink shadow-sm'
                    : 'bg-white text-neutral-700 border-steel hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                {cat}
              </button>
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
            onChange={(e) => setSortOrder(e.target.value as 'default' | 'price-asc' | 'price-desc')}
            className="text-xs font-medium py-1.5 px-3 rounded-DEFAULT border border-steel bg-white text-ink focus:outline-none focus:ring-1 focus:ring-ink"
          >
            <option value="default">Urutan Standar</option>
            <option value="price-asc">Harga: Terendah ke Tertinggi</option>
            <option value="price-desc">Harga: Tertinggi ke Terendah</option>
          </select>
        </div>
      </div>

      {/* Product Grid: 4 columns desktop, 2 columns mobile */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="micro-label text-neutral-500">
            MENAMPILKAN {filteredProducts.length} PRODUK
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-steel rounded-DEFAULT bg-white">
            <p className="text-sm text-neutral-500">Tidak ada produk dalam kategori ini.</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('Semua')}
              className="mt-3 text-xs font-semibold text-ink underline underline-offset-4"
            >
              Kembali ke Semua Produk
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
