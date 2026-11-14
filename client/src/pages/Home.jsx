import React, { useState } from 'react';
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
  ChevronRight,
  BookmarkCheck,
  Hash,
  Scale,
  FolderGit2,
  Lock,
  MailCheck,
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import CountdownTimer from '../components/common/CountdownTimer';
import { DOMAINS, EVENT_TIMELINE, PRIZE_TIERS } from '../utils/constants';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(false);

  // Participant Pass Role Selector in Hero
  const [heroRole, setHeroRole] = useState('Full-Stack Architect');

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
    { title: 'Best Defensive Security', amount: '₹10,000', focus: 'Hardened auth, secure sessions, and zero CVE vulnerabilities' },
    { title: 'Best UI/UX & Interaction', amount: '₹10,000', focus: 'Bespoke design system, micro-interactions, responsive precision' },
    { title: 'Rookie / Freshmen Innovation', amount: '₹5,000', focus: 'Top performing team of 1st and 2nd year undergraduates' },
  ];

  const rubricCriteria = [
    {
      points: '30 Points',
      title: 'Working MVP Execution',
      icon: <Terminal className="w-5 h-5 text-emerald-600" />,
      desc: 'Complete end-to-end functionality. Core user journeys work seamlessly with real database persistence, error boundaries, and production build stability.',
      checklist: ['CRUD operations persisted', 'Edge-case & error handling', 'Live deployed link / runnable demo'],
    },
    {
      points: '20 Points',
      title: 'System Architecture & Modularity',
      icon: <Layers className="w-5 h-5 text-slate-800" />,
      desc: 'Clean layered architecture with decoupled controllers, services, and models. Consistent naming, strong typing, and minimal technical debt.',
      checklist: ['Decoupled business logic', 'Predictable state management', 'Scalable folder structure'],
    },
    {
      points: '20 Points',
      title: 'UI / UX Design System Polish',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      desc: 'Clean, intentional typography and aesthetic restraint. Flawless responsiveness across 360px mobile to 1440px desktop with zero visual layout shift.',
      checklist: ['Tailwind design consistency', 'Mobile-first responsiveness', 'Accessible contrast & focus states'],
    },
    {
      points: '15 Points',
      title: 'Cryptographic Security & Auth',
      icon: <Lock className="w-5 h-5 text-emerald-600" />,
      desc: 'Battle-tested authentication with salted bcrypt hashing, 10-minute expiring single-use OTPs, sanitized inputs, and protected API endpoints.',
      checklist: ['Bcrypt password salting', 'Single-use OTP verification', 'JWT / HttpOnly cookie security'],
    },
    {
      points: '10 Points',
      title: 'Automated Nodemailer Delivery',
      icon: <MailCheck className="w-5 h-5 text-slate-800" />,
      desc: 'Automated transactional email notifications for registration confirmation, OTP validation, and team updates with branded responsive HTML templates.',
      checklist: ['SMTP pipeline integration', 'Instant OTP dispatch', 'Clean HTML email receipts'],
    },
    {
      points: '5 Points',
      title: 'Documentation & Pitch Clarity',
      icon: <FolderGit2 className="w-5 h-5 text-amber-600" />,
      desc: 'A comprehensive, readable README with setup instructions, architecture diagram, environmental variables reference, and concise demo presentation.',
      checklist: ['Detailed README.md', 'Setup & env documentation', 'Well-structured pitch deck'],
    },
  ];

  const handleCopyPassId = () => {
    navigator.clipboard.writeText('CAN-2026-ALPHA-8842');
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="space-y-20 pb-20 text-slate-900 bg-[#F8FAFC]">

      {/* ── 0. LIVE STATUS STRIP ─────────────────────── */}
      <section className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-2 font-mono text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              PORTAL LIVE
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline text-slate-600">
              NATIONAL HACKATHON 2026-27
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-600">
              VERIFIED PORTAL: <strong className="text-slate-900">v2.4</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-700 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              REGISTRATIONS OPEN
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-amber-700 font-bold">DEADLINE: DEC 20, 2026</span>
          </div>
        </div>
      </section>

      {/* ── 1. ARCHITECTURAL HERO SECTION ──────────────────────────── */}
      <section className="relative pt-6 md:pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Column: Bold Typography & Action Command */}
            <div className="lg:col-span-7 space-y-6">
              {/* Event Badge with Monospace Tag */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
                <img src="/logo.png" alt="Code-a-Nova Logo" className="w-5 h-5 rounded-md object-contain" />
                <span className="text-xs font-mono font-semibold tracking-wider text-slate-700 uppercase">
                  National Hackathon 2026-27
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-800 font-mono font-bold px-2 py-0.5 rounded-full border border-slate-200">
                  HYBRID FINALE
                </span>
              </div>

              {/* Mega Headline (No blue gradients!) */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] font-display text-slate-900">
                  ARCHITECT <br />
                  <span className="text-slate-900">
                    THE UNBUILT.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-mono text-slate-600 font-medium">
                  36 Hours of High-Concurrency Sprinting.
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                Connect with ambitious student engineers across 5 specialized technology tracks. Build functioning codebases, pass automated security verifications, and pitch to industry architects.
              </p>

              {/* Hero Action Button Cluster */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <Link to={isAuthenticated ? '/register' : '/signup'}>
                    <Button variant="primary" size="lg" className="gap-2 font-bold font-display shadow-md">
                      {isAuthenticated ? 'Submit Project Docket' : 'Register for Hackathon'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="#tracks">
                    <Button variant="secondary" size="lg" className="font-semibold">
                      Explore 5 Tracks
                    </Button>
                  </a>
                </div>

                <div className="sm:border-l sm:border-slate-200 sm:pl-4 pt-2 sm:pt-0">
                  <CountdownTimer
                    targetDate="2026-12-20T23:59:59"
                    label="Docket Closes In:"
                  />
                </div>
              </div>

              {/* Trust Specs Strip */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 text-xs font-mono text-slate-600">
                <div>
                  <span className="text-slate-900 block font-bold text-sm">100% FREE</span>
                  <span>Zero entry fee</span>
                </div>
                <div>
                  <span className="text-slate-900 block font-bold text-sm">1 TO 5</span>
                  <span>Solo or team squad</span>
                </div>
                <div>
                  <span className="text-amber-700 block font-bold text-sm">₹1,50,000+</span>
                  <span>Prizes &amp; bounties</span>
                </div>
              </div>
            </div>

            {/* Right Column: Participant Credential Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-white border border-slate-200/90 p-6 shadow-md hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain border border-slate-200 shadow-xs" />
                    <div>
                      <div className="font-display font-bold text-sm text-slate-900 tracking-wide">
                        CODE-A-NOVA // PASS
                      </div>
                      <div className="text-[10px] text-emerald-700 font-mono font-semibold">
                        OFFICIAL PARTICIPANT DOSSIER
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    VERIFIED
                  </div>
                </div>

                {/* Role Switcher Pills */}
                <div className="pt-4 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                    Select Your Engineering Persona:
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
                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                          heroRole === role
                            ? 'bg-slate-900 text-white font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generated Pass Body */}
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">ASSIGNED ROLE</div>
                      <div className="text-slate-900 font-bold text-sm font-display">{heroRole}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase">ACCESS LEVEL</div>
                      <div className="text-amber-700 font-bold">ALL-ARENAS (VIP)</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500">REF ID:</span>{' '}
                      <span className="text-slate-900 font-bold">CAN-2026-ALPHA</span>
                    </div>
                    <div>
                      <span className="text-slate-500">FORMAT:</span>{' '}
                      <span className="text-slate-800">Hybrid Sprint</span>
                    </div>
                    <div>
                      <span className="text-slate-500">AUTH:</span>{' '}
                      <span className="text-slate-700">bcrypt + OTP</span>
                    </div>
                    <div>
                      <span className="text-slate-500">ENTRY FEE:</span>{' '}
                      <span className="text-emerald-700 font-bold">₹0 (Free)</span>
                    </div>
                  </div>

                  {/* Barcode line representation */}
                  <div className="pt-2 border-t border-dashed border-slate-200 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="h-3 w-32 bg-slate-400/40 rounded-xs" />
                      <div className="text-[9px] text-slate-400 tracking-widest">||| | |||| | ||| ||</div>
                    </div>
                    <button
                      onClick={handleCopyPassId}
                      className="px-2 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      title="Copy Pass Reference"
                    >
                      {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId ? 'Copied' : 'Copy Ref'}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">Ready to claim your spot?</span>
                  <Link
                    to={isAuthenticated ? '/register' : '/signup'}
                    className="text-slate-900 hover:text-slate-700 font-bold font-mono text-xs inline-flex items-center gap-1"
                  >
                    Enter Registration &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MARQUEE RIBBON (Clean Light Theme) ─────────────────────── */}
      <div className="w-full border-y border-slate-200 bg-white py-3 overflow-hidden relative shadow-xs">
        <div className="flex w-[200%] animate-marquee whitespace-nowrap text-xs font-mono font-bold tracking-wider text-slate-700">
          <span className="mx-6 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            ₹1,50,000+ CASH &amp; CLOUD BOUNTIES
          </span>
          <span className="mx-6 text-slate-300">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-700" />
            36-HOUR RAPID PROTOTYPING GRAND FINALE
          </span>
          <span className="mx-6 text-slate-300">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Brain className="w-4 h-4 text-slate-700" />
            AI / MACHINE LEARNING ARENA
          </span>
          <span className="mx-6 text-slate-300">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-700" />
            NEXT-GEN WEB ARCHITECTURES
          </span>
          <span className="mx-6 text-slate-300">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            AUTOMATED OTP EMAIL VERIFICATION
          </span>
          <span className="mx-6 text-slate-300">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-700" />
            SOLO OR 1–5 MEMBER SQUADS
          </span>
          <span className="mx-6 text-slate-300">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            ₹1,50,000+ CASH &amp; CLOUD BOUNTIES
          </span>
          <span className="mx-6 text-slate-300">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-700" />
            36-HOUR RAPID PROTOTYPING GRAND FINALE
          </span>
        </div>
      </div>

      {/* ── 3. ARENA SPECS GRID ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest flex items-center justify-between">
              <span>ARENA SPEC 01</span>
              <span>[TRACKS]</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-display">5 Arenas</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curated problem statements across Artificial Intelligence, Web Platforms, IoT Hardware, Cyber Defense, and Blockchain.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest flex items-center justify-between">
              <span>ARENA SPEC 02</span>
              <span>[SQUADS]</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-display">1 to 5 Eng</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Register as an independent full-stack engineer or deploy as a synchronized multidisciplinary team with custom member roles.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest flex items-center justify-between">
              <span>ARENA SPEC 03</span>
              <span>[SPRINT]</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-display">36 Hours</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continuous hybrid hackathon marathon with milestone checkpoints, architecture mentoring, and working prototype judging.
            </p>
          </div>

          <div className="bg-white border border-amber-300 rounded-xl p-6 space-y-2.5 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all">
            <div className="text-[10px] font-mono text-amber-700 uppercase font-bold tracking-widest flex items-center justify-between">
              <span>ARENA SPEC 04</span>
              <span>[REWARDS]</span>
            </div>
            <div className="text-3xl font-extrabold text-amber-800 font-display">₹1,50,000+</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Substantial direct cash grants, seed incubation fast-track interviews, cloud infrastructure credits, and direct partner recruiting.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. TACTICAL TRACK EXPLORER ─────────────────────────────── */}
      <section id="tracks" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              [ SECTION 01 // COMPETITION DOMAINS ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Select Your Arena of Technical Impact
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Each arena features targeted problem statements, dedicated industry architect evaluators, and category excellence grants.
            </p>
          </div>

          <div className="text-xs text-slate-600 font-mono bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
            TRACK 0{selectedTrackIndex + 1} OF {DOMAINS.length}
          </div>
        </div>

        {/* Track Selection Grid + Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Track Selector Buttons */}
          <div className="lg:col-span-5 space-y-2.5">
            {DOMAINS.map((domain, index) => {
              const isSelected = selectedTrackIndex === index;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedTrackIndex(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2 rounded-lg border ${
                        isSelected
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {getTrackIcon(domain.id)}
                    </div>
                    <div>
                      <div className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        TRACK 0{index + 1}
                      </div>
                      <div className={`font-bold text-sm sm:text-base font-display ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {domain.title}
                      </div>
                      <div className={`text-xs line-clamp-1 mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {domain.shortDesc}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 mt-2 transition-transform shrink-0 ${
                      isSelected ? 'text-white translate-x-1' : 'text-slate-400'
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
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-100 border border-slate-200 text-slate-900 rounded-xl">
                    {getTrackIcon(selectedDomain.id, 'w-6 h-6')}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">
                      TECHNICAL DOSSIER // TRACK 0{selectedTrackIndex + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
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
                  <Button variant="primary" size="sm" className="gap-1.5 font-bold">
                    Register Track
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedDomain.shortDesc}
              </p>

              {/* Sample Challenge Statements */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                  Sample Problem Statements:
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  {selectedDomain.sampleProblems?.map((prob, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3"
                    >
                      <span className="font-mono font-bold text-slate-900 shrink-0 text-sm">
                        0{i + 1}.
                      </span>
                      <span className="leading-relaxed">{prob}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Evaluation Focus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Recommended Stacks
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDomain.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-md text-xs font-mono font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Evaluation Emphasis
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedDomain.evalFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. OFFICIAL 100-POINT SCORING FRAMEWORK (Clean, No Sliders, No Predicted Score) ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase mb-2">
                <Scale className="w-3.5 h-3.5" />
                TRANSPARENT EVALUATION MATRIX
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Official 100-Point Scoring Framework
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Every project is graded by industry evaluators against these six transparent criteria. Focus on real functional delivery over superficial features.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left md:text-right font-mono min-w-[180px]">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">TOTAL MARKS</div>
              <div className="text-3xl font-extrabold text-slate-900">
                100 <span className="text-xs text-slate-500 font-normal">Points</span>
              </div>
              <div className="text-xs font-bold text-emerald-700 mt-0.5">
                6 Weighted Categories
              </div>
            </div>
          </div>

          {/* Clean 6 Rubric Criterion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rubricCriteria.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/60 border border-slate-200 rounded-xl p-5 space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500">
                      0{idx + 1}.
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-xs font-bold">
                    {item.points}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold">
                    Key Evaluation Items:
                  </div>
                  <ul className="space-y-1">
                    {item.checklist.map((check, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRIZE VAULT & SPECIAL BOUNTIES ───────────────────────── */}
      <section id="prizes" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
                [ SECTION 03 // AWARDS &amp; BOUNTIES ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                Rewarding Hardcore Technical Craft
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Beyond direct cash rewards, podium champions unlock pre-seed founder interviews, cloud computing grants, and exclusive recruiting access.
              </p>
            </div>

            <div className="text-left md:text-right font-mono">
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">TOTAL BOUNTY POOL</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-800">₹1,50,000+</div>
            </div>
          </div>

          {/* Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRIZE_TIERS.map((tier, idx) => {
              const isFirst = idx === 0;

              return (
                <div
                  key={idx}
                  className={`relative rounded-2xl p-6 space-y-4 transition-all duration-200 bg-white shadow-xs hover:shadow-md ${
                    isFirst
                      ? 'border-2 border-amber-400 ring-2 ring-amber-100'
                      : 'border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isFirst && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full font-mono shadow-xs">
                      ★ GRAND CHAMPION
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono uppercase font-bold tracking-wider ${
                        isFirst ? 'text-amber-800' : 'text-slate-600'
                      }`}
                    >
                      {tier.rank}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isFirst
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <Trophy className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900">{tier.title}</h3>
                    <div
                      className={`text-3xl font-extrabold font-mono mt-1 ${
                        isFirst ? 'text-amber-800' : 'text-slate-900'
                      }`}
                    >
                      {tier.amount}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-mono font-bold">
                      Package Includes:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {tier.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isFirst ? 'text-amber-600' : 'text-emerald-600'
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
          <div className="pt-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              [ SPECIAL CATEGORY BOUNTIES — OPEN TO ALL TRACKS ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialBounties.map((bounty, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 space-y-2 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[10px] text-slate-500 uppercase">BOUNTY 0{i + 1}</span>
                    <span className="text-emerald-700 font-bold text-sm">{bounty.amount}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm font-display">{bounty.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{bounty.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. STAGED SPRINT ROADMAP ────────────────────────────────── */}
      <section id="timeline" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            [ SECTION 04 // EVENT MILESTONES ]
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            The Roadmap to the 36-Hour Sprint
          </h2>
          <p className="text-sm text-slate-600">
            Structured progression milestones from initial account verification to bare-metal sprint judging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {EVENT_TIMELINE.map((item) => (
            <div
              key={item.step}
              className={`bg-white border rounded-xl p-5 relative flex flex-col justify-between transition-all duration-200 shadow-xs ${
                item.active
                  ? 'border-slate-900 ring-2 ring-slate-900/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                      item.active
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
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

                <h3 className="font-bold text-base text-slate-900 mb-0.5 font-display">
                  {item.phase}
                </h3>
                <div className="text-xs font-bold text-slate-600 font-mono mb-2">
                  {item.date}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                <strong className="text-slate-900 font-mono">Deliverable:</strong> {item.deliverables}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED QUESTIONS (FILTERABLE) ──────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            [ SECTION 05 // HELP &amp; PROTOCOL ]
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-600">
            Rules, eligibility guidelines, and submission protocol.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
          {['All', 'Eligibility', 'Teams', 'Submissions', 'Evaluation', 'Security', 'Logistics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFaqCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeFaqCategory === cat
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Items */}
        <div className="space-y-2.5">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-xs hover:border-slate-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0">
                    {faq.category}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    activeFaq === idx ? 'rotate-180 text-slate-900' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. BOTTOM COMMAND BANNER ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-800 overflow-hidden">
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-block px-3 py-1 bg-white/10 rounded-md text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider border border-white/10">
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
                  <Button variant="accent" size="lg" className="gap-2 font-bold">
                    {isAuthenticated ? 'Submit Team Registration' : 'Register for Hackathon'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="secondary" size="lg" className="font-semibold bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Review 100-Mark Rubric
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-950/80 border border-white/10 rounded-xl p-5 space-y-3 font-mono text-xs shadow-inner">
              <div className="text-[11px] text-slate-300 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>SYSTEM SNAPSHOT</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">PLATFORM</span>
                <span className="text-emerald-400 font-bold">ONLINE &bull; v2.4</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">TRACKS</span>
                <span className="text-white font-bold">5 SPECIALIZED</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">TEAM SQUAD</span>
                <span className="text-white font-bold">1–5 PARTICIPANTS</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">SPRINT DURATION</span>
                <span className="text-amber-400 font-bold">36 CONTINUOUS HOURS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
