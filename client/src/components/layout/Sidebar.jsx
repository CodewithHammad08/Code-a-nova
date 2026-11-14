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
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 ${
      isActive
        ? 'bg-slate-900 text-white shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full text-slate-800">
      {/* Brand area */}
      <div className="p-5 border-b border-slate-100">
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Code-a-Nova Logo"
            className="w-8 h-8 rounded-xl object-contain border border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-display font-extrabold text-sm text-slate-900 tracking-tight group-hover:text-slate-700 transition-colors">
              CODE-A-NOVA
            </div>
            <div className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
              Participant Portal
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
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

        <div className="pt-6 px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          External Resources
        </div>
        <a
          href="/#timeline"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <span>Event Timeline</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
        <a
          href="/#tracks"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <span>Domain Guidelines</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-display font-bold text-xs uppercase">
            {user?.fullName ? user.fullName.slice(0, 2) : 'PT'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">
              {user?.fullName || 'Participant'}
            </p>
            <p className="text-[11px] text-slate-500 truncate font-mono">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl border border-rose-200 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
