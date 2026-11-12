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
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <Card className="text-center p-8 sm:p-12 space-y-6 shadow-md border-[#E5E7EB]">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-[#21845B]/10 rounded-full flex items-center justify-center mx-auto text-[#21845B]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#21845B]">
            Registration Successful
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] tracking-tight">
            You're Officially Registered!
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
            Your hackathon entry has been successfully validated and recorded into the Code-a-Nova database. A confirmation receipt has been dispatched to your email.
          </p>
        </div>

        {/* Reference ID banner */}
        <div className="bg-[#F7F7F4] border border-[#E5E7EB] rounded-[6px] p-5 max-w-md mx-auto space-y-2">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280]">
            Official Registration Reference
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-mono font-extrabold text-[#17243A] tracking-wider">
              {referenceId}
            </span>
            <button
              type="button"
              onClick={handleCopyId}
              className="p-1.5 rounded-[4px] border border-[#E5E7EB] bg-white hover:bg-[#F7F7F4] text-[#17243A] transition-colors"
              title="Copy Reference ID"
            >
              {copied ? <Check className="w-4 h-4 text-[#21845B]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-[11px] text-[#9CA3AF]">
            Quote this reference ID for all queries and finale check-in.
          </div>
        </div>

        {/* Project Snapshot */}
        {registration && (
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-4 text-xs text-left grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#4B5563]">
            <div>
              <span className="text-[#6B7280]">Project Name:</span>{' '}
              <span className="font-semibold text-[#17243A]">{registration.projectName}</span>
            </div>
            <div>
              <span className="text-[#6B7280]">Track:</span>{' '}
              <span className="font-semibold text-[#17243A]">{registration.domain}</span>
            </div>
            <div>
              <span className="text-[#6B7280]">Team Size:</span>{' '}
              <span className="font-semibold text-[#17243A]">
                {registration.teamSize} Member(s)
              </span>
            </div>
            <div>
              <span className="text-[#6B7280]">Team Leader:</span>{' '}
              <span className="font-semibold text-[#17243A]">
                {registration.participantName}
              </span>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/my-registration">
            <Button variant="primary" size="md" className="gap-2 w-full sm:w-auto">
              <FolderGit2 className="w-4 h-4" />
              View Registration Pass
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="md" className="gap-2 w-full sm:w-auto">
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

