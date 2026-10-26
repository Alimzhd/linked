import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-paper border-t border-neutral-800 pt-16 pb-12 mt-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tighter text-2xl text-paper uppercase">
                LINKED<span className="text-neutral-500">!</span>
              </span>
              <span className="micro-label text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded">
                MILANO EST. 2026
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Italian charm bracelet modular 9mm berbasis baja tahan karat Grade 316L.
              Rakit perhiasan personalmu satu demi satu tanpa perlu rantai kawat rapuh.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/customize"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-blush text-ink px-4 py-2 rounded-full hover:bg-white transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mulai Buat Gelang</span>
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="micro-label text-neutral-400 tracking-widest uppercase">Eksplorasi</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Koleksi Shop</Link>
              </li>
              <li>
                <Link to="/customize" className="hover:text-white transition-colors">18-Slot Customizer</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Tentang LINKED!</Link>
              </li>
              <li>
                <Link to="/about#faq" className="hover:text-white transition-colors">Tanya Jawab (FAQ)</Link>
              </li>
            </ul>
          </div>

          {/* Product Specs & Material info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="micro-label text-neutral-400 tracking-widest uppercase">Spesifikasi Material</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-mono">
              <li className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span>Material Dasar</span>
                <span className="text-neutral-200">Surgical Stainless Steel 316L</span>
              </li>
              <li className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span>Lebar Modul</span>
                <span className="text-neutral-200">9 mm (Standar Italia)</span>
              </li>
              <li className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span>Ukuran Default</span>
                <span className="text-neutral-200">M / 18 Links (~16.5 cm)</span>
              </li>
              <li className="flex justify-between pb-1.5">
                <span>Mekanisme Kaitan</span>
                <span className="text-neutral-200">Internal Spring Slide-lock</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© 2026 LINKED! Italian Charm Bracelet. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <span>Dibuat dengan presisi tinggi</span>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 inline-flex items-center gap-1 transition-colors"
            >
              <span>Hubungi Kami via WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
