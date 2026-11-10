import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FilePlus2,
  FolderGit2,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  GraduationCap,
  Calendar,
  Layers,
  FileText,
  RefreshCw,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import useAuth from '../hooks/useAuth';
import { registrationService } from '../services/registration.service';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [registration, setRegistration] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="primary">Submitted</Badge>;
      case 'under_review':
        return <Badge variant="warning">Under Review</Badge>;
      case 'shortlisted':
        return <Badge variant="success">Shortlisted for Finale</Badge>;
      case 'rejected':
        return <Badge variant="error">Not Shortlisted</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-[7px] p-8 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-[#C44545] mx-auto" />
        <h3 className="text-lg font-bold text-[#17243A]">Unable to Retrieve Dashboard Data</h3>
        <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
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
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] tracking-tight">
            Welcome, {user?.fullName || 'Participant'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Participant Portal &bull; Code-a-Nova National Hackathon
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isRegistered ? (
            <div className="flex items-center gap-2 bg-[#21845B]/10 border border-[#21845B]/20 text-[#21845B] text-xs font-semibold px-3 py-1.5 rounded-[4px]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Registration Confirmed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-[4px]">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Registration Pending</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Depending on registration status */}
      {!isRegistered ? (
        /* Empty State: Unregistered prompt */
        <div className="space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#D6A64F]/15 border border-[#D6A64F]/30 rounded-[4px] text-[11px] font-semibold text-[#9E7322] uppercase">
                Action Required
              </div>
              <h2 className="text-2xl font-bold text-[#17243A]">
                You haven't registered your team or project yet.
              </h2>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                To participate in Code-a-Nova, complete the hackathon registration form. You can register as an individual (solo) or form a team of up to 5 members across any of the 5 competition tracks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/register">
                <Button variant="primary" size="lg" className="gap-2">
                  <FilePlus2 className="w-4 h-4" />
                  Register Team & Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Registration Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-2">
              <div className="w-8 h-8 rounded-[4px] bg-[#17243A]/5 flex items-center justify-center font-bold text-xs text-[#17243A]">
                1
              </div>
              <h4 className="font-semibold text-sm text-[#17243A]">Select Track</h4>
              <p className="text-xs text-[#6B7280]">
                Choose between AI/ML, Web Development, IoT, Cyber Security, or Blockchain.
              </p>
            </Card>

            <Card className="space-y-2">
              <div className="w-8 h-8 rounded-[4px] bg-[#17243A]/5 flex items-center justify-center font-bold text-xs text-[#17243A]">
                2
              </div>
              <h4 className="font-semibold text-sm text-[#17243A]">Add Team Members</h4>
              <p className="text-xs text-[#6B7280]">
                Register solo or dynamically specify up to 4 additional members with valid emails.
              </p>
            </Card>

            <Card className="space-y-2">
              <div className="w-8 h-8 rounded-[4px] bg-[#17243A]/5 flex items-center justify-center font-bold text-xs text-[#17243A]">
                3
              </div>
              <h4 className="font-semibold text-sm text-[#17243A]">Provide Materials</h4>
              <p className="text-xs text-[#6B7280]">
                Submit your presentation (PPT) and prototype/repository URLs for evaluation.
              </p>
            </Card>
          </div>
        </div>
      ) : (
        /* Registered State: Active Project Overview */
        <div className="space-y-6">
          {/* Top Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 space-y-1">
              <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">
                Registration ID
              </div>
              <div className="text-lg font-mono font-bold text-[#17243A]">
                {registration.registrationId}
              </div>
            </Card>

            <Card className="p-4 space-y-1">
              <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">
                Domain / Track
              </div>
              <div className="text-sm font-bold text-[#17243A] truncate">
                {registration.domain}
              </div>
            </Card>

            <Card className="p-4 space-y-1">
              <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">
                Team Size
              </div>
              <div className="text-base font-bold text-[#17243A]">
                {registration.teamSize} Member{registration.teamSize > 1 ? 's' : ' (Solo)'}
              </div>
            </Card>

            <Card className="p-4 space-y-1">
              <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">
                Review Status
              </div>
              <div className="pt-0.5">{getStatusBadge(registration.status)}</div>
            </Card>
          </div>

          {/* Project Details Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <Card
                header={
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#17243A]">
                      Project Submission
                    </span>
                    <Link
                      to="/my-registration"
                      className="text-xs font-semibold text-[#17243A] hover:underline inline-flex items-center gap-1"
                    >
                      View Full Pass
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                }
              >
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-[#6B7280]">Project Title</div>
                    <div className="text-xl font-bold text-[#17243A] mt-0.5">
                      {registration.projectName}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F7F7F4] text-xs">
                    <div>
                      <span className="text-[#6B7280]">Leader Name:</span>{' '}
                      <span className="font-semibold text-[#17243A]">
                        {registration.participantName}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Institution:</span>{' '}
                      <span className="font-semibold text-[#17243A]">
                        {registration.collegeName}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Academic Track:</span>{' '}
                      <span className="font-semibold text-[#17243A]">
                        {registration.course} ({registration.branch}) &bull; {registration.yearOfStudy}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Submitted At:</span>{' '}
                      <span className="font-semibold text-[#17243A]">
                        {new Date(registration.submittedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Submission Links Bar */}
                  <div className="pt-4 border-t border-[#F7F7F4] space-y-2">
                    <div className="text-xs font-semibold text-[#17243A]">Submitted Deliverables:</div>
                    <div className="flex flex-wrap gap-2">
                      {registration.pptLink && (
                        <a
                          href={registration.pptLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F4] hover:bg-[#E5E7EB] border border-[#E5E7EB] rounded-[4px] text-xs font-medium text-[#17243A] transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#17243A]" />
                          Presentation (PPT)
                          <ExternalLink className="w-3 h-3 text-[#6B7280]" />
                        </a>
                      )}
                      {registration.prototypeLink && (
                        <a
                          href={registration.prototypeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F4] hover:bg-[#E5E7EB] border border-[#E5E7EB] rounded-[4px] text-xs font-medium text-[#17243A] transition-colors"
                        >
                          <FolderGit2 className="w-3.5 h-3.5 text-[#17243A]" />
                          Prototype / Repo
                          <ExternalLink className="w-3 h-3 text-[#6B7280]" />
                        </a>
                      )}
                      {registration.demoVideoLink && (
                        <a
                          href={registration.demoVideoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F4] hover:bg-[#E5E7EB] border border-[#E5E7EB] rounded-[4px] text-xs font-medium text-[#17243A] transition-colors"
                        >
                          Demo Video
                          <ExternalLink className="w-3 h-3 text-[#6B7280]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Team Members List */}
              <Card
                header={
                  <span className="text-xs font-bold uppercase tracking-wider text-[#17243A]">
                    Registered Team Roster ({registration.teamSize})
                  </span>
                }
              >
                <div className="space-y-3">
                  {/* Leader */}
                  <div className="flex items-center justify-between p-3 bg-[#F7F7F4] rounded-[5px] border border-[#E5E7EB]">
                    <div>
                      <div className="text-sm font-semibold text-[#17243A] flex items-center gap-2">
                        <span>{registration.participantName}</span>
                        <span className="text-[10px] bg-[#17243A] text-white px-1.5 py-0.5 rounded-[3px] font-bold uppercase tracking-wider">
                          Leader
                        </span>
                      </div>
                      <div className="text-xs text-[#6B7280]">{registration.email}</div>
                    </div>
                    <div className="text-xs font-medium text-[#21845B]">Primary Contact</div>
                  </div>

                  {/* Additional members */}
                  {registration.teamMembers && registration.teamMembers.length > 0 ? (
                    registration.teamMembers.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-white rounded-[5px] border border-[#E5E7EB]"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#17243A]">
                            {member.name}
                          </div>
                          <div className="text-xs text-[#6B7280]">{member.email}</div>
                        </div>
                        <span className="text-xs text-[#6B7280]">Member #{idx + 2}</span>
                      </div>
                    ))
                  ) : null}
                </div>
              </Card>
            </div>

            {/* Right Column: Profile Summary & Quick Actions */}
            <div className="lg:col-span-4 space-y-6">
              <Card
                header={
                  <span className="text-xs font-bold uppercase tracking-wider text-[#17243A]">
                    Participant Profile
                  </span>
                }
              >
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#6B7280]">Name:</span>
                    <div className="font-semibold text-[#17243A] text-sm mt-0.5">
                      {user?.fullName}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Email:</span>
                    <div className="font-semibold text-[#17243A] mt-0.5">{user?.email}</div>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Institution:</span>
                    <div className="font-semibold text-[#17243A] mt-0.5">
                      {user?.college || registration.collegeName || 'Not specified'}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Course & Year:</span>
                    <div className="font-semibold text-[#17243A] mt-0.5">
                      {user?.course || registration.course} &bull;{' '}
                      {user?.year || registration.yearOfStudy}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F7F7F4]">
                    <Link to="/profile">
                      <Button variant="secondary" size="sm" className="w-full">
                        Update Profile Settings
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Event Announcement reminder */}
              <div className="bg-[#17243A] text-white rounded-[7px] p-5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#D6A64F]">
                  Next Milestone
                </div>
                <h4 className="font-bold text-sm">Shortlist Announcement</h4>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                  The panel of technical mentors will evaluate PPT decks and prototypes continuously until the deadline.
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
