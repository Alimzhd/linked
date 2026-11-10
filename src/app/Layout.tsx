import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../features/cart/CartDrawer';
import { BalancedBackground } from '../components/ui/BalancedBackground';
import { SmoothScroll } from './SmoothScroll';
import { PageTransition } from '../components/layout/PageTransition';

/**
 * Main Application Layout
 *
 * Architecture (Material 3 Expressive):
 * 1. SmoothScroll: Lenis smooth scrolling engine with spring physics.
 * 2. BalancedBackground: Tonal paper canvas with M3 ambient elevation.
 * 3. PageTransition: M3 Expressive route entrance with spring dynamics.
 * 4. CartDrawer: Slide-over with GPU-accelerated M3 spring physics.
 */
export const Layout: React.FC = () => {
  const location = useLocation();

  // Instant scroll-to-top on route change; ensures top fold is immediately visible
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <SmoothScroll>
      <BalancedBackground>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
        <Footer />
        <CartDrawer />
      </BalancedBackground>
    </SmoothScroll>
  );
};
