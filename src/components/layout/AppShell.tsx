import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AppShell: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex flex-1 flex-col overflow-y-auto">
          <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>

          <footer className="border-t border-surface-border bg-white py-3 px-6 text-center text-xs text-content-muted">
            <span>© 2026 Codeworks Academy Kenya — Nakuru County Regional Hub</span>
          </footer>
        </div>
      </div>
    </div>
  );
};
