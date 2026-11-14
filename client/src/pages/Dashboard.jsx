import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FilePlus2,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  FileText,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import CountdownTimer from '../components/common/CountdownTimer';
import useAuth from '../hooks/useAuth';
import { registrationService } from '../services/registration.service';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [registration, setRegistration] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchRegistrationData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await registrationService.getMyEntry();
      if (res?.data?.registered && res?.data?.registration) {
        setIsRegistered(true);
        setRegistration(res.data.registration);
      } else {
        setIsRegistered(false);
        setRegistration(null);
      }
    } catch (err) {
      setIsError(true);
      toast.error('Failed to load registration details.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrationData();
  }, []);

  const handleCopyId = () => {
    if (registration?.registrationId) {
      navigator.clipboard.writeText(registration.registrationId);
      setCopied(true);
      toast.success('Registration Reference ID copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="primary">SUBMITTED &bull; UNDER REVIEW</Badge>;
      case 'under_review':
        return <Badge variant="warning">IN EVALUATION</Badge>;
      case 'shortlisted':
        return <Badge variant="success">SHORTLISTED FOR FINALE</Badge>;
      case 'rejected':
        return <Badge variant="error">NOT SHORTLISTED</Badge>;
      default:
        return <Badge variant="default">{status.toUpperCase()}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900 font-display">Unable to Retrieve Dashboard Data</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          We encountered an issue communicating with the registration service. Please retry.
        </p>
        <Button variant="secondary" size="sm" onClick={fetchRegistrationData} className="gap-2">
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Request
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-900">
      {/* Header Greeting Banner with Countdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-mono font-bold uppercase text-slate-700 mb-2">
            <img src="/logo.png" alt="Code-a-Nova Logo" className="w-4 h-4 rounded-md object-contain" />
            Participant Portal &bull; Code-a-Nova 2026-27
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Welcome, {user?.fullName || 'Participant'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Logged in as <strong className="text-slate-900 font-mono">{user?.email}</strong> &bull; Verified Candidate
          </p>
        </div>

        <div className="flex items-center gap-4">
          <CountdownTimer
            targetDate="2026-12-20T23:59:59"
            label="Registration Closes In:"
          />
        </div>
      </div>

      {/* Workflow Step Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 uppercase tracking-wider font-mono">
            Participation Roadmap
          </span>
          <span className="text-slate-500 font-mono">
            {isRegistered ? 'Step 3 of 4 Complete' : 'Step 2 of 4 Complete (Action Required)'}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-xs">
          {/* Step 1: Account Created */}
          <div className="border-t-2 border-emerald-500 pt-2">
            <span className="text-[10px] text-emerald-700 font-mono font-bold uppercase block">
              Done &#10003;
            </span>
            <span className="font-semibold text-slate-900">Account Created</span>
          </div>

          {/* Step 2: Email Verified */}
          <div className="border-t-2 border-emerald-500 pt-2">
            <span className="text-[10px] text-emerald-700 font-mono font-bold uppercase block">
              Done &#10003;
            </span>
            <span className="font-semibold text-slate-900">Email Verified</span>
          </div>

          {/* Step 3: Hackathon Registration */}
          <div
            className={`border-t-2 pt-2 ${
              isRegistered
                ? 'border-emerald-500'
                : 'border-slate-900 ring-1 ring-slate-900/10'
            }`}
          >
            <span
              className={`text-[10px] font-mono font-bold uppercase block ${
                isRegistered ? 'text-emerald-700' : 'text-slate-900'
              }`}
            >
              {isRegistered ? 'Done &#10003;' : 'Current Step'}
            </span>
            <span className="font-semibold text-slate-900">Hackathon Registration</span>
          </div>

          {/* Step 4: Grand Finale Shortlist */}
          <div className="border-t-2 border-slate-200 pt-2 text-slate-400">
            <span className="text-[10px] font-mono font-bold uppercase block">Upcoming</span>
            <span className="font-semibold">Shortlist &amp; Finale</span>
          </div>
        </div>
      </div>

      {/* Main Content: Depending on registration status */}
      {!isRegistered ? (
        /* Unregistered State */
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-50 border border-amber-200 rounded-md text-[11px] font-bold text-amber-800 uppercase font-mono">
                Mandatory Step
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                Register Your Hackathon Project &amp; Team
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                You have verified your participant email address, but haven't yet submitted your project materials. Form a solo entry or bring a team of up to 5 members across any of the 5 competition tracks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/register">
                <Button variant="primary" size="lg" className="gap-2 font-bold shadow-sm">
                  <FilePlus2 className="w-4 h-4" />
                  Proceed to Registration Form
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Registration Preparation Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-2 bg-white border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center font-bold text-xs font-mono">
                01
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-display">Academic &amp; Track Info</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confirm your 10-digit mobile number, university, branch, and select your competition domain.
              </p>
            </Card>

            <Card className="space-y-2 bg-white border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center font-bold text-xs font-mono">
                02
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-display">Deliverables Links</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide public URLs to your presentation deck (PPT) and prototype code repository or Figma project.
              </p>
            </Card>

            <Card className="space-y-2 bg-white border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center font-bold text-xs font-mono">
                03
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-display">Dynamic Team (1–5)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Register individually or dynamically specify up to 4 additional members with valid emails.
              </p>
            </Card>
          </div>
        </div>
      ) : (
        /* Registered State: Active Project Dashboard */
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 space-y-1 bg-white border-slate-200">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                Official Reference ID
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-slate-900">
                  {registration.registrationId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Copy ID"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card>

            <Card className="p-4 space-y-1 bg-white border-slate-200">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                Track / Domain
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">
                {registration.domain}
              </div>
            </Card>

            <Card className="p-4 space-y-1 bg-white border-slate-200">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                Team Size
              </div>
              <div className="text-base font-bold text-slate-900">
                {registration.teamSize} Member{registration.teamSize > 1 ? 's' : ' (Solo)'}
              </div>
            </Card>

            <Card className="p-4 space-y-1 bg-white border-slate-200">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                Review Status
              </div>
              <div className="pt-0.5">{getStatusBadge(registration.status)}</div>
            </Card>
          </div>

          {/* Project Details & Deliverables */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <Card
                className="bg-white border-slate-200"
                header={
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                      Project Submission Docket
                    </span>
                    <Link
                      to="/my-registration"
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 font-mono"
                    >
                      View Printable Pass
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                }
              >
                <div className="space-y-5">
                  <div>
                    <div className="text-xs text-slate-500 font-mono">Project Title</div>
                    <div className="text-xl font-bold text-slate-900 mt-0.5 font-display">
                      {registration.projectName}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500">Team Leader:</span>{' '}
                      <span className="font-semibold text-slate-900">
                        {registration.participantName}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Institution:</span>{' '}
                      <span className="font-semibold text-slate-900">
                        {registration.collegeName}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Degree &amp; Branch:</span>{' '}
                      <span className="font-semibold text-slate-900">
                        {registration.course} ({registration.branch}) &bull; {registration.yearOfStudy}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Submitted At:</span>{' '}
                      <span className="font-semibold text-slate-900 font-mono">
                        {new Date(registration.submittedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Deliverables Action Row */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                      Submitted Deliverables Links:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {registration.pptLink && (
                        <a
                          href={registration.pptLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 transition-all shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-700" />
                          Presentation (PPT)
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                      {registration.prototypeLink && (
                        <a
                          href={registration.prototypeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 transition-all shadow-xs"
                        >
                          <FolderGit2 className="w-3.5 h-3.5 text-slate-700" />
                          Prototype / Repo
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                      {registration.demoVideoLink && (
                        <a
                          href={registration.demoVideoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 transition-all shadow-xs"
                        >
                          Demo Video
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Team Roster Card */}
              <Card
                className="bg-white border-slate-200"
                header={
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                    Registered Team Members ({registration.teamSize})
                  </span>
                }
              >
                <div className="space-y-2.5">
                  {/* Leader */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{registration.participantName}</span>
                        <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded-full font-bold uppercase font-mono">
                          Team Leader
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{registration.email}</div>
                    </div>
                    <Badge variant="success" size="sm">
                      Lead Contact
                    </Badge>
                  </div>

                  {/* Members */}
                  {registration.teamMembers && registration.teamMembers.length > 0 ? (
                    registration.teamMembers.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-800">
                            {member.name}
                          </div>
                          <div className="text-xs text-slate-500 font-mono mt-0.5">{member.email}</div>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          Member #{idx + 2}
                        </span>
                      </div>
                    ))
                  ) : null}
                </div>
              </Card>
            </div>

            {/* Right Column: Quick Profile & Actions */}
            <div className="lg:col-span-4 space-y-6">
              <Card
                className="bg-white border-slate-200"
                header={
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                    Participant Profile
                  </span>
                }
              >
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500">Full Name:</span>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">
                      {user?.fullName}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <div className="font-semibold text-slate-900 font-mono mt-0.5">{user?.email}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">College / Institution:</span>
                    <div className="font-semibold text-slate-700 mt-0.5">
                      {user?.college || registration.collegeName || 'Not specified'}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Academic Course:</span>
                    <div className="font-semibold text-slate-700 mt-0.5">
                      {user?.course || registration.course} &bull;{' '}
                      {user?.year || registration.yearOfStudy}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <Link to="/profile">
                      <Button variant="secondary" size="sm" className="w-full">
                        Manage Profile Settings
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Event Announcement reminder */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 border border-slate-800 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Upcoming Milestone
                </div>
                <h4 className="font-bold text-sm font-display text-white">Technical Shortlist Review</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluators will grade presentations and prototypes based on novelty, architecture, and functional execution until January 05, 2027.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
