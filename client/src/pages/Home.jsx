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
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { DOMAINS, EVENT_TIMELINE } from '../utils/constants';
import { registrationService } from '../services/registration.service';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [eventConfig, setEventConfig] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    registrationService
      .getEventConfig()
      .then((res) => {
        if (res?.data?.config) setEventConfig(res.data.config);
      })
      .catch(() => {});
  }, []);

  const getTrackIcon = (id) => {
    switch (id) {
      case 'AI / Machine Learning':
        return <Brain className="w-5 h-5 text-[#17243A]" />;
      case 'Web Development':
        return <Globe className="w-5 h-5 text-[#17243A]" />;
      case 'Internet of Things':
        return <Cpu className="w-5 h-5 text-[#17243A]" />;
      case 'Cyber Security':
        return <Shield className="w-5 h-5 text-[#17243A]" />;
      case 'Blockchain':
        return <Layers className="w-5 h-5 text-[#17243A]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#17243A]" />;
    }
  };

  const faqs = [
    {
      q: 'Who is eligible to participate in Code-a-Nova?',
      a: 'Any enrolled undergraduate or postgraduate student (B.Tech, M.Tech, BCA, MCA, BSc, or equivalent) with a passion for software engineering, design, or hardware is welcome to participate.',
    },
    {
      q: 'What is the permitted team size?',
      a: 'Teams may consist of 1 (solo participant) up to 5 members, including the team leader. All team members must be listed during registration.',
    },
    {
      q: 'Is there any registration fee?',
      a: 'No. Registration and participation in Code-a-Nova is completely free of cost for all student participants.',
    },
    {
      q: 'Can team members be from different colleges?',
      a: 'Yes, cross-college and interdisciplinary team compositions are fully supported and encouraged.',
    },
    {
      q: 'What should the initial idea submission contain?',
      a: 'You will need to submit a shareable link to your PPT / presentation deck outlining your problem statement, solution architecture, and a link to your prototype repository or Figma design.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-12 border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17243A]/5 border border-[#17243A]/15 rounded-[4px]">
                <span className="w-2 h-2 rounded-full bg-[#D6A64F]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#17243A]">
                  Code-a-Nova National Hackathon 2026-27
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17243A] tracking-tight leading-[1.1]">
                Build Something That Moves the Future.
              </h1>

              <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed">
                A high-octane engineering hackathon connecting ambitious student innovators across 5 dedicated technology tracks. Transform your boldest ideas into verified production solutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={isAuthenticated ? '/register' : '/signup'}>
                  <Button variant="primary" size="lg" className="gap-2">
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

              {/* Status info bar */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
                  <span>Free Registration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
                  <span>Verified Certificates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21845B]" />
                  <span>Industry Mentors</span>
                </div>
              </div>
            </div>

            {/* Right Editorial Technical Composition */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#F7F7F4] border border-[#E5E7EB] rounded-[8px] p-6 shadow-sm">
                {/* Header terminal-style bar */}
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" />
                  </div>
                  <span className="text-[11px] font-mono text-[#6B7280]">
                    code_a_nova.spec.v1
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs text-[#20242B]">
                  <div className="bg-white p-3.5 rounded-[5px] border border-[#E5E7EB] space-y-2">
                    <div className="text-[10px] text-[#6B7280] uppercase tracking-wider font-sans font-bold">
                      Event Parameters
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F7F7F4]">
                      <span className="text-[#6B7280]">Event Format:</span>
                      <span className="font-semibold text-[#17243A]">Hybrid (Online + Finale)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F7F7F4]">
                      <span className="text-[#6B7280]">Team Size:</span>
                      <span className="font-semibold text-[#17243A]">1 to 5 Members</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F7F7F4]">
                      <span className="text-[#6B7280]">Tracks Open:</span>
                      <span className="font-semibold text-[#17243A]">5 Specialized Tracks</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#6B7280]">Registration Deadline:</span>
                      <span className="font-semibold text-[#17243A]">
                        {eventConfig?.importantDates?.registrationDeadline || 'December 20, 2026'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#17243A] text-white p-4 rounded-[5px] space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#D6A64F] font-sans font-bold uppercase tracking-wider">
                      <span>Live Registration Status</span>
                      <span className="w-2 h-2 rounded-full bg-[#21845B] animate-pulse" />
                    </div>
                    <p className="text-xs text-[#E5E7EB] font-sans">
                      Registrations are currently open. Team leaders can submit project proposals and invite team members.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Event Highlights Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5E7EB] rounded-[7px] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
          <div className="p-6 text-center space-y-1">
            <div className="text-2xl font-bold font-display text-[#17243A]">5 Tracks</div>
            <div className="text-xs text-[#6B7280]">Cutting-Edge Domains</div>
          </div>
          <div className="p-6 text-center space-y-1">
            <div className="text-2xl font-bold font-display text-[#17243A]">1–5</div>
            <div className="text-xs text-[#6B7280]">Flexible Team Size</div>
          </div>
          <div className="p-6 text-center space-y-1">
            <div className="text-2xl font-bold font-display text-[#17243A]">36 Hours</div>
            <div className="text-xs text-[#6B7280]">Grand Finale Sprint</div>
          </div>
          <div className="p-6 text-center space-y-1">
            <div className="text-2xl font-bold font-display text-[#17243A]">₹1,50,000+</div>
            <div className="text-xs text-[#6B7280]">Prize Pool & Grants</div>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
              About The Hackathon
            </div>
            <h2 className="text-3xl font-bold text-[#17243A] tracking-tight">
              A Platform Designed for Genuine Technical Merit
            </h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Code-a-Nova was conceived to bridge the gap between academic theory and production-grade engineering. Rather than superficial pitch decks, we prioritize working prototypes, clean architecture, and verifiable problem-solving.
            </p>
            <div className="pt-2">
              <Link to="/about">
                <Button variant="outline" size="sm" className="gap-1.5">
                  Read Full Vision & Guidelines
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 border border-[#E5E7EB] rounded-[6px] space-y-2">
              <div className="w-8 h-8 rounded-[4px] bg-[#17243A]/5 flex items-center justify-center text-[#17243A] font-bold text-xs">
                01
              </div>
              <h3 className="font-semibold text-base text-[#17243A]">Real-World Challenges</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Problem statements drawn from real industry friction across enterprise systems, privacy, and scalability.
              </p>
            </div>

            <div className="bg-white p-5 border border-[#E5E7EB] rounded-[6px] space-y-2">
              <div className="w-8 h-8 rounded-[4px] bg-[#17243A]/5 flex items-center justify-center text-[#17243A] font-bold text-xs">
                02
              </div>
              <h3 className="font-semibold text-base text-[#17243A]">Rigorous Mentorship</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Direct access to senior software architects and domain specialists throughout the design process.
              </p>
            </div>

            <div className="bg-white p-5 border border-[#E5E7EB] rounded-[6px] space-y-2">
              <div className="w-8 h-8 rounded-[4px] bg-[#17243A]/5 flex items-center justify-center text-[#17243A] font-bold text-xs">
                03
              </div>
              <h3 className="font-semibold text-base text-[#17243A]">Objective Evaluation</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Clear scoring rubrics balancing functional completeness, code quality, design usability, and presentation.
              </p>
            </div>

            <div className="bg-white p-5 border border-[#E5E7EB] rounded-[6px] space-y-2">
              <div className="w-8 h-8 rounded-[4px] bg-[#17243A]/5 flex items-center justify-center text-[#17243A] font-bold text-xs">
                04
              </div>
              <h3 className="font-semibold text-base text-[#17243A]">Career Pathways</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                High-performing teams gain exposure to partner tech recruiters and incubator accelerator programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Domains / Tracks Section */}
      <section id="domains" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
            Competition Tracks
          </div>
          <h2 className="text-3xl font-bold text-[#17243A] tracking-tight">
            Choose Your Domain of Impact
          </h2>
          <p className="text-sm text-[#4B5563]">
            Select the track that best aligns with your team's core technical competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOMAINS.map((domain, index) => (
            <div
              key={domain.id}
              className="bg-white border border-[#E5E7EB] rounded-[7px] p-6 hover:border-[#17243A] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-[5px] bg-[#F7F7F4] border border-[#E5E7EB] flex items-center justify-center">
                    {getTrackIcon(domain.id)}
                  </div>
                  <span className="text-xs font-mono text-[#9CA3AF]">
                    TRACK 0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17243A] font-display">
                  {domain.title}
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {domain.shortDesc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F7F7F4] flex items-center justify-between">
                <Link
                  to={isAuthenticated ? `/register?track=${encodeURIComponent(domain.id)}` : '/signup'}
                  className="text-xs font-semibold text-[#17243A] hover:text-[#243653] inline-flex items-center gap-1"
                >
                  Register in this track
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}

          {/* Special Open Innovation Card */}
          <div className="bg-[#17243A] text-white border border-[#243653] rounded-[7px] p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-[5px] bg-white/10 flex items-center justify-center text-[#D6A64F]">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-[#D6A64F]">OPEN TRACK</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Interdisciplinary Innovation
              </h3>
              <p className="text-xs text-[#D1D5DB] leading-relaxed">
                Have a breakthrough idea spanning multiple technologies? Form an interdisciplinary team and push boundaries across hardware, software, and AI.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10">
              <Link
                to={isAuthenticated ? '/register' : '/signup'}
                className="text-xs font-semibold text-[#D6A64F] hover:underline inline-flex items-center gap-1"
              >
                Submit your idea
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Event Timeline */}
      <section id="timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
            Roadmap & Milestones
          </div>
          <h2 className="text-3xl font-bold text-[#17243A] tracking-tight">
            Event Schedule & Deadlines
          </h2>
          <p className="text-sm text-[#4B5563]">
            Key progression stages from initial registration to grand finale presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {EVENT_TIMELINE.map((item, idx) => (
            <div
              key={item.step}
              className={`bg-white border rounded-[7px] p-6 relative ${
                item.active
                  ? 'border-[#17243A] ring-1 ring-[#17243A]'
                  : 'border-[#E5E7EB]'
              }`}
            >
              {item.active && (
                <div className="absolute -top-2.5 right-4 bg-[#17243A] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] uppercase tracking-wider">
                  Current Stage
                </div>
              )}
              <div className="text-xs font-mono text-[#9CA3AF] mb-2">STAGE {item.step}</div>
              <h3 className="font-bold text-base text-[#17243A] mb-1 font-display">
                {item.phase}
              </h3>
              <div className="text-xs font-semibold text-[#D6A64F] mb-3">{item.date}</div>
              <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Prizes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#17243A] text-white rounded-[8px] p-8 md:p-12 border border-[#243653]">
          <div className="max-w-2xl space-y-3 mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
              Awards & Recognition
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Rewarding Engineering Excellence
            </h2>
            <p className="text-sm text-[#D1D5DB] leading-relaxed">
              Every verified participant receives a certificate of participation. Outstanding projects across each track qualify for awards, incubator credits, and direct interview opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-[6px] p-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
                1st Place Winner
              </div>
              <div className="text-2xl font-bold font-display text-white">₹75,000</div>
              <p className="text-xs text-[#9CA3AF]">
                Grand cash award, winner trophy, cloud credits, and accelerator fast-track.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[6px] p-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
                1st Runner Up
              </div>
              <div className="text-2xl font-bold font-display text-white">₹45,000</div>
              <p className="text-xs text-[#9CA3AF]">
                Cash award, runner-up memento, cloud credits, and mentorship sessions.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[6px] p-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
                Track Excellence Awards
              </div>
              <div className="text-2xl font-bold font-display text-white">₹30,000</div>
              <p className="text-xs text-[#9CA3AF]">
                Specialized prizes for Best UI/UX, Best AI Architecture, and Best Security Implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17243A] tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
              >
                <span className="text-sm font-semibold text-[#17243A]">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7280] transition-transform ${
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
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-8 md:p-12 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17243A] font-display">
            Ready to Showcase Your Engineering Skills?
          </h2>
          <p className="text-sm text-[#4B5563] max-w-xl mx-auto leading-relaxed">
            Create an account, verify your email, and register your team for Code-a-Nova. Submissions are reviewed continuously.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={isAuthenticated ? '/register' : '/signup'}>
              <Button variant="primary" size="lg" className="gap-2">
                {isAuthenticated ? 'Complete Registration' : 'Register for Hackathon'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
