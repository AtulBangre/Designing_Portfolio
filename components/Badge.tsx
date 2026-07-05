import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'secondary',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary text-background',
    secondary: 'bg-muted-light text-foreground border border-border-line/40 dark:bg-zinc-800/80',
    outline: 'border border-border-line bg-transparent text-muted-text',
    accent: 'bg-accent/10 text-accent dark:bg-accent/20 border border-accent/20'
  };

  return (
    <span 
      className={cn(baseStyles, variants[variant], className)} 
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
