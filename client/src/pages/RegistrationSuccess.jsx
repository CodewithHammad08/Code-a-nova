import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, LayoutDashboard, FolderGit2, Copy, Check } from 'lucide-react';
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
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 text-slate-900">
      <Card className="text-center p-8 sm:p-12 space-y-6 shadow-sm border-slate-200 bg-white">
        {/* Success Icon & Logo */}
        <div className="flex flex-col items-center gap-3">
          <Link to="/" className="inline-block group">
            <img
              src="/logo.png"
              alt="Code-a-Nova Logo"
              className="w-14 h-14 rounded-2xl object-contain mx-auto border border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
            />
          </Link>
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
            Registration Successful
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            You're Officially Registered!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Your hackathon entry has been successfully validated and recorded into the Code-a-Nova database. A confirmation receipt has been dispatched to your email.
          </p>
        </div>

        {/* Reference ID banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto space-y-2 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 font-mono">
            Official Registration Reference
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-mono font-extrabold text-slate-900 tracking-wider">
              {referenceId}
            </span>
            <button
              type="button"
              onClick={handleCopyId}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer shadow-xs"
              title="Copy Reference ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Quote this reference ID for all queries and finale check-in.
          </div>
        </div>

        {/* Project Snapshot */}
        {registration && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
            <div>
              <span className="text-slate-500">Project Name:</span>{' '}
              <span className="font-semibold text-slate-900">{registration.projectName}</span>
            </div>
            <div>
              <span className="text-slate-500">Track:</span>{' '}
              <span className="font-semibold text-slate-900 font-mono">{registration.domain}</span>
            </div>
            <div>
              <span className="text-slate-500">Team Size:</span>{' '}
              <span className="font-semibold text-slate-900">
                {registration.teamSize} Member{registration.teamSize > 1 ? 's' : ' (Solo)'}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Institution:</span>{' '}
              <span className="font-semibold text-slate-900">{registration.collegeName}</span>
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/my-registration" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full gap-2 font-bold shadow-xs">
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
