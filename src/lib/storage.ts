/**
 * Safe LocalStorage wrapper with versioned keys and try/catch error handling.
 */

export const STORAGE_KEYS = {
  CART: 'linked.v1.cart',
  BUILD: 'linked.v1.build',
} as const;

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`[LINKED! Storage] Failed to load "${key}":`, error);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined') return false;
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[LINKED! Storage] Failed to save "${key}":`, error);
    return false;
  }
}

export function removeFromStorage(key: string): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[LINKED! Storage] Failed to remove "${key}":`, error);
  }
}
