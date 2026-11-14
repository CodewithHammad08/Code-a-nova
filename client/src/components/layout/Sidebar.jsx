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
    `flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
    }`;

  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-white/[0.08] flex flex-col h-full text-slate-200">
      {/* Brand area */}
      <div className="p-5 border-b border-white/[0.08]">
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Code-a-Nova Logo"
            className="w-8 h-8 rounded-[6px] object-contain shadow-[0_0_12px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-display font-bold text-sm text-white tracking-wider group-hover:text-cyan-400 transition-colors">
              CODE-A-NOVA
            </div>
            <div className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase font-semibold">
              Participant Portal
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
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

        <div className="pt-6 px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
          External Resources
        </div>
        <a
          href="/#timeline"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-white/[0.04] rounded-[5px] transition-colors"
        >
          <span>Event Timeline</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href="/#tracks"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-white/[0.04] rounded-[5px] transition-colors"
        >
          <span>Domain Guidelines</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-white/[0.08] bg-[#080C14]">
        <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-[6px] bg-[#0F172A]/80 border border-white/[0.06]">
          <div className="w-8 h-8 rounded-[6px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-display font-bold text-xs uppercase shadow-sm">
            {user?.fullName ? user.fullName.slice(0, 2) : 'PT'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {user?.fullName || 'Participant'}
            </p>
            <p className="text-[11px] text-slate-500 truncate font-mono">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-[6px] border border-rose-500/20 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
