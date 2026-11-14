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
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow-navy -top-20 -left-20 opacity-50" />
      <div className="ambient-glow-gold top-40 -right-20 opacity-60" />

      {/* Header */}
      <div className="relative space-y-4 border-b border-[#E5E7EB] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#17243A]/5 border border-[#17243A]/15 rounded-[6px] shadow-xs">
          <img src="/logo.png" alt="Code-a-Nova Logo" className="w-4 h-4 rounded-[3px] object-contain" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#17243A] font-mono">
            Event Charter &bull; Code-a-Nova 2026-27
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17243A] tracking-tight font-display">
          Engineered for{' '}
          <span className="bg-gradient-to-r from-[#17243A] via-[#243653] to-[#D6A64F] bg-clip-text text-transparent">
            Real Technical Merit
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
          Code-a-Nova is a national student hackathon platform built on modern production standards. We provide a transparent, rigorous, and meritocratic environment for engineering talent.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-[#E5E7EB] rounded-[8px] space-y-3.5 shadow-sm hover:border-[#17243A]/40 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-[6px] bg-[#17243A] text-white flex items-center justify-center shadow-xs">
            <Terminal className="w-5 h-5 text-[#D6A64F]" />
          </div>
          <h3 className="font-bold text-lg text-[#17243A] font-display">Working Code Over Decks</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            We evaluate fully functioning code, backend APIs, verified databases, and graceful error handling rather than decorative pitch decks.
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E5E7EB] rounded-[8px] space-y-3.5 shadow-sm hover:border-[#17243A]/40 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-[6px] bg-[#17243A] text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#21845B]" />
          </div>
          <h3 className="font-bold text-lg text-[#17243A] font-display">Cryptographic Verification</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Every account is secured with salted bcrypt hashing, cryptographically random OTP generation with 10-minute expiry, and JWT session handling.
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E5E7EB] rounded-[8px] space-y-3.5 shadow-sm hover:border-[#17243A]/40 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-[6px] bg-[#17243A] text-white flex items-center justify-center shadow-xs">
            <Users className="w-5 h-5 text-[#D6A64F]" />
          </div>
          <h3 className="font-bold text-lg text-[#17243A] font-display">Dynamic Team Scaling</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Support for 1 to 5 participants per team with dynamic roster generation, internal email collision detection, and automated confirmation receipts.
          </p>
        </div>
      </div>

      {/* Official 100-Mark Evaluation Framework */}
      <div id="rules" className="bg-white border-2 border-[#17243A] rounded-[8px] p-6 sm:p-8 space-y-6 shadow-md">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F] font-mono">
            Scoring Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] font-display">
            Official 100-Mark Internship &amp; Hackathon Rubric
          </h2>
          <p className="text-xs text-[#6B7280]">
            Every project submitted to Code-a-Nova is systematically evaluated against these transparent criteria:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#E5E7EB] rounded-[5px] overflow-hidden">
            <thead className="bg-[#17243A] text-white uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Evaluation Category</th>
                <th className="py-3 px-4">Points</th>
                <th className="py-3 px-4">Technical Focus &amp; Requirements</th>
                <th className="py-3 px-4">Priority Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#4B5563]">
              <tr className="hover:bg-[#F7F7F4]/60">
                <td className="py-3.5 px-4 font-bold text-[#17243A]">Functional Completeness</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-[#17243A]">30</td>
                <td className="py-3.5 px-4">
                  All MVP workflows working: user signup, 10-minute OTP verification, login, dynamic 1-5 team registration, deliverables links, and CRUD functionality.
                </td>
                <td className="py-3.5 px-4 text-[#21845B] font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-[#F7F7F4]/60">
                <td className="py-3.5 px-4 font-bold text-[#17243A]">Code Quality &amp; Structure</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-[#17243A]">20</td>
                <td className="py-3.5 px-4">
                  Clean modular architecture, separation of concerns (Controllers, Services, Validators), centralized error middleware, and reusable UI components.
                </td>
                <td className="py-3.5 px-4 text-[#21845B] font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-[#F7F7F4]/60">
                <td className="py-3.5 px-4 font-bold text-[#17243A]">UI / UX &amp; Responsiveness</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-[#17243A]">20</td>
                <td className="py-3.5 px-4">
                  Editorial developer visual language, responsive across 360px to 1440px+, zero horizontal scroll, restrained rectangular shapes (4-6px radius), and clean typography.
                </td>
                <td className="py-3.5 px-4 text-[#21845B] font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-[#F7F7F4]/60">
                <td className="py-3.5 px-4 font-bold text-[#17243A]">Authentication &amp; Security</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-[#17243A]">15</td>
                <td className="py-3.5 px-4">
                  Salted bcrypt hashing, single-use hashed OTP storage, 10-minute expiry, JWT HTTP-only cookies, Helmet headers, rate limiting, and zero plaintext credentials in logs.
                </td>
                <td className="py-3.5 px-4 text-[#21845B] font-bold font-mono">CRITICAL</td>
              </tr>
              <tr className="hover:bg-[#F7F7F4]/60">
                <td className="py-3.5 px-4 font-bold text-[#17243A]">Nodemailer Integration</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-[#17243A]">10</td>
                <td className="py-3.5 px-4">
                  Sender Name: "Code-a-Nova", branded responsive HTML templates for OTP and registration confirmation, non-blocking asynchronous dispatch, and graceful fallback.
                </td>
                <td className="py-3.5 px-4 text-[#D6A64F] font-bold font-mono">HIGH</td>
              </tr>
              <tr className="hover:bg-[#F7F7F4]/60">
                <td className="py-3.5 px-4 font-bold text-[#17243A]">README, Deployment &amp; Demo</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-base text-[#17243A]">5</td>
                <td className="py-3.5 px-4">
                  Comprehensive architectural README, clean Git history, environment templates, deployment instructions for Vercel + Render, and 3-5 minute demo walkthrough script.
                </td>
                <td className="py-3.5 px-4 text-[#D6A64F] font-bold font-mono">HIGH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code of Conduct & Rules */}
      <div className="space-y-6">
        <div className="border-b border-[#E5E7EB] pb-3">
          <h2 className="text-2xl font-bold text-[#17243A] font-display">
            Competition Rules &amp; Ethical Standards
          </h2>
          <p className="text-xs text-[#6B7280]">
            Guidelines ensuring a fair and constructive competition for all participating institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4B5563]">
          <div className="bg-white p-5 border border-[#E5E7EB] rounded-[6px] space-y-2 shadow-sm">
            <h4 className="font-bold text-[#17243A] text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
              Original Engineering
            </h4>
            <p className="leading-relaxed">
              All submitted source code must be written specifically for or enhanced meaningfully during the hackathon cycle. Direct plagiarism or uncredited reproduction results in automatic disqualification.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#E5E7EB] rounded-[6px] space-y-2 shadow-sm">
            <h4 className="font-bold text-[#17243A] text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
              Accurate Credentials
            </h4>
            <p className="leading-relaxed">
              All team member emails, university affiliations, and presentation URLs must be authentic. Duplicate registrations under multiple accounts will be removed by automated checks.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#E5E7EB] rounded-[6px] space-y-2 shadow-sm">
            <h4 className="font-bold text-[#17243A] text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
              Interdisciplinary Teams
            </h4>
            <p className="leading-relaxed">
              Cross-college collaborations and multi-disciplinary teams combining frontend engineers, systems architects, and designers are encouraged across all 5 competition tracks.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#E5E7EB] rounded-[6px] space-y-2 shadow-sm">
            <h4 className="font-bold text-[#17243A] text-sm font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
              Transparent Scoring
            </h4>
            <p className="leading-relaxed">
              Every participant receives an official verifiable participation certificate. Shortlisted teams receive detailed evaluator notes and mentor guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-[#17243A] font-display">Ready to enter your submission?</h3>
          <p className="text-xs text-[#6B7280]">Join hundreds of student developers building for the future.</p>
        </div>
        <Link to="/signup">
          <Button variant="primary" size="md" className="gap-2 font-bold">
            Create Participant Account
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
