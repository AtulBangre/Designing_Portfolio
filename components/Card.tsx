import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'flat' | 'outline';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  hoverEffect = true,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-500 overflow-hidden';
  
  const variants = {
    glass: 'glass',
    flat: 'bg-muted-light border border-border-line dark:bg-zinc-900',
    outline: 'border border-border-line bg-transparent'
  };

  const hoverStyles = hoverEffect 
    ? 'hover:-translate-y-1 hover:shadow-xl hover:border-accent/30 dark:hover:border-accent/40' 
    : '';

  return (
    <div 
      className={cn(baseStyles, variants[variant], hoverStyles, className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
