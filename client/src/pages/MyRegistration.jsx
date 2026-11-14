import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  FolderGit2,
  ExternalLink,
  Edit3,
  Printer,
  CheckCircle2,
  AlertCircle,
  FilePlus2,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Skeleton from '../components/common/Skeleton';
import { registrationService } from '../services/registration.service';
import toast from 'react-hot-toast';

const MyRegistration = () => {
  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Edit fields
  const [editForm, setEditForm] = useState({
    projectName: '',
    pptLink: '',
    prototypeLink: '',
    demoVideoLink: '',
  });

  const fetchRegistration = async () => {
    setIsLoading(true);
    try {
      const res = await registrationService.getMyEntry();
      if (res?.data?.registered && res?.data?.registration) {
        setRegistration(res.data.registration);
        setEditForm({
          projectName: res.data.registration.projectName || '',
          pptLink: res.data.registration.pptLink || '',
          prototypeLink: res.data.registration.prototypeLink || '',
          demoVideoLink: res.data.registration.demoVideoLink || '',
        });
      } else {
        setRegistration(null);
      }
    } catch (err) {
      toast.error('Failed to load registration details.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistration();
  }, []);

  const handleCopyId = () => {
    if (registration?.registrationId) {
      navigator.clipboard.writeText(registration.registrationId);
      setCopied(true);
      toast.success('Registration ID copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editForm.projectName.trim() || editForm.projectName.trim().length < 5) {
      toast.error('Project name must be at least 5 characters');
      return;
    }
    if (!/^https?:\/\//i.test(editForm.pptLink.trim())) {
      toast.error('PPT link must be a valid URL');
      return;
    }
    if (!/^https?:\/\//i.test(editForm.prototypeLink.trim())) {
      toast.error('Prototype link must be a valid URL');
      return;
    }

    setIsUpdating(true);
    try {
      const res = await registrationService.updateMyEntry(editForm);
      setRegistration(res.data.registration);
      setIsEditModalOpen(false);
      toast.success('Submission details updated successfully.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update links.';
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatSafeDate = (dateVal) => {
    if (!dateVal) return 'Recently Verified';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return 'Recently Verified';
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-500">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 font-display">No Active Registration Found</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
          You have not submitted a project entry for Code-a-Nova yet. Complete registration to generate your official pass.
        </p>
        <div className="pt-2">
          <Link to="/register">
            <Button variant="primary" size="md" className="gap-2 font-bold shadow-xs">
              <FilePlus2 className="w-4 h-4" />
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 text-slate-900">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Code-a-Nova Logo"
            className="w-10 h-10 rounded-xl object-contain border border-slate-200 shadow-xs shrink-0"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Official Participant Pass
            </h1>
            <p className="text-xs text-slate-500">
              Validated registration credentials &bull; Code-a-Nova National Hackathon 2026-27
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            className="gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            Print Pass
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="gap-1.5 border-slate-200 text-slate-800 hover:bg-slate-100"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Update Links
          </Button>
        </div>
      </div>

      {/* Printable Event Pass Card */}
      <div id="printable-pass">
        <Card className="border border-slate-200 shadow-sm p-0 overflow-hidden bg-white">
          {/* Header Banner */}
          <div className="bg-slate-50 text-slate-900 p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Code-a-Nova"
                className="w-12 h-12 rounded-xl object-contain border border-slate-200 shadow-xs shrink-0"
              />
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold">
                  OFFICIAL PARTICIPANT PASS &bull; CODE-A-NOVA 2026-27
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 mt-1">
                  {registration.projectName}
                </h2>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                  <span>Domain Track:</span>
                  <span className="font-bold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-mono">
                    {registration.domain}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-3.5 rounded-xl text-right font-mono shadow-xs">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                Registration Reference
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-wider flex items-center gap-2 justify-end">
                <span>{registration.registrationId}</span>
                <button
                  onClick={handleCopyId}
                  className="p-1 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Copy ID"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Pass Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Status & Date */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  Verification Status:
                </span>
                <Badge variant="success" size="md">
                  VERIFIED &bull; {registration.status.toUpperCase()}
                </Badge>
              </div>

              <div className="text-xs text-slate-500">
                Submitted:{' '}
                <strong className="text-slate-900 font-mono">
                  {formatSafeDate(registration.submittedAt || registration.createdAt)}
                </strong>
              </div>
            </div>

            {/* Leader & Academic Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <div className="text-slate-500 font-medium font-mono text-[10px] uppercase">
                  Team Leader
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {registration.participantName}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 font-medium font-mono text-[10px] uppercase">
                  Contact Email
                </div>
                <div className="text-sm font-semibold text-slate-900 font-mono">
                  {registration.email}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 font-medium font-mono text-[10px] uppercase">
                  Mobile Number
                </div>
                <div className="text-sm font-mono font-semibold text-slate-900">
                  +91 {registration.mobileNumber}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 font-medium font-mono text-[10px] uppercase">
                  Institution / College
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {registration.collegeName}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 font-medium font-mono text-[10px] uppercase">
                  Academic Program
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {registration.course} ({registration.branch})
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 font-medium font-mono text-[10px] uppercase">
                  Current Year
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {registration.yearOfStudy}
                </div>
              </div>
            </div>

            {/* Team Roster */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Team Roster ({registration.teamSize} Member{registration.teamSize > 1 ? 's' : ''})
              </h4>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold font-mono text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">ROLE</th>
                      <th className="py-2.5 px-4">PARTICIPANT NAME</th>
                      <th className="py-2.5 px-4">EMAIL ADDRESS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                    <tr>
                      <td className="py-2.5 px-4">
                        <span className="font-bold text-slate-900 font-mono">LEAD</span>
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">
                        {registration.participantName}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-700">{registration.email}</td>
                    </tr>
                    {registration.teamMembers &&
                      registration.teamMembers.map((m, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-4 text-slate-500 font-mono">
                            MBR #{idx + 2}
                          </td>
                          <td className="py-2.5 px-4 font-semibold text-slate-800">
                            {m.name}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-slate-600">{m.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Project Deliverables Links */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Submitted Project Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="text-[10px] text-slate-500 font-mono uppercase font-semibold flex items-center justify-between">
                    <span>Presentation Deck (PPT)</span>
                    <FileText className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <a
                    href={registration.pptLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-slate-900 hover:underline truncate block"
                  >
                    Open Slides Link &rarr;
                  </a>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="text-[10px] text-slate-500 font-mono uppercase font-semibold flex items-center justify-between">
                    <span>Prototype Repository</span>
                    <FolderGit2 className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <a
                    href={registration.prototypeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-slate-900 hover:underline truncate block"
                  >
                    Open Repository &rarr;
                  </a>
                </div>

                {registration.demoVideoLink ? (
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="text-[10px] text-slate-500 font-mono uppercase font-semibold flex items-center justify-between">
                      <span>Video Walkthrough</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <a
                      href={registration.demoVideoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-slate-900 hover:underline truncate block"
                    >
                      Watch Video &rarr;
                    </a>
                  </div>
                ) : (
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 flex items-center font-mono">
                    No demo video submitted
                  </div>
                )}
              </div>
            </div>

            {/* Verification Footer Note */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Cryptographically authenticated through Code-a-Nova automated OTP system
              </span>
              <span className="font-mono text-slate-900 font-bold">PASS REF: {registration.registrationId}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Submission Links Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Submission Deliverables"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            label="Project Title"
            required
            value={editForm.projectName}
            onChange={(e) => setEditForm({ ...editForm, projectName: e.target.value })}
            helperText="Minimum 5 characters."
          />

          <Input
            label="PPT / Presentation Link"
            required
            type="url"
            value={editForm.pptLink}
            onChange={(e) => setEditForm({ ...editForm, pptLink: e.target.value })}
            helperText="Google Drive, OneDrive, or slides link."
          />

          <Input
            label="Prototype / Code Repository Link"
            required
            type="url"
            value={editForm.prototypeLink}
            onChange={(e) =>
              setEditForm({ ...editForm, prototypeLink: e.target.value })
            }
            helperText="GitHub, GitLab, Figma, or live URL."
          />

          <Input
            label="Demo Video Link (Optional)"
            type="url"
            value={editForm.demoVideoLink}
            onChange={(e) =>
              setEditForm({ ...editForm, demoVideoLink: e.target.value })
            }
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isUpdating}
            >
              Save Link Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyRegistration;
