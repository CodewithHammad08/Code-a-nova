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
    `text-xs font-semibold tracking-wider transition-all duration-200 px-3 py-1.5 rounded-[5px] ${
      isActive
        ? 'bg-[#17243A] text-white shadow-xs'
        : 'text-[#4B5563] hover:text-[#17243A] hover:bg-[#F3F4F6]'
    }`;

  const desktopAnchorClass =
    'text-xs font-semibold tracking-wider transition-all duration-200 px-3 py-1.5 rounded-[5px] text-[#4B5563] hover:text-[#17243A] hover:bg-[#F3F4F6]';

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'shadow-md border-b border-black/[0.08]' : 'border-b border-[#E5E7EB]'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#111A2B] via-[#17243A] to-[#1F2F49] text-white text-[11px] py-1.5 px-4 border-b border-[#243653]/60 flex items-center justify-between sm:justify-center gap-2 sm:gap-4 shadow-inner">
        {/* Left: LIVE Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-[#21845B] animate-pulse" />
          <span className="text-[#21845B] font-bold tracking-wider uppercase text-[10px] bg-[#21845B]/15 px-1.5 py-0.5 rounded-[3px] border border-[#21845B]/30 font-mono">
            LIVE
          </span>
        </div>

        {/* Center: Event Info */}
        <div className="flex items-center gap-2 text-center truncate">
          <span className="text-[#D6A64F] font-bold tracking-wider uppercase text-[10px]">
            Official Registration Portal:
          </span>
          <span className="hidden sm:inline text-white/90">
            Code-a-Nova 2026-27 is live &bull; 10-minute automated OTP verification &bull;
          </span>
        </div>

        {/* Right: CTA Link */}
        <div className="shrink-0">
          <Link
            to={isAuthenticated ? '/register' : '/signup'}
            className="text-[#D6A64F] hover:text-[#ecc47c] font-bold inline-flex items-center gap-0.5 ml-1 text-xs transition-colors"
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
                className="w-8 h-8 rounded-[6px] object-contain shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D6A64F] border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-[#17243A] leading-tight group-hover:text-[#243653] transition-colors">
                CODE-A-NOVA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#6B7280] font-mono leading-none">
                National Hackathon 2026-27
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1.5">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About & Rubric
            </NavLink>
            <a href="/#domains" className={desktopAnchorClass}>
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
                  <div className="w-8 h-8 rounded-[4px] bg-[#17243A] text-white flex items-center justify-center text-xs font-bold font-mono hover:bg-[#243653] transition-colors border border-[#243653]">
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
                  className="text-xs"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1 text-[#6B7280]" />
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
              className="p-2 rounded-[5px] text-[#6B7280] hover:text-[#17243A] hover:bg-[#F7F7F4] transition-colors border border-transparent hover:border-[#E5E7EB]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer with Slide Animation */}
      <div
        className={`md:hidden border-b border-[#E5E7EB] bg-white px-4 space-y-3 transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto max-h-[600px] pt-2 pb-5'
            : '-translate-y-full opacity-0 pointer-events-none max-h-0 overflow-hidden py-0 border-b-0'
        }`}
      >
        <div className="flex flex-col space-y-2 pt-2 pb-3 border-b border-[#E5E7EB] text-sm">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px] transition-colors"
          >
            About & Rubric
          </Link>
          <a
            href="/#domains"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px] transition-colors"
          >
            Tracks
          </a>
          <a
            href="/#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px] transition-colors"
          >
            Timeline
          </a>
          <a
            href="/#prizes"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px] transition-colors"
          >
            Prizes
          </a>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px] transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          {isAuthenticated ? (
            <>
              {/* Mobile Authenticated User Info */}
              <div className="flex items-center gap-2.5 px-3 py-2 bg-[#F7F7F4] rounded-[5px] border border-[#E5E7EB]">
                <div className="w-8 h-8 rounded-[4px] bg-[#17243A] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                  {user?.name?.[0]?.toUpperCase() || user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[#17243A] truncate">
                    {user?.fullName || user?.name || 'Participant'}
                  </div>
                  <div className="text-[11px] text-[#6B7280] truncate font-mono">
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
