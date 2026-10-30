import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../features/cart/cartContext';
import { formatRupiah } from '../lib/format-rupiah';
import { GIFT_BOX_PRICE } from '../types';
import productsData from '../data/products.json';
import charmsData from '../data/charms.json';
import { Button } from '../components/Button';
import { ArrowLeft, MessageSquare, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../lib/sound';
import { EASE_MODERN } from '../lib/motion';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, subtotal, totalPrice } = useCart();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // If cart is empty, redirect or prompt
  if (state.items.length === 0) {
    return (
      <div className="layout-container py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-ink">Keranjang <span className="accent-serif font-normal">Belanja</span> Kosong</h2>
        <p className="text-sm text-neutral-500">
          Silakan tambahkan produk atau rakit gelang sebelum melanjutkan ke checkout.
        </p>
        <div className="pt-2">
          <Button variant="primary" onClick={() => navigate('/shop')}>
            Lihat Koleksi Shop
          </Button>
        </div>
      </div>
    );
  }

  // Format custom build charms summary per type (not per slot) as required by spec:
  // e.g. "Link polos x13, Charm Cute Heart x3, Letter S x2"
  const getCustomBuildSummary = (slots: (string | null)[]) => {
    const counts: Record<string, number> = {};
    let plainCount = 0;

    slots.forEach((s) => {
      if (!s) {
        plainCount += 1;
      } else {
        const charm = charmsData.find((c) => c.id === s);
        const name = charm ? charm.name : 'Charm';
        counts[name] = (counts[name] || 0) + 1;
      }
    });

    const summaryParts: string[] = [];
    if (plainCount > 0) {
      summaryParts.push(`Link polos x${plainCount}`);
    }
    Object.entries(counts).forEach(([charmName, count]) => {
      summaryParts.push(`${charmName} x${count}`);
    });

    return summaryParts.join(', ');
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Pengiriman.');
      return;
    }

    setIsSubmitting(true);

    const storeWhatsAppNumber = '6281234567890'; // LINKED! Official Store WhatsApp number

    const lines: string[] = [
      'Halo LINKED!, saya mau pesan:',
      '',
    ];

    state.items.forEach((item, index) => {
      if (item.kind === 'product') {
        const product = productsData.find((p) => p.id === item.productId);
        const prodName = product ? product.name : 'Produk LINKED!';
        const prodPrice = product ? product.price * item.qty : 0;
        lines.push(`${index + 1}. ${prodName}`);
        lines.push(`   Jumlah ${item.qty}, ${formatRupiah(prodPrice)}`);
      } else {
        const summary = getCustomBuildSummary(item.build.slots);
        lines.push(`${index + 1}. Gelang Custom, ukuran ${item.build.size} (${item.build.slots.length} slot)`);
        lines.push(`   ${summary}`);
        lines.push(`   Jumlah ${item.qty}, ${formatRupiah(item.unitPrice * item.qty)}`);
      }
      lines.push('');
    });

    lines.push(`Kemasan: ${state.packaging === 'gift' ? 'Signature Gift Box Set (+Rp 25.000)' : 'Standard Canvas Pouch (Gratis)'}`);
    if (state.packaging === 'gift' && state.giftNote) {
      lines.push(`Pesan Kartu Ucapan: "${state.giftNote}"`);
    }
    lines.push(`Total: ${formatRupiah(totalPrice)}`);
    lines.push('');
    lines.push(`Nama: ${name.trim()}`);
    lines.push(`Nomor WA: ${phone.trim()}`);
    lines.push(`Alamat Pengiriman: ${address.trim()}`);
    if (notes.trim()) {
      lines.push(`Catatan Tambahan: ${notes.trim()}`);
    }

    const messageText = lines.join('\n');
    const waUrl = `https://wa.me/${storeWhatsAppNumber}?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp link in new tab
    window.open(waUrl, '_blank');

    // Optional clear or keep in state
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="layout-container py-10 md:py-16 space-y-10">
      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: EASE_MODERN }}
      >
        <Link
          to="/shop"
          onMouseEnter={() => soundEngine.playTick()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali Berbelanja</span>
        </Link>
      </motion.div>

      <motion.div
        className="max-w-2xl space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE_MODERN }}
      >
        <span className="micro-label text-neutral-500 font-mono">05 · FINALISASI PESANAN</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
          Ringkasan & <span className="accent-serif font-normal">Pemesanan</span> WhatsApp
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Isi detail pengirimanmu di bawah. Pesanan akan otomatis diformat dan diteruskan langsung ke WhatsApp resmi LINKED! untuk konfirmasi pembayaran dan pengiriman.
        </p>
      </motion.div>

      {/* Main Form & Summary Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: EASE_MODERN }}
      >
        {/* Left Col: Customer Info Form */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-DEFAULT border border-steel shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-steel">
            <h2 className="text-base font-bold text-ink">Informasi <span className="accent-serif font-normal">Pengiriman</span></h2>
            <span className="micro-label text-neutral-500">* Wajib Diisi</span>
          </div>

          <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="customer-name" className="block text-xs font-semibold text-neutral-700">
                Nama Lengkap *
              </label>
              <input
                id="customer-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Sarah Aulia"
                className="w-full text-sm p-3 rounded-DEFAULT border border-steel bg-paper focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="customer-phone" className="block text-xs font-semibold text-neutral-700">
                Nomor WhatsApp (Aktif) *
              </label>
              <input
                id="customer-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full text-sm p-3 rounded-DEFAULT border border-steel bg-paper focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="customer-address" className="block text-xs font-semibold text-neutral-700">
                Alamat Lengkap Pengiriman *
              </label>
              <textarea
                id="customer-address"
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Jalan, Nomor Rumah, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Kode Pos"
                className="w-full text-sm p-3 rounded-DEFAULT border border-steel bg-paper focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="customer-notes" className="block text-xs font-semibold text-neutral-700">
                Catatan Tambahan (Opsional)
              </label>
              <input
                id="customer-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Titipkan di pos satpam atau instruksi kurir"
                className="w-full text-sm p-3 rounded-DEFAULT border border-steel bg-paper focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white transition-colors"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting || !name || !phone || !address}
                className="w-full justify-center shadow-md font-bold"
              >
                <MessageSquare className="w-4 h-4 mr-1 text-emerald-400" />
                <span>Kirim Pesanan ke WhatsApp Official</span>
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-steel/60 flex items-center gap-2 text-xs text-neutral-500 font-mono">
            <ShieldCheck className="w-4 h-4 text-neutral-600" />
            <span>Pemesanan aman terhubung langsung ke WhatsApp tim resmi LINKED!.</span>
          </div>
        </div>

        {/* Right Col: Order Summary Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-DEFAULT border border-steel shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-steel">
              <h2 className="text-base font-bold text-ink">Rincian <span className="accent-serif font-normal">Barang</span></h2>
              <span className="micro-label bg-blush text-ink px-2 py-0.5 rounded font-bold">
                {state.items.length} Macam
              </span>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {state.items.map((item, idx) => {
                if (item.kind === 'product') {
                  const product = productsData.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={`summary-prod-${idx}`} className="flex justify-between items-start text-xs pb-3 border-b border-steel/60">
                      <div>
                        <p className="font-semibold text-ink">{product.name}</p>
                        <p className="text-neutral-500 text-[11px] mt-0.5">Kuantitas: {item.qty} pcs</p>
                      </div>
                      <span className="font-mono font-bold text-ink">
                        {formatRupiah(product.price * item.qty)}
                      </span>
                    </div>
                  );
                }

                // Custom bracelet item
                const summary = getCustomBuildSummary(item.build.slots);
                return (
                  <div key={`summary-custom-${idx}`} className="space-y-1 text-xs pb-3 border-b border-steel/60">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-ink">Gelang Custom (Size {item.build.size})</p>
                      <span className="font-mono font-bold text-ink">
                        {formatRupiah(item.unitPrice * item.qty)}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">{summary}</p>
                    <p className="text-neutral-400 text-[10px]">Kuantitas: {item.qty} pcs</p>
                  </div>
                );
              })}
            </div>

            {/* Packaging and Totals */}
            <div className="space-y-2 pt-2 border-t border-steel text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal Produk</span>
                <span className="font-mono">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>
                  Kemasan ({state.packaging === 'gift' ? 'Gift Box Set' : 'Standard Pouch'})
                </span>
                <span className="font-mono">
                  {state.packaging === 'gift' ? `+${formatRupiah(GIFT_BOX_PRICE)}` : 'Gratis'}
                </span>
              </div>
              {state.packaging === 'gift' && state.giftNote && (
                <div className="p-2 bg-paper rounded border border-steel text-[11px] text-neutral-600 italic">
                  "{state.giftNote}"
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-ink pt-3 border-t border-steel">
                <span>Total Biaya</span>
                <span className="font-mono text-xl">{formatRupiah(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
