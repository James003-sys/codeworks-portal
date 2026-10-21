import React from 'react';
import { AppNotification } from '../../types';
import { Calendar, FileCode, FileText, Bell, CheckCircle } from 'lucide-react';
import { cn, formatDateTime } from '../../lib/utils';

export interface NotificationItemProps {
  notification: AppNotification;
  onMarkRead?: (id: string) => void;
  onNavigate?: (url?: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkRead,
  onNavigate,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'schedule':
        return <Calendar className="h-4 w-4 text-emerald-700" />;
      case 'submission':
        return <FileCode className="h-4 w-4 text-amber-700" />;
      case 'report':
        return <FileText className="h-4 w-4 text-sky-700" />;
      case 'review':
        return <CheckCircle className="h-4 w-4 text-purple-700" />;
      default:
        return <Bell className="h-4 w-4 text-forest-700" />;
    }
  };

  return (
    <div
      onClick={() => {
        if (!notification.read && onMarkRead) onMarkRead(notification.id);
        if (notification.actionUrl && onNavigate) onNavigate(notification.actionUrl);
      }}
      className={cn(
        'group flex items-start gap-3 p-3.5 rounded-lg border border-transparent transition-colors cursor-pointer text-left',
        !notification.read ? 'bg-forest-50/70 hover:bg-forest-100/60 border-forest-100' : 'hover:bg-surface-subtle'
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white border border-surface-border shadow-subtle">
        {getIcon()}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className={cn('text-xs font-semibold', !notification.read ? 'text-forest-900 font-bold' : 'text-content-heading')}>
            {notification.title}
          </h4>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-forest-600 shrink-0" aria-label="Unread" />
          )}
        </div>
        <p className="text-xs text-content-body line-clamp-2">{notification.message}</p>
        <span className="text-[11px] text-content-muted block">{formatDateTime(notification.timestamp)}</span>
      </div>
    </div>
  );
};
