import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, BookOpen, GraduationCap, Users } from 'lucide-react';
import { UserRole } from '../../types';

export const RoleSwitcherBanner: React.FC = () => {
  const { currentRole, currentUser, switchRole } = useApp();

  const accounts: { role: UserRole; label: string; icon: React.ReactNode; user: string }[] = [
    {
      role: 'admin',
      label: 'Admin (Faith Muthoni)',
      icon: <Shield className="h-3.5 w-3.5" />,
      user: 'Faith Muthoni (Nakuru Operations)',
    },
    {
      role: 'tutor',
      label: 'Tutor (Dennis Kiprono)',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      user: 'Dennis Kiprono (Lead Web Tutor)',
    },
    {
      role: 'student',
      label: 'Student (Kevin Ochieng)',
      icon: <GraduationCap className="h-3.5 w-3.5" />,
      user: 'Kevin Ochieng (Grade 9 Learner)',
    },
  ];

  return (
    <div className="bg-forest-900 text-white text-xs border-b border-forest-800 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <Users className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-gray-300 font-medium">
          Logged in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.role.toUpperCase()})
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto max-w-full">
        <span className="text-gray-400 text-[11px] font-medium mr-0.5">Switch Account:</span>
        {accounts.map(({ role, label, icon }) => {
          const isActive = currentRole === role;
          return (
            <button
              key={role}
              onClick={() => switchRole(role)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-forest-600 text-white ring-1 ring-emerald-400/80 font-semibold shadow-sm'
                  : 'bg-forest-800/90 text-gray-300 hover:bg-forest-700 hover:text-white'
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
