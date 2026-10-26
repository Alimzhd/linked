import React from 'react';

interface CharmSvgProps {
  symbol?: string;
  name?: string;
  className?: string;
  size?: number | string;
  isDragging?: boolean;
}

export const CharmSvg: React.FC<CharmSvgProps> = ({
  symbol = 'plain',
  name = 'Link',
  className = 'w-full h-full',
}) => {
  // Shared gradient and base link module
  const renderDefs = () => (
    <defs>
      <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="33%" stopColor="#CBD5E1" />
        <stop offset="66%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
      <linearGradient id="metal-grad-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="50%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>
      <linearGradient id="metal-groove" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
  );

  // Base Italian 9mm link body: 128x128 viewBox, rounded corners, spring tabs
  const renderBaseLink = () => (
    <g>
      {/* Outer Link Body */}
      <rect
        x="6"
        y="6"
        width="116"
        height="116"
        rx="14"
        fill="url(#metal-grad)"
        stroke="#94A3B8"
        strokeWidth="1.5"
      />
      {/* Inner Bevel Border */}
      <rect
        x="12"
        y="12"
        width="104"
        height="104"
        rx="10"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      {/* Subtle Side Pin Cutouts typical for Italian modular links */}
      <line x1="6" y1="36" x2="6" y2="92" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="36" x2="122" y2="92" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
    </g>
  );

  // Icon / Emblem overlay centered at (64, 64)
  const renderEmblem = () => {
    switch (symbol) {
      case 'plain':
        return (
          <g opacity="0.3">
            <line x1="28" y1="64" x2="100" y2="64" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        );

      case 'bevel':
        return (
          <path
            d="M32 32 L96 32 L84 44 L44 44 Z M96 32 L96 96 L84 84 L84 44 Z M96 96 L32 96 L44 84 L84 84 Z M32 96 L32 32 L44 44 L44 84 Z"
            fill="#CBD5E1"
            opacity="0.6"
          />
        );

      case 'heart':
        return (
          <path
            d="M64 88 C64 88 34 68 34 48 C34 38 42 30 52 30 C58 30 62 34 64 36 C66 34 70 30 76 30 C86 30 94 38 94 48 C94 68 64 88 64 88 Z"
            fill="#121212"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
        );

      case 'star':
        return (
          <g>
            <path
              d="M64 24 L72 52 L100 64 L72 76 L64 104 L56 76 L28 64 L56 52 Z"
              fill="#121212"
              stroke="#94A3B8"
              strokeWidth="1"
            />
            <circle cx="64" cy="64" r="3.5" fill="#FFFFFF" />
          </g>
        );

      case 'flower':
        return (
          <g fill="#121212">
            <circle cx="64" cy="46" r="10" />
            <circle cx="82" cy="64" r="10" />
            <circle cx="64" cy="82" r="10" />
            <circle cx="46" cy="64" r="10" />
            <circle cx="51" cy="51" r="9" />
            <circle cx="77" cy="51" r="9" />
            <circle cx="77" cy="77" r="9" />
            <circle cx="51" cy="77" r="9" />
            <circle cx="64" cy="64" r="9" fill="#FFFFFF" stroke="#121212" strokeWidth="2" />
          </g>
        );

      case 'butterfly':
        return (
          <g fill="#121212">
            <path d="M64 42 C64 42 50 28 34 36 C22 42 24 60 38 64 C26 70 28 84 40 84 C52 84 64 70 64 70 Z" />
            <path d="M64 42 C64 42 78 28 94 36 C106 42 104 60 90 64 C102 70 100 84 88 84 C76 84 64 70 64 70 Z" />
            <ellipse cx="64" cy="58" rx="3.5" ry="18" fill="#CBD5E1" />
          </g>
        );

      case 'moon':
        return (
          <path
            d="M74 30 C50 30 36 48 36 64 C36 82 50 98 74 98 C60 94 50 82 50 64 C50 46 60 34 74 30 Z"
            fill="#121212"
            stroke="#94A3B8"
            strokeWidth="1"
          />
        );

      case 'alien':
        return (
          <g fill="#121212">
            <path d="M64 28 C42 28 34 46 34 62 C34 78 52 98 64 98 C76 98 94 78 94 62 C94 46 86 28 64 28 Z" />
            {/* Eyes */}
            <ellipse cx="50" cy="56" rx="6" ry="12" transform="rotate(-25 50 56)" fill="#FFFFFF" />
            <ellipse cx="78" cy="56" rx="6" ry="12" transform="rotate(25 78 56)" fill="#FFFFFF" />
          </g>
        );

      case 'dino':
        return (
          <path
            d="M40 92 L46 92 L48 80 L56 80 L58 92 L64 92 L64 74 C74 74 84 68 90 60 L92 42 L80 40 L78 30 L54 30 L52 46 C48 50 44 58 44 66 L30 68 L30 76 L40 76 Z"
            fill="#121212"
            stroke="#94A3B8"
            strokeWidth="1"
          />
        );

      case 'ghost':
        return (
          <g fill="#121212">
            <path d="M40 92 L40 56 C40 40 50 32 64 32 C78 32 88 40 88 56 L88 92 L78 86 L68 92 L64 86 L60 92 L50 86 Z" />
            <circle cx="54" cy="52" r="4.5" fill="#FFFFFF" />
            <circle cx="74" cy="52" r="4.5" fill="#FFFFFF" />
            <ellipse cx="64" cy="68" rx="3.5" ry="5.5" fill="#FFFFFF" />
          </g>
        );

      case 'cat':
        return (
          <g fill="#121212">
            <polygon points="46,38 40,56 52,52" />
            <polygon points="82,38 76,52 88,56" />
            <circle cx="64" cy="56" r="16" />
            <ellipse cx="64" cy="78" rx="18" ry="14" />
            <path d="M80 82 C92 82 98 74 98 64" stroke="#121212" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        );

      // Letter Monograms converted to explicit SVG paths for consistency
      case 'A':
        return (
          <path
            d="M64 30 L40 92 L52 92 L57 76 L71 76 L76 92 L88 92 Z M64 50 L68 66 L60 66 Z"
            fill="#121212"
          />
        );

      case 'L':
        return (
          <path
            d="M48 30 L60 30 L60 80 L86 80 L86 92 L48 92 Z"
            fill="#121212"
          />
        );

      case 'M':
        return (
          <path
            d="M38 92 L38 30 L50 30 L64 62 L78 30 L90 30 L90 92 L78 92 L78 52 L68 76 L60 76 L50 52 L50 92 Z"
            fill="#121212"
          />
        );

      case 'S':
        return (
          <path
            d="M84 46 L74 48 C74 42 70 38 64 38 C58 38 54 42 54 46 C54 52 58 54 70 58 C84 62 88 68 88 76 C88 86 78 94 64 94 C50 94 40 84 40 74 L50 72 C50 80 56 84 64 84 C70 84 76 80 76 76 C76 70 70 68 60 64 C48 60 42 54 42 46 C42 36 52 28 64 28 C76 28 84 34 84 46 Z"
            fill="#121212"
          />
        );

      default:
        return (
          <circle cx="64" cy="64" r="8" fill="#121212" />
        );
    }
  };

  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={name}
    >
      {renderDefs()}
      {renderBaseLink()}
      {renderEmblem()}
    </svg>
  );
};
