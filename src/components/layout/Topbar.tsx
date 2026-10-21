import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, Sparkles, User, RefreshCw, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { NotificationPanel } from './NotificationPanel';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const { currentUser, currentRole, notifications, switchRole } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const relevantNotifications = notifications.filter(
    n => n.targetRole === 'all' || n.targetRole === currentRole || n.targetUserId === currentUser.id
  );
  const unreadCount = relevantNotifications.filter(n => !n.read).length;

  const handleResetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-surface-border bg-white px-4 sm:px-6 shadow-subtle">
      {/* Left side: Mobile menu & current section title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-1.5 text-content-body hover:bg-forest-50 hover:text-forest-800 lg:hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-forest-700 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
            {currentRole} Workspace
          </span>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset stored state button */}
        <button
          onClick={handleResetData}
          title="Reset application data to initial defaults"
          className="hidden md:flex items-center gap-1.5 text-xs text-content-muted hover:text-forest-700 px-2 py-1.5 rounded-md hover:bg-forest-50 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Data</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative rounded-full p-2 text-content-body hover:bg-forest-50 hover:text-forest-800 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-forest-700 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        <div className="h-6 w-px bg-surface-border mx-1" />

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-md p-1 text-left hover:bg-forest-50 transition-colors"
          >
            <Avatar name={currentUser.name} src={currentUser.avatarUrl} size="sm" />
            <div className="hidden sm:block">
              <span className="block text-xs font-semibold text-content-heading leading-tight">
                {currentUser.name}
              </span>
              <span className="block text-[10px] text-content-muted capitalize">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-content-muted" />
          </button>

          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsProfileOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 top-12 z-40 w-56 rounded-xl border border-surface-border bg-white p-1.5 shadow-dropdown animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-surface-border">
                  <p className="text-xs font-bold text-content-heading">{currentUser.name}</p>
                  <p className="text-[11px] text-content-muted truncate">{currentUser.email}</p>
                </div>

                <div className="py-1">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-content-subtle">
                    Switch Role View
                  </div>
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setIsProfileOpen(false);
                      navigate('/admin');
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-content-body hover:bg-forest-50 hover:text-forest-900 rounded-md"
                  >
                    <span>Admin (Faith Muthoni)</span>
                    {currentRole === 'admin' && <Check className="h-3.5 w-3.5 text-forest-700" />}
                  </button>
                  <button
                    onClick={() => {
                      switchRole('tutor');
                      setIsProfileOpen(false);
                      navigate('/tutor');
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-content-body hover:bg-forest-50 hover:text-forest-900 rounded-md"
                  >
                    <span>Tutor (Dennis Kiprono)</span>
                    {currentRole === 'tutor' && <Check className="h-3.5 w-3.5 text-forest-700" />}
                  </button>
                  <button
                    onClick={() => {
                      switchRole('student');
                      setIsProfileOpen(false);
                      navigate('/student');
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-content-body hover:bg-forest-50 hover:text-forest-900 rounded-md"
                  >
                    <span>Student (Kevin Ochieng)</span>
                    {currentRole === 'student' && <Check className="h-3.5 w-3.5 text-forest-700" />}
                  </button>
                </div>

                <div className="border-t border-surface-border pt-1">
                  <button
                    onClick={handleResetData}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-amber-800 hover:bg-amber-50 rounded-md"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset Stored Data</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
