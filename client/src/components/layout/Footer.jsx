import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#060911] text-white border-t border-white/10 overflow-hidden bg-dark-grid">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Code-a-Nova Logo"
                className="w-10 h-10 rounded-[8px] object-contain shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              />
              <div>
                <span className="font-display font-bold text-lg tracking-tight text-white block">
                  CODE-A-NOVA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono leading-none">
                  National Hackathon 2026-27
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A national hackathon platform engineered for student developers, system architects, and creative problem-solvers. Build something that moves the future.
            </p>
            
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
              <span className="text-white/20">&bull;</span>
              <span className="text-cyan-400">v2.4.0</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-[6px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-[6px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-[6px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-300 transition-colors">
                  About Event
                </Link>
              </li>
              <li>
                <a href="/#domains" className="hover:text-cyan-300 transition-colors">
                  Hackathon Tracks
                </a>
              </li>
              <li>
                <a href="/#timeline" className="hover:text-cyan-300 transition-colors">
                  Stages & Timeline
                </a>
              </li>
              <li>
                <Link to="/signup" className="hover:text-cyan-300 transition-colors">
                  Participant Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Inquiries
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <a
                  href="mailto:contact@codeanova.org"
                  className="hover:text-cyan-300 transition-colors font-mono"
                >
                  contact@codeanova.org
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-300 transition-colors">
                  Contact Organizers
                </Link>
              </li>
              <li>
                <Link to="/about#rules" className="hover:text-cyan-300 transition-colors">
                  Rules & Evaluation Rubric
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Code-a-Nova. All rights reserved.</p>
          <p className="flex items-center gap-1 font-mono">
            Engineered for High-Performance National Hackathons
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

