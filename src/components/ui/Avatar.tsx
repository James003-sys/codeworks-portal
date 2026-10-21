import React from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className }) => {
  const getInitials = (str: string) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const sizes = {
    sm: 'h-8 w-8 text-xs font-semibold',
    md: 'h-9 w-9 text-xs font-semibold',
    lg: 'h-11 w-11 text-sm font-bold',
    xl: 'h-14 w-14 text-base font-bold',
  };

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full border border-forest-200 bg-forest-100 text-forest-900 font-semibold select-none shadow-xs tracking-tight',
        sizes[size],
        className
      )}
      title={name}
      aria-label={name}
    >
      <span>{getInitials(name)}</span>
    </div>
  );
};
