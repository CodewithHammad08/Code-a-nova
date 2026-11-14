import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Award,
  Users,
  Target,
  FileCheck,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const About = () => {
  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 overflow-hidden text-slate-100">
      {/* Ambient background glows */}
      <div className="ambient-glow-navy -top-20 -left-20 opacity-60" />
      <div className="ambient-glow-cyan top-40 -right-20 opacity-50" />

      {/* Header */}
      <div className="relative space-y-4 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-[6px] shadow-sm">
          <img src="/logo.png" alt="Code-a-Nova Logo" className="w-4 h-4 rounded-[3px] object-contain" />
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-300 font-mono">
            Event Charter &bull; Code-a-Nova 2026-27
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
          Engineered for{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            Real Technical Merit
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Code-a-Nova is a national student hackathon platform built on modern production standards. We provide a transparent, rigorous, and meritocratic environment for engineering talent.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F172A]/80 backdrop-blur-md p-6 border border-white/10 rounded-[10px] space-y-3.5 shadow-xl hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all">
          <div className="w-10 h-10 rounded-[8px] bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shadow-sm">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="font-bold text-lg text-white font-display">Working Code Over Decks</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We evaluate fully functioning code, backend APIs, verified databases, and graceful error handling rather than decorative pitch decks.
          </p>
        </div>

        <div className="bg-[#0F172A]/80 backdrop-blur-md p-6 border border-white/10 rounded-[10px] space-y-3.5 shadow-xl hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all">
          <div className="w-10 h-10 rounded-[8px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-bold text-lg text-white font-display">Cryptographic Verification</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every account is secured with salted bcrypt hashing, cryptographically random OTP generation with 10-minute expiry, and JWT session handling.
          </p>
        </div>

        <div className="bg-[#0F172A]/80 backdrop-blur-md p-6 border border-white/10 rounded-[10px] space-y-3.5 shadow-xl hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all">
          <div className="w-10 h-10 rounded-[8px] bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shadow-sm">
            <Users className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="font-bold text-lg text-white font-display">Dynamic Team Scaling</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Support for 1 to 5 participants per team with dynamic roster generation, internal email collision detection, and automated confirmation receipts.
          </p>
        </div>
      </div>

      {/* Official 100-Mark Evaluation Framework */}
      <div id="rules" className="bg-[#0F172A]/90 backdrop-blur-md border border-cyan-500/40 rounded-[12px] p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
            Scoring Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Official 100-Mark Internship &amp; Hackathon Rubric
          </h2>
          <p className="text-xs text-slate-400">
            Every project submitted to Code-a-Nova is systematically evaluated against these transparent criteria:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-white/10 rounded-[8px] overflow-hidden">
            <thead className="bg-[#0B0F19] text-cyan-300 uppercase font-mono text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Evaluation Category</th>
                <th className="py-3 px-4">Points</th>
                <th className="py-3 px-4">Technical Focus &amp; Requirements</th>
                <th className="py-3 px-4">Priority Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-slate-300">
              <tr className="hover:bg-white/[0.03]">
                <td className="py-3.5 px-4 font-bold text-white">Functional Completeness</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-cyan-400">30</td>
                <td className="py-3.5 px-4">
                  All MVP workflows working: user signup, 10-minute OTP verification, login, dynamic 1-5 team registration, deliverables links, and CRUD functionality.
                </td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-white/[0.03]">
                <td className="py-3.5 px-4 font-bold text-white">Code Quality &amp; Structure</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-cyan-400">20</td>
                <td className="py-3.5 px-4">
                  Clean modular architecture, separation of concerns (Controllers, Services, Validators), centralized error middleware, and reusable UI components.
                </td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-white/[0.03]">
                <td className="py-3.5 px-4 font-bold text-white">UI / UX &amp; Responsiveness</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-cyan-400">20</td>
                <td className="py-3.5 px-4">
                  Editorial developer visual language, responsive across 360px to 1440px+, zero horizontal scroll, restrained rectangular shapes (4-6px radius), and clean typography.
                </td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-white/[0.03]">
                <td className="py-3.5 px-4 font-bold text-white">Authentication &amp; Security</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-cyan-400">15</td>
                <td className="py-3.5 px-4">
                  Salted bcrypt hashing, single-use hashed OTP storage, 10-minute expiry, JWT HTTP-only cookies, Helmet headers, rate limiting, and zero plaintext credentials in logs.
                </td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-white/[0.03]">
                <td className="py-3.5 px-4 font-bold text-white">Nodemailer Integration</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-amber-300">10</td>
                <td className="py-3.5 px-4">
                  Sender Name: "Code-a-Nova", branded responsive HTML templates for OTP and registration confirmation, non-blocking asynchronous dispatch, and graceful fallback.
                </td>
                <td className="py-3.5 px-4 text-amber-400 font-bold font-mono">HIGH</td>
              </tr>
              <tr className="hover:bg-white/[0.03]">
                <td className="py-3.5 px-4 font-bold text-white">README, Deployment &amp; Demo</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-amber-300">5</td>
                <td className="py-3.5 px-4">
                  Comprehensive architectural README, clean Git history, environment templates, deployment instructions for Vercel + Render, and 3-5 minute demo walkthrough script.
                </td>
                <td className="py-3.5 px-4 text-amber-400 font-bold font-mono">HIGH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code of Conduct & Rules */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-3">
          <h2 className="text-2xl font-bold text-white font-display">
            Competition Rules &amp; Ethical Standards
          </h2>
          <p className="text-xs text-slate-400">
            Guidelines ensuring a fair and constructive competition for all participating institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="bg-[#0F172A]/80 backdrop-blur-md p-5 border border-white/10 rounded-[8px] space-y-2 shadow-sm">
            <h4 className="font-bold text-white text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Original Engineering
            </h4>
            <p className="leading-relaxed text-slate-400">
              All submitted source code must be written specifically for or enhanced meaningfully during the hackathon cycle. Direct plagiarism or uncredited reproduction results in automatic disqualification.
            </p>
          </div>

          <div className="bg-[#0F172A]/80 backdrop-blur-md p-5 border border-white/10 rounded-[8px] space-y-2 shadow-sm">
            <h4 className="font-bold text-white text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Accurate Credentials
            </h4>
            <p className="leading-relaxed text-slate-400">
              All team member emails, university affiliations, and presentation URLs must be authentic. Duplicate registrations under multiple accounts will be removed by automated checks.
            </p>
          </div>

          <div className="bg-[#0F172A]/80 backdrop-blur-md p-5 border border-white/10 rounded-[8px] space-y-2 shadow-sm">
            <h4 className="font-bold text-white text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Interdisciplinary Teams
            </h4>
            <p className="leading-relaxed text-slate-400">
              Cross-college collaborations and multi-disciplinary teams combining frontend engineers, systems architects, and designers are encouraged across all 5 competition tracks.
            </p>
          </div>

          <div className="bg-[#0F172A]/80 backdrop-blur-md p-5 border border-white/10 rounded-[8px] space-y-2 shadow-sm">
            <h4 className="font-bold text-white text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Transparent Scoring
            </h4>
            <p className="leading-relaxed text-slate-400">
              Every participant receives an official verifiable participation certificate. Shortlisted teams receive detailed evaluator notes and mentor guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-white font-display">Ready to enter your submission?</h3>
          <p className="text-xs text-slate-400">Join hundreds of student developers building for the future.</p>
        </div>
        <Link to="/signup">
          <Button variant="primary" size="md" className="gap-2 font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            Create Participant Account
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
