import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Scene03 } from './Scene03';

/**
 * Unit tests for Scene03 component
 * Validates Requirements 3.7, 3.8, 3.9
 */

describe('Scene03: Bracelet Assembly and Curve Morph', () => {
  it('renders 18 bracelet links', () => {
    const { container } = render(<Scene03 />);
    const links = container.querySelectorAll('svg[role="img"]');
    expect(links.length).toBe(18);
  });

  it('displays the scene message', () => {
    render(<Scene03 />);
    expect(screen.getByText(/Rakit Sendiri/i)).toBeInTheDocument();
    expect(screen.getByText(/Harganya/i)).toBeInTheDocument();
    expect(screen.getByText(/Langsung Terlihat/i)).toBeInTheDocument();
  });

  it('displays price badge with 18 Link label', () => {
    render(<Scene03 />);
    expect(screen.getByText('18 Link')).toBeInTheDocument();
  });

  it('displays Rupiah price in price badge', () => {
    const { container } = render(<Scene03 />);
    // Price counter animates, check that badge contains "Rp" text
    const priceElements = Array.from(container.querySelectorAll('.font-mono')).filter(
      (el) => el.textContent?.includes('Rp')
    );
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('includes description about transparent pricing', () => {
    render(<Scene03 />);
    expect(screen.getByText(/Tanpa biaya tersembunyi/i)).toBeInTheDocument();
  });
});
