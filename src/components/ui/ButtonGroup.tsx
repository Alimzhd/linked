import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { m3SpringExpressive } from '../../lib/motion';
import { soundEngine } from '../../lib/sound';

export interface ButtonGroupItem<T extends string = string> {
  value: T;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export interface ButtonGroupProps<T extends string = string> {
  items: ButtonGroupItem<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md' | 'lg';
  showCheckmark?: boolean;
  className?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
}

/**
 * Material 3 Expressive Segmented Button Group
 * Reference: https://m3.material.io/components/button-groups/overview
 * and user specification (Recording / design mockups).
 *
 * Geometry & Surface Rules:
 * - Completely borderless (zero 1px outline).
 * - Outer container: Tonal surface (bg-neutral-100 / bg-steel/30) with rounded-full geometry.
 * - Active segment: Pill geometry (rounded-full) with high-contrast tonal fill (bg-ink text-paper)
 *   and optional checkmark icon.
 * - Inactive segments: Tonal surface fill with soft hover states.
 */
export function ButtonGroup<T extends string = string>({
  items,
  value,
  onChange,
  size = 'md',
  showCheckmark = true,
  className = '',
  ariaLabel = 'Segmented options',
  fullWidth = false,
}: ButtonGroupProps<T>) {
  const reduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'text-xs py-2 px-3.5 min-h-[36px] gap-1.5',
    md: 'text-xs sm:text-sm py-2.5 px-4.5 min-h-[44px] gap-2',
    lg: 'text-sm sm:text-base py-3 px-5.5 min-h-[50px] gap-2.5',
  };

  const handleSelect = (val: T) => {
    if (val !== value) {
      soundEngine.playClick();
      onChange(val);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1 p-1 rounded-full bg-neutral-200/50 shadow-2xs ${
        fullWidth ? 'w-full justify-between' : ''
      } ${className}`}
    >
      {items.map((item, idx) => {
        const isSelected = item.value === value;
        const isFirst = idx === 0;
        const isLast = idx === items.length - 1;

        // M3 Expressive Connected Corner Geometries (Reference: Image 2 / m3.material.io)
        // When active: fully rounded capsule pill (`rounded-full`)
        // When inactive: first has rounded-l-full, last has rounded-r-full, middle has rounded-xl
        const cornerClasses = isSelected
          ? 'rounded-full'
          : isFirst
          ? 'rounded-l-full rounded-r-xl'
          : isLast
          ? 'rounded-r-full rounded-l-xl'
          : 'rounded-xl';

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => handleSelect(item.value)}
            onMouseEnter={() => soundEngine.playHover()}
            className={`relative flex items-center justify-center font-medium select-none transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-1 ${cornerClasses} ${
              sizeClasses[size]
            } ${fullWidth ? 'flex-1' : ''} ${
              isSelected
                ? 'text-paper font-semibold shadow-xs'
                : 'text-neutral-700 hover:text-ink bg-neutral-100/80 hover:bg-white'
            }`}
          >
            {/* Animated M3 Expressive Active Pill Fill */}
            {isSelected && (
              <motion.span
                layoutId={`m3-btn-group-pill-${ariaLabel.replace(/\s+/g, '-')}`}
                transition={reduceMotion ? { duration: 0 } : m3SpringExpressive}
                className="absolute inset-0 bg-ink rounded-full shadow-xs -z-10"
              />
            )}

            {/* Checkmark icon for active item (M3 spec Image 2) */}
            {isSelected && showCheckmark && (
              <motion.span
                initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </motion.span>
            )}

            {/* Optional Custom Icon */}
            {item.icon && !isSelected && (
              <span className="shrink-0 text-neutral-500">{item.icon}</span>
            )}

            <span className="tracking-tight">{item.label}</span>

            {item.sublabel && (
              <span
                className={`text-[10px] font-mono ml-0.5 opacity-80 ${
                  isSelected ? 'text-neutral-300' : 'text-neutral-500'
                }`}
              >
                {item.sublabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonGroup;

