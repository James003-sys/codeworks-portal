import React from 'react';
import { cn } from '../../lib/utils';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  summaryText?: string;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  actions,
  summaryText,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle flex flex-col',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-bold text-content-heading">{title}</h3>
          {subtitle && <p className="text-xs text-content-muted mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      <div className="w-full flex-1 min-h-[240px]">{children}</div>

      {summaryText && (
        <div className="mt-3 pt-3 border-t border-surface-border text-xs text-content-muted">
          <span className="font-semibold text-content-heading">Summary: </span>
          {summaryText}
        </div>
      )}
    </div>
  );
};
