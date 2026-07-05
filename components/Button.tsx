'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { handleAnchorClick } from '@/lib/smoothScroll';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className,
  children,
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

  const variants = {
    primary:
      'bg-primary text-background hover:bg-opacity-90 shadow-sm border border-transparent',
    secondary:
      'bg-muted-light text-foreground hover:bg-opacity-80 dark:hover:bg-opacity-20 border border-border-line',
    glass:
      'glass text-foreground hover:bg-primary hover:text-background dark:hover:text-background border border-card-border',
    link: 'bg-transparent text-accent hover:underline p-0 rounded-none active:scale-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 py-3 text-sm md:text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  };

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    // External links open in new tab
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }

    // Anchor links (#section) — smooth scroll instead of instant jump
    if (href.startsWith('#')) {
      return (
        <a
          href={href}
          className={combinedClassName}
          onClick={(e) => {
            handleAnchorClick(e, href);
            if (onClick) (onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e as unknown as React.MouseEvent<HTMLAnchorElement>);
          }}
        >
          {children}
        </a>
      );
    }

    // Internal page navigation via Next.js Link
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
