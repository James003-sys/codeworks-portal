import React from 'react';
import { cn } from '../../lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle transition-all hover:border-forest-200 hover:shadow-card',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-content-muted uppercase tracking-wider">{title}</p>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-forest-50 text-forest-700 border border-forest-100">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-content-heading">{value}</h3>
      </div>

      {description && (
        <p className="mt-1 text-xs text-content-muted">{description}</p>
      )}
    </div>
  );
};
