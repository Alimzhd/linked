import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, Gift, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from './cartContext';
import { formatRupiah } from '../../lib/format-rupiah';
import { GIFT_BOX_PRICE } from '../../types';
import productsData from '../../data/products.json';
import charmsData from '../../data/charms.json';
import { CharmSvg } from '../../components/CharmSvg';
import { Button } from '../../components/Button';
import { useMotionEngine } from '../../engine/MotionEngine';

export const CartDrawer: React.FC = () => {
  const {
    state,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    setPackaging,
    setGiftNote,
    subtotal,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();
  const { triggerHalftone } = useMotionEngine();

  useEffect(() => {
    if (isCartOpen) triggerHalftone('modal');
  }, [isCartOpen, triggerHalftone]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock background scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Keranjang Belanja">
          {/* Backdrop with transitions.dev smooth opacity crossfade and backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-ink/60"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Slide-over panel with transitions.dev tactile spring physics */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%', opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.95 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340, mass: 0.75 }}
              className="w-screen max-w-md bg-paper border-l border-steel flex flex-col shadow-2xl relative z-10 pointer-events-auto"
            >
          {/* Header */}
          <div className="p-6 border-b border-steel flex items-center justify-between bg-paper">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight text-ink">Keranjang <span className="accent-serif font-normal">Belanja</span></h2>
              <span className="micro-label bg-neutral-200/60 text-ink px-2 py-0.5 rounded-full">
                {state.items.reduce((acc, it) => acc + it.qty, 0)} item
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 rounded-DEFAULT border border-steel hover:bg-neutral-100 text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              aria-label="Tutup keranjang"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {state.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full border border-steel flex items-center justify-center bg-white shadow-sm">
                  <Sparkles className="w-6 h-6 text-neutral-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink text-base">Keranjangmu <span className="accent-serif font-normal">masih</span> kosong</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mt-1">
                    Mulai jelajahi katalog koleksi gelang atau rakit gelang 18-slot kustommu sendiri.
                  </p>
                </div>
                <Button variant="primary" size="sm" onClick={() => { closeCart(); navigate('/customize'); }}>
                  Buka Customizer
                </Button>
              </div>
            ) : (
              state.items.map((item, idx) => {
                if (item.kind === 'product') {
                  const product = productsData.find((p) => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={`prod-${item.productId}-${idx}`}
                      className="p-4 bg-white rounded-DEFAULT border border-steel flex gap-4 transition-all hover:border-neutral-400 shadow-sm"
                    >
                      {/* Product Preview Thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-paper border border-steel flex items-center justify-center overflow-hidden shrink-0">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="p-2 w-full h-full flex items-center justify-center">
                            <CharmSvg symbol={product.id.includes('star') ? 'star' : product.id.includes('heart') ? 'heart' : 'plain'} name={product.name} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="text-sm font-semibold text-ink truncate leading-snug">
                              {product.name}
                            </h4>
                            <p className="text-xs text-neutral-500 mt-0.5">{product.material}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(idx)}
                            className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                            aria-label={`Hapus ${product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-steel rounded-lg overflow-hidden bg-paper">
                            <button
                              type="button"
                              onClick={() => updateQuantity(idx, item.qty - 1)}
                              className="p-1 hover:bg-neutral-200 text-neutral-700"
                              aria-label="Kurangi jumlah"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-semibold">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(idx, item.qty + 1)}
                              className="p-1 hover:bg-neutral-200 text-neutral-700"
                              aria-label="Tambah jumlah"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-ink font-mono">
                            {formatRupiah(product.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Custom Build Item
                const nonPlainCharms = item.build.slots.filter(Boolean);
                return (
                  <div
                    key={item.customId || `custom-${idx}`}
                    className="p-4 bg-white rounded-DEFAULT border border-steel flex flex-col gap-3 shadow-sm hover:border-neutral-400 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="micro-label bg-blush text-ink px-1.5 py-0.5 rounded font-bold">
                            CUSTOM GELANG
                          </span>
                          <span className="micro-label text-neutral-500">
                            SIZE {item.build.size} ({item.build.slots.length} SLOTS)
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1">
                          {nonPlainCharms.length > 0
                            ? `${nonPlainCharms.length} Charm terpasang + ${item.build.slots.length - nonPlainCharms.length} Link polos`
                            : `Gelang dasar polos (${item.build.slots.length} Link)`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Hapus gelang kustom"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Mini visual summary of links */}
                    <div className="flex items-center gap-1 overflow-x-auto py-1 px-2 bg-paper rounded border border-steel">
                      {item.build.slots.map((charmId, slotIndex) => {
                        const charm = charmId ? charmsData.find((c) => c.id === charmId) : null;
                        return (
                          <div
                            key={`thumb-${slotIndex}`}
                            className="w-5 h-5 shrink-0 rounded border border-steel flex items-center justify-center"
                            title={charm ? charm.name : 'Plain Link'}
                          >
                            <CharmSvg symbol={charm ? charm.symbol : 'plain'} name={charm ? charm.name : 'Link'} />
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-steel rounded-lg overflow-hidden bg-paper">
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, item.qty - 1)}
                          className="p-1 hover:bg-neutral-200 text-neutral-700"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-semibold">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, item.qty + 1)}
                          className="p-1 hover:bg-neutral-200 text-neutral-700"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-ink font-mono">
                        {formatRupiah(item.unitPrice * item.qty)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}

            {/* Packaging Options */}
            {state.items.length > 0 && (
              <div className="pt-4 border-t border-steel space-y-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-neutral-700" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink font-mono">
                    Pilihan Kemasan & Hadiah
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPackaging('standard')}
                    className={`p-3 rounded-DEFAULT border text-left transition-all ${
                      state.packaging === 'standard'
                        ? 'border-ink bg-blush/40 shadow-xs'
                        : 'border-steel bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-ink">Standard Pouch</span>
                      <span className="micro-label text-neutral-500">Gratis</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Kantong kain kanvas pelindung tahan debu.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackaging('gift')}
                    className={`p-3 rounded-DEFAULT border text-left transition-all ${
                      state.packaging === 'gift'
                        ? 'border-ink bg-blush/40 shadow-xs'
                        : 'border-steel bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-ink">Gift Box Set</span>
                      <span className="micro-label text-neutral-700 font-mono">
                        +{formatRupiah(GIFT_BOX_PRICE)}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Hardbox pita velvet & kartu ucapan kustom.
                    </p>
                  </button>
                </div>

                {state.packaging === 'gift' && (
                  <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                    <label htmlFor="gift-note-input" className="block text-xs font-medium text-neutral-700">
                      Pesan untuk Kartu Ucapan:
                    </label>
                    <textarea
                      id="gift-note-input"
                      rows={2}
                      value={state.giftNote || ''}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Tulis pesan spesialmu di sini..."
                      className="w-full text-xs p-2.5 rounded-DEFAULT border border-steel bg-white focus:outline-none focus:ring-1 focus:ring-ink"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {state.items.length > 0 && (
            <div className="p-6 border-t border-steel bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal Produk</span>
                  <span className="font-mono">{formatRupiah(subtotal)}</span>
                </div>
                {state.packaging === 'gift' && (
                  <div className="flex justify-between text-neutral-600">
                    <span>Kemasan Gift Box</span>
                    <span className="font-mono">+{formatRupiah(GIFT_BOX_PRICE)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-ink pt-2 border-t border-steel">
                  <span>Total Perkiraan</span>
                  <span className="font-mono text-lg">{formatRupiah(totalPrice)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full justify-between"
                onClick={handleCheckoutClick}
              >
                <span>Lanjut ke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
      )}
    </AnimatePresence>
  );
};
