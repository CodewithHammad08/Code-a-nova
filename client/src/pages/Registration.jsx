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

  // Current Step: 1 = Participant Info, 2 = Project Info, 3 = Team Info, 4 = Review & Submit
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Participant Info
    participantName: user?.fullName || '',
    email: user?.email || '',
    mobileNumber: user?.mobileNumber || '',
    collegeName: user?.college || '',
    customCollege: '',
    course: user?.course || 'B.Tech',
    branch: user?.branch || 'CSE',
    yearOfStudy: user?.year || '3rd Year',

    // Step 2: Project Info
    domain: initialTrack || 'AI / Machine Learning',
    projectName: '',
    pptLink: '',
    prototypeLink: '',
    demoVideoLink: '',

    // Step 3: Team Info
    teamSize: 1, // Default solo
    teamMembers: [], // [{ name: '', email: '' }]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [existingRegId, setExistingRegId] = useState('');
  const [checkingExisting, setCheckingExisting] = useState(true);

  // Check if participant already registered
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

  // Sync user defaults when user data loads
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

  // Handle Dynamic Team Size change (1 to 5)
  const handleTeamSizeChange = (newSize) => {
    const size = parseInt(newSize, 10);
    const requiredAdditional = size - 1;

    setFormData((prev) => {
      const currentMembers = [...prev.teamMembers];
      let updatedMembers = [];

      if (requiredAdditional > currentMembers.length) {
        // Add empty member slots while preserving existing entries
        const toAdd = requiredAdditional - currentMembers.length;
        const newSlots = Array.from({ length: toAdd }, () => ({ name: '', email: '' }));
        updatedMembers = [...currentMembers, ...newSlots];
      } else {
        // Truncate to new required additional members
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

  // Validation per step
  const validateStep = (step) => {
    const errs = {};

    if (step === 1) {
      if (!formData.participantName.trim() || formData.participantName.trim().length < 3) {
        errs.participantName = 'Participant name must be at least 3 characters';
      }
      if (!formData.mobileNumber || !/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
        errs.mobileNumber = 'Must be a valid 10-digit Indian mobile number';
      }
      const effectiveCollege =
        formData.collegeName === 'Other / Custom College'
          ? formData.customCollege.trim()
          : formData.collegeName.trim();

      if (!effectiveCollege) {
        errs.collegeName = 'Please select or enter your college/institution';
      }
      if (!formData.course) errs.course = 'Please select your degree/course';
      if (!formData.branch) errs.branch = 'Please select your engineering branch';
      if (!formData.yearOfStudy) errs.yearOfStudy = 'Please select year of study';
    }

    if (step === 2) {
      if (!formData.domain) errs.domain = 'Please choose a hackathon track';
      if (!formData.projectName.trim() || formData.projectName.trim().length < 5) {
        errs.projectName = 'Project name must be at least 5 characters long';
      }
      if (!formData.pptLink.trim() || !/^https?:\/\//i.test(formData.pptLink.trim())) {
        errs.pptLink = 'Must be a valid HTTP or HTTPS presentation link';
      }
      if (!formData.prototypeLink.trim() || !/^https?:\/\//i.test(formData.prototypeLink.trim())) {
        errs.prototypeLink = 'Must be a valid HTTP or HTTPS repository or prototype link';
      }
      if (
        formData.demoVideoLink.trim() &&
        !/^https?:\/\//i.test(formData.demoVideoLink.trim())
      ) {
        errs.demoVideoLink = 'Demo video link must be a valid HTTP or HTTPS URL';
      }
    }

    if (step === 3) {
      if (formData.teamSize > 1) {
        const emailsSeen = new Set();
        emailsSeen.add((user?.email || '').toLowerCase().trim());

        formData.teamMembers.forEach((member, idx) => {
          if (!member.name.trim() || member.name.trim().length < 2) {
            errs[`member_${idx}_name`] = `Member #${idx + 2}: Name is required (min 2 chars)`;
          }
          const emailTrimmed = member.email.trim().toLowerCase();
          if (!emailTrimmed || !/^\S+@\S+\.\S+$/.test(emailTrimmed)) {
            errs[`member_${idx}_email`] = `Member #${idx + 2}: Valid email required`;
          } else if (emailsSeen.has(emailTrimmed)) {
            errs[`member_${idx}_email`] = `Member #${idx + 2}: Email is duplicated in team`;
          } else {
            emailsSeen.add(emailTrimmed);
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
      toast.error('Please resolve validation errors in prior sections.');
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
      toast.success('Registration submitted successfully! Confirmation email dispatched.');
      navigate(`/registration/success?id=${encodeURIComponent(regId || '')}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Submission failed. Please check your data.';
      toast.error(msg);
      if (err.response?.status === 409) {
        setAlreadyRegistered(true);
        if (err.response.data?.existingRegistrationId) {
          setExistingRegId(err.response.data.existingRegistrationId);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingExisting) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center text-xs text-[#6B7280]">
        Verifying registration status...
      </div>
    );
  }

  // If already registered, prevent duplicate submission
  if (alreadyRegistered) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card className="text-center p-8 space-y-4">
          <div className="w-12 h-12 bg-[#21845B]/10 rounded-full flex items-center justify-center mx-auto text-[#21845B]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#17243A]">
            Registration Already Submitted
          </h2>
          <p className="text-xs text-[#6B7280] max-w-md mx-auto">
            You have already registered for Code-a-Nova under this participant account (ID:{' '}
            <strong className="text-[#17243A] font-mono">{existingRegId}</strong>). Only one submission per candidate is permitted in the MVP.
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
    { num: 1, title: 'Leader Info' },
    { num: 2, title: 'Project & Links' },
    { num: 3, title: 'Team Roster' },
    { num: 4, title: 'Review & Submit' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8">
      {/* Title & Progress Wizard */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] tracking-tight">
            Hackathon Registration
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Complete all required sections to register your project for Code-a-Nova.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="grid grid-cols-4 gap-2">
          {stepsList.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div
                key={step.num}
                className={`border-t-2 pt-2 text-xs font-semibold transition-colors ${
                  isCurrent
                    ? 'border-[#17243A] text-[#17243A]'
                    : isCompleted
                    ? 'border-[#21845B] text-[#21845B]'
                    : 'border-[#E5E7EB] text-[#9CA3AF]'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider font-mono">
                  {isCompleted ? 'Done' : `Step 0${step.num}`}
                </div>
                <div className="truncate">{step.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Section Form Card */}
      <Card className="shadow-sm">
        {/* STEP 1: PARTICIPANT INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-[#F7F7F4] pb-3">
              <h3 className="text-base font-bold text-[#17243A]">
                Section 1: Team Leader / Participant Information
              </h3>
              <p className="text-xs text-[#6B7280]">
                As the authenticated user submitting this entry, you will be designated as Team Leader.
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
                label="Email Address"
                required
                disabled
                value={formData.email}
                helperText="Pre-filled from your authenticated account."
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
                  label="College / University"
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
                label="Branch of Study"
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

        {/* STEP 2: PROJECT INFORMATION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-[#F7F7F4] pb-3">
              <h3 className="text-base font-bold text-[#17243A]">
                Section 2: Project Submission Information
              </h3>
              <p className="text-xs text-[#6B7280]">
                Choose your track and supply verified links to your design deck and repository prototype.
              </p>
            </div>

            <div className="space-y-4">
              <Select
                label="Competition Domain / Track"
                required
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                options={DOMAINS.map((d) => d.id)}
                error={errors.domain}
              />

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

              <Input
                label="Presentation Deck (PPT / Slides Link)"
                required
                type="url"
                placeholder="https://drive.google.com/file/... or OneDrive link"
                value={formData.pptLink}
                onChange={(e) => setFormData({ ...formData, pptLink: e.target.value })}
                error={errors.pptLink}
                helperText="Ensure link permissions are set to viewable by anyone with the link."
              />

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
                helperText="GitHub, GitLab, Figma, or deployed demo link."
              />

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
            </div>
          </div>
        )}

        {/* STEP 3: DYNAMIC TEAM INFORMATION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-[#F7F7F4] pb-3">
              <h3 className="text-base font-bold text-[#17243A]">
                Section 3: Team Configuration & Members
              </h3>
              <p className="text-xs text-[#6B7280]">
                Specify your total team size (1 to 5, including leader). Additional member fields are generated dynamically.
              </p>
            </div>

            {/* Team Size Selector */}
            <div className="bg-[#F7F7F4] border border-[#E5E7EB] rounded-[6px] p-4 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17243A]">
                Total Team Size (Including Leader)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleTeamSizeChange(size)}
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-[5px] border transition-all ${
                      formData.teamSize === size
                        ? 'bg-[#17243A] text-white border-[#17243A]'
                        : 'bg-white text-[#20242B] border-[#E5E7EB] hover:border-[#D1D5DB]'
                    }`}
                  >
                    {size} {size === 1 ? 'Solo' : 'Members'}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Leader Banner */}
            <div className="p-3 bg-white border border-[#E5E7EB] rounded-[5px] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#17243A] flex items-center gap-2">
                  <span>1. {formData.participantName}</span>
                  <span className="text-[10px] bg-[#17243A] text-white px-1.5 py-0.5 rounded-[3px] font-bold uppercase">
                    Team Leader
                  </span>
                </div>
                <div className="text-[11px] text-[#6B7280]">{formData.email}</div>
              </div>
              <span className="text-xs text-[#21845B] font-semibold">Self</span>
            </div>

            {/* Dynamic Additional Member Fields */}
            {formData.teamSize > 1 ? (
              <div className="space-y-4 pt-2">
                <div className="text-xs font-semibold text-[#17243A]">
                  Additional Team Members ({formData.teamSize - 1} required):
                </div>

                {formData.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border border-[#E5E7EB] rounded-[6px] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#17243A] uppercase tracking-wider font-mono">
                        Team Member #{index + 2}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Member Full Name"
                        required
                        placeholder="e.g. Rhea Patel"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, 'name', e.target.value)
                        }
                        error={errors[`member_${index}_name`]}
                      />
                      <Input
                        label="Member Email Address"
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
              <div className="p-4 bg-[#FAFAFA] border border-[#E5E7EB] rounded-[5px] text-xs text-[#6B7280] text-center">
                Solo registration selected. No additional team members required.
              </div>
            )}
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRMATION */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-[#F7F7F4] pb-3">
              <h3 className="text-base font-bold text-[#17243A]">
                Section 4: Review Summary Before Submission
              </h3>
              <p className="text-xs text-[#6B7280]">
                Carefully review all submitted information. Once submitted, your registration reference will be generated and confirmation dispatched.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Leader & Academic */}
              <div className="bg-[#F7F7F4] p-4 rounded-[6px] border border-[#E5E7EB] space-y-2">
                <div className="font-bold text-[#17243A] text-sm mb-1 uppercase tracking-wider">
                  Leader & Academic Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#6B7280]">Leader Name:</span>{' '}
                    <span className="font-semibold text-[#17243A]">
                      {formData.participantName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Email:</span>{' '}
                    <span className="font-semibold text-[#17243A]">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Mobile:</span>{' '}
                    <span className="font-semibold text-[#17243A]">
                      {formData.mobileNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Institution:</span>{' '}
                    <span className="font-semibold text-[#17243A]">
                      {formData.collegeName === 'Other / Custom College'
                        ? formData.customCollege
                        : formData.collegeName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Academic Course:</span>{' '}
                    <span className="font-semibold text-[#17243A]">
                      {formData.course} ({formData.branch}) &bull; {formData.yearOfStudy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project & Track */}
              <div className="bg-[#F7F7F4] p-4 rounded-[6px] border border-[#E5E7EB] space-y-2">
                <div className="font-bold text-[#17243A] text-sm mb-1 uppercase tracking-wider">
                  Project Submission Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#6B7280]">Domain / Track:</span>{' '}
                    <span className="font-semibold text-[#17243A]">{formData.domain}</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Project Name:</span>{' '}
                    <span className="font-semibold text-[#17243A]">
                      {formData.projectName}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#6B7280]">Presentation Link:</span>{' '}
                    <a
                      href={formData.pptLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#17243A] font-semibold underline truncate inline-block max-w-md"
                    >
                      {formData.pptLink}
                    </a>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#6B7280]">Prototype Link:</span>{' '}
                    <a
                      href={formData.prototypeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#17243A] font-semibold underline truncate inline-block max-w-md"
                    >
                      {formData.prototypeLink}
                    </a>
                  </div>
                </div>
              </div>

              {/* Team Roster */}
              <div className="bg-[#F7F7F4] p-4 rounded-[6px] border border-[#E5E7EB] space-y-2">
                <div className="font-bold text-[#17243A] text-sm mb-1 uppercase tracking-wider">
                  Team Members ({formData.teamSize})
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-[#17243A]">
                    1. {formData.participantName} ({formData.email}) - Team Leader
                  </div>
                  {formData.teamMembers.map((m, i) => (
                    <div key={i} className="text-[#4B5563]">
                      {i + 2}. {m.name} ({m.email})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 border-t border-[#E5E7EB] pt-4 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button variant="secondary" onClick={prevStep} size="sm" className="gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Section
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button variant="primary" onClick={nextStep} size="sm" className="gap-1.5">
              Next Section
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleFinalSubmit}
              isLoading={isSubmitting}
              size="md"
              className="gap-2 bg-[#21845B] hover:bg-[#1b6b49]"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm & Submit Registration
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Registration;
