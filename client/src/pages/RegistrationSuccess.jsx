import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, LayoutDashboard, FolderGit2, Download, Copy, Check } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { registrationService } from '../services/registration.service';
import toast from 'react-hot-toast';

const RegistrationSuccess = () => {
  const [searchParams] = useSearchParams();
  const regIdParam = searchParams.get('id') || '';

  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    registrationService
      .getMyEntry()
      .then((res) => {
        if (res?.data?.registration) {
          setRegistration(res.data.registration);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const referenceId = registration?.registrationId || regIdParam || 'CAN-2026-CONFIRMED';

  const handleCopyId = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    toast.success('Registration reference ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 text-slate-100">
      <Card className="text-center p-8 sm:p-12 space-y-6 shadow-2xl border-white/10 bg-[#0F172A]/90 backdrop-blur-md">
        {/* Success Icon & Logo */}
        <div className="flex flex-col items-center gap-3">
          <Link to="/" className="inline-block group">
            <img
              src="/logo.png"
              alt="Code-a-Nova Logo"
              className="w-14 h-14 rounded-[10px] object-contain mx-auto shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform"
            />
          </Link>
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Registration Successful
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            You're Officially Registered!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your hackathon entry has been successfully validated and recorded into the Code-a-Nova database. A confirmation receipt has been dispatched to your email.
          </p>
        </div>

        {/* Reference ID banner */}
        <div className="bg-[#0B0F19] border border-white/10 rounded-[8px] p-5 max-w-md mx-auto space-y-2 shadow-inner">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-mono">
            Official Registration Reference
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-mono font-extrabold text-cyan-400 tracking-wider">
              {referenceId}
            </span>
            <button
              type="button"
              onClick={handleCopyId}
              className="p-1.5 rounded-[4px] border border-white/10 bg-white/5 hover:bg-white/10 text-cyan-300 transition-colors cursor-pointer"
              title="Copy Reference ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Quote this reference ID for all queries and finale check-in.
          </div>
        </div>

        {/* Project Snapshot */}
        {registration && (
          <div className="bg-[#0B0F19] border border-white/10 rounded-[8px] p-4 text-xs text-left grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            <div>
              <span className="text-slate-400">Project Name:</span>{' '}
              <span className="font-semibold text-white">{registration.projectName}</span>
            </div>
            <div>
              <span className="text-slate-400">Track:</span>{' '}
              <span className="font-semibold text-cyan-300 font-mono">{registration.domain}</span>
            </div>
            <div>
              <span className="text-slate-400">Team Size:</span>{' '}
              <span className="font-semibold text-white">
                {registration.teamSize} Member{registration.teamSize > 1 ? 's' : ' (Solo)'}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Institution:</span>{' '}
              <span className="font-semibold text-white">{registration.collegeName}</span>
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/my-registration" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full gap-2 font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <FolderGit2 className="w-4 h-4" />
              View Printable Pass
            </Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegistrationSuccess;
