import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Determine breadcrumb title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Participant Overview';
      case '/register':
        return 'Hackathon Registration';
      case '/my-registration':
        return 'My Registration Details';
      case '/profile':
        return 'Profile Settings';
      case '/admin':
        return 'Administrative Console';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-[#080C14] overflow-hidden text-slate-100">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0F172A',
            color: '#F8FAFC',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            fontSize: '13px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          },
        }}
      />

      {/* Desktop Left Sidebar */}
      <div className="hidden md:flex md:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0B0F19] z-10 border-r border-white/10">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-slate-400 hover:text-white focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <Sidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Compact Top Navigation */}
        <header className="h-16 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-[6px]"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/dashboard" className="md:hidden flex items-center">
              <img src="/logo.png" alt="Code-a-Nova Logo" className="w-7 h-7 rounded-[6px] object-contain" />
            </Link>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                Portal
              </Link>
              <span className="text-slate-600">/</span>
              <span className="font-semibold text-slate-200">{getPageTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-200">
                {user?.fullName}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 justify-end font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verified
              </span>
            </div>
            <Link
              to="/profile"
              className="w-9 h-9 rounded-[8px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-display font-bold text-xs uppercase hover:border-cyan-400 transition-colors shadow-[0_0_12px_rgba(56,189,248,0.2)]"
            >
              {user?.fullName ? user.fullName.slice(0, 2) : 'U'}
            </Link>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-tech-grid">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
