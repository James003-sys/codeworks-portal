import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { NotificationItem } from '../../components/ui/NotificationItem';
import { Button } from '../../components/ui/Button';
import { CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudentNotifications: React.FC = () => {
  const { notifications, currentUser, currentRole, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();

  const myNotifications = notifications.filter(
    n => n.targetRole === 'all' || n.targetRole === 'student' || n.targetUserId === currentUser.id
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Notifications & Academic Alerts"
        description="Lesson schedule reminders, code review approvals, and school announcements."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={markAllNotificationsRead}
            leftIcon={<CheckCheck className="h-4 w-4" />}
          >
            Mark All Read
          </Button>
        }
      />

      <div className="rounded-lg border border-surface-border bg-white divide-y divide-surface-border p-2 shadow-subtle">
        {myNotifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-content-muted">
            No active notifications.
          </div>
        ) : (
          myNotifications.map(notif => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkRead={markNotificationRead}
              onNavigate={url => url && navigate(url)}
            />
          ))
        )}
      </div>
    </div>
  );
};
