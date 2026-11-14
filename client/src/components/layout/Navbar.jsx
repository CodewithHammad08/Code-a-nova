import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-xs font-semibold tracking-wider transition-all duration-200 px-3 py-1.5 rounded-[6px] ${
      isActive
        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
        : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
    }`;

  const desktopAnchorClass =
    'text-xs font-semibold tracking-wider transition-all duration-200 px-3 py-1.5 rounded-[6px] text-slate-400 hover:text-white hover:bg-white/[0.06]';

  return (
    <header
      className={`sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-white/10' : 'border-b border-white/[0.06]'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-[#05080F] text-white text-[11px] py-1.5 px-4 border-b border-white/[0.06] flex items-center justify-between sm:justify-center gap-2 sm:gap-4 shadow-inner">
        {/* Left: LIVE Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold tracking-wider uppercase text-[10px] bg-emerald-500/15 px-1.5 py-0.5 rounded-[3px] border border-emerald-500/30 font-mono">
            LIVE
          </span>
        </div>

        {/* Center: Event Info */}
        <div className="flex items-center gap-2 text-center truncate">
          <span className="text-cyan-400 font-bold tracking-wider uppercase text-[10px]">
            Official Registration Portal:
          </span>
          <span className="hidden sm:inline text-slate-300">
            Code-a-Nova 2026-27 is live &bull; 10-minute automated OTP verification &bull;
          </span>
        </div>

        {/* Right: CTA Link */}
        <div className="shrink-0">
          <Link
            to={isAuthenticated ? '/register' : '/signup'}
            className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-0.5 ml-1 text-xs transition-colors"
          >
            {isAuthenticated ? 'Register Project' : 'Register Now'}
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Monogram & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Code-a-Nova Logo"
                className="w-9 h-9 rounded-[8px] object-contain shadow-[0_0_15px_rgba(56,189,248,0.25)] group-hover:scale-105 transition-transform"
              />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#080C14]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-white leading-tight group-hover:text-cyan-300 transition-colors">
                CODE-A-NOVA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono leading-none">
                National Hackathon 2026-27
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About & Rubric
            </NavLink>
            <a href="/#tracks" className={desktopAnchorClass}>
              Tracks
            </a>
            <a href="/#timeline" className={desktopAnchorClass}>
              Timeline
            </a>
            <a href="/#prizes" className={desktopAnchorClass}>
              Prizes
            </a>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* User Avatar Circle */}
                <Link to="/profile" title="View Profile">
                  <div className="w-8 h-8 rounded-[6px] bg-slate-800 text-cyan-300 flex items-center justify-center text-xs font-bold font-mono hover:bg-slate-700 transition-colors border border-cyan-500/30">
                    {user?.name?.[0]?.toUpperCase() || user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                </Link>

                <Link to="/dashboard">
                  <Button variant="primary" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Participant Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm" className="gap-1.5 shadow-sm">
                    Register
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-[6px] text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer with Slide Animation */}
      <div
        className={`md:hidden border-b border-white/10 bg-[#0B0F19] px-4 space-y-3 transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto max-h-[600px] pt-2 pb-5'
            : '-translate-y-full opacity-0 pointer-events-none max-h-0 overflow-hidden py-0 border-b-0'
        }`}
      >
        <div className="flex flex-col space-y-1.5 pt-2 pb-3 border-b border-white/10 text-sm">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-[6px] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-[6px] transition-colors"
          >
            About & Rubric
          </Link>
          <a
            href="/#tracks"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-[6px] transition-colors"
          >
            Tracks
          </a>
          <a
            href="/#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-[6px] transition-colors"
          >
            Timeline
          </a>
          <a
            href="/#prizes"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-[6px] transition-colors"
          >
            Prizes
          </a>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-[6px] transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          {isAuthenticated ? (
            <>
              {/* Mobile Authenticated User Info */}
              <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-800/80 rounded-[6px] border border-white/10">
                <div className="w-8 h-8 rounded-[6px] bg-slate-900 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono shrink-0 border border-cyan-500/30">
                  {user?.name?.[0]?.toUpperCase() || user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-white truncate">
                    {user?.fullName || user?.name || 'Participant'}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate font-mono">
                    {user?.email}
                  </div>
                </div>
              </div>

              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
