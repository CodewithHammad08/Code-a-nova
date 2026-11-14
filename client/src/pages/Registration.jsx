import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  FilePlus2,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Trash2,
  UserPlus,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Check,
  Globe,
  FileText,
  FolderGit2,
  Video,
  Brain,
  Cpu,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Card from '../components/common/Card';
import useAuth from '../hooks/useAuth';
import { registrationService } from '../services/registration.service';
import {
  DOMAINS,
  COURSES,
  BRANCHES,
  YEARS,
  POPULAR_COLLEGES,
} from '../utils/constants';
import toast from 'react-hot-toast';

const Registration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTrack = searchParams.get('track') || '';

  // Steps: 1 = Participant, 2 = Project & Deliverables, 3 = Dynamic Team, 4 = Review Docket
  const [currentStep, setCurrentStep] = useState(1);
  const [certifiedTruth, setCertifiedTruth] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    participantName: user?.fullName || '',
    email: user?.email || '',
    mobileNumber: user?.mobileNumber || '',
    collegeName: user?.college || '',
    customCollege: '',
    course: user?.course || 'B.Tech',
    branch: user?.branch || 'CSE',
    yearOfStudy: user?.year || '3rd Year',

    domain: initialTrack || 'AI / Machine Learning',
    projectName: '',
    pptLink: '',
    prototypeLink: '',
    demoVideoLink: '',

    teamSize: 1, // Default solo
    teamMembers: [], // [{ name: '', email: '' }]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [existingRegId, setExistingRegId] = useState('');
  const [checkingExisting, setCheckingExisting] = useState(true);

  useEffect(() => {
    registrationService
      .getMyEntry()
      .then((res) => {
        if (res?.data?.registered && res?.data?.registration) {
          setAlreadyRegistered(true);
          setExistingRegId(res.data.registration.registrationId);
        }
      })
      .catch(() => {})
      .finally(() => setCheckingExisting(false));
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        participantName: prev.participantName || user.fullName || '',
        email: user.email || '',
        collegeName: prev.collegeName || user.college || '',
        mobileNumber: prev.mobileNumber || user.mobileNumber || '',
      }));
    }
  }, [user]);

  const handleTeamSizeChange = (newSize) => {
    const size = parseInt(newSize, 10);
    const requiredAdditional = size - 1;

    setFormData((prev) => {
      const currentMembers = [...prev.teamMembers];
      let updatedMembers = [];

      if (requiredAdditional > currentMembers.length) {
        const toAdd = requiredAdditional - currentMembers.length;
        const newSlots = Array.from({ length: toAdd }, () => ({ name: '', email: '' }));
        updatedMembers = [...currentMembers, ...newSlots];
      } else {
        updatedMembers = currentMembers.slice(0, requiredAdditional);
      }

      return {
        ...prev,
        teamSize: size,
        teamMembers: updatedMembers,
      };
    });
  };

  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.teamMembers];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, teamMembers: updated };
    });
  };

  const getUrlBadge = (url) => {
    if (!url) return null;
    if (url.includes('github.com') || url.includes('gitlab.com')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          <FolderGit2 className="w-3 h-3 text-slate-700" /> Repository
        </span>
      );
    }
    if (url.includes('drive.google.com') || url.includes('onedrive') || url.includes('slides')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          <FileText className="w-3 h-3 text-slate-700" /> Slides / Deck
        </span>
      );
    }
    if (url.includes('figma.com')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-purple-800 font-mono bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
          <Sparkles className="w-3 h-3 text-purple-600" /> Figma Design
        </span>
      );
    }
    if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('loom.com')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-rose-800 font-mono bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          <Video className="w-3 h-3 text-rose-600" /> Video Demo
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
        <Globe className="w-3 h-3" /> Web URL
      </span>
    );
  };

  const getTrackIcon = (id) => {
    switch (id) {
      case 'AI / Machine Learning':
        return <Brain className="w-4 h-4 text-slate-800" />;
      case 'Web Development':
        return <Globe className="w-4 h-4 text-slate-800" />;
      case 'Internet of Things':
        return <Cpu className="w-4 h-4 text-slate-800" />;
      case 'Cyber Security':
        return <Shield className="w-4 h-4 text-slate-800" />;
      case 'Blockchain':
        return <Layers className="w-4 h-4 text-slate-800" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-800" />;
    }
  };

  const validateStep = (step) => {
    const errs = {};

    if (step === 1) {
      if (!formData.participantName.trim() || formData.participantName.trim().length < 3) {
        errs.participantName = 'Full Name is required (minimum 3 characters)';
      }
      if (!formData.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
        errs.mobileNumber = 'Enter a valid 10-digit Indian mobile number';
      }
      if (!formData.collegeName) {
        errs.collegeName = 'Please select your institution';
      } else if (
        formData.collegeName === 'Other / Custom College' &&
        (!formData.customCollege.trim() || formData.customCollege.trim().length < 3)
      ) {
        errs.collegeName = 'Please specify your institution name (at least 3 chars)';
      }
      if (!formData.course) errs.course = 'Please select your course';
      if (!formData.branch) errs.branch = 'Please select your branch';
      if (!formData.yearOfStudy) errs.yearOfStudy = 'Please select your year of study';
    }

    if (step === 2) {
      if (!formData.domain) errs.domain = 'Please select a hackathon competition track';
      if (!formData.projectName.trim() || formData.projectName.trim().length < 5) {
        errs.projectName = 'Project Name is required (at least 5 characters)';
      }
      const urlRegex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?.*)?$/i;
      if (!formData.pptLink.trim() || !urlRegex.test(formData.pptLink.trim())) {
        errs.pptLink = 'Valid presentation URL required (e.g., https://drive.google.com/...)';
      }
      if (!formData.prototypeLink.trim() || !urlRegex.test(formData.prototypeLink.trim())) {
        errs.prototypeLink = 'Valid prototype URL required (e.g., GitHub or Figma link)';
      }
      if (formData.demoVideoLink && !urlRegex.test(formData.demoVideoLink.trim())) {
        errs.demoVideoLink = 'If provided, demo video must be a valid URL';
      }
    }

    if (step === 3) {
      if (formData.teamSize > 1) {
        const seenEmails = new Set();
        seenEmails.add(formData.email.toLowerCase());

        formData.teamMembers.forEach((member, i) => {
          if (!member.name.trim() || member.name.trim().length < 2) {
            errs[`member_${i}_name`] = `Member #${i + 2} name is required`;
          }
          if (!member.email.trim() || !/^\S+@\S+\.\S+$/.test(member.email.trim())) {
            errs[`member_${i}_email`] = `Member #${i + 2} valid email required`;
          } else {
            const lower = member.email.trim().toLowerCase();
            if (seenEmails.has(lower)) {
              errs[`member_${i}_email`] = `Member #${i + 2} email cannot be duplicate of team or leader email`;
            } else {
              seenEmails.add(lower);
            }
          }
        });
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      toast.error('Please resolve validation errors in previous sections.');
      return;
    }

    if (!certifiedTruth) {
      toast.error('Please verify and confirm the certification checkbox.');
      return;
    }

    setIsSubmitting(true);
    try {
      const effectiveCollege =
        formData.collegeName === 'Other / Custom College'
          ? formData.customCollege.trim()
          : formData.collegeName.trim();

      const payload = {
        ...formData,
        collegeName: effectiveCollege,
        teamSize: parseInt(formData.teamSize, 10),
      };

      const res = await registrationService.register(payload);
      const regId = res?.data?.registration?.registrationId;
      toast.success('Registration submitted! Confirmation email dispatched.');
      navigate(`/registration/success?id=${encodeURIComponent(regId || '')}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Submission failed. Please check your data.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingExisting) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center text-xs text-slate-500 font-mono">
        Verifying participant status...
      </div>
    );
  }

  if (alreadyRegistered) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="text-center p-8 space-y-4 shadow-sm border-slate-200 bg-white">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Registration Already Submitted
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            You have already registered for Code-a-Nova under this participant account (Reference ID:{' '}
            <strong className="text-slate-900 font-mono">{existingRegId}</strong>). Only one submission per candidate is permitted in the MVP.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/my-registration">
              <Button variant="primary" size="sm">
                View My Registration
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="sm">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const stepsList = [
    { num: 1, title: 'Leader & College' },
    { num: 2, title: 'Track & Artifacts' },
    { num: 3, title: 'Team Configuration' },
    { num: 4, title: 'Review & Submit' },
  ];

  const progressPercent = ((currentStep - 1) / 3) * 100;

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 text-slate-900">
      {/* Header with Step Progress */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Code-a-Nova Logo"
              className="w-10 h-10 rounded-xl object-contain border border-slate-200 shadow-xs shrink-0"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Hackathon Registration
              </h1>
              <p className="text-xs text-slate-500">
                Official submission entry &bull; Code-a-Nova National Hackathon 2026-27
              </p>
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            Step {currentStep} of 4 ({Math.round(progressPercent)}% Complete)
          </div>
        </div>

        {/* Dynamic Progress Indicator Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-slate-900 h-full transition-all duration-300"
            style={{ width: `${progressPercent === 0 ? 8 : progressPercent}%` }}
          />
        </div>

        {/* Stepper Pills */}
        <div className="grid grid-cols-4 gap-2">
          {stepsList.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div
                key={step.num}
                className={`border-t-2 pt-2 text-xs font-semibold transition-colors ${
                  isCurrent
                    ? 'border-slate-900 text-slate-900'
                    : isCompleted
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-slate-200 text-slate-400'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider font-mono">
                  {isCompleted ? 'Done ✓' : `0${step.num}`}
                </div>
                <div className="truncate">{step.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form Body */}
      <Card className="shadow-sm bg-white border-slate-200">
        {/* STEP 1: PARTICIPANT INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Section 1: Team Leader &amp; Institution Details
              </h3>
              <p className="text-xs text-slate-500">
                You are registered as the designated team leader. Your verified email will receive official confirmation receipts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                value={formData.participantName}
                onChange={(e) =>
                  setFormData({ ...formData, participantName: e.target.value })
                }
                error={errors.participantName}
              />

              <Input
                label="Verified Account Email"
                required
                disabled
                value={formData.email}
                helperText="Pre-filled from your authenticated session."
              />

              <Input
                label="Mobile Number (India)"
                required
                type="tel"
                placeholder="10-digit number (e.g. 9876543210)"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
                error={errors.mobileNumber}
              />

              <div>
                <Select
                  label="College / Institution"
                  required
                  value={formData.collegeName}
                  onChange={(e) =>
                    setFormData({ ...formData, collegeName: e.target.value })
                  }
                  options={POPULAR_COLLEGES}
                  error={errors.collegeName}
                />
                {formData.collegeName === 'Other / Custom College' && (
                  <div className="mt-2">
                    <Input
                      placeholder="Specify your institution name..."
                      value={formData.customCollege}
                      onChange={(e) =>
                        setFormData({ ...formData, customCollege: e.target.value })
                      }
                      required
                    />
                  </div>
                )}
              </div>

              <Select
                label="Degree / Course"
                required
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                options={COURSES}
                error={errors.course}
              />

              <Select
                label="Engineering Branch"
                required
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                options={BRANCHES}
                error={errors.branch}
              />

              <Select
                label="Year of Study"
                required
                value={formData.yearOfStudy}
                onChange={(e) =>
                  setFormData({ ...formData, yearOfStudy: e.target.value })
                }
                options={YEARS}
                error={errors.yearOfStudy}
              />
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT & DELIVERABLES */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Section 2: Competition Track &amp; Artifacts
              </h3>
              <p className="text-xs text-slate-500">
                Choose your track and supply verified links to your design deck and repository prototype.
              </p>
            </div>

            {/* Track Selector Buttons */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                Select Track <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {DOMAINS.map((domain) => {
                  const isSelected = formData.domain === domain.id;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, domain: domain.id })}
                      className={`p-3 text-left rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg border ${
                          isSelected
                            ? 'bg-white/10 border-white/20 text-white'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {getTrackIcon(domain.id)}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold font-display truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {domain.title}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {domain.shortDesc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.domain && (
                <p className="text-xs text-rose-500 font-medium">{errors.domain}</p>
              )}
            </div>

            <div className="space-y-4 pt-2">
              <Input
                label="Project Title"
                required
                placeholder="e.g. Aegis: Real-Time Decentralized Threat Detection"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                error={errors.projectName}
                helperText="Minimum 5 characters describing your hackathon project."
              />

              <div>
                <Input
                  label="Presentation Deck (PPT / Slides Link)"
                  required
                  type="url"
                  placeholder="https://drive.google.com/file/... or OneDrive link"
                  value={formData.pptLink}
                  onChange={(e) => setFormData({ ...formData, pptLink: e.target.value })}
                  error={errors.pptLink}
                  helperText="Google Drive, OneDrive, or Pitch link. Set permissions to anyone with link can view."
                />
                {formData.pptLink && (
                  <div className="mt-1 flex items-center justify-between text-xs">
                    {getUrlBadge(formData.pptLink)}
                  </div>
                )}
              </div>

              <div>
                <Input
                  label="Prototype / Code Repository Link"
                  required
                  type="url"
                  placeholder="https://github.com/your-team/repo or Figma link"
                  value={formData.prototypeLink}
                  onChange={(e) =>
                    setFormData({ ...formData, prototypeLink: e.target.value })
                  }
                  error={errors.prototypeLink}
                  helperText="GitHub, GitLab, or Figma prototype URL."
                />
                {formData.prototypeLink && (
                  <div className="mt-1 flex items-center justify-between text-xs">
                    {getUrlBadge(formData.prototypeLink)}
                  </div>
                )}
              </div>

              <div>
                <Input
                  label="Demo Video Link (Optional)"
                  type="url"
                  placeholder="https://youtube.com/watch?v=... or Loom / Drive link"
                  value={formData.demoVideoLink}
                  onChange={(e) =>
                    setFormData({ ...formData, demoVideoLink: e.target.value })
                  }
                  error={errors.demoVideoLink}
                  helperText="Optional 2-3 minute demonstration walkthrough."
                />
                {formData.demoVideoLink && (
                  <div className="mt-1 flex items-center justify-between text-xs">
                    {getUrlBadge(formData.demoVideoLink)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DYNAMIC TEAM CONFIGURATION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Section 3: Team Configuration &amp; Member Slots
              </h3>
              <p className="text-xs text-slate-500">
                Select your total team size (1 to 5, including leader). Additional member fields are generated dynamically.
              </p>
            </div>

            {/* Team Size Selector Cards */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono">
                Total Team Size (Including Leader)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { size: 1, label: 'Solo' },
                  { size: 2, label: 'Duo' },
                  { size: 3, label: 'Trio' },
                  { size: 4, label: 'Squad (4)' },
                  { size: 5, label: 'Max (5)' },
                ].map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => handleTeamSizeChange(item.size)}
                    className={`py-2 px-2 sm:px-3 text-center rounded-lg border transition-all cursor-pointer ${
                      formData.teamSize === item.size
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-mono font-bold text-sm sm:text-base">
                      {item.size}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold opacity-80 font-mono">
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Team Leader Banner */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>1. {formData.participantName}</span>
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded-full font-bold uppercase font-mono">
                    Team Leader
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">{formData.email}</div>
              </div>
              <span className="text-xs text-emerald-700 font-semibold font-mono">Self &bull; Lead</span>
            </div>

            {/* Dynamic Member Inputs */}
            {formData.teamSize > 1 ? (
              <div className="space-y-4 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  Additional Team Members ({formData.teamSize - 1} required):
                </div>

                {formData.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                        Team Member #{index + 2}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        required
                        placeholder="e.g. Rhea Patel"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, 'name', e.target.value)
                        }
                        error={errors[`member_${index}_name`]}
                      />
                      <Input
                        label="Email Address"
                        required
                        type="email"
                        placeholder="rhea@college.edu"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, 'email', e.target.value)
                        }
                        error={errors[`member_${index}_email`]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 text-center">
                Solo registration selected. No additional member slots required.
              </div>
            )}
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRMATION DOCKET */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Section 4: Official Registration Docket Review
              </h3>
              <p className="text-xs text-slate-500">
                Carefully review all submitted information before finalizing your entry. Once submitted, your registration reference ID will be generated.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Leader & Academic */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm uppercase tracking-wider font-mono">
                  Leader &amp; Academic Credentials
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500">Leader Name:</span>{' '}
                    <span className="font-semibold text-slate-900">
                      {formData.participantName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Email:</span>{' '}
                    <span className="font-semibold text-slate-900 font-mono">
                      {formData.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Mobile:</span>{' '}
                    <span className="font-semibold text-slate-900 font-mono">
                      +91 {formData.mobileNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Institution:</span>{' '}
                    <span className="font-semibold text-slate-900">
                      {formData.collegeName === 'Other / Custom College'
                        ? formData.customCollege
                        : formData.collegeName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Degree &amp; Branch:</span>{' '}
                    <span className="font-semibold text-slate-900">
                      {formData.course} ({formData.branch}) &bull; {formData.yearOfStudy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project & Track */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm uppercase tracking-wider font-mono">
                  Project Submission Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500">Domain / Track:</span>{' '}
                    <span className="font-bold text-slate-900">{formData.domain}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Project Name:</span>{' '}
                    <span className="font-semibold text-slate-900">
                      {formData.projectName}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500">Presentation Link:</span>{' '}
                    <a
                      href={formData.pptLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-900 hover:underline font-semibold truncate inline-block max-w-md ml-1"
                    >
                      {formData.pptLink}
                    </a>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500">Prototype Link:</span>{' '}
                    <a
                      href={formData.prototypeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-900 hover:underline font-semibold truncate inline-block max-w-md ml-1"
                    >
                      {formData.prototypeLink}
                    </a>
                  </div>
                </div>
              </div>

              {/* Team Roster */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm uppercase tracking-wider font-mono">
                  Team Members Roster ({formData.teamSize})
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">
                    1. {formData.participantName} ({formData.email}) - Team Leader
                  </div>
                  {formData.teamMembers.map((m, i) => (
                    <div key={i} className="text-slate-700">
                      {i + 2}. {m.name} ({m.email})
                    </div>
                  ))}
                </div>
              </div>

              {/* Truth Certification Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={certifiedTruth}
                    onChange={(e) => setCertifiedTruth(e.target.checked)}
                    className="mt-0.5 rounded text-slate-900 focus:ring-slate-900/10"
                  />
                  <span className="text-xs text-slate-700">
                    I confirm that the submitted project details, participant names, and deliverable links are authentic, original, and comply with Code-a-Nova rules.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 border-t border-slate-100 pt-4 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button variant="secondary" onClick={prevStep} size="sm" className="gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Section
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button variant="primary" onClick={nextStep} size="sm" className="gap-1.5 font-bold shadow-xs">
              Next Section
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              variant="accent"
              onClick={handleFinalSubmit}
              isLoading={isSubmitting}
              size="md"
              disabled={!certifiedTruth}
              className="gap-2 font-bold shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm &amp; Submit Registration
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Registration;
