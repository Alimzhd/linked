import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../features/cart/cartContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change or ESC
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Customize', path: '/customize', highlight: true },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-paper/95 border-b border-steel shadow-sm backdrop-blur-none'
            : 'bg-paper/70 backdrop-blur-[12px] border-b border-transparent'
        }`}
      >
        <div className="layout-container h-16 md:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-lg p-1"
          >
            <span className="font-extrabold tracking-tighter text-xl md:text-2xl text-ink uppercase">
              LINKED<span className="text-neutral-400">!</span>
            </span>
            <span className="hidden sm:inline-block micro-label text-neutral-500 border border-steel px-1.5 py-0.5 rounded">
              MILANO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.highlight) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
                      isActive
                        ? 'bg-blush border-neutral-400 text-ink shadow-sm'
                        : 'bg-blush/60 border-steel text-ink hover:bg-blush hover:border-neutral-400'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
                    <span>{link.name}</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-tight transition-colors hover:text-neutral-500 relative py-1 ${
                    isActive ? 'text-ink font-semibold' : 'text-neutral-600'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Buka Keranjang (${itemCount} item)`}
              className="relative p-2.5 rounded-DEFAULT border border-steel hover:bg-blush/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <ShoppingBag className="w-5 h-5 text-ink" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] bg-ink text-paper text-[10px] font-mono font-bold rounded-full flex items-center justify-center px-1 border border-paper shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2.5 rounded-DEFAULT border border-steel hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-ink/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-paper border-l border-steel p-6 flex flex-col justify-between shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-steel">
                <span className="font-extrabold tracking-tighter text-xl text-ink">
                  LINKED<span className="text-neutral-400">!</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg border border-steel hover:bg-neutral-100"
                  aria-label="Tutup menu"
                >
                  <X className="w-5 h-5 text-ink" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-base font-medium px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                        link.highlight
                          ? 'bg-blush text-ink font-semibold'
                          : isActive
                          ? 'bg-neutral-200/50 text-ink font-semibold'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.highlight && <Sparkles className="w-4 h-4 text-neutral-700" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-steel">
              <p className="micro-label text-neutral-500 mb-2">ITALIAN MODULAR BRACELETS</p>
              <p className="text-xs text-neutral-600">
                Stainless Steel 316L modular links & charms.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
