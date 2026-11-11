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
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import CountdownTimer from '../components/common/CountdownTimer';
import { DOMAINS, EVENT_TIMELINE, PRIZE_TIERS } from '../utils/constants';
import { registrationService } from '../services/registration.service';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [eventConfig, setEventConfig] = useState(null);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeHeroTab, setActiveHeroTab] = useState('spec'); // 'spec' | 'pipeline' | 'security'

  useEffect(() => {
    registrationService
      .getEventConfig()
      .then((res) => {
        if (res?.data?.config) setEventConfig(res.data.config);
      })
      .catch(() => {});
  }, []);

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
      category: 'General',
      q: 'Who is eligible to participate in Code-a-Nova?',
      a: 'Any enrolled undergraduate or postgraduate student (B.Tech, M.Tech, BCA, MCA, BSc, or equivalent) with a passion for software engineering, design, or hardware is welcome to participate.',
    },
    {
      category: 'Teams',
      q: 'What is the permitted team size and structure?',
      a: 'Teams may consist of 1 (solo participant) up to 5 members, including the team leader. All team members must be listed during registration with valid emails. Cross-college teams are fully permitted.',
    },
    {
      category: 'General',
      q: 'Is there any registration fee?',
      a: 'No. Registration and participation in Code-a-Nova is 100% free of charge for all accepted student participants.',
    },
    {
      category: 'Submissions',
      q: 'What should the initial idea submission contain?',
      a: 'You will need to submit a shareable link to your PPT / presentation deck outlining your problem statement, solution architecture, and a link to your prototype repository (GitHub/GitLab) or Figma design.',
    },
    {
      category: 'Security',
      q: 'How are participant accounts verified?',
      a: 'Accounts are protected via cryptographically secure 6-digit OTPs dispatched through Nodemailer with a 10-minute expiry window, and salted bcrypt password hashing.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section with Architectural Grid */}
      <section className="relative pt-10 md:pt-16 pb-16 border-b border-[#E5E7EB] bg-white bg-tech-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Event Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#17243A]/5 border border-[#17243A]/15 rounded-[4px]">
                <span className="w-2 h-2 rounded-full bg-[#D6A64F] animate-pulse" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#17243A] font-mono">
                  Code-a-Nova &bull; National Hackathon 2026-27
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17243A] tracking-tight leading-[1.08] font-display">
                Build Something That Moves the Future.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed">
                An engineering-first hackathon connecting ambitious student innovators across 5 dedicated technology tracks. Transform your boldest ideas into verified production solutions.
              </p>

              {/* Action Buttons & Countdown */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <Link to={isAuthenticated ? '/register' : '/signup'}>
                    <Button variant="primary" size="lg" className="gap-2 shadow-sm">
                      {isAuthenticated ? 'Register Project' : 'Register Now'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="#domains">
                    <Button variant="secondary" size="lg">
                      Explore Tracks
                    </Button>
                  </a>
                </div>

                <div className="sm:border-l sm:border-[#E5E7EB] sm:pl-4 pt-2 sm:pt-0">
                  <CountdownTimer
                    targetDate="2026-12-20T23:59:59"
                    label="Registration Deadline:"
                  />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#6B7280] font-medium border-t border-[#F7F7F4]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
                  <span>Free Participation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
                  <span>10-Min OTP Verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
                  <span>Verified Credentials</span>
                </div>
              </div>
            </div>

            {/* Right Editorial Interactive Technical Terminal */}
            <div className="lg:col-span-5">
              <div className="bg-[#17243A] text-white rounded-[7px] border border-[#243653] shadow-xl overflow-hidden font-mono text-xs">
                {/* Window Header with Tabs */}
                <div className="flex items-center justify-between border-b border-[#243653] bg-[#121c2e] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C44545]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D6A64F]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#21845B]" />
                    <span className="ml-2 text-[11px] text-[#9CA3AF]">
                      code-a-nova-engine
                    </span>
                  </div>

                  {/* Switcher Tabs */}
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      onClick={() => setActiveHeroTab('spec')}
                      className={`px-2 py-0.5 rounded-[3px] transition-colors ${
                        activeHeroTab === 'spec'
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      manifest.json
                    </button>
                    <button
                      onClick={() => setActiveHeroTab('pipeline')}
                      className={`px-2 py-0.5 rounded-[3px] transition-colors ${
                        activeHeroTab === 'pipeline'
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      pipeline.sh
                    </button>
                    <button
                      onClick={() => setActiveHeroTab('security')}
                      className={`px-2 py-0.5 rounded-[3px] transition-colors ${
                        activeHeroTab === 'security'
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      security.lock
                    </button>
                  </div>
                </div>

                {/* Tab 1: Manifest Spec */}
                {activeHeroTab === 'spec' && (
                  <div className="p-5 space-y-3 leading-relaxed">
                    <div className="text-[#9CA3AF]">
                      &#47;&#47; Code-a-Nova Hackathon Parameters v2.0
                    </div>
                    <div>
                      <span className="text-[#D6A64F]">"event"</span>:{' '}
                      <span className="text-emerald-400">"Code-a-Nova 2026-27"</span>,
                    </div>
                    <div>
                      <span className="text-[#D6A64F]">"format"</span>:{' '}
                      <span className="text-emerald-400">"Hybrid (Online + Grand Finale)"</span>,
                    </div>
                    <div>
                      <span className="text-[#D6A64F]">"team_bounds"</span>:{' '}
                      <span className="text-amber-300">&#123; "min": 1, "max": 5 &#125;</span>,
                    </div>
                    <div>
                      <span className="text-[#D6A64F]">"tracks"</span>: [
                      <div className="pl-4 text-emerald-300">
                        "AI/ML", "Web Dev", "IoT", "Cyber Security", "Blockchain"
                      </div>
                      ],
                    </div>
                    <div>
                      <span className="text-[#D6A64F]">"deadline"</span>:{' '}
                      <span className="text-emerald-400">"2026-12-20T23:59:59Z"</span>,
                    </div>
                    <div>
                      <span className="text-[#D6A64F]">"prize_pool"</span>:{' '}
                      <span className="text-[#D6A64F] font-bold">"₹1,50,000+ INR"</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Pipeline */}
                {activeHeroTab === 'pipeline' && (
                  <div className="p-5 space-y-2.5 leading-relaxed text-xs">
                    <div className="text-[#9CA3AF]">&#47;&#47; Participant Verification Pipeline</div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>&gt; 01: SIGNUP</span>
                      <span className="text-white/60">&rarr; user account created in unverified state</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>&gt; 02: OTP DISPATCH</span>
                      <span className="text-white/60">&rarr; 6-digit hashed OTP sent via Nodemailer (10m TTL)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>&gt; 03: VERIFY</span>
                      <span className="text-white/60">&rarr; single-use OTP consumed; account activated</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>&gt; 04: REGISTER</span>
                      <span className="text-white/60">&rarr; dynamic team submission &amp; CAN ID generated</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-300">
                      <span>&gt; 05: FINALE</span>
                      <span className="text-white/60">&rarr; 36-hr prototype sprint &amp; live judging</span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Security */}
                {activeHeroTab === 'security' && (
                  <div className="p-5 space-y-2.5 leading-relaxed text-xs">
                    <div className="text-[#9CA3AF]">&#47;&#47; Defensive Security Architecture</div>
                    <div className="text-[#D6A64F]">
                      PASSWORDS:{' '}
                      <span className="text-white">bcryptjs (10 salt rounds)</span>
                    </div>
                    <div className="text-[#D6A64F]">
                      OTP STORAGE:{' '}
                      <span className="text-white">sha256/bcrypt hashed &bull; 600s TTL</span>
                    </div>
                    <div className="text-[#D6A64F]">
                      SESSIONS:{' '}
                      <span className="text-white">JWT in HttpOnly, SameSite cookies</span>
                    </div>
                    <div className="text-[#D6A64F]">
                      HEADERS:{' '}
                      <span className="text-white">Helmet, strict CORS, express-rate-limit</span>
                    </div>
                    <div className="text-[#D6A64F]">
                      REVIEWS:{' '}
                      <span className="text-white">1 registration per candidate enforced</span>
                    </div>
                  </div>
                )}

                {/* Bottom status bar */}
                <div className="border-t border-[#243653] bg-[#121c2e] px-4 py-2 flex items-center justify-between text-[11px] text-[#9CA3AF]">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    LIVE PRODUCTION PIPELINE
                  </span>
                  <Link
                    to={isAuthenticated ? '/register' : '/signup'}
                    className="text-[#D6A64F] hover:underline font-sans font-semibold text-[10px] uppercase"
                  >
                    Enter Platform &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Event Highlights Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white border border-[#E5E7EB] rounded-[7px] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB] shadow-sm">
          <div className="p-6 text-center space-y-1">
            <div className="text-3xl font-extrabold font-display text-[#17243A]">5 Tracks</div>
            <div className="text-xs text-[#6B7280] font-medium">Focused Engineering Domains</div>
          </div>
          <div className="p-6 text-center space-y-1">
            <div className="text-3xl font-extrabold font-display text-[#17243A]">1–5</div>
            <div className="text-xs text-[#6B7280] font-medium">Solo or Team Members</div>
          </div>
          <div className="p-6 text-center space-y-1">
            <div className="text-3xl font-extrabold font-display text-[#17243A]">36 Hours</div>
            <div className="text-xs text-[#6B7280] font-medium">Continuous Finale Sprint</div>
          </div>
          <div className="p-6 text-center space-y-1">
            <div className="text-3xl font-extrabold font-display text-[#D6A64F]">₹1,50,000+</div>
            <div className="text-xs text-[#6B7280] font-medium">Prize Pool &amp; Cloud Credits</div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Tracks & Domains Showcase */}
      <section id="domains" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#E5E7EB] pb-5">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F] font-mono">
              01 &bull; Competition Tracks
            </div>
            <h2 className="text-3xl font-extrabold text-[#17243A] tracking-tight font-display">
              Select Your Arena of Technical Impact
            </h2>
            <p className="text-sm text-[#4B5563] max-w-xl">
              Each domain features dedicated problem briefs, specialized mentor evaluation, and category excellence awards.
            </p>
          </div>

          <div className="text-xs text-[#6B7280] font-mono">
            Track {selectedTrackIndex + 1} of {DOMAINS.length}
          </div>
        </div>

        {/* Track Selection Tabs & Rich Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Track Selector Buttons */}
          <div className="lg:col-span-5 space-y-2.5">
            {DOMAINS.map((domain, index) => {
              const isSelected = selectedTrackIndex === index;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedTrackIndex(index)}
                  className={`w-full text-left p-4 rounded-[6px] border transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-[#17243A] text-white border-[#17243A] shadow-sm'
                      : 'bg-white text-[#20242B] border-[#E5E7EB] hover:border-[#17243A]/40 hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-[4px] border ${
                        isSelected
                          ? 'bg-white/10 border-white/20 text-[#D6A64F]'
                          : 'bg-[#F7F7F4] border-[#E5E7EB] text-[#17243A]'
                      }`}
                    >
                      {getTrackIcon(domain.id)}
                    </div>
                    <div>
                      <div className="text-xs font-mono font-semibold opacity-75">
                        TRACK 0{index + 1}
                      </div>
                      <div className="font-bold text-sm sm:text-base font-display">
                        {domain.title}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 mt-2 transition-transform ${
                      isSelected ? 'text-[#D6A64F] translate-x-1' : 'text-[#9CA3AF]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Details for Selected Track */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5E7EB] rounded-[7px] p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#F7F7F4] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#17243A] text-white rounded-[5px]">
                    {getTrackIcon(selectedDomain.id, 'w-6 h-6')}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#D6A64F] uppercase font-bold tracking-wider">
                      Selected Track Focus
                    </span>
                    <h3 className="text-xl font-extrabold text-[#17243A] font-display">
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
                  <Button variant="primary" size="sm" className="gap-1.5">
                    Register Track
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {selectedDomain.shortDesc}
              </p>

              {/* Sample Challenge Statements */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#17243A] font-mono">
                  Sample Challenge Areas
                </div>
                <div className="space-y-2 text-xs text-[#4B5563]">
                  {selectedDomain.sampleProblems?.map((prob, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[5px] flex items-start gap-2.5"
                    >
                      <span className="font-mono font-bold text-[#17243A] shrink-0">
                        0{i + 1}.
                      </span>
                      <span className="leading-relaxed">{prob}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Stack & Evaluation Focus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F7F7F4]">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Recommended Tooling
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDomain.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#F7F7F4] text-[#17243A] border border-[#E5E7EB] rounded-[3px] text-xs font-mono font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Evaluation Emphasis
                  </div>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {selectedDomain.evalFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Event Timeline & Stages */}
      <section id="timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F] font-mono">
            02 &bull; Event Milestones
          </div>
          <h2 className="text-3xl font-extrabold text-[#17243A] tracking-tight font-display">
            The Roadmap to the Grand Finale
          </h2>
          <p className="text-sm text-[#4B5563]">
            Structured progression milestones from initial account verification to the 36-hour sprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {EVENT_TIMELINE.map((item, idx) => (
            <div
              key={item.step}
              className={`bg-white border rounded-[7px] p-6 relative flex flex-col justify-between card-hover ${
                item.active
                  ? 'border-[#17243A] ring-2 ring-[#17243A]/10 shadow-sm'
                  : 'border-[#E5E7EB]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#6B7280]">
                    STAGE {item.step}
                  </span>
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

                <h3 className="font-bold text-base text-[#17243A] mb-1 font-display">
                  {item.phase}
                </h3>
                <div className="text-xs font-bold text-[#D6A64F] font-mono mb-3">
                  {item.date}
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F7F7F4] text-[11px] text-[#4B5563]">
                <strong className="text-[#17243A]">Expected:</strong> {item.deliverables}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Awards & Recognition Section */}
      <section id="prizes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#17243A] text-white rounded-[8px] p-8 md:p-12 border border-[#243653] shadow-lg bg-dark-grid">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-white/10 pb-6">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F] font-mono">
                03 &bull; Awards &amp; Grants
              </div>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-white">
                Rewarding Engineering Excellence
              </h2>
              <p className="text-sm text-[#D1D5DB] max-w-xl leading-relaxed">
                Beyond cash rewards, winners gain seed incubation interviews, cloud infrastructure credits, and direct partner recruiting access.
              </p>
            </div>

            <div className="text-right">
              <div className="text-xs text-[#9CA3AF] uppercase tracking-wider">Total Prize Pool</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D6A64F] font-mono">
                ₹1,50,000+
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRIZE_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-[6px] p-6 space-y-4 hover:border-white/25 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#D6A64F] font-bold">
                    {tier.rank}
                  </span>
                  <Trophy className="w-5 h-5 text-[#D6A64F]" />
                </div>

                <div>
                  <h4 className="text-xl font-bold font-display text-white">{tier.title}</h4>
                  <div className="text-2xl font-extrabold font-mono text-[#D6A64F] mt-1">
                    {tier.amount}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-bold">
                    Package Includes:
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#D1D5DB]">
                    {tier.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#21845B] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Evaluation Framework Quick Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5E7EB] rounded-[7px] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F7F7F4] pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F] font-mono">
                04 &bull; Evaluation Transparency
              </div>
              <h2 className="text-2xl font-extrabold text-[#17243A] font-display">
                How Projects Are Evaluated (100 Marks Total)
              </h2>
            </div>
            <Link to="/about#rules">
              <Button variant="outline" size="sm" className="gap-1.5">
                Full Scoring Framework
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[5px] text-center space-y-1">
              <div className="text-xl font-extrabold font-mono text-[#17243A]">30 pts</div>
              <div className="text-xs font-semibold text-[#17243A]">Functional Completeness</div>
              <div className="text-[10px] text-[#6B7280]">Full working MVP flows</div>
            </div>

            <div className="p-3 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[5px] text-center space-y-1">
              <div className="text-xl font-extrabold font-mono text-[#17243A]">20 pts</div>
              <div className="text-xs font-semibold text-[#17243A]">Code Architecture</div>
              <div className="text-[10px] text-[#6B7280]">Modularity &amp; error safety</div>
            </div>

            <div className="p-3 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[5px] text-center space-y-1">
              <div className="text-xl font-extrabold font-mono text-[#17243A]">20 pts</div>
              <div className="text-xs font-semibold text-[#17243A]">UI / UX Quality</div>
              <div className="text-[10px] text-[#6B7280]">Design system &amp; mobile UX</div>
            </div>

            <div className="p-3 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[5px] text-center space-y-1">
              <div className="text-xl font-extrabold font-mono text-[#17243A]">15 pts</div>
              <div className="text-xs font-semibold text-[#17243A]">Authentication</div>
              <div className="text-[10px] text-[#6B7280]">bcrypt, OTP &amp; JWT safety</div>
            </div>

            <div className="p-3 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[5px] text-center space-y-1">
              <div className="text-xl font-extrabold font-mono text-[#17243A]">10 pts</div>
              <div className="text-xs font-semibold text-[#17243A]">Nodemailer</div>
              <div className="text-[10px] text-[#6B7280]">Automated email delivery</div>
            </div>

            <div className="p-3 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[5px] text-center space-y-1">
              <div className="text-xl font-extrabold font-mono text-[#17243A]">5 pts</div>
              <div className="text-xs font-semibold text-[#17243A]">Docs &amp; Demo</div>
              <div className="text-[10px] text-[#6B7280]">Architecture README</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F] font-mono">
            05 &bull; Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] tracking-tight font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
              >
                <span className="text-sm font-semibold text-[#17243A] pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7280] shrink-0 transition-transform ${
                    activeFaq === idx ? 'rotate-180 text-[#17243A]' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 pt-1 text-xs text-[#4B5563] leading-relaxed border-t border-[#F7F7F4]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#17243A] text-white rounded-[8px] p-8 md:p-12 text-center space-y-5 border border-[#243653] shadow-lg">
          <div className="inline-block px-3 py-1 bg-white/10 rounded-[4px] text-xs font-mono text-[#D6A64F] font-bold uppercase">
            Limited Submissions Window
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Ready to Engineer Something Extraordinary?
          </h2>
          <p className="text-sm text-[#D1D5DB] max-w-lg mx-auto leading-relaxed">
            Create your account in seconds, verify with our 10-minute automated OTP system, and submit your project to the official docket.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to={isAuthenticated ? '/register' : '/signup'}>
              <Button variant="primary" size="lg" className="bg-[#D6A64F] text-[#17243A] hover:bg-[#e0b462] font-bold gap-2">
                {isAuthenticated ? 'Submit Team Registration' : 'Register for Hackathon'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Review Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
