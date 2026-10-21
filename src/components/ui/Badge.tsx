import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Shield, Info } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'forest';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-surface-subtle text-content-body border border-surface-border',
    forest: 'bg-forest-100 text-forest-800 border border-forest-200',
    success: 'bg-green-50 text-green-800 border border-green-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
    info: 'bg-sky-50 text-sky-800 border border-sky-200',
    outline: 'border border-surface-border text-content-muted bg-transparent',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded',
    md: 'text-xs px-2.5 py-1 rounded-md font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 transition-colors select-none font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', className }) => {
  const normalized = status.toLowerCase().trim();

  let variant: BadgeProps['variant'] = 'default';
  let icon: React.ReactNode = null;
  let label = status;

  switch (normalized) {
    case 'active':
    case 'completed':
    case 'approved':
    case 'present':
    case 'reviewed':
      variant = 'success';
      icon = <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />;
      break;

    case 'scheduled':
    case 'submitted':
    case 'under-review':
    case 'in-progress':
    case 'late':
    case 'draft':
      variant = 'warning';
      icon = <Clock className="h-3.5 w-3.5 text-amber-600" />;
      break;

    case 'needs-revision':
    case 'changes-requested':
    case 'excused':
    case 'on-leave':
    case 'paused':
      variant = 'info';
      icon = <Info className="h-3.5 w-3.5 text-sky-600" />;
      break;

    case 'inactive':
    case 'cancelled':
    case 'absent':
    case 'withdrawn':
    case 'overdue':
      variant = 'error';
      icon = <XCircle className="h-3.5 w-3.5 text-red-600" />;
      break;

    case 'admin':
    case 'lead':
      variant = 'forest';
      icon = <Shield className="h-3.5 w-3.5 text-forest-700" />;
      break;

    default:
      variant = 'default';
      break;
  }

  // Capitalize nicely
  label = status
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Badge variant={variant} size={size} className={className}>
      {icon}
      <span>{label}</span>
    </Badge>
  );
};
