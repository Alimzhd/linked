import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-DEFAULT transition-all duration-200 overflow-hidden select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed group active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 tracking-wide',
    md: 'text-sm px-5 py-2.5 tracking-tight',
    lg: 'text-base px-7 py-3.5 tracking-tight',
  };

  const variantStyles = {
    primary:
      'bg-ink text-paper border border-ink hover:bg-neutral-800 shadow-sm',
    secondary:
      'bg-transparent text-ink border border-steel hover:bg-blush hover:border-steel',
    ghost:
      'bg-transparent text-ink border border-transparent hover:bg-black/5',
    accent:
      'bg-blush text-ink border border-steel hover:bg-blush/80',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
