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
    // Resolve symbol key from symbol or name fallback
    let key = (symbol || '').toLowerCase();
    const lowerName = (name || '').toLowerCase();

    if (!key || key === 'plain') {
      if (lowerName.includes('coffee') || lowerName.includes('cappuccino')) key = 'coffee';
      else if (lowerName.includes('strawberry')) key = 'strawberry';
      else if (lowerName.includes('sailboat') || lowerName.includes('boat')) key = 'sailboat';
      else if (lowerName.includes('camera')) key = 'camera';
      else if (lowerName.includes('butterfly')) key = 'butterfly';
      else if (lowerName.includes('spiral')) key = 'spiral';
      else if (lowerName.includes('star') && lowerName.includes('girl')) key = 'stargirl';
      else if (lowerName.includes('star')) key = 'star';
      else if (lowerName.includes('777')) key = '777';
      else if (lowerName.includes('mask')) key = 'spiderman-mask';
      else if (lowerName.includes('black suit')) key = 'spiderman-black';
      else if (lowerName.includes('spider')) key = 'spiderman-logo';
      else if (lowerName.includes('heart')) key = 'heart';
    }

    switch (key) {
      case 'plain':
        return (
          <g opacity="0.35">
            <line x1="28" y1="64" x2="100" y2="64" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="64" cy="64" r="2.5" fill="#64748B" />
          </g>
        );

      case 'coffee':
        return (
          <g>
            {/* Saucer */}
            <ellipse cx="64" cy="92" rx="32" ry="6" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
            {/* Cup Body */}
            <path
              d="M40 50 L44 82 C44 88 52 90 64 90 C76 90 84 88 84 82 L88 50 Z"
              fill="#F8FAFC"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Cup Handle */}
            <path
              d="M86 54 C96 54 98 72 85 74"
              fill="none"
              stroke="#334155"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Coffee surface */}
            <ellipse cx="64" cy="51" rx="22" ry="6.5" fill="#78350F" />
            {/* Latte Art Foam Heart */}
            <path
              d="M64 54 C64 54 58 50 58 48 C58 46 60 45 62 45 C63.5 45 64 46.5 64 46.5 C64 46.5 64.5 45 66 45 C68 45 70 46 70 48 C70 50 64 54 64 54 Z"
              fill="#FEF3C7"
            />
            {/* Steam Wisps */}
            <path d="M56 38 C54 32 58 28 56 22" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M68 36 C66 30 70 26 68 20" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'strawberry':
        return (
          <g>
            {/* Berry Body */}
            <path
              d="M64 96 C46 96 36 76 38 56 C40 46 50 44 64 44 C78 44 88 46 90 56 C92 76 82 96 64 96 Z"
              fill="#E11D48"
              stroke="#9F1239"
              strokeWidth="1.5"
            />
            {/* Berry Specular Highlight */}
            <path d="M44 54 C42 66 48 78 54 84" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Seeds */}
            <ellipse cx="54" cy="58" rx="1.5" ry="2.2" fill="#FEF08A" />
            <ellipse cx="64" cy="62" rx="1.5" ry="2.2" fill="#FEF08A" />
            <ellipse cx="74" cy="58" rx="1.5" ry="2.2" fill="#FEF08A" />
            <ellipse cx="58" cy="72" rx="1.5" ry="2.2" fill="#FEF08A" />
            <ellipse cx="70" cy="72" rx="1.5" ry="2.2" fill="#FEF08A" />
            <ellipse cx="64" cy="84" rx="1.5" ry="2.2" fill="#FEF08A" />
            {/* Calyx Leaves */}
            <path
              d="M64 45 C56 36 46 38 42 46 C48 42 54 44 58 48 C54 44 48 46 48 50 C54 48 60 50 64 52 C68 50 74 48 80 50 C80 46 74 44 70 48 C74 44 80 42 86 46 C82 38 72 36 64 45 Z"
              fill="#15803D"
            />
            {/* Stem */}
            <path d="M64 42 C63 34 67 28 72 26" stroke="#15803D" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'sailboat':
        return (
          <g>
            {/* Waves */}
            <path d="M28 92 Q42 88 56 92 T84 92 T108 92" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            {/* Boat Hull */}
            <path d="M38 76 L90 76 L82 88 L46 88 Z" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            {/* Mast */}
            <line x1="64" y1="28" x2="64" y2="76" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Main Sail (Right) */}
            <path d="M66 32 L94 72 L66 72 Z" fill="#0284C7" />
            {/* Jib Sail (Left) */}
            <path d="M62 40 L38 72 L62 72 Z" fill="#38BDF8" />
            {/* Pennant Flag */}
            <polygon points="64,26 74,30 64,34" fill="#F43F5E" />
          </g>
        );

      case 'camera':
        return (
          <g>
            {/* Camera Body */}
            <rect x="28" y="42" width="72" height="50" rx="8" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
            {/* Grip Texture */}
            <rect x="28" y="56" width="72" height="28" fill="#0F172A" />
            {/* Shutter Button */}
            <rect x="36" y="36" width="12" height="6" rx="2" fill="#94A3B8" />
            {/* Flash & Viewfinder */}
            <rect x="76" y="46" width="14" height="8" rx="2" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
            <rect x="58" y="46" width="10" height="6" rx="1.5" fill="#64748B" />
            {/* Lens Outer Bevel */}
            <circle cx="64" cy="70" r="19" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
            {/* Lens Body */}
            <circle cx="64" cy="70" r="15" fill="#0F172A" />
            {/* Glass Element */}
            <circle cx="64" cy="70" r="10" fill="#0284C7" />
            <circle cx="67" cy="67" r="3" fill="#FFFFFF" opacity="0.8" />
          </g>
        );

      case 'spiral':
        return (
          <g>
            <circle cx="64" cy="64" r="38" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
            <path
              d="M64 64 A3 3 0 0 1 67 64 A6 6 0 0 1 61 64 A9 9 0 0 1 73 64 A12 12 0 0 1 55 64 A15 15 0 0 1 79 64 A18 18 0 0 1 49 64 A21 21 0 0 1 85 64 A24 24 0 0 1 43 64 A27 27 0 0 1 91 64"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </g>
        );

      case '777':
        return (
          <g fill="#0F172A">
            {/* Background metallic plaque */}
            <rect x="22" y="38" width="84" height="52" rx="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
            {/* Lucky 7's */}
            <path d="M34 50 L52 50 L43 78 L37 78 L45 56 L34 56 Z" fill="#B45309" />
            <path d="M55 48 L73 48 L64 80 L58 80 L66 54 L55 54 Z" fill="#B45309" />
            <path d="M76 50 L94 50 L85 78 L79 78 L87 56 L76 56 Z" fill="#B45309" />
          </g>
        );

      case 'stargirl':
      case 'strgirl':
        return (
          <g>
            <rect x="20" y="38" width="88" height="52" rx="12" fill="#0F172A" />
            <text x="64" y="58" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" letterSpacing="2">
              STAR
            </text>
            <text x="64" y="78" textAnchor="middle" fill="#F43F5E" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" letterSpacing="2">
              GIRL
            </text>
            <polygon points="64,30 66,35 71,36 67,39 68,44 64,41 60,44 61,39 57,36 62,35" fill="#FDE047" />
          </g>
        );

      case 'spiderman-mask':
        return (
          <g>
            {/* Mask Head */}
            <path
              d="M64 26 C42 26 34 44 34 68 C34 86 52 102 64 102 C76 102 94 86 94 68 C94 44 86 26 64 26 Z"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
            />
            {/* Webbing Lines */}
            <line x1="64" y1="26" x2="64" y2="102" stroke="#7F1D1D" strokeWidth="1.2" />
            <line x1="34" y1="68" x2="94" y2="68" stroke="#7F1D1D" strokeWidth="1.2" />
            <path d="M42 46 Q64 56 86 46" fill="none" stroke="#7F1D1D" strokeWidth="1.2" />
            <path d="M40 82 Q64 74 88 82" fill="none" stroke="#7F1D1D" strokeWidth="1.2" />
            {/* Left Eye */}
            <path
              d="M40 54 C42 68 56 78 60 74 C60 66 54 48 40 54 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
            {/* Right Eye */}
            <path
              d="M88 54 C86 68 72 78 68 74 C68 66 74 48 88 54 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
          </g>
        );

      case 'spiderman-black':
        return (
          <g>
            {/* Symbiote Mask Head */}
            <path
              d="M64 26 C42 26 34 44 34 68 C34 86 52 102 64 102 C76 102 94 86 94 68 C94 44 86 26 64 26 Z"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="1.5"
            />
            {/* Aggressive White Eyes */}
            <path
              d="M38 50 C42 68 56 78 60 74 C60 64 54 46 38 50 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
            <path
              d="M90 50 C86 68 72 78 68 74 C68 64 74 46 90 50 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          </g>
        );

      case 'spiderman-logo':
        return (
          <g fill="#0F172A">
            {/* Spider Head & Body */}
            <ellipse cx="64" cy="52" rx="5" ry="7" />
            <ellipse cx="64" cy="70" rx="7" ry="13" />
            {/* Left Legs */}
            <path d="M60 52 L42 40 L36 50" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 56 L38 52 L32 66" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 68 L40 76 L36 90" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 74 L46 88 L44 98" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Right Legs */}
            <path d="M68 52 L86 40 L92 50" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M68 56 L90 52 L96 66" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M68 68 L88 76 L92 90" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M68 74 L82 88 L84 98" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'heart':
        return (
          <g>
            <path
              d="M64 92 C64 92 34 70 34 48 C34 36 44 28 54 28 C60 28 64 32 64 34 C64 32 68 28 74 28 C84 28 94 36 94 48 C94 70 64 92 64 92 Z"
              fill="#F43F5E"
              stroke="#E11D48"
              strokeWidth="1.5"
            />
            {/* Soft highlight */}
            <path d="M42 46 C42 40 48 34 54 34" stroke="#FECDD3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'star':
        return (
          <g>
            <path
              d="M64 24 L72 52 L100 64 L72 76 L64 104 L56 76 L28 64 L56 52 Z"
              fill="#0F172A"
              stroke="#64748B"
              strokeWidth="1"
            />
            {/* Secondary diamond glints */}
            <line x1="48" y1="48" x2="80" y2="80" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="80" y1="48" x2="48" y2="80" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="64" cy="64" r="3.5" fill="#FFFFFF" />
          </g>
        );

      case 'butterfly':
        return (
          <g fill="#0F172A">
            <path d="M64 42 C64 42 48 26 32 34 C20 40 22 58 36 62 C24 68 26 82 38 82 C50 82 64 68 64 68 Z" />
            <path d="M64 42 C64 42 80 26 96 34 C108 40 106 58 92 62 C104 68 102 82 90 82 C78 82 64 68 64 68 Z" />
            <ellipse cx="64" cy="56" rx="3.5" ry="18" fill="#CBD5E1" />
            {/* Antennae */}
            <path d="M62 40 C56 32 50 32 48 34" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            <path d="M66 40 C72 32 78 32 80 34" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
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

      case 'flower':
        return (
          <g fill="#0F172A">
            <circle cx="64" cy="46" r="10" fill="#F43F5E" />
            <circle cx="82" cy="64" r="10" fill="#F43F5E" />
            <circle cx="64" cy="82" r="10" fill="#F43F5E" />
            <circle cx="46" cy="64" r="10" fill="#F43F5E" />
            <circle cx="51" cy="51" r="9" fill="#FB7185" />
            <circle cx="77" cy="51" r="9" fill="#FB7185" />
            <circle cx="77" cy="77" r="9" fill="#FB7185" />
            <circle cx="51" cy="77" r="9" fill="#FB7185" />
            <circle cx="64" cy="64" r="9" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
          </g>
        );

      case 'moon':
        return (
          <path
            d="M74 30 C50 30 36 48 36 64 C36 82 50 98 74 98 C60 94 50 82 50 64 C50 46 60 34 74 30 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="1.5"
          />
        );

      case 'alien':
        return (
          <g fill="#10B981">
            <path d="M64 28 C42 28 34 46 34 62 C34 78 52 98 64 98 C76 98 94 78 94 62 C94 46 86 28 64 28 Z" />
            <ellipse cx="50" cy="56" rx="6" ry="12" transform="rotate(-25 50 56)" fill="#0F172A" />
            <ellipse cx="78" cy="56" rx="6" ry="12" transform="rotate(25 78 56)" fill="#0F172A" />
          </g>
        );

      case 'dino':
        return (
          <path
            d="M40 92 L46 92 L48 80 L56 80 L58 92 L64 92 L64 74 C74 74 84 68 90 60 L92 42 L80 40 L78 30 L54 30 L52 46 C48 50 44 58 44 66 L30 68 L30 76 L40 76 Z"
            fill="#059669"
            stroke="#047857"
            strokeWidth="1"
          />
        );

      case 'ghost':
        return (
          <g fill="#E2E8F0">
            <path d="M40 92 L40 56 C40 40 50 32 64 32 C78 32 88 40 88 56 L88 92 L78 86 L68 92 L64 86 L60 92 L50 86 Z" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="54" cy="52" r="4.5" fill="#0F172A" />
            <circle cx="74" cy="52" r="4.5" fill="#0F172A" />
            <ellipse cx="64" cy="68" rx="3.5" ry="5.5" fill="#0F172A" />
          </g>
        );

      case 'cat':
        return (
          <g fill="#0F172A">
            <polygon points="46,38 40,56 52,52" />
            <polygon points="82,38 76,52 88,56" />
            <circle cx="64" cy="56" r="16" />
            <ellipse cx="64" cy="78" rx="18" ry="14" />
            <path d="M80 82 C92 82 98 74 98 64" stroke="#0F172A" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="58" cy="54" r="2" fill="#FFFFFF" />
            <circle cx="70" cy="54" r="2" fill="#FFFFFF" />
          </g>
        );

      // Letter Monograms converted to explicit SVG paths for consistency
      case 'a':
        return (
          <path
            d="M64 30 L40 92 L52 92 L57 76 L71 76 L76 92 L88 92 Z M64 50 L68 66 L60 66 Z"
            fill="#0F172A"
          />
        );

      case 'l':
        return (
          <path
            d="M48 30 L60 30 L60 80 L86 80 L86 92 L48 92 Z"
            fill="#0F172A"
          />
        );

      case 'm':
        return (
          <path
            d="M38 92 L38 30 L50 30 L64 62 L78 30 L90 30 L90 92 L78 92 L78 52 L68 76 L60 76 L50 52 L50 92 Z"
            fill="#0F172A"
          />
        );

      case 's':
        return (
          <path
            d="M84 46 L74 48 C74 42 70 38 64 38 C58 38 54 42 54 46 C54 52 58 54 70 58 C84 62 88 68 88 76 C88 86 78 94 64 94 C50 94 40 84 40 74 L50 72 C50 80 56 84 64 84 C70 84 76 80 76 76 C76 70 70 68 60 64 C48 60 42 54 42 46 C42 36 52 28 64 28 C76 28 84 34 84 46 Z"
            fill="#0F172A"
          />
        );

      default:
        // Elegant M3 Squircle Plaque with Diamond Star instead of raw dot
        return (
          <g>
            <rect x="36" y="36" width="56" height="56" rx="16" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <polygon points="64,44 70,60 84,64 70,68 64,84 58,68 44,64 58,60" fill="#0F172A" />
            <circle cx="64" cy="64" r="3" fill="#FFFFFF" />
          </g>
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
