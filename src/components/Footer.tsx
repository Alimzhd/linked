import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * Footer
 *
 * Kimi editorial footer with large CTA, navigation links, and brand info.
 * Dark background (ink) with paper text for maximum contrast.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <Link to="/customize" className="footer-cta" data-cursor="Build">
          <span className="footer-cta__text whitespace-nowrap">
            Start with your <em className="italic font-serif font-normal ml-2 sm:ml-3">story.</em>
          </span>
          <ArrowUpRight strokeWidth={1} />
        </Link>
      </div>
      <div className="footer-bottom">
        <Link to="/" className="wordmark wordmark--footer">LINKED<span>!</span></Link>
        <nav aria-label="Footer navigation">
          <Link to="/shop">Shop</Link>
          <Link to="/customize">Customizer</Link>
          <Link to="/about">About</Link>
        </nav>
        <p>316L stainless steel<br />Designed for everyday wear<br />© 2026 LINKED!</p>
      </div>
    </footer>
  );
};
