import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../features/cart/CartDrawer';
import { BalancedBackground } from '../components/ui/BalancedBackground';
import { CursorHalo } from '../components/ui/CursorHalo';
import { SmoothScroll } from './SmoothScroll';
import { PageTransition } from '../components/layout/PageTransition';

/**
 * Main Application Layout
 *
 * Architecture (Kimi/Lusion standard):
 * 1. SmoothScroll: Lenis smooth scrolling engine with lerp physics.
 * 2. BalancedBackground: Noise grain + editorial grid + ambient cursor glow.
 * 3. CursorHalo: Custom spring-physics cursor ring.
 * 4. AnimatePresence + PageTransition: Clip-path page reveal animations.
 * 5. CartDrawer: Slide-over with spring physics.
 */
export const Layout: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <SmoothScroll>
      <BalancedBackground>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <AnimatePresence initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
        <Footer />
        <CartDrawer />
        <CursorHalo />
      </BalancedBackground>
    </SmoothScroll>
  );
};
