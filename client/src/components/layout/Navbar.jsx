import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
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
      setScrolled(window.scrollY > 20);
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
    `text-xs font-semibold tracking-wide transition-all duration-150 px-3 py-1.5 rounded-lg ${
      isActive
        ? 'bg-slate-100 text-slate-900 font-bold border border-slate-200/80 shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
    }`;

  const desktopAnchorClass =
    'text-xs font-semibold tracking-wide transition-all duration-150 px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/70';

  return (
    <header className="sticky top-3 sm:top-4 z-50 px-3 sm:px-6 max-w-6xl mx-auto w-full">
      {/* Floating Island Navbar */}
      <nav
        className={`bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl transition-all duration-300 px-4 sm:px-6 h-16 flex items-center justify-between ${
          scrolled ? 'shadow-lg shadow-slate-900/5 border-slate-300' : 'shadow-sm shadow-slate-900/5'
        }`}
      >
        {/* Brand Monogram & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/logo.png"
              alt="Code-a-Nova Logo"
              className="w-9 h-9 rounded-xl object-contain border border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-tight text-slate-900 leading-tight group-hover:text-slate-700 transition-colors">
              CODE-A-NOVA
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-500 font-mono leading-none">
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
            About &amp; Rubric
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
        <div className="hidden md:flex items-center gap-2.5">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              {/* User Avatar Circle */}
              <Link to="/profile" title="View Profile">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-bold font-mono hover:bg-slate-200 transition-colors border border-slate-200">
                  {user?.name?.[0]?.toUpperCase() || user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
              </Link>

              <Link to="/dashboard">
                <Button variant="primary" size="sm" className="gap-2">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-xs text-slate-500 hover:text-slate-900"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" className="gap-1.5">
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
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Floating Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/98 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 space-y-3">
          <div className="flex flex-col space-y-1 text-sm border-b border-slate-100 pb-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              About &amp; Rubric
            </Link>
            <a
              href="/#tracks"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Tracks
            </a>
            <a
              href="/#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Timeline
            </a>
            <a
              href="/#prizes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Prizes
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                    {user?.name?.[0]?.toUpperCase() || user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {user?.fullName || user?.name || 'Participant'}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate font-mono">
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
      )}
    </header>
  );
};

export default Navbar;
