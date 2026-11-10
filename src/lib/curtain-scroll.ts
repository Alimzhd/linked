import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin safely on client when matchMedia is supported
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch {
    // Ignore in headless test environments
  }
}

/**
 * useCurtainParallax Hook
 * 
 * Synchronizes GSAP ScrollTrigger with the page's natural scroll flow.
 * Implements differential parallax and card-stacking curtain physics for sections:
 * #hero -> #customizer -> #showcase -> #specs
 */
export function useCurtainParallax() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.matchMedia !== 'function') return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      // Ignore in headless environments
    }

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;

    // Create GSAP ScrollTrigger context for curtain stacking & differential parallax
    const ctx = gsap.context(() => {
      // #hero: Sinks down gently as user scrolls away (no scale transform on mobile to prevent blur)
      const hero = document.getElementById('hero');
      if (hero) {
        gsap.to(hero, {
          yPercent: isMobile ? -6 : -12,
          scale: isMobile ? 1 : 0.95,
          opacity: 0.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: isMobile ? 0.8 : 1.2,
            invalidateOnRefresh: true,
          },
        });
      }

      // #home-reel: Pin the showcase video so it stays 100% highlighted and centered throughout the scroll
      const homeReel = document.getElementById('home-reel');
      const stickyFrame = document.getElementById('home-reel-sticky');
      if (homeReel && stickyFrame && !isMobile) {
        ScrollTrigger.create({
          trigger: homeReel,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyFrame,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }

      // #customizer: Soft upward curtain rise as it scrolls into view (no scale on mobile)
      const customizer = document.getElementById('customizer');
      if (customizer) {
        gsap.fromTo(
          customizer,
          { y: isMobile ? 20 : 40, scale: isMobile ? 1 : 0.99 },
          {
            y: 0,
            scale: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: customizer,
              start: 'top bottom',
              end: 'top top+=100',
              scrub: isMobile ? 0.8 : 1.1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // #showcase: Stacking depth transition
      const showcase = document.getElementById('showcase');
      if (showcase) {
        gsap.fromTo(
          showcase,
          { y: isMobile ? 20 : 50, scale: isMobile ? 1 : 0.99 },
          {
            y: 0,
            scale: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: showcase,
              start: 'top bottom',
              end: 'top top+=80',
              scrub: isMobile ? 0.8 : 1.1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // #specs: Stacking depth transition
      const specs = document.getElementById('specs');
      if (specs) {
        gsap.fromTo(
          specs,
          { y: isMobile ? 20 : 50, scale: isMobile ? 1 : 0.99 },
          {
            y: 0,
            scale: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: specs,
              start: 'top bottom',
              end: 'top top+=60',
              scrub: isMobile ? 0.8 : 1.1,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);
}

export default useCurtainParallax;
