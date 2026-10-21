import React from 'react';
import { cn } from '../../lib/utils';

export interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={cn(
            'animate-pulse rounded-md bg-forest-100/50 h-5 w-full',
            className
          )}
        />
      ))}
    </>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('rounded-lg border border-surface-border bg-white p-5 space-y-3', className)}>
      <div className="flex justify-between items-center">
        <LoadingSkeleton className="h-4 w-28" />
        <LoadingSkeleton className="h-8 w-8 rounded-full" />
      </div>
      <LoadingSkeleton className="h-7 w-20" />
      <LoadingSkeleton className="h-3.5 w-3/4" />
    </div>
  );
};
