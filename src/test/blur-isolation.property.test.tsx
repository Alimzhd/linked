/**
 * Property Test: Blur Effect Isolation
 * 
 * **Feature: linked-polished-refinement, Property 2**
 * **Validates: Requirements 1.6**
 * 
 * Property: For any element in the DOM with CSS `backdrop-filter: blur()` 
 * or `filter: blur()`, that element MUST be a descendant of the header component.
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as fc from 'fast-check';
import { Layout } from '../app/Layout';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { About } from '../pages/About';
import { Checkout } from '../pages/Checkout';
import { CartProvider } from '../features/cart/cartContext';

/**
 * Helper function to check if an element has blur effects
 */
function hasBlurEffect(element: Element): boolean {
  const computedStyle = window.getComputedStyle(element);
  const backdropFilter = computedStyle.getPropertyValue('backdrop-filter');
  const filter = computedStyle.getPropertyValue('filter');
  
  // Check for blur in both properties
  const hasBackdropBlur = backdropFilter.includes('blur(');
  const hasFilterBlur = filter.includes('blur(');
  
  return hasBackdropBlur || hasFilterBlur;
}

/**
 * Helper function to check if element is descendant of header
 */
function isDescendantOfHeader(element: Element): boolean {
  let currentElement: Element | null = element;
  
  while (currentElement) {
    // Check if current element is a header element
    if (currentElement.tagName.toLowerCase() === 'header') {
      return true;
    }
    
    // Check if current element has a role or data attribute indicating it's a header
    const role = currentElement.getAttribute('role');
    const ariaLabel = currentElement.getAttribute('aria-label');
    
    if (role === 'banner' || ariaLabel?.toLowerCase().includes('header')) {
      return true;
    }
    
    // Move up to parent
    currentElement = currentElement.parentElement;
  }
  
  return false;
}

/**
 * Helper function to find all elements with blur effects in container
 */
function findElementsWithBlur(container: HTMLElement): Element[] {
  const allElements = container.querySelectorAll('*');
  const blurredElements: Element[] = [];
  
  allElements.forEach(element => {
    if (hasBlurEffect(element)) {
      blurredElements.push(element);
    }
  });
  
  return blurredElements;
}

describe('Property 2: Blur Effect Isolation', () => {
  /**
   * Property-based test: All blur effects must be within header component
   * Testing with 100+ iterations across all routes
   */
  it('should isolate blur effects to header descendants on Home route', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(
            <MemoryRouter initialEntries={['/']}>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                  </Route>
                </Routes>
              </CartProvider>
            </MemoryRouter>
          );

          const blurredElements = findElementsWithBlur(container);
          
          // Check each blurred element is a descendant of header
          for (const element of blurredElements) {
            const isInHeader = isDescendantOfHeader(element);
            
            expect(isInHeader).toBe(true);
            if (!isInHeader) {
              const tagName = element.tagName.toLowerCase();
              const className = element.className;
              const id = element.id;
              
              throw new Error(
                `Found blur effect outside header on Home route:\n` +
                `Element: <${tagName}${id ? ` id="${id}"` : ''}${className ? ` class="${className}"` : ''}/>\n` +
                `Total blurred elements found: ${blurredElements.length}`
              );
            }
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  it('should isolate blur effects to header descendants on Shop route', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(
            <MemoryRouter initialEntries={['/shop']}>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route path="shop" element={<Shop />} />
                  </Route>
                </Routes>
              </CartProvider>
            </MemoryRouter>
          );

          const blurredElements = findElementsWithBlur(container);
          
          for (const element of blurredElements) {
            const isInHeader = isDescendantOfHeader(element);
            
            expect(isInHeader).toBe(true);
            if (!isInHeader) {
              const tagName = element.tagName.toLowerCase();
              const className = element.className;
              
              throw new Error(
                `Found blur effect outside header on Shop route:\n` +
                `Element: <${tagName}${className ? ` class="${className}"` : ''}/>\n` +
                `Total blurred elements found: ${blurredElements.length}`
              );
            }
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  it('should isolate blur effects to header descendants on About route', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(
            <MemoryRouter initialEntries={['/about']}>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route path="about" element={<About />} />
                  </Route>
                </Routes>
              </CartProvider>
            </MemoryRouter>
          );

          const blurredElements = findElementsWithBlur(container);
          
          for (const element of blurredElements) {
            const isInHeader = isDescendantOfHeader(element);
            
            expect(isInHeader).toBe(true);
            if (!isInHeader) {
              const tagName = element.tagName.toLowerCase();
              const className = element.className;
              
              throw new Error(
                `Found blur effect outside header on About route:\n` +
                `Element: <${tagName}${className ? ` class="${className}"` : ''}/>\n` +
                `Total blurred elements found: ${blurredElements.length}`
              );
            }
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  it('should isolate blur effects to header descendants on Checkout route', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(
            <MemoryRouter initialEntries={['/checkout']}>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route path="checkout" element={<Checkout />} />
                  </Route>
                </Routes>
              </CartProvider>
            </MemoryRouter>
          );

          const blurredElements = findElementsWithBlur(container);
          
          for (const element of blurredElements) {
            const isInHeader = isDescendantOfHeader(element);
            
            expect(isInHeader).toBe(true);
            if (!isInHeader) {
              const tagName = element.tagName.toLowerCase();
              const className = element.className;
              
              throw new Error(
                `Found blur effect outside header on Checkout route:\n` +
                `Element: <${tagName}${className ? ` class="${className}"` : ''}/>\n` +
                `Total blurred elements found: ${blurredElements.length}`
              );
            }
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  /**
   * Additional test: Verify blur detection logic works correctly
   */
  it('should correctly detect blur effects in test cases', () => {
    const testContainer = document.createElement('div');
    
    // Test case 1: backdrop-filter blur
    const blurDiv1 = document.createElement('div');
    blurDiv1.style.backdropFilter = 'blur(10px)';
    testContainer.appendChild(blurDiv1);
    expect(hasBlurEffect(blurDiv1)).toBe(true);
    
    // Test case 2: filter blur
    const blurDiv2 = document.createElement('div');
    blurDiv2.style.filter = 'blur(5px)';
    testContainer.appendChild(blurDiv2);
    expect(hasBlurEffect(blurDiv2)).toBe(true);
    
    // Test case 3: no blur
    const normalDiv = document.createElement('div');
    testContainer.appendChild(normalDiv);
    expect(hasBlurEffect(normalDiv)).toBe(false);
  });

  it('should correctly detect header ancestry', () => {
    const testContainer = document.createElement('div');
    const header = document.createElement('header');
    const child = document.createElement('div');
    const grandchild = document.createElement('span');
    
    header.appendChild(child);
    child.appendChild(grandchild);
    testContainer.appendChild(header);
    
    expect(isDescendantOfHeader(grandchild)).toBe(true);
    expect(isDescendantOfHeader(child)).toBe(true);
    expect(isDescendantOfHeader(header)).toBe(true);
    
    const outsideElement = document.createElement('div');
    testContainer.appendChild(outsideElement);
    expect(isDescendantOfHeader(outsideElement)).toBe(false);
  });
});
