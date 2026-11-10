import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#17243A] text-white border-t border-[#243653]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[5px] bg-[#D6A64F] flex items-center justify-center text-[#17243A] font-display font-bold text-sm tracking-wider">
                CAN
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                CODE-A-NOVA
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF] max-w-md leading-relaxed">
              A national hackathon platform engineered for student developers, system architects, and creative problem-solvers. Build something that moves the future.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#9CA3AF] hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#9CA3AF] hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#9CA3AF] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D6A64F]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Event
                </Link>
              </li>
              <li>
                <a href="/#domains" className="hover:text-white transition-colors">
                  Hackathon Tracks
                </a>
              </li>
              <li>
                <a href="/#timeline" className="hover:text-white transition-colors">
                  Stages & Timeline
                </a>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Participant Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D6A64F]">
              Inquiries
            </h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6A64F]" />
                <a
                  href="mailto:contact@codeanova.org"
                  className="hover:text-white transition-colors"
                >
                  contact@codeanova.org
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Organizers
                </Link>
              </li>
              <li>
                <Link to="/about#rules" className="hover:text-white transition-colors">
                  Rules & Evaluation Rubric
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#243653] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9CA3AF] gap-4">
          <p>&copy; {new Date().getFullYear()} Code-a-Nova. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with the MERN Stack &bull; Google Antigravity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
