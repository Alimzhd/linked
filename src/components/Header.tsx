import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCart } from '../features/cart/cartContext';
import { EASE_EDITORIAL, EASE_SNAPPY } from '../lib/motion';
import { soundEngine } from '../lib/sound';

const navigation = [
  { label: 'Shop', to: '/shop' },
  { label: 'Customize', to: '/customize' },
  { label: 'About', to: '/about' },
];

/**
 * Sticky Header with Kimi editorial design
 *
 * - Glassmorphism backdrop-blur header
 * - Animated underline nav links
 * - Mobile fullscreen clip-path menu
 * - Spring-physics cart count badge
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
        <Link to="/" className="wordmark" aria-label="LINKED! home">
          LINKED<span>!</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onMouseEnter={() => soundEngine.playTick()}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="cart-trigger"
            type="button"
            onClick={() => {
              soundEngine.playClick();
              openCart();
            }}
            aria-label={`Open cart, ${itemCount} items`}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span>Tray</span>
            <span className="cart-count" aria-hidden="true">{itemCount}</span>
          </button>
          <button
            className="menu-trigger"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
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
            transition={{ duration: 0.52, ease: EASE_EDITORIAL }}
          >
            <div className="mobile-menu__top">
              <span className="wordmark">LINKED<span>!</span></span>
              <button type="button" className="icon-button icon-button--light" onClick={closeMenu} aria-label="Close menu">
                <X size={24} strokeWidth={1.4} />
              </button>
            </div>
            <nav className="mobile-menu__nav" aria-label="Mobile navigation">
              {[{ label: 'Home', to: '/' }, ...navigation].map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + index * 0.055, duration: 0.5, ease: EASE_SNAPPY }}
                >
                  <NavLink to={item.to} onClick={closeMenu}>
                    <span>{item.label}</span><ArrowUpRight size={28} strokeWidth={1.1} />
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <p className="mobile-menu__foot">316L stainless steel · 17 / 18 / 20 links · made by you</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
