import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Scene02 } from './Scene02';

describe('Scene02', () => {
  it('renders scene message "Tambah Cerita."', () => {
    render(<Scene02 />);
    expect(screen.getByText(/Tambah/)).toBeDefined();
    expect(screen.getByText(/Cerita/)).toBeDefined();
  });

  it('renders 3 charm components', () => {
    const { container } = render(<Scene02 />);
    const charmContainers = container.querySelectorAll('.w-20');
    expect(charmContainers.length).toBe(3);
  });

  it('renders scene technical metadata', () => {
    render(<Scene02 />);
    const metadata = screen.getByText(/MAGNETIC SNAP.*STIFFNESS 500/);
    expect(metadata).toBeDefined();
  });

  it('renders description text', () => {
    render(<Scene02 />);
    const description = screen.getByText(/Tempelkan simbol, monogram/);
    expect(description).toBeDefined();
  });

  it('renders charms with correct aria-labels', () => {
    const { container } = render(<Scene02 />);
    const heartCharm = container.querySelector('[aria-label="Heart"]');
    const starCharm = container.querySelector('[aria-label="Star"]');
    const letterCharm = container.querySelector('[aria-label="Letter A"]');
    
    expect(heartCharm).toBeDefined();
    expect(starCharm).toBeDefined();
    expect(letterCharm).toBeDefined();
  });
});
