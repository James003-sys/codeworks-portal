import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  BookOpen,
  Award,
  Code2,
  CheckSquare,
  Bell,
  UserCheck,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';

export interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentRole, currentUser } = useApp();
  const navigate = useNavigate();

  const adminNav = [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard },
    { label: 'Tutors', to: '/admin/tutors', icon: Users },
    { label: 'Schools', to: '/admin/schools', icon: Building2 },
    { label: 'Students', to: '/admin/students', icon: GraduationCap },
    { label: 'Schedules', to: '/admin/schedules', icon: Calendar },
    { label: 'Performance', to: '/admin/performance', icon: BarChart3 },
    { label: 'Reports', to: '/admin/reports', icon: FileText },
    { label: 'Settings', to: '/admin/settings', icon: Settings },
  ];

  const tutorNav = [
    { label: 'Overview', to: '/tutor', icon: LayoutDashboard },
    { label: 'My Schools', to: '/tutor/schools', icon: Building2 },
    { label: 'My Students', to: '/tutor/students', icon: GraduationCap },
    { label: 'Schedule', to: '/tutor/schedule', icon: Calendar },
    { label: 'Lesson Reports', to: '/tutor/reports', icon: FileText },
    { label: 'Student Performance', to: '/tutor/performance', icon: BarChart3 },
    { label: 'Ratings & Feedback', to: '/tutor/ratings', icon: Award },
    { label: 'Projects & Reviews', to: '/tutor/projects-reviews', icon: Code2 },
    { label: 'Profile', to: '/tutor/profile', icon: UserCheck },
  ];

  const studentNav = [
    { label: 'My Learning', to: '/student', icon: LayoutDashboard },
    { label: 'My Schedule', to: '/student/schedule', icon: Calendar },
    { label: 'My Performance', to: '/student/performance', icon: BarChart3 },
    { label: 'My Projects', to: '/student/projects', icon: Code2 },
    { label: 'Code Reviews', to: '/student/code-reviews', icon: CheckSquare },
    { label: 'Notifications', to: '/student/notifications', icon: Bell },
    { label: 'Profile', to: '/student/profile', icon: UserCheck },
  ];

  const currentNav =
    currentRole === 'admin'
      ? adminNav
      : currentRole === 'tutor'
      ? tutorNav
      : studentNav;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar aside */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-surface-border bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand logo header */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-surface-border px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-700 text-white shadow-sm">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-forest-900 leading-tight">Codeworks</h1>
            <p className="text-[11px] text-content-muted font-medium">Coding Education Platform</p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-content-subtle">
            {currentRole} Navigation
          </div>
          {currentNav.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin' || item.to === '/tutor' || item.to === '/student'}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-colors select-none',
                    isActive
                      ? 'bg-forest-100/80 text-forest-800 font-semibold border-l-3 border-forest-700 pl-2.5'
                      : 'text-content-body hover:bg-forest-50/60 hover:text-forest-900'
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0 transition-colors" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Current User Card */}
        <div className="border-t border-surface-border p-3.5 bg-surface-subtle">
          <div className="flex items-center gap-2.5">
            <Avatar name={currentUser.name} src={currentUser.avatarUrl} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-content-heading truncate">{currentUser.name}</p>
              <p className="text-[11px] text-content-muted capitalize truncate">{currentUser.role} Portal</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
