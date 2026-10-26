import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartState, Build, GIFT_BOX_PRICE } from '../../types';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../../lib/storage';
import productsData from '../../data/products.json';

interface CartContextType {
  state: CartState;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addProductToCart: (productId: string, qty?: number) => void;
  addCustomBuildToCart: (build: Build, unitPrice: number) => void;
  updateQuantity: (index: number, qty: number) => void;
  removeItem: (index: number) => void;
  setPackaging: (packaging: 'standard' | 'gift') => void;
  setGiftNote: (note: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_PRODUCT'; productId: string; qty: number }
  | { type: 'ADD_CUSTOM'; item: CartItem & { kind: 'custom' } }
  | { type: 'UPDATE_QTY'; index: number; qty: number }
  | { type: 'REMOVE_ITEM'; index: number }
  | { type: 'SET_PACKAGING'; packaging: 'standard' | 'gift' }
  | { type: 'SET_GIFT_NOTE'; note: string }
  | { type: 'CLEAR_CART' };

const initialCartState: CartState = {
  items: [],
  packaging: 'standard',
  giftNote: '',
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const existingIndex = state.items.findIndex(
        (item) => item.kind === 'product' && item.productId === action.productId
      );
      if (existingIndex > -1) {
        const nextItems = [...state.items];
        const existing = nextItems[existingIndex];
        if (existing.kind === 'product') {
          nextItems[existingIndex] = {
            ...existing,
            qty: existing.qty + action.qty,
          };
        }
        return { ...state, items: nextItems };
      }
      return {
        ...state,
        items: [...state.items, { kind: 'product', productId: action.productId, qty: action.qty }],
      };
    }

    case 'ADD_CUSTOM': {
      // Check if identical custom build already exists
      const existingIndex = state.items.findIndex(
        (item) =>
          item.kind === 'custom' &&
          item.build.size === action.item.build.size &&
          JSON.stringify(item.build.slots) === JSON.stringify(action.item.build.slots)
      );

      if (existingIndex > -1) {
        const nextItems = [...state.items];
        const existing = nextItems[existingIndex];
        if (existing.kind === 'custom') {
          nextItems[existingIndex] = {
            ...existing,
            qty: existing.qty + action.item.qty,
          };
        }
        return { ...state, items: nextItems };
      }

      return {
        ...state,
        items: [...state.items, action.item],
      };
    }

    case 'UPDATE_QTY': {
      if (action.qty <= 0) {
        return {
          ...state,
          items: state.items.filter((_, idx) => idx !== action.index),
        };
      }
      const nextItems = [...state.items];
      if (nextItems[action.index]) {
        nextItems[action.index] = { ...nextItems[action.index], qty: action.qty };
      }
      return { ...state, items: nextItems };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((_, idx) => idx !== action.index),
      };
    }

    case 'SET_PACKAGING': {
      return { ...state, packaging: action.packaging };
    }

    case 'SET_GIFT_NOTE': {
      return { ...state, giftNote: action.note };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, () => {
    return loadFromStorage<CartState>(STORAGE_KEYS.CART, initialCartState);
  });

  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);

  // Sync to storage on change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, state);
  }, [state]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addProductToCart = (productId: string, qty = 1) => {
    dispatch({ type: 'ADD_PRODUCT', productId, qty });
    openCart();
  };

  const addCustomBuildToCart = (
    build: Build,
    unitPrice: number
  ) => {
    const customId = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    dispatch({
      type: 'ADD_CUSTOM',
      item: { kind: 'custom', build, qty: 1, unitPrice, customId },
    });
    openCart();
  };

  const updateQuantity = (index: number, qty: number) => {
    dispatch({ type: 'UPDATE_QTY', index, qty });
  };

  const removeItem = (index: number) => {
    dispatch({ type: 'REMOVE_ITEM', index });
  };

  const setPackaging = (packaging: 'standard' | 'gift') => {
    dispatch({ type: 'SET_PACKAGING', packaging });
  };

  const setGiftNote = (note: string) => {
    dispatch({ type: 'SET_GIFT_NOTE', note });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calculations
  const itemCount = state.items.reduce((acc, item) => acc + item.qty, 0);

  const subtotal = state.items.reduce((acc, item) => {
    if (item.kind === 'custom') {
      return acc + item.unitPrice * item.qty;
    }
    const product = productsData.find((p) => p.id === item.productId);
    const price = product ? product.price : 0;
    return acc + price * item.qty;
  }, 0);

  const packagingPrice = state.packaging === 'gift' ? GIFT_BOX_PRICE : 0;
  const totalPrice = subtotal + packagingPrice;

  return (
    <CartContext.Provider
      value={{
        state,
        isCartOpen,
        openCart,
        closeCart,
        addProductToCart,
        addCustomBuildToCart,
        updateQuantity,
        removeItem,
        setPackaging,
        setGiftNote,
        clearCart,
        itemCount,
        subtotal,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
