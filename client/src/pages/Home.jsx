import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Calendar,
  Users,
  Trophy,
  Brain,
  Globe,
  Cpu,
  Shield,
  Layers,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Terminal,
  FileCode,
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
  Star,
  Clock,
  Building2,
  Flame,
  Copy,
  Check,
  QrCode,
  Gauge,
  Sliders,
  ChevronRight,
  BookmarkCheck,
  Hash,
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import CountdownTimer from '../components/common/CountdownTimer';
import { DOMAINS, EVENT_TIMELINE, PRIZE_TIERS } from '../utils/constants';
import { registrationService } from '../services/registration.service';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(false);

  // Interactive Interactive Pass Customizer state in Hero
  const [heroRole, setHeroRole] = useState('Full-Stack Architect');
  const [heroTrack, setHeroTrack] = useState('AI / Machine Learning');

  // Interactive Rubric Calculator state
  const [rubricScores, setRubricScores] = useState({
    mvp: 30,
    arch: 20,
    ui: 20,
    auth: 15,
    email: 10,
    docs: 5,
  });

  const totalCalculatedScore =
    rubricScores.mvp +
    rubricScores.arch +
    rubricScores.ui +
    rubricScores.auth +
    rubricScores.email +
    rubricScores.docs;

  const getScoreVerdict = (score) => {
    if (score >= 90) return { label: 'Grand Finale Podium Contender', color: 'text-amber-400', badge: 'Tier 1' };
    if (score >= 75) return { label: 'Shortlist Qualified for Finale', color: 'text-cyan-400', badge: 'Tier 2' };
    if (score >= 60) return { label: 'Competitive Review Range', color: 'text-emerald-400', badge: 'Tier 3' };
    return { label: 'Prototype Needs Architecture Polish', color: 'text-slate-400', badge: 'In Progress' };
  };

  const getTrackIcon = (id, className = 'w-5 h-5') => {
    switch (id) {
      case 'AI / Machine Learning':
        return <Brain className={className} />;
      case 'Web Development':
        return <Globe className={className} />;
      case 'Internet of Things':
        return <Cpu className={className} />;
      case 'Cyber Security':
        return <Shield className={className} />;
      case 'Blockchain':
        return <Layers className={className} />;
      default:
        return <Code2 className={className} />;
    }
  };

  const selectedDomain = DOMAINS[selectedTrackIndex] || DOMAINS[0];

  const faqs = [
    {
      category: 'Eligibility',
      q: 'Who is eligible to compete in Code-a-Nova 2026-27?',
      a: 'Any currently enrolled undergraduate, postgraduate, or diploma student (B.Tech, BE, M.Tech, BCA, MCA, BSc CS, or allied technical branches) across India is eligible. Cross-college and cross-year teams are fully permitted.',
    },
    {
      category: 'Teams',
      q: 'Can I participate solo or must I form a team?',
      a: 'Both solo developers and teams of 2 to 5 members are welcome. The team leader signs up first, verifies their account via our automated 10-minute OTP system, and dynamically configures member slots in Section 3 of the registration docket.',
    },
    {
      category: 'Submissions',
      q: 'What deliverables are required during the initial phase?',
      a: 'You must provide a public presentation deck link (Google Drive, OneDrive, or Pitch) and a prototype link (GitHub/GitLab code repository or interactive Figma prototype). An optional 2-minute demo video link can also be included.',
    },
    {
      category: 'Evaluation',
      q: 'How is judging conducted and what prevents bias?',
      a: 'Submissions are evaluated through a strict, transparent 100-point rubric with 6 weighted categories: Functional MVP (30), Architecture (20), UI/UX Polish (20), Cryptographic Auth (15), Nodemailer Delivery (10), and Documentation/Pitch (5). Evaluators grade working repositories and live deploys.',
    },
    {
      category: 'Security',
      q: 'How does the automated verification pipeline work?',
      a: 'Participant accounts are authenticated through salted bcrypt password hashing and cryptographically secure single-use 6-digit OTPs with strict 10-minute TTL (Time-To-Live). All session cookies are configured with HttpOnly and SameSite flags.',
    },
    {
      category: 'Logistics',
      q: 'Is there any registration or entry fee?',
      a: 'No. Registration and participation in Code-a-Nova is 100% free of charge for all accepted students. Cloud credits, mentor guidance, and finalist hospitality are provided at zero cost.',
    },
  ];

  const filteredFaqs =
    activeFaqCategory === 'All'
      ? faqs
      : faqs.filter((f) => f.category === activeFaqCategory);

  const specialBounties = [
    { title: 'Best Architectural Elegance', amount: '₹10,000', focus: 'Fault-tolerant backend, modular clean code, sub-50ms latency' },
    { title: 'Best Defensive Security', amount: '₹10,000', focus: 'Zero-knowledge proofs, hardened auth, zero CVE vulnerabilities' },
    { title: 'Best UI/UX & Interaction', amount: '₹10,000', focus: 'Bespoke design system, micro-interactions, responsive precision' },
    { title: 'Rookie / Freshmen Innovation', amount: '₹5,000', focus: 'Top performing team of 1st and 2nd year undergraduates' },
  ];

  const handleCopyPassId = () => {
    navigator.clipboard.writeText('CAN-2026-ALPHA-8842');
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="space-y-24 pb-24 text-slate-100 bg-[#06090F] overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* ── 0. LIVE HUD MISSION CONTROL STRIP ─────────────────────── */}
      <section className="border-b border-white/[0.08] bg-[#0A0E17]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-2.5 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              CAN-OPS HUD
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">
              CLUSTER: <strong className="text-white">AP-SOUTH-1 (BLR)</strong>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">
              HASH: <strong className="text-cyan-400">#SHA256-V2.4</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              REGISTRATIONS ACTIVE
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-bold">DEADLINE: DEC 20, 2026</span>
          </div>
        </div>
      </section>

      {/* ── 1. ARCHITECTURAL HERO SECTION ──────────────────────────── */}
      <section className="relative pt-8 md:pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle architectural background grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="ambient-glow-cyan -top-40 -left-20 opacity-40 pointer-events-none" />
        <div className="ambient-glow-gold top-60 -right-20 opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Bold Typography & Action Command */}
            <div className="lg:col-span-7 space-y-7">
              {/* Event Badge with Monospace Tag */}
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.04] border border-cyan-500/30 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                <img src="/logo.png" alt="Code-a-Nova Logo" className="w-5 h-5 rounded-[4px] object-contain" />
                <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">
                  National Hackathon 2026-27
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono font-bold px-2 py-0.5 rounded-full border border-cyan-500/40">
                  HYBRID FINALE
                </span>
              </div>

              {/* Mega Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] font-display text-white">
                  ARCHITECT <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                    THE UNBUILT.
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl font-mono text-slate-400 font-medium">
                  36 Hours of High-Concurrency Sprinting.
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Connect with India's most ambitious student engineers across 5 specialized technology tracks. Build functioning codebases, pass automated security verifications, and pitch to industry architects.
              </p>

              {/* Hero Action Button Cluster */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <Link to={isAuthenticated ? '/register' : '/signup'}>
                    <Button variant="primary" size="lg" className="gap-2 font-bold font-display shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)]">
                      {isAuthenticated ? 'Submit Project Docket' : 'Register for Hackathon'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="#tracks">
                    <Button variant="secondary" size="lg" className="font-semibold border-white/10 text-slate-200 hover:text-white hover:border-cyan-500/40">
                      Explore 5 Tracks
                    </Button>
                  </a>
                </div>

                <div className="sm:border-l sm:border-white/10 sm:pl-4 pt-2 sm:pt-0">
                  <CountdownTimer
                    targetDate="2026-12-20T23:59:59"
                    label="Docket Closes In:"
                  />
                </div>
              </div>

              {/* Trust Specs Strip */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/[0.08] text-xs font-mono text-slate-400">
                <div>
                  <span className="text-cyan-400 block font-bold text-sm">100% FREE</span>
                  <span>Zero entry fee</span>
                </div>
                <div>
                  <span className="text-cyan-400 block font-bold text-sm">1 TO 5</span>
                  <span>Solo or team squad</span>
                </div>
                <div>
                  <span className="text-cyan-400 block font-bold text-sm">₹1,50,000+</span>
                  <span>Prizes &amp; bounties</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Holographic Participant Pass Simulator */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[16px] bg-gradient-to-b from-[#0F172A] to-[#0A0E17] border border-cyan-500/40 p-6 shadow-[0_0_40px_rgba(56,189,248,0.15)] relative overflow-hidden">
                {/* Decorative circuit line corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/20 to-transparent pointer-events-none" />
                <div className="absolute -top-1 -right-1 text-cyan-400 font-mono text-[10px] px-2 py-0.5 bg-cyan-950 border border-cyan-500/40 rounded-bl-[8px]">
                  LIVE BADGE SPEC
                </div>

                {/* Pass Simulator Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-[6px] object-contain shadow-sm" />
                    <div>
                      <div className="font-display font-bold text-sm text-white tracking-wide">
                        CODE-A-NOVA // PASS
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono">
                        VERIFIED APPLICANT CREDENTIAL
                      </div>
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Role Switcher Pills */}
                <div className="pt-4 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    1. Select Your Engineering Persona:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Full-Stack Architect',
                      'AI/ML Researcher',
                      'Systems & Security',
                      'IoT / Edge Hacker',
                      'Web3 Engineer',
                    ].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setHeroRole(role)}
                        className={`px-2.5 py-1 rounded-[5px] text-[11px] font-mono transition-all cursor-pointer ${
                          heroRole === role
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(56,189,248,0.25)] font-bold'
                            : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generated Pass Body */}
                <div className="mt-5 p-4 rounded-[10px] bg-[#070A12] border border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <div>
                      <div className="text-[10px] text-slate-500">ASSIGNED ROLE</div>
                      <div className="text-white font-bold text-sm font-display">{heroRole}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500">ACCESS LEVEL</div>
                      <div className="text-amber-400 font-bold">ALL-ARENAS (VIP)</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500">REF ID:</span>{' '}
                      <span className="text-cyan-300 font-bold">CAN-2026-ALPHA-8842</span>
                    </div>
                    <div>
                      <span className="text-slate-500">FORMAT:</span>{' '}
                      <span className="text-white">Hybrid Sprint</span>
                    </div>
                    <div>
                      <span className="text-slate-500">HASH:</span>{' '}
                      <span className="text-slate-300">sha256/bcrypt</span>
                    </div>
                    <div>
                      <span className="text-slate-500">ENTRY FEE:</span>{' '}
                      <span className="text-emerald-400 font-bold">₹0 (100% Free)</span>
                    </div>
                  </div>

                  {/* Perforated barcode representation */}
                  <div className="pt-2 border-t border-dashed border-white/20 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="h-4 w-36 bg-gradient-to-r from-white/40 via-cyan-400/40 to-white/40 rounded-[2px]" />
                      <div className="text-[9px] text-slate-500 tracking-widest">||| | |||| | ||| || |||</div>
                    </div>
                    <button
                      onClick={handleCopyPassId}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                      title="Copy Pass Reference"
                    >
                      {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId ? 'Copied' : 'Copy Ref'}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Ready to claim your spot?</span>
                  <Link
                    to={isAuthenticated ? '/register' : '/signup'}
                    className="text-cyan-400 hover:text-cyan-300 font-bold font-mono text-xs inline-flex items-center gap-1"
                  >
                    Enter Registration &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CONTINUOUS HACKER MARQUEE RIBBON ─────────────────────── */}
      <div className="w-full border-y border-cyan-500/30 bg-[#0A0F1D] py-3 overflow-hidden relative shadow-inner">
        <div className="flex w-[200%] animate-marquee whitespace-nowrap text-xs font-mono font-bold tracking-wider text-cyan-300">
          <span className="mx-6 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            ₹1,50,000+ CASH &amp; CLOUD BOUNTIES
          </span>
          <span className="mx-6 text-slate-600">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            36-HOUR RAPID PROTOTYPING GRAND FINALE
          </span>
          <span className="mx-6 text-slate-600">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            AI / MACHINE LEARNING ARENA
          </span>
          <span className="mx-6 text-slate-600">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            HIGH-CONCURRENCY WEB SYSTEMS
          </span>
          <span className="mx-6 text-slate-600">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            INTERNET OF THINGS &amp; EDGE HARDWARE
          </span>
          <span className="mx-6 text-slate-600">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            CYBER SECURITY &amp; ZERO-KNOWLEDGE
          </span>
          <span className="mx-6 text-slate-600">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            DECENTRALIZED PROTOCOLS &amp; WEB3
          </span>
          <span className="mx-6 text-slate-600">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            100% FREE PARTICIPATION NATIONWIDE
          </span>
          <span className="mx-6 text-slate-600">&bull;</span>
        </div>
      </div>

      {/* ── 3. FOUR ARCHITECTURAL PILLARS (BRUTALIST GRID) ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0B101D] border border-white/10 rounded-[10px] p-6 space-y-3 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest flex items-center justify-between">
              <span>ARENA SPEC 01</span>
              <span>[05 TRACKS]</span>
            </div>
            <div className="text-3xl font-extrabold text-white font-display">5 Arenas</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated problem statements, specialized evaluation rubrics, and track-specific mentoring across AI, Web, IoT, Security, and Web3.
            </p>
          </div>

          <div className="bg-[#0B101D] border border-white/10 rounded-[10px] p-6 space-y-3 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest flex items-center justify-between">
              <span>ARENA SPEC 02</span>
              <span>[1–5 MB]</span>
            </div>
            <div className="text-3xl font-extrabold text-white font-display">1 to 5 Mbrs</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solo pioneers or dynamic multi-college teams. Automated internal collision prevention and instant confirmation receipts.
            </p>
          </div>

          <div className="bg-[#0B101D] border border-white/10 rounded-[10px] p-6 space-y-3 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest flex items-center justify-between">
              <span>ARENA SPEC 03</span>
              <span>[36 HOURS]</span>
            </div>
            <div className="text-3xl font-extrabold text-white font-display">36-Hr Sprint</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Continuous hybrid hackathon marathon with milestone checkpoints, architecture mentoring, and bare-metal prototype judging.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-950/30 via-[#0B101D] to-[#0A0E17] border border-amber-500/40 rounded-[10px] p-6 space-y-3 relative overflow-hidden group hover:border-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <div className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest flex items-center justify-between">
              <span>ARENA SPEC 04</span>
              <span>[REWARDS]</span>
            </div>
            <div className="text-3xl font-extrabold text-amber-300 font-display">₹1,50,000+</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Substantial direct cash grants, seed incubation fast-track interviews, cloud infrastructure credits, and direct partner recruiting.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. TACTICAL TRACK EXPLORER ─────────────────────────────── */}
      <section id="tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              [ SECTION 01 // COMPETITION DOMAINS ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Select Your Arena of Technical Impact
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Each arena features targeted problem statements, dedicated industry architect evaluators, and category excellence grants.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-[6px]">
            ACTIVE SELECTION: TRACK 0{selectedTrackIndex + 1} OF {DOMAINS.length}
          </div>
        </div>

        {/* Track Selection Grid + Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Track Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {DOMAINS.map((domain, index) => {
              const isSelected = selectedTrackIndex === index;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedTrackIndex(index)}
                  className={`w-full text-left p-4 rounded-[10px] border transition-all flex items-start justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 text-white border-cyan-500/60 shadow-[0_0_25px_rgba(56,189,248,0.2)]'
                      : 'bg-[#0B101D] text-slate-300 border-white/10 hover:border-white/20 hover:bg-[#10172A]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-[8px] border ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-sm'
                          : 'bg-[#070A12] border-white/10 text-slate-400'
                      }`}
                    >
                      {getTrackIcon(domain.id)}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-semibold text-cyan-400">
                        TRACK 0{index + 1}
                      </div>
                      <div className="font-bold text-sm sm:text-base font-display text-white">
                        {domain.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {domain.shortDesc}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 mt-2 transition-transform shrink-0 ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Technical Track Dossier */}
          <div className="lg:col-span-7">
            <div
              key={selectedTrackIndex}
              className="bg-[#0B101D] border border-cyan-500/30 rounded-[12px] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-[10px]">
                    {getTrackIcon(selectedDomain.id, 'w-6 h-6')}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest">
                      TECHNICAL DOSSIER // TRACK 0{selectedTrackIndex + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                      {selectedDomain.title}
                    </h3>
                  </div>
                </div>

                <Link
                  to={
                    isAuthenticated
                      ? `/register?track=${encodeURIComponent(selectedDomain.id)}`
                      : '/signup'
                  }
                >
                  <Button variant="primary" size="sm" className="gap-1.5 font-bold shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                    Register This Track
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedDomain.shortDesc}
              </p>

              {/* Sample Challenge Statements */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Sample Problem Statements &amp; Focus Areas:
                </div>
                <div className="space-y-2.5 text-xs text-slate-300">
                  {selectedDomain.sampleProblems?.map((prob, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-[#070A12] border border-white/10 rounded-[8px] flex items-start gap-3"
                    >
                      <span className="font-mono font-bold text-cyan-400 shrink-0 text-sm">
                        0{i + 1}.
                      </span>
                      <span className="leading-relaxed text-slate-200">{prob}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Evaluation Focus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/[0.08]">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Recommended Stacks &amp; Frameworks
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDomain.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white/5 text-cyan-300 border border-white/10 rounded-[5px] text-xs font-mono font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Primary Evaluation Emphasis
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {selectedDomain.evalFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. INTERACTIVE 100-POINT RUBRIC CALCULATOR (UNIQUE FEATURE) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B101D] via-[#0E1526] to-[#070A12] border border-cyan-500/40 rounded-[14px] p-6 sm:p-10 shadow-[0_0_40px_rgba(56,189,248,0.12)] space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase mb-2">
                <Gauge className="w-3.5 h-3.5" />
                INTERACTIVE SCORING ENGINE
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Simulate Your Project Evaluation Score (100 Marks Total)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Every project is graded against these transparent criteria. Adjust the sliders below to see how your submission aligns with evaluator expectations.
              </p>
            </div>

            {/* Live Score Display Badge */}
            <div className="bg-[#070A12] border border-cyan-500/50 p-4 rounded-[10px] text-right font-mono min-w-[200px] shadow-inner">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">CALCULATED SCORE</div>
              <div className="text-4xl font-extrabold text-cyan-300">
                {totalCalculatedScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
              </div>
              <div className={`text-xs font-bold mt-1 ${getScoreVerdict(totalCalculatedScore).color}`}>
                {getScoreVerdict(totalCalculatedScore).label}
              </div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Slider 1: Functional MVP (30 pts) */}
            <div className="bg-[#070A12]/80 border border-white/10 rounded-[8px] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white">01. Working MVP Execution</span>
                <span className="text-cyan-400 font-bold">{rubricScores.mvp} / 30 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={rubricScores.mvp}
                onChange={(e) => setRubricScores({ ...rubricScores, mvp: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                All end-to-end user workflows, error handling, and database persistence working.
              </p>
            </div>

            {/* Slider 2: Architecture & Clean Code (20 pts) */}
            <div className="bg-[#070A12]/80 border border-white/10 rounded-[8px] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white">02. Clean System Architecture</span>
                <span className="text-cyan-400 font-bold">{rubricScores.arch} / 20 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={rubricScores.arch}
                onChange={(e) => setRubricScores({ ...rubricScores, arch: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Modular services, controllers, centralized error handling, and decoupled layers.
              </p>
            </div>

            {/* Slider 3: UI / UX Quality (20 pts) */}
            <div className="bg-[#070A12]/80 border border-white/10 rounded-[8px] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white">03. UI / UX Design System Polish</span>
                <span className="text-cyan-400 font-bold">{rubricScores.ui} / 20 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={rubricScores.ui}
                onChange={(e) => setRubricScores({ ...rubricScores, ui: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Responsive layouts (360px-1440px), visual hierarchy, zero layout shift, polished dark craft.
              </p>
            </div>

            {/* Slider 4: Authentication & Security (15 pts) */}
            <div className="bg-[#070A12]/80 border border-white/10 rounded-[8px] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white">04. Cryptographic Authentication</span>
                <span className="text-cyan-400 font-bold">{rubricScores.auth} / 15 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={rubricScores.auth}
                onChange={(e) => setRubricScores({ ...rubricScores, auth: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Salted bcrypt hashing, single-use hashed OTP storage, 10m TTL, and secure cookies.
              </p>
            </div>

            {/* Slider 5: Automated Nodemailer Delivery (10 pts) */}
            <div className="bg-[#070A12]/80 border border-white/10 rounded-[8px] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white">05. Automated Email Receipts</span>
                <span className="text-cyan-400 font-bold">{rubricScores.email} / 10 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={rubricScores.email}
                onChange={(e) => setRubricScores({ ...rubricScores, email: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Branded HTML templates, verified SMTP dispatch for OTP codes and team registrations.
              </p>
            </div>

            {/* Slider 6: Documentation & Video Pitch (5 pts) */}
            <div className="bg-[#070A12]/80 border border-white/10 rounded-[8px] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white">06. Documentation &amp; Demo Pitch</span>
                <span className="text-cyan-400 font-bold">{rubricScores.docs} / 5 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={rubricScores.docs}
                onChange={(e) => setRubricScores({ ...rubricScores, docs: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Comprehensive README.md, deployment documentation, clean Git commit history, and demo deck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PRIZE VAULT & SPECIAL BOUNTIES ───────────────────────── */}
      <section id="prizes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                [ SECTION 03 // AWARDS &amp; BOUNTIES ]
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                Rewarding Hardcore Technical Craft
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Beyond direct cash rewards, podium champions unlock pre-seed founder interviews, cloud computing grants, and exclusive recruiting access.
              </p>
            </div>

            <div className="text-left md:text-right font-mono">
              <div className="text-xs text-slate-500 uppercase tracking-widest">TOTAL BOUNTY POOL</div>
              <div className="text-4xl font-extrabold text-amber-400">₹1,50,000+</div>
            </div>
          </div>

          {/* Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRIZE_TIERS.map((tier, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;

              return (
                <div
                  key={idx}
                  className={`relative rounded-[12px] p-6 space-y-5 transition-all duration-300 hover:-translate-y-1.5 ${
                    isFirst
                      ? 'bg-gradient-to-b from-amber-950/40 via-[#0B101D] to-[#070A12] border-2 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.25)]'
                      : isSecond
                      ? 'bg-[#0B101D] border border-white/20 hover:border-cyan-500/50 shadow-xl'
                      : 'bg-[#0B101D] border border-white/10 hover:border-cyan-500/40 shadow-xl'
                  }`}
                >
                  {isFirst && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-0.5 rounded-full font-mono shadow-md">
                      ★ GRAND CHAMPION
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono uppercase font-bold tracking-wider ${
                        isFirst ? 'text-amber-400' : isSecond ? 'text-cyan-300' : 'text-emerald-400'
                      }`}
                    >
                      {tier.rank}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isFirst
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : isSecond
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      <Trophy className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold font-display text-white">{tier.title}</h4>
                    <div
                      className={`text-3xl sm:text-4xl font-extrabold font-mono mt-1 ${
                        isFirst ? 'text-amber-400' : 'text-white'
                      }`}
                    >
                      {tier.amount}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2.5">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-bold">
                      Package Includes:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {tier.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isFirst ? 'text-amber-400' : 'text-cyan-400'
                            }`}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4 Special Engineering Bounties */}
          <div className="pt-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              [ SPECIAL CATEGORY BOUNTIES — OPEN TO ALL TRACKS ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialBounties.map((bounty, i) => (
                <div
                  key={i}
                  className="bg-[#070A12] border border-white/10 hover:border-cyan-500/40 rounded-[8px] p-4 space-y-2 transition-all"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[10px] text-slate-500 uppercase">BOUNTY 0{i + 1}</span>
                    <span className="text-cyan-300 font-bold text-sm">{bounty.amount}</span>
                  </div>
                  <div className="font-bold text-white text-sm font-display">{bounty.title}</div>
                  <p className="text-[11px] text-slate-400">{bounty.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. STAGED SPRINT ROADMAP ────────────────────────────────── */}
      <section id="timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
            [ SECTION 04 // EVENT MILESTONES ]
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            The Roadmap to the 36-Hour Sprint
          </h2>
          <p className="text-sm text-slate-400">
            Structured progression milestones from initial account verification to bare-metal sprint judging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {EVENT_TIMELINE.map((item) => (
            <div
              key={item.step}
              className={`bg-[#0B101D] border rounded-[12px] p-6 relative flex flex-col justify-between transition-all duration-200 ${
                item.active
                  ? 'border-cyan-500/60 ring-2 ring-cyan-500/20 shadow-[0_0_25px_rgba(56,189,248,0.2)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-[8px] flex items-center justify-center font-mono font-bold text-sm ${
                      item.active
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md'
                        : 'bg-[#070A12] text-cyan-400 border border-white/10'
                    }`}
                  >
                    0{item.step}
                  </div>
                  {item.active ? (
                    <Badge variant="primary" size="sm">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="default" size="sm">
                      Upcoming
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-base text-white mb-1 font-display">
                  {item.phase}
                </h3>
                <div className="text-xs font-bold text-cyan-400 font-mono mb-3">
                  {item.date}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.08] text-[11px] text-slate-300">
                <strong className="text-white font-mono">Expected Deliverable:</strong> {item.deliverables}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED QUESTIONS (FILTERABLE) ──────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
            [ SECTION 05 // HELP &amp; PROTOCOL ]
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400">
            Rules, eligibility guidelines, and submission protocol.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {['All', 'Eligibility', 'Teams', 'Submissions', 'Evaluation', 'Security', 'Logistics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFaqCategory(cat)}
              className={`px-3 py-1 rounded-[6px] text-xs font-mono transition-all cursor-pointer ${
                activeFaqCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0B101D] border border-white/10 rounded-[10px] overflow-hidden transition-all shadow-sm hover:border-cyan-500/40"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold shrink-0">
                    {faq.category}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    activeFaq === idx ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.06] animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. BOTTOM COMMAND BANNER ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#0B101D] via-[#0E1526] to-[#070A12] text-white rounded-[14px] p-8 md:p-12 border border-cyan-500/40 shadow-[0_0_40px_rgba(56,189,248,0.2)] overflow-hidden">
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-block px-3 py-1 bg-cyan-500/10 rounded-[6px] text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider border border-cyan-500/30">
                APPLICATIONS WINDOW ACTIVE &bull; SUBMISSION PORTAL OPEN
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                Ready to Ship Something That Moves the Future?
              </h2>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Create your verified participant account in seconds, assemble your team of 1 to 5 members, and register your official project deliverables into the Code-a-Nova docket.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                <Link to={isAuthenticated ? '/register' : '/signup'}>
                  <Button variant="accent" size="lg" className="gap-2 shadow-lg font-bold">
                    {isAuthenticated ? 'Submit Team Registration' : 'Register for Hackathon'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-semibold">
                    Review 100-Mark Rubric
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#070A12]/90 border border-white/10 rounded-[10px] p-5 space-y-3 font-mono text-xs shadow-inner">
              <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>SYSTEM SNAPSHOT</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <span className="text-slate-500">PLATFORM</span>
                <span className="text-emerald-400 font-bold">ONLINE &bull; v2.4</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <span className="text-slate-500">TRACKS</span>
                <span className="text-white font-bold">5 SPECIALIZED</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <span className="text-slate-500">TEAM SQUAD</span>
                <span className="text-white font-bold">1–5 PARTICIPANTS</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500">SPRINT DURATION</span>
                <span className="text-amber-300 font-bold">36 CONTINUOUS HOURS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
