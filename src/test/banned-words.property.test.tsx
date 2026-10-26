/**
 * Property Test: Banned Word Filtering
 * 
 * **Feature: linked-polished-refinement, Property 1**
 * **Validates: Requirements 1.3**
 * 
 * Property: For any text content rendered in the application, 
 * the text SHALL NOT contain any words from the banned list 
 * ["revolutionary", "elevate", "unleash", "seamless"].
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { About } from '../pages/About';
import { Checkout } from '../pages/Checkout';
import { CartProvider } from '../features/cart/cartContext';

const BANNED_WORDS = ['revolutionary', 'elevate', 'unleash', 'seamless'];

/**
 * Helper function to extract all text content from rendered component
 */
function getAllTextContent(container: HTMLElement): string {
  return container.textContent || '';
}

/**
 * Helper function to check if text contains any banned words (case-insensitive)
 */
function containsBannedWords(text: string): { hasBanned: boolean; found: string[] } {
  const lowerText = text.toLowerCase();
  const found: string[] = [];
  
  for (const word of BANNED_WORDS) {
    // Use word boundary regex to match whole words only
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lowerText)) {
      found.push(word);
    }
  }
  
  return {
    hasBanned: found.length > 0,
    found,
  };
}

describe('Property 1: Banned Word Filtering', () => {
  /**
   * Property-based test: For any page render, no banned words should appear
   * Testing with 100+ iterations across all pages
   */
  it('should NOT contain banned words in Home page', () => {
    fc.assert(
      fc.property(
        fc.constant(null), // We render the same page multiple times to verify consistency
        () => {
          const { container } = render(
            <MemoryRouter initialEntries={['/']}>
              <CartProvider>
                <Home />
              </CartProvider>
            </MemoryRouter>
          );

          const textContent = getAllTextContent(container);
          const { hasBanned, found } = containsBannedWords(textContent);

          expect(hasBanned).toBe(false);
          if (hasBanned) {
            throw new Error(
              `Home page contains banned words: ${found.join(', ')}\n` +
              `Full text excerpt: ${textContent.substring(0, 500)}...`
            );
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should NOT contain banned words in Shop page', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(
            <MemoryRouter initialEntries={['/shop']}>
              <CartProvider>
                <Shop />
              </CartProvider>
            </MemoryRouter>
          );

          const textContent = getAllTextContent(container);
          const { hasBanned, found } = containsBannedWords(textContent);

          expect(hasBanned).toBe(false);
          if (hasBanned) {
            throw new Error(
              `Shop page contains banned words: ${found.join(', ')}\n` +
              `Full text excerpt: ${textContent.substring(0, 500)}...`
            );
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should NOT contain banned words in About page', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(
            <MemoryRouter initialEntries={['/about']}>
              <CartProvider>
                <About />
              </CartProvider>
            </MemoryRouter>
          );

          const textContent = getAllTextContent(container);
          const { hasBanned, found } = containsBannedWords(textContent);

          expect(hasBanned).toBe(false);
          if (hasBanned) {
            throw new Error(
              `About page contains banned words: ${found.join(', ')}\n` +
              `Full text excerpt: ${textContent.substring(0, 500)}...`
            );
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should NOT contain banned words in Checkout page', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(
            <MemoryRouter initialEntries={['/checkout']}>
              <CartProvider>
                <Checkout />
              </CartProvider>
            </MemoryRouter>
          );

          const textContent = getAllTextContent(container);
          const { hasBanned, found } = containsBannedWords(textContent);

          expect(hasBanned).toBe(false);
          if (hasBanned) {
            throw new Error(
              `Checkout page contains banned words: ${found.join(', ')}\n` +
              `Full text excerpt: ${textContent.substring(0, 500)}...`
            );
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Verify banned words are actually detected if present
   * This ensures our test logic is working correctly
   */
  it('should correctly detect banned words in test strings', () => {
    const testCases = [
      { text: 'This is revolutionary technology', shouldFind: true, expected: ['revolutionary'] },
      { text: 'Elevate your experience', shouldFind: true, expected: ['elevate'] },
      { text: 'Unleash the power', shouldFind: true, expected: ['unleash'] },
      { text: 'Seamless integration', shouldFind: true, expected: ['seamless'] },
      { text: 'This is a great product with innovative features', shouldFind: false, expected: [] },
      { text: 'Revolutionary and seamless experience', shouldFind: true, expected: ['revolutionary', 'seamless'] },
    ];

    for (const testCase of testCases) {
      const { hasBanned, found } = containsBannedWords(testCase.text);
      expect(hasBanned).toBe(testCase.shouldFind);
      expect(found.sort()).toEqual(testCase.expected.sort());
    }
  });
});
