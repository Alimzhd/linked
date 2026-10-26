import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { CartProvider } from './features/cart/cartContext';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};
export default App;
