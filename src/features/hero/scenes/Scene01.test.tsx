import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Scene01 } from './Scene01';

describe('Scene01 - Link Drawing Animation', () => {
  it('renders the steel link with correct ARIA label', () => {
    render(<Scene01 />);
    const svgElement = screen.getByRole('img', { name: 'Surgical Steel Link' });
    expect(svgElement).toBeInTheDocument();
  });

  it('displays the material label "SURGICAL GRADE 316L"', () => {
    render(<Scene01 />);
    expect(screen.getByText('SURGICAL GRADE 316L')).toBeInTheDocument();
  });

  it('displays the Indonesian scene heading with accent word', () => {
    render(<Scene01 />);
    // Text is split across elements so we need to use regex
    expect(screen.getByText(/Satu Modul\./)).toBeInTheDocument();
    expect(screen.getByText('Baja')).toBeInTheDocument();
    expect(screen.getByText(/Murni\./)).toBeInTheDocument();
  });

  it('displays the scene description text', () => {
    render(<Scene01 />);
    expect(screen.getByText(/Semuanya dimulai dari link stainless steel 9mm/i)).toBeInTheDocument();
  });

  it('applies the accent-serif class to the accent word', () => {
    render(<Scene01 />);
    const accentWord = screen.getByText('Baja');
    expect(accentWord).toHaveClass('accent-serif');
    expect(accentWord).toHaveClass('font-normal');
  });

  it('uses design system color values in metal gradient', () => {
    const { container } = render(<Scene01 />);
    const gradient = container.querySelector('#metal-grad-scene01');
    expect(gradient).toBeInTheDocument();
    
    // Check gradient stops (SVG attributes are case-sensitive and may be lowercased by JSDOM)
    const stops = gradient?.querySelectorAll('stop');
    expect(stops).toHaveLength(4);
    expect(stops?.[0].getAttribute('stop-color')).toBe('#FFFFFF');
    expect(stops?.[1].getAttribute('stop-color')).toBe('#CBD5E1');
    expect(stops?.[2].getAttribute('stop-color')).toBe('#F1F5F9');
    expect(stops?.[3].getAttribute('stop-color')).toBe('#94A3B8');
  });

  it('renders the link with correct SVG dimensions', () => {
    const { container } = render(<Scene01 />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 128 128');
  });

  it('includes Framer Motion animation properties on link elements', () => {
    const { container } = render(<Scene01 />);
    
    // The outer rect should exist
    const outerRect = container.querySelector('rect[x="6"][y="6"]');
    expect(outerRect).toBeInTheDocument();
    
    // The inner rect should exist
    const innerRect = container.querySelector('rect[x="12"][y="12"]');
    expect(innerRect).toBeInTheDocument();
    
    // Side pin cutouts should exist
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(2);
  });
});
