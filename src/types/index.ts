export type CharmCategory = 'basic' | 'cute' | 'funny' | 'letter';

export interface Charm {
  id: string;
  name: string;
  category: CharmCategory;
  addPrice: number; // additional price over plain link in IDR
  inStock: boolean;
  symbol?: string;
  description?: string;
}

export type BraceletSize = 'S' | 'M' | 'L';

export const BRACELET_SIZES: Record<BraceletSize, { slots: number; circumference: string }> = {
  S: { slots: 17, circumference: '~15.5 cm' },
  M: { slots: 18, circumference: '~16.5 cm' },
  L: { slots: 20, circumference: '~18.5 cm' },
};

export const BASE_BRACELET_PRICE = 99000;
export const GIFT_BOX_PRICE = 25000;

export interface Build {
  size: BraceletSize;
  slots: (string | null)[]; // charm id or null (null = classic plain link)
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  material: string;
  dimensions: string;
  description: string;
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
  tag?: string;
  imageUrl?: string;
  isCustomProduct?: boolean;
}

export type CartItem =
  | { kind: 'product'; productId: string; qty: number }
  | { kind: 'custom'; build: Build; qty: number; unitPrice: number; customId: string };

export interface CartState {
  items: CartItem[];
  packaging: 'standard' | 'gift';
  giftNote?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
