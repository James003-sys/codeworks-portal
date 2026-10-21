import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, X } from 'lucide-react';
import { NotificationItem } from '../ui/NotificationItem';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, currentRole, currentUser, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Filter notifications relevant to current role or user
  const relevantNotifications = notifications.filter(
    n => n.targetRole === 'all' || n.targetRole === currentRole || n.targetUserId === currentUser.id
  );

  const unreadCount = relevantNotifications.filter(n => !n.read).length;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} aria-hidden="true" />
      <div className="absolute right-0 top-12 z-40 w-80 sm:w-96 rounded-xl border border-surface-border bg-white shadow-dropdown overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3 bg-surface-subtle">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-forest-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-content-heading">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-forest-700 text-white text-[10px] font-bold px-1.5 py-0.2">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] font-medium text-forest-700 hover:text-forest-900 px-1.5 py-0.5 rounded hover:bg-forest-100"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="text-content-muted hover:text-content-heading p-1 rounded hover:bg-forest-50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-surface-border p-1">
          {relevantNotifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-content-muted">
              No notifications for your active role.
            </div>
          ) : (
            relevantNotifications.map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkRead={markNotificationRead}
                onNavigate={(url) => {
                  onClose();
                  if (url) navigate(url);
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};
