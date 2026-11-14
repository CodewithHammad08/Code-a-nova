import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus2,
  FolderGit2,
  User,
  ShieldAlert,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    {
      to: '/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: '/register',
      label: 'Hackathon Registration',
      icon: FilePlus2,
    },
    {
      to: '/my-registration',
      label: 'My Registration',
      icon: FolderGit2,
    },
    {
      to: '/profile',
      label: 'Profile Settings',
      icon: User,
    },
  ];

  if (user?.role === 'admin') {
    navItems.push({
      to: '/admin',
      label: 'Admin Console',
      icon: ShieldAlert,
    });
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-[5px] text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#17243A] text-white'
        : 'text-[#4B5563] hover:text-[#17243A] hover:bg-[#F7F7F4]'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col h-full">
      {/* Brand area */}
      <div className="p-5 border-b border-[#E5E7EB]">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Code-a-Nova Logo"
            className="w-8 h-8 rounded-[6px] object-contain shadow-sm group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-display font-bold text-sm text-[#17243A] tracking-tight group-hover:text-[#243653] transition-colors">
              CODE-A-NOVA
            </div>
            <div className="text-[10px] text-[#6B7280] font-medium tracking-wide uppercase">
              Participant Portal
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
          Dashboard Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={linkClass}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
          External Resources
        </div>
        <a
          href="/#timeline"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#6B7280] hover:text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px] transition-colors"
        >
          <span>Event Timeline</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href="/#domains"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#6B7280] hover:text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px] transition-colors"
        >
          <span>Domain Guidelines</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-[#E5E7EB] bg-[#FAFAFA]">
        <div className="flex items-center gap-3 px-2 py-1.5 mb-2">
          <div className="w-8 h-8 rounded-[4px] bg-[#17243A] text-white flex items-center justify-center font-display font-semibold text-xs uppercase">
            {user?.fullName ? user.fullName.slice(0, 2) : 'PT'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#17243A] truncate">
              {user?.fullName || 'Participant'}
            </p>
            <p className="text-[11px] text-[#6B7280] truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-[#C44545] hover:bg-[#C44545]/10 rounded-[5px] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

