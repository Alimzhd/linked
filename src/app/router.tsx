import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { ProductDetail } from '../pages/ProductDetail';
import { About } from '../pages/About';
import { Checkout } from '../pages/Checkout';

// Lazy load the customizer route as explicitly mandated by performance specs
const Customize = lazy(() =>
  import('../pages/Customize').then((module) => ({ default: module.Customize }))
);

const LoadingFallback: React.FC = () => (
  <div className="layout-container py-32 flex flex-col items-center justify-center space-y-4">
    <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-ink animate-spin" />
    <span className="micro-label text-neutral-500 font-mono">MEMUAT 18-SLOT BUILDER...</span>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'shop/:id',
        element: <ProductDetail />,
      },
      {
        path: 'customize',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Customize />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: '*',
        element: <Home />,
      },
    ],
  },
]);
