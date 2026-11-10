import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import productsData from '../data/products.json';
import { formatRupiah } from '../lib/format-rupiah';
import { useCart } from '../features/cart/cartContext';
import { CharmSvg } from '../components/CharmSvg';
import { Button } from '../components/Button';
import { ArrowLeft, Plus, Minus, Check, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { soundEngine } from '../lib/sound';
import { EASE_MODERN } from '../lib/motion';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addProductToCart } = useCart();
  const [qty, setQty] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="layout-container py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-ink">Produk <span className="accent-serif font-normal">Tidak</span> Ditemukan</h2>
        <p className="text-sm text-neutral-500">Produk yang kamu cari tidak terdaftar dalam katalog kami.</p>
        <Button variant="secondary" onClick={() => navigate('/shop')}>
          Kembali ke Katalog Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    soundEngine.playSnap();
    addProductToCart(product.id, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getProductSymbol = (productId: string): string => {
    if (productId.includes('star')) return 'star';
    if (productId.includes('heart')) return 'heart';
    if (productId.includes('alien')) return 'alien';
    if (productId.includes('dino')) return 'dino';
    if (productId.includes('letter')) return 'A';
    if (productId.includes('florence')) return 'star';
    if (productId.includes('pop')) return 'alien';
    return 'plain';
  };

  const isBracelet = product.id.startsWith('prod-starter') || product.id.startsWith('prod-florence') || product.id.startsWith('prod-pop');
  const hasValidImage = Boolean(product.imageUrl && !imgError);

  return (
    <div className="layout-container pt-24 md:pt-28 pb-12">
      {/* Breadcrumbs */}
      <motion.nav
        aria-label="Breadcrumb"
        className="mb-8"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: EASE_MODERN }}
      >
        <Link
          to="/shop"
          onMouseEnter={() => soundEngine.playTick()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Shop</span>
        </Link>
      </motion.nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
        {/* Visual Preview Left Column */}
        <motion.div
          className="md:col-span-6"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_MODERN }}
        >
          <div className="w-full aspect-square rounded-[24px] bg-white relative overflow-hidden flex items-center justify-center shadow-md shadow-black/4 hover:shadow-xl hover:shadow-black/8 transition-shadow group">
            {hasValidImage ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
            ) : isBracelet ? (
              <div className="w-full flex items-center justify-center gap-2 max-w-xs p-8 md:p-12">
                <div className="w-16 h-16 shrink-0"><CharmSvg symbol="plain" /></div>
                <div className="w-16 h-16 shrink-0"><CharmSvg symbol={getProductSymbol(product.id)} /></div>
                <div className="w-16 h-16 shrink-0"><CharmSvg symbol="plain" /></div>
              </div>
            ) : (
              <div className="w-36 h-36 md:w-48 md:h-48 p-8 md:p-12">
                <CharmSvg symbol={getProductSymbol(product.id)} name={product.name} />
              </div>
            )}
            <div className="absolute bottom-4 left-4 micro-label text-neutral-500 font-mono bg-white/90 px-3 py-1 rounded-full shadow-xs">
              {hasValidImage ? 'STUDIO PHOTOGRAPHY · 316L STEEL' : 'PREVIEW · 128x128 METALLIC SVG'}
            </div>
          </div>
        </motion.div>

        {/* Info Right Column */}
        <motion.div
          className="md:col-span-6 flex flex-col justify-between space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE_MODERN }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="micro-label bg-blush text-ink px-2.5 py-0.5 rounded-full font-bold">
                {product.category}
              </span>
              <span className="micro-label text-neutral-500">
                {product.inStock ? 'STOK TERSEDIA' : 'STOK HABIS'}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
              {product.name}
            </h1>

            <div className="text-2xl font-bold font-mono text-ink">
              {formatRupiah(product.price)}
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Specs Table */}
            <div className="pt-4 pb-2 space-y-2 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Material</span>
                <span className="font-medium text-ink">{product.material}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Dimensi / Ukuran</span>
                <span className="font-medium text-ink">{product.dimensions}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Standar Modul</span>
                <span className="font-medium text-ink">Italian Modular 9mm</span>
              </div>
            </div>

            {/* Key Features Bullet List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="micro-label text-neutral-500">Keunggulan & Karakteristik:</h3>
                <ul className="space-y-1.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-neutral-800 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Add to Cart Actions */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-full bg-neutral-100 overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTick();
                    setQty(Math.max(1, qty - 1));
                  }}
                  className="p-3 text-neutral-600 hover:bg-neutral-200 transition-colors"
                  aria-label="Kurangi kuantitas"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-mono font-bold text-sm">{qty}</span>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTick();
                    setQty(qty + 1);
                  }}
                  className="p-3 text-neutral-600 hover:bg-neutral-200 transition-colors"
                  aria-label="Tambah kuantitas"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="flex-1 shadow-md hover:shadow-lg transition-shadow"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {isAdded ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Ditambahkan ke Keranjang</span>
                  </span>
                ) : (
                  <span>Tambah ke Keranjang</span>
                )}
              </Button>
            </div>

            {/* Customizer prompt if looking at bracelets */}
            {isBracelet && (
              <div className="p-4 rounded-[20px] bg-blush/40 flex items-center justify-between shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-ink">Ingin merakit charm sendiri?</h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5">
                    Gunakan 18-Slot Interactive Builder kami untuk membuat gelang unikmu.
                  </p>
                </div>
                <Link
                  to="/customize"
                  onMouseEnter={() => soundEngine.playTick()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-ink text-paper rounded-full hover:bg-neutral-800 transition-colors shrink-0 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Customizer</span>
                </Link>
              </div>
            )}

            {/* Quality Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-neutral-500 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-600" />
                <span>Stainless Steel Anti Karat</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-neutral-600" />
                <span>Bebas Pasang & Tukar Link</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
