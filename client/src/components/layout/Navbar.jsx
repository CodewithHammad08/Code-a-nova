import React, { useState } from 'react';
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
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-xs font-semibold uppercase tracking-wider transition-colors px-2 py-1 border-b-2 ${
      isActive
        ? 'border-[#17243A] text-[#17243A]'
        : 'border-transparent text-[#6B7280] hover:text-[#17243A] hover:border-[#D1D5DB]'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      {/* Top Announcement Bar */}
      <div className="bg-[#17243A] text-white text-[11px] py-1.5 px-4 text-center font-medium border-b border-[#243653] flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#21845B] animate-pulse" />
        <span className="text-[#D6A64F] font-bold tracking-wider uppercase text-[10px]">
          Official Registration Portal:
        </span>
        <span className="hidden sm:inline text-white/90">
          Code-a-Nova 2026-27 is live &bull; 10-minute automated OTP verification &bull;
        </span>
        <Link
          to={isAuthenticated ? '/register' : '/signup'}
          className="text-[#D6A64F] hover:underline font-bold inline-flex items-center gap-0.5 ml-1"
        >
          {isAuthenticated ? 'Register Project' : 'Register Now'}
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Monogram & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-[5px] bg-[#17243A] flex items-center justify-center text-white font-display font-extrabold text-xs tracking-wider shadow-sm group-hover:bg-[#243653] transition-colors border border-[#243653]">
                CAN
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D6A64F] border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-[#17243A] leading-tight">
                CODE-A-NOVA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#6B7280] font-mono leading-none">
                National Hackathon 2026-27
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-7">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About & Rubric
            </NavLink>
            <a
              href="/#domains"
              className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#17243A] transition-colors"
            >
              Tracks
            </a>
            <a
              href="/#timeline"
              className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#17243A] transition-colors"
            >
              Timeline
            </a>
            <a
              href="/#prizes"
              className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#17243A] transition-colors"
            >
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E7EB] bg-white px-4 pt-2 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 pt-2 pb-3 border-b border-[#E5E7EB] text-sm">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px]"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px]"
            >
              About & Rubric
            </Link>
            <a
              href="/#domains"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px]"
            >
              Tracks
            </a>
            <a
              href="/#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px]"
            >
              Timeline
            </a>
            <a
              href="/#prizes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px]"
            >
              Prizes
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 font-semibold text-[#17243A] hover:bg-[#F7F7F4] rounded-[5px]"
            >
              Contact
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-1.5 text-xs text-[#6B7280]">
                  Signed in as <strong className="text-[#17243A]">{user?.email}</strong>
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
