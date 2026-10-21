import React from 'react';
import { cn } from '../../lib/utils';

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  description,
  required,
  className,
  children,
}) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={htmlFor} className="text-xs font-semibold text-content-heading uppercase tracking-wider">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-content-muted">{description}</p>
      )}
      {error && <p className="text-xs font-medium text-red-600 animate-fadeIn">{error}</p>}
    </div>
  );
};
