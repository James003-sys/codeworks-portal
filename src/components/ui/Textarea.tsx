import React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-surface-border bg-white px-3 py-2 text-sm text-content-heading placeholder:text-content-subtle',
          'transition-colors focus-visible:outline-none focus-visible:border-forest-600 focus-visible:ring-1 focus-visible:ring-forest-600',
          'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-60',
          error && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
