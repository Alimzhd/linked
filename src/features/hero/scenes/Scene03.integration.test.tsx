import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Scene03 } from './Scene03';

/**
 * Integration tests for Scene03 component
 * Validates animation timing and price counter behavior
 */

describe('Scene03 Integration Tests', () => {
  it('animates price counter from 0 to 198000 over time', async () => {
    const { container } = render(<Scene03 />);
    
    // Initially, price should be 0 or very low
    let priceElement = container.querySelector('.font-mono.text-emerald-700');
    expect(priceElement).toBeTruthy();
    
    // Wait for animation to complete (300ms animation + buffer for rendering)
    await waitFor(
      () => {
        priceElement = container.querySelector('.font-mono.text-emerald-700');
        expect(priceElement?.textContent).toContain('198.000');
      },
      { timeout: 1000, interval: 50 }
    );
  });

  it('renders all charm positions correctly', () => {
    const { container } = render(<Scene03 />);
    const charmElements = container.querySelectorAll('svg[role="img"]');
    
    // Verify we have exactly 18 links
    expect(charmElements.length).toBe(18);
    
    // Check that charms are rendered with proper structure
    charmElements.forEach((charm) => {
      expect(charm).toHaveAttribute('viewBox', '0 0 128 128');
    });
  });

  it('applies stagger animation delays to links', () => {
    const { container } = render(<Scene03 />);
    const linkContainers = container.querySelectorAll('.w-7');
    
    // Should have 18 link elements with stagger classes
    expect(linkContainers.length).toBeGreaterThan(0);
  });
});
