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

const About = () => {
  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-14 text-slate-900">
      {/* Header */}
      <div className="relative space-y-3 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">
          <img src="/logo.png" alt="Code-a-Nova Logo" className="w-4 h-4 rounded-md object-contain" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-700 font-mono">
            Event Charter &bull; Code-a-Nova 2026-27
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Engineered for Real Technical Merit
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Code-a-Nova is a national student hackathon platform built on modern production standards. We provide a transparent, rigorous, and meritocratic environment for engineering talent.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-3 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-slate-800" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">Working Code Over Decks</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We evaluate fully functioning code, backend APIs, verified databases, and graceful error handling rather than decorative pitch decks.
          </p>
        </div>

        <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-3 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">Cryptographic Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every account is secured with salted bcrypt hashing, cryptographically random OTP generation with 10-minute expiry, and JWT session handling.
          </p>
        </div>

        <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-3 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
            <Users className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">Dynamic Team Scaling</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Support for 1 to 5 participants per team with dynamic roster generation, internal email collision detection, and automated confirmation receipts.
          </p>
        </div>
      </div>

      {/* Official 100-Mark Evaluation Framework */}
      <div id="rules" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            Scoring Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Official 100-Mark Internship &amp; Hackathon Rubric
          </h2>
          <p className="text-xs text-slate-600">
            Every project submitted to Code-a-Nova is systematically evaluated against these transparent criteria:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 uppercase font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Evaluation Category</th>
                <th className="py-3 px-4">Points</th>
                <th className="py-3 px-4">Technical Focus &amp; Requirements</th>
                <th className="py-3 px-4">Priority Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Functional Completeness</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-slate-900">30</td>
                <td className="py-3.5 px-4">
                  All MVP workflows working: user signup, 10-minute OTP verification, login, dynamic 1-5 team registration, deliverables links, and CRUD functionality.
                </td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Code Quality &amp; Structure</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-slate-900">20</td>
                <td className="py-3.5 px-4">
                  Clean modular architecture, separation of concerns (Controllers, Services, Validators), centralized error middleware, and reusable UI components.
                </td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">UI / UX &amp; Responsiveness</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-slate-900">20</td>
                <td className="py-3.5 px-4">
                  Editorial visual language, responsive across 360px to 1440px+, zero horizontal scroll, restrained modern shapes, and clean typography.
                </td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Authentication &amp; Security</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-slate-900">15</td>
                <td className="py-3.5 px-4">
                  Salted bcrypt hashing, single-use hashed OTP storage, 10-minute expiry, JWT HTTP-only cookies, Helmet headers, rate limiting, and zero plaintext credentials.
                </td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Nodemailer Integration</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-amber-700">10</td>
                <td className="py-3.5 px-4">
                  Sender Name: "Code-a-Nova", branded responsive HTML templates for OTP and registration confirmation, non-blocking asynchronous dispatch, and graceful fallback.
                </td>
                <td className="py-3.5 px-4 text-amber-700 font-bold font-mono">HIGH</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">README, Deployment &amp; Demo</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-amber-700">5</td>
                <td className="py-3.5 px-4">
                  Comprehensive architectural README, clean Git history, environment templates, deployment instructions for Vercel + Render, and concise demo walkthrough script.
                </td>
                <td className="py-3.5 px-4 text-amber-700 font-bold font-mono">HIGH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code of Conduct & Rules */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Competition Rules &amp; Ethical Standards
          </h2>
          <p className="text-xs text-slate-600">
            Guidelines ensuring a fair and constructive competition for all participating institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Original Engineering
            </h4>
            <p className="leading-relaxed text-slate-600">
              All submitted source code must be written specifically for or enhanced meaningfully during the hackathon cycle. Direct plagiarism results in disqualification.
            </p>
          </div>

          <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Accurate Credentials
            </h4>
            <p className="leading-relaxed text-slate-600">
              All team member emails, university affiliations, and presentation URLs must be authentic. Duplicate registrations under multiple accounts will be removed.
            </p>
          </div>

          <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Interdisciplinary Teams
            </h4>
            <p className="leading-relaxed text-slate-600">
              Cross-college collaborations and multi-disciplinary teams combining frontend engineers, systems architects, and designers are encouraged.
            </p>
          </div>

          <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Transparent Scoring
            </h4>
            <p className="leading-relaxed text-slate-600">
              Every participant receives an official verifiable participation certificate. Shortlisted teams receive detailed evaluator notes and mentor guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 font-display">Ready to enter your submission?</h3>
          <p className="text-xs text-slate-600">Join student developers building production software.</p>
        </div>
        <Link to="/signup">
          <Button variant="primary" size="md" className="gap-2 font-bold shadow-sm">
            Create Participant Account
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
