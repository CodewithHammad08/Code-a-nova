import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Terminal, Award, Users } from 'lucide-react';
import Button from '../components/common/Button';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17243A]/5 border border-[#17243A]/15 rounded-[4px]">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#17243A]">
            Code-a-Nova Architecture & Vision
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17243A] tracking-tight">
          About Code-a-Nova
        </h1>
        <p className="text-base text-[#4B5563] max-w-3xl leading-relaxed">
          Code-a-Nova is a national hackathon platform designed to provide a rigorous, transparent, and professionally managed competition environment for student engineers.
        </p>
      </div>

      {/* Core Mission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-[#E5E7EB] rounded-[7px] space-y-3">
          <Terminal className="w-6 h-6 text-[#17243A]" />
          <h3 className="font-bold text-base text-[#17243A]">Real Engineering</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            We prioritize fully functioning code, reliable backend services, database persistence, and robust error handling over decorative presentations.
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E5E7EB] rounded-[7px] space-y-3">
          <ShieldCheck className="w-6 h-6 text-[#17243A]" />
          <h3 className="font-bold text-base text-[#17243A]">Security & Verification</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Every participant account is protected with salted bcrypt hashing, cryptographically secure OTP verification, and JWT authentication sessions.
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E5E7EB] rounded-[7px] space-y-3">
          <Users className="w-6 h-6 text-[#17243A]" />
          <h3 className="font-bold text-base text-[#17243A]">Dynamic Team Collaboration</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Solo developers or multi-member teams (up to 5 members) can register dynamically with conflict detection and automated confirmation receipts.
          </p>
        </div>
      </div>

      {/* Official Evaluation Rubric */}
      <div id="rules" className="bg-white border border-[#E5E7EB] rounded-[7px] p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
            Official Evaluation Framework
          </div>
          <h2 className="text-2xl font-bold text-[#17243A]">
            Internship & Competition Scoring Rubric
          </h2>
          <p className="text-xs text-[#6B7280]">
            All submitted projects are systematically scored out of 100 points based on the following transparent criteria:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#E5E7EB] rounded-[5px] overflow-hidden">
            <thead className="bg-[#FAFAFA] border-b border-[#E5E7EB] text-[#17243A] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Marks</th>
                <th className="py-3 px-4">Evaluation Focus</th>
                <th className="py-3 px-4">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#4B5563]">
              <tr>
                <td className="py-3 px-4 font-semibold text-[#17243A]">Functional Completeness</td>
                <td className="py-3 px-4 font-mono font-bold text-[#17243A]">30</td>
                <td className="py-3 px-4">All MVP flows working: signup, OTP, login, dynamic registration, links, dashboard, CRUD.</td>
                <td className="py-3 px-4 text-[#21845B] font-semibold">Critical</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#17243A]">Code Quality & Structure</td>
                <td className="py-3 px-4 font-mono font-bold text-[#17243A]">20</td>
                <td className="py-3 px-4">Clean MVC pattern, services separation, error middleware, reusable React components, no messy inline styles.</td>
                <td className="py-3 px-4 text-[#21845B] font-semibold">Critical</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#17243A]">UI/UX & Responsiveness</td>
                <td className="py-3 px-4 font-mono font-bold text-[#17243A]">20</td>
                <td className="py-3 px-4">Editorial developer design, mobile-to-desktop responsiveness, zero horizontal scroll, restrained typography.</td>
                <td className="py-3 px-4 text-[#21845B] font-semibold">Critical</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#17243A]">Authentication & Security</td>
                <td className="py-3 px-4 font-mono font-bold text-[#17243A]">15</td>
                <td className="py-3 px-4">bcrypt hashing, 10-min expiring OTP, JWT HTTP-only cookies, Helmet headers, rate limiting, no secrets in logs.</td>
                <td className="py-3 px-4 text-[#21845B] font-semibold">Critical</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#17243A]">Nodemailer Integration</td>
                <td className="py-3 px-4 font-mono font-bold text-[#17243A]">10</td>
                <td className="py-3 px-4">Branded OTP emails, confirmation receipt emails, non-blocking resilient delivery fallback.</td>
                <td className="py-3 px-4 text-[#D6A64F] font-semibold">High</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#17243A]">README, Deployment & Demo</td>
                <td className="py-3 px-4 font-mono font-bold text-[#17243A]">5</td>
                <td className="py-3 px-4">Exhaustive architectural README, .env.example, deployment configs, demonstration workflow.</td>
                <td className="py-3 px-4 text-[#D6A64F] font-semibold">High</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code of Conduct */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#17243A]">Participation Rules & Ethics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4B5563]">
          <div className="bg-white p-4 border border-[#E5E7EB] rounded-[5px] space-y-1.5">
            <h4 className="font-semibold text-[#17243A] text-sm">Original Work</h4>
            <p className="leading-relaxed">
              All submitted source code must be written specifically for or enhanced meaningfully during the competition cycle. Plagiarism results in immediate disqualification.
            </p>
          </div>
          <div className="bg-white p-4 border border-[#E5E7EB] rounded-[5px] space-y-1.5">
            <h4 className="font-semibold text-[#17243A] text-sm">Valid Information</h4>
            <p className="leading-relaxed">
              All team member emails, college affiliations, and presentation links must be authentic. Duplicate registrations under multiple accounts will be purged.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pt-4 flex items-center justify-between border-t border-[#E5E7EB]">
        <div>
          <h3 className="font-bold text-base text-[#17243A]">Have more questions?</h3>
          <p className="text-xs text-[#6B7280]">Our organizing committee is ready to assist you.</p>
        </div>
        <Link to="/contact">
          <Button variant="secondary" size="sm">
            Contact Committee
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
