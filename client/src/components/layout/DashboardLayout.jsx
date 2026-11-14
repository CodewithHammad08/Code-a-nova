import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

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
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-900">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#0F172A',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '13px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
          },
          success: {
            iconTheme: {
              primary: '#059669',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#E11D48',
              secondary: '#FFFFFF',
            },
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-10 border-r border-slate-200">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white hover:text-slate-200 focus:outline-none"
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
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/dashboard" className="md:hidden flex items-center">
              <img src="/logo.png" alt="Code-a-Nova Logo" className="w-7 h-7 rounded-lg object-contain border border-slate-200" />
            </Link>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <Link to="/dashboard" className="hover:text-slate-900 transition-colors">
                Portal
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-slate-900">{getPageTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-900">
                {user?.fullName}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 justify-end font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified
              </span>
            </div>
            <Link
              to="/profile"
              className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center font-display font-bold text-xs uppercase hover:bg-slate-200 transition-colors shadow-xs"
            >
              {user?.fullName ? user.fullName.slice(0, 2) : 'U'}
            </Link>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
