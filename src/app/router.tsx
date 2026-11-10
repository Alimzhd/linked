import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { ProductDetail } from '../pages/ProductDetail';
import { About } from '../pages/About';
import { Checkout } from '../pages/Checkout';

import { M3ShapeLoader, M3PulsingRings } from '../components/ui/M3Progress';

// Lazy load the customizer route as explicitly mandated by performance specs
const Customize = lazy(() =>
  import('../pages/Customize').then((module) => ({ default: module.Customize }))
);

const LoadingFallback: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // Only display if lazy route loading takes longer than 250ms to prevent visual flash
    const timer = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="layout-container py-36 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <M3PulsingRings size={130} color="#1E293B" />
        <div className="absolute inset-0 flex items-center justify-center">
          <M3ShapeLoader size="lg" color="#1D192B" showDisc={true} />
        </div>
      </div>
    </div>
  );
};

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
