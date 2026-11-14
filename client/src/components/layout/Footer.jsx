import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-white text-slate-700 border-t border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Code-a-Nova Logo"
                className="w-10 h-10 rounded-xl object-contain border border-slate-200 shadow-xs"
              />
              <div>
                <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 block leading-tight">
                  CODE-A-NOVA
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-500 font-mono leading-none">
                  National Hackathon 2026-27
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              A national hackathon platform engineered for student developers, system architects, and creative problem-solvers. Build production-grade code that moves the future.
            </p>
            
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-slate-900 font-semibold">v2.4.0</span>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-900 transition-colors">
                  About Event &amp; Rubric
                </Link>
              </li>
              <li>
                <a href="/#tracks" className="hover:text-slate-900 transition-colors">
                  Hackathon Tracks
                </a>
              </li>
              <li>
                <a href="/#timeline" className="hover:text-slate-900 transition-colors">
                  Stages &amp; Timeline
                </a>
              </li>
              <li>
                <a href="/#prizes" className="hover:text-slate-900 transition-colors">
                  Prizes &amp; Bounties
                </a>
              </li>
              <li>
                <Link to="/signup" className="hover:text-slate-900 transition-colors">
                  Participant Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Inquiries
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <a
                  href="mailto:contact@codeanova.org"
                  className="hover:text-slate-900 transition-colors font-mono text-xs"
                >
                  contact@codeanova.org
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-900 transition-colors">
                  Contact Organizers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-900 transition-colors">
                  Rules &amp; Evaluation Rubric
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
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
