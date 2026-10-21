import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface FilterBarProps {
  children: React.ReactNode;
  onReset?: () => void;
  isFiltered?: boolean;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  children,
  onReset,
  isFiltered = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2.5 rounded-lg border border-surface-border bg-surface-card p-3 shadow-subtle',
        className
      )}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold text-content-muted mr-1">
        <Filter className="h-3.5 w-3.5" />
        <span>Filters</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 flex-1">{children}</div>

      {isFiltered && onReset && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs text-content-muted hover:text-forest-700"
          leftIcon={<RotateCcw className="h-3 w-3" />}
        >
          Reset
        </Button>
      )}
    </div>
  );
};
