import React from 'react';
import { M3CircularProgress } from './ui/M3Progress';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  // Material 3 Expressive Stadium Pill Button with state layers and tactile spring compression
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 overflow-hidden select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed group active:scale-[0.97] will-change-transform';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 min-h-[36px] tracking-wide',
    md: 'text-sm px-5 py-2.5 min-h-[44px] tracking-tight',
    lg: 'text-base px-7 py-3.5 min-h-[50px] tracking-tight',
  };

  const variantStyles = {
    primary:
      'bg-ink text-paper hover:bg-neutral-800 shadow-sm active:bg-neutral-900',
    secondary:
      'bg-neutral-200/70 text-ink hover:bg-neutral-200 active:bg-neutral-300 shadow-2xs',
    ghost:
      'bg-transparent text-ink hover:bg-black/5 active:bg-black/10',
    accent:
      'bg-blush text-ink hover:bg-blush/80 active:bg-blush shadow-2xs',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {isLoading && (
          <M3CircularProgress
            size="sm"
            color={variant === 'primary' ? '#F9F9FB' : '#121212'}
          />
        )}
        {children}
      </span>
    </button>
  );
};
