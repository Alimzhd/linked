import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { CartProvider } from './features/cart/cartContext';
import { MotionProvider } from './engine/MotionEngine';

/**
 * Root providers. Route table lives in `src/app/router.tsx`
 * (/, /shop, /shop/:id, /customize, /about, /checkout).
 */
export const App: React.FC = () => {
  return (
    <MotionProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </MotionProvider>
  );
};
export default App;
