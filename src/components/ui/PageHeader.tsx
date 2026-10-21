import React from 'react';
import { cn } from '../../lib/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  actions,
  breadcrumbs,
  className,
}) => {
  return (
    <div className={cn('mb-6 space-y-2', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-content-muted mb-1">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-content-subtle">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-forest-700 transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-content-heading font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-content-heading">{title}</h1>
            {badge}
          </div>
          {description && <p className="text-sm text-content-muted">{description}</p>}
        </div>

        {actions && <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">{actions}</div>}
      </div>
    </div>
  );
};
