import '@testing-library/jest-dom/vitest';
import { beforeAll, vi } from 'vitest';

// Mock matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock IntersectionObserver
  globalThis.IntersectionObserver = class IntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect(): void {}
    observe(): void {}
    unobserve(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  };

  // Mock scrollTo
  window.scrollTo = vi.fn();

  // Mock HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

  // Suppress expected Three.js WebGL context errors in JSDOM environment
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.WebGLRenderer')) return;
    originalWarn(...args);
  };
});
