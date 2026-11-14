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
    <div className="flex h-screen bg-[#F7F7F4] overflow-hidden text-[#20242B]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#20242B',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
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
            className="fixed inset-0 bg-[#17243A]/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-10">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white focus:outline-none"
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
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-[#6B7280] hover:text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px]"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/dashboard" className="md:hidden flex items-center">
              <img src="/logo.png" alt="Code-a-Nova Logo" className="w-7 h-7 rounded-[5px] object-contain" />
            </Link>
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <Link to="/dashboard" className="hover:text-[#17243A]">
                Portal
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#17243A]">{getPageTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-[#17243A]">
                {user?.fullName}
              </span>
              <span className="text-[11px] text-[#21845B] font-medium flex items-center gap-1 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-[#21845B]" />
                Account Verified
              </span>
            </div>
            <Link
              to="/profile"
              className="w-8 h-8 rounded-[4px] bg-[#17243A] text-white flex items-center justify-center font-display font-semibold text-xs uppercase hover:bg-[#243653] transition-colors"
            >
              {user?.fullName ? user.fullName.slice(0, 2) : 'U'}
            </Link>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

