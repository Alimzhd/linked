import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCart } from '../features/cart/cartContext';
import { m3SpringExpressive, M3_EASE_EMPHASIZED_DECELERATE } from '../lib/motion';
import { soundEngine } from '../lib/sound';

const navigation = [
  { label: 'Shop', to: '/shop' },
  { label: 'Customize', to: '/customize' },
  { label: 'About', to: '/about' },
];

/**
 * Sticky Header with Google Material 3 Expressive Navigation
 *
 * - Glassmorphism backdrop-blur header (isolated to header descendants)
 * - M3 Expressive Pill Active Indicator with shared layoutId spring transition
 * - M3 Outlined/Tonal Cart Pill with numeric badge
 * - M3 Modal Navigation Drawer for mobile
 */
export const Header: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const location = useLocation();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close mobile menu on route change
  useEffect(() => { closeMenu(); }, [location.pathname, closeMenu]);

  // ESC to close
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  // Lock scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        {/* Material 3 Expressive Brand Mark: M3 Rounded House Icon that reveals LINKED! on hover */}
        <div className="flex items-center justify-start justify-self-start">
          <Link
            to="/"
            className="group relative inline-flex items-center h-[36px] w-[36px] hover:w-[118px] focus-visible:w-[118px] rounded-full bg-[#121215] hover:bg-black text-white px-[9px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 select-none shadow-[0_2px_8px_rgba(0,0,0,0.16)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.24)] transition-all duration-300 ease-[cubic-bezier(0.05,0.7,0.1,1.0)] active:scale-[0.96]"
            aria-label="LINKED! home"
            onMouseEnter={() => soundEngine.playTick()}
          >
            {/* Google Material 3 Rounded House Glyph */}
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] fill-white shrink-0 transition-transform duration-200 group-hover:scale-95"
              aria-hidden="true"
            >
              <path d="M4 21q-.825 0-1.412-.587T2 19V10q0-.4.163-.762t.487-.638l7.3-5.475q.45-.35 1.025-.538T12 2.4q.6 0 1.175.188t1.025.537l7.3 5.475q.325.275.488.638T22 10v9q0 .825-.587 1.413T20 21h-5q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H4Z" />
            </svg>

            {/* Wordmark reveals smoothly from left to right on hover with tighter tracking */}
            <div className="overflow-hidden flex items-center transition-all duration-300 ease-[cubic-bezier(0.05,0.7,0.1,1.0)] max-w-0 opacity-0 -translate-x-3 group-hover:max-w-[80px] group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:max-w-[80px] group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
              <span className="font-sans font-black text-xs md:text-[13px] tracking-[0.03em] uppercase text-white whitespace-nowrap pl-2 select-none">
                <span>LINKED</span>
                <span className="text-blush ml-0.5">!</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Material 3 Expressive Navigation Pill Bar */}
        <nav className="desktop-nav relative flex items-center p-1 rounded-full bg-neutral-200/50 shadow-2xs" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onMouseEnter={() => soundEngine.playTick()}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 select-none z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-1 ${
                  isActive ? 'text-ink font-bold' : 'text-neutral-600 hover:text-ink hover:bg-black/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="m3-navbar-active-pill"
                    transition={reduceMotion ? { duration: 0 } : m3SpringExpressive}
                    className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                  />
                )}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Material 3 Expressive Action Bar */}
        <div className="header-actions flex items-center gap-2">
          <button
            className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-ink text-xs font-semibold shadow-2xs hover:shadow-xs active:scale-[0.96] transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            type="button"
            onClick={() => {
              soundEngine.playClick();
              openCart();
            }}
            aria-label={`Open cart, ${itemCount} items`}
          >
            <ShoppingBag size={16} strokeWidth={1.8} className="text-neutral-700 group-hover:text-ink" />
            <span>Tray</span>
            {/* M3 Numeric Badge */}
            <span
              className={`min-w-[20px] h-[20px] px-1 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-colors duration-200 ${
                itemCount > 0 ? 'bg-ink text-paper' : 'bg-neutral-200 text-neutral-600'
              }`}
              aria-hidden="true"
            >
              {itemCount}
            </span>
          </button>

          <button
            className="menu-trigger flex md:hidden w-10 h-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-2xs active:scale-95 transition-transform"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={20} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Material 3 Expressive Mobile Modal Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: M3_EASE_EMPHASIZED_DECELERATE }}
          >
            <div className="mobile-menu__top flex items-center justify-between pb-6">
              <Link
                to="/"
                onClick={closeMenu}
                className="group relative inline-flex items-center h-[36px] px-3.5 rounded-full bg-[#121215] text-white shadow-[0_2px_8px_rgba(0,0,0,0.16)] select-none"
                aria-label="LINKED! home"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] fill-white shrink-0 mr-2"
                  aria-hidden="true"
                >
                  <path d="M4 21q-.825 0-1.412-.587T2 19V10q0-.4.163-.762t.487-.638l7.3-5.475q.45-.35 1.025-.538T12 2.4q.6 0 1.175.188t1.025.537l7.3 5.475q.325.275.488.638T22 10v9q0 .825-.587 1.413T20 21h-5q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H4Z" />
                </svg>
                <span className="font-sans font-black text-xs tracking-[0.03em] uppercase text-white select-none">
                  <span>LINKED</span>
                  <span className="text-blush ml-0.5">!</span>
                </span>
              </Link>
              <button type="button" className="icon-button icon-button--light rounded-full shadow-2xs" onClick={closeMenu} aria-label="Close menu">
                <X size={22} strokeWidth={1.6} />
              </button>
            </div>
            <nav className="mobile-menu__nav mt-6 space-y-2" aria-label="Mobile navigation">
              {[{ label: 'Home', to: '/' }, ...navigation].map((item, index) => {
                const isActive = location.pathname === item.to;
                return (
                  <motion.div
                    key={item.to}
                    initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: M3_EASE_EMPHASIZED_DECELERATE }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-5 py-3.5 rounded-full text-base font-semibold transition-colors duration-200 ${
                        isActive
                          ? 'bg-ink text-paper shadow-sm'
                          : 'text-neutral-700 hover:bg-black/5 hover:text-ink'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={22} strokeWidth={1.4} className={isActive ? 'text-blush' : 'text-neutral-400'} />
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>
            <p className="mobile-menu__foot mt-auto text-xs text-neutral-400 font-mono text-center">
              316L surgical stainless steel · 18 links · designed by you
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
