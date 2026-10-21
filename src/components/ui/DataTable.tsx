import React from 'react';
import { cn } from '../../lib/utils';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search query or active filters.',
  onRowClick,
  className,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-surface-border bg-white p-4 space-y-3">
        <LoadingSkeleton className="h-8 w-full" />
        <LoadingSkeleton className="h-10 w-full" count={4} />
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} className="my-4" />;
  }

  return (
    <div className={cn('overflow-x-auto rounded-lg border border-surface-border bg-white shadow-subtle', className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-surface-border bg-surface-subtle text-xs font-semibold uppercase tracking-wider text-content-muted">
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className={cn('px-4 py-3 first:pl-5 last:pr-5 select-none', col.headerClassName)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border text-sm">
          {data.map((item) => {
            const rowKey = keyExtractor(item);
            return (
              <tr
                key={rowKey}
                onClick={() => onRowClick && onRowClick(item)}
                className={cn(
                  'transition-colors hover:bg-forest-50/50',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={cn('px-4 py-3.5 first:pl-5 last:pr-5 align-middle text-content-body', col.className)}
                  >
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                      ? String(item[col.accessorKey] ?? '')
                      : null}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
