import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  FileSpreadsheet,
  Search,
  Filter,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers,
  Database,
  BarChart3,
  Award,
  Eye,
  Trash2,
  AlertTriangle,
  FileText,
  Mail,
  GraduationCap,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import Skeleton from '../components/common/Skeleton';
import { registrationService } from '../services/registration.service';
import { DOMAINS } from '../utils/constants';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Detail & Delete modals
  const [selectedReg, setSelectedReg] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [page, setPage] = useState(1);

  // Enforce administrative access control
  useEffect(() => {
    if (user && user.role !== 'admin') {
      toast.error('Access restricted to administrators only.');
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleDelete = async (regId) => {
    setIsDeleting(true);
    try {
      await registrationService.deleteEntry(regId);
      toast.success('Registration removed successfully.');
      setDeletingId(null);
      fetchRegistrations();
      fetchStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete registration.');
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await registrationService.getAdminStats();
      if (res?.data) setStats(res.data);
    } catch (err) {
      console.warn('Failed to fetch admin stats:', err.message);
    }
  };

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const res = await registrationService.getAdminRegistrations({
        domain: selectedDomain === 'All' ? undefined : selectedDomain,
        search: search.trim() || undefined,
        page,
        limit: 20,
      });
      if (res?.data) {
        setRegistrations(res.data.registrations || []);
        setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      }
    } catch (err) {
      toast.error('Failed to load registrations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [selectedDomain, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRegistrations();
  };

  const handleExportCsv = () => {
    window.open(registrationService.getExportCsvUrl(), '_blank');
  };

  return (
    <div className="space-y-8 py-4 text-slate-100">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider rounded-[6px] font-mono mb-2">
            <img src="/logo.png" alt="Logo" className="w-3.5 h-3.5 rounded-[2px] object-contain" />
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            Administrative Command
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Registrations &amp; Participant Console
          </h1>
          <p className="text-xs text-slate-400">
            Global participant records &bull; Real-time domain breakdown &bull; One-click CSV export
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleExportCsv}
            className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 font-bold shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            <Download className="w-4 h-4" />
            Export All Entries (CSV)
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 space-y-1 bg-[#0F172A]/90 border-white/10 shadow-xl">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-mono">
            Total Team Projects
          </div>
          <div className="text-3xl font-extrabold text-white font-display">
            {stats ? stats.totalRegistrations : '--'}
          </div>
          <div className="text-xs text-slate-400">Verified MongoDB entries</div>
        </Card>

        <Card className="p-5 space-y-1 bg-[#0F172A]/90 border-white/10 shadow-xl">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-mono">
            Total Enrolled Innovators
          </div>
          <div className="text-3xl font-extrabold text-white font-display">
            {stats ? stats.totalParticipants : '--'}
          </div>
          <div className="text-xs text-slate-400">Leaders + team members count</div>
        </Card>

        <Card className="p-5 space-y-1 bg-[#0F172A]/90 border-white/10 shadow-xl">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-mono">
            Active Domains
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 font-display font-mono">
            {stats?.domainBreakdown?.length || 5} / 5
          </div>
          <div className="text-xs text-slate-400">All competition tracks active</div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 shadow-xl border-white/10 bg-[#0F172A]/90">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search candidate name, project title, email, ref ID, or college..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-[6px] border border-white/10 pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white bg-[#0B0F19] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
          </form>

          <div className="w-full sm:w-64">
            <select
              value={selectedDomain}
              onChange={(e) => {
                setSelectedDomain(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-[6px] border border-white/10 px-3 py-2 text-xs sm:text-sm text-white bg-[#0B0F19] focus:outline-none focus:border-cyan-400"
            >
              <option value="All" className="bg-[#0B0F19] text-white">All Competition Tracks</option>
              {DOMAINS.map((d) => (
                <option key={d.id} value={d.id} className="bg-[#0B0F19] text-white">
                  {d.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Registrations Table */}
      <div className="bg-[#0F172A]/90 border border-white/10 rounded-[10px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F19] text-cyan-300 uppercase font-mono text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Team Leader</th>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Links</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-slate-300">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="py-10 text-center">
                    <Skeleton className="h-6 w-48 mx-auto" />
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-10 text-center text-slate-400">
                    No registrations found matching the specified search parameters.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                      {reg.registrationId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">
                        {reg.participantName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{reg.email}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-200 max-w-xs truncate">
                      {reg.projectName}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="primary" size="sm">
                        {reg.domain}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium">
                      {reg.teamSize} {reg.teamSize === 1 ? 'Solo' : 'Mbrs'}
                    </td>
                    <td className="py-3 px-4 text-slate-400 max-w-xs truncate">
                      {reg.collegeName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {reg.pptLink && (
                          <a
                            href={reg.pptLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline"
                            title="PPT Link"
                          >
                            PPT
                          </a>
                        )}
                        {reg.prototypeLink && (
                          <a
                            href={reg.prototypeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline"
                            title="Code Link"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-400 font-mono whitespace-nowrap">
                      {new Date(reg.submittedAt || reg.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedReg(reg)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-[4px] transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(reg.registrationId)}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-[4px] transition-colors cursor-pointer"
                          title="Delete Registration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 bg-[#0B0F19]">
          <div>
            Displaying{' '}
            <strong className="text-white font-semibold">
              {registrations.length}
            </strong>{' '}
            of <strong className="text-white">{pagination.total}</strong> total entries
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-mono text-cyan-300">
              Page {pagination.page} of {pagination.totalPages || 1}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedReg && (
        <Modal
          isOpen={!!selectedReg}
          onClose={() => setSelectedReg(null)}
          title={`Entry Details: ${selectedReg.registrationId}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-xs text-slate-300">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Project Title</span>
                <p className="text-sm font-bold text-white mt-0.5">{selectedReg.projectName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Domain / Track</span>
                <p className="font-semibold text-cyan-300 mt-0.5">{selectedReg.domain}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Team Leader</span>
                <p className="font-semibold text-white mt-0.5">{selectedReg.participantName}</p>
                <p className="font-mono text-[11px] text-cyan-400">{selectedReg.email}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Contact Number</span>
                <p className="font-mono text-slate-200 mt-0.5">{selectedReg.mobileNumber}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Institution</span>
                <p className="font-medium text-white mt-0.5">{selectedReg.collegeName}</p>
                <p className="text-[11px] text-slate-400">{selectedReg.course} &bull; {selectedReg.branch} ({selectedReg.yearOfStudy})</p>
              </div>
            </div>

            {/* Team Roster */}
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono block mb-2">
                Team Roster ({selectedReg.teamSize} Member{selectedReg.teamSize > 1 ? 's' : ''})
              </span>
              <div className="bg-[#0B0F19] rounded-[8px] p-3 space-y-2 border border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{selectedReg.participantName} (Leader)</span>
                  <span className="font-mono text-cyan-300">{selectedReg.email}</span>
                </div>
                {selectedReg.teamMembers && selectedReg.teamMembers.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs border-t border-white/[0.08] pt-1.5">
                    <span className="text-slate-300">Member {idx + 2}: {m.name}</span>
                    <span className="font-mono text-slate-400">{m.email}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Submission Links</span>
              <div className="flex flex-wrap gap-3">
                {selectedReg.pptLink && (
                  <a
                    href={selectedReg.pptLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0F19] border border-white/10 rounded-[6px] font-mono text-xs text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  >
                    <span>Presentation Deck</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedReg.prototypeLink && (
                  <a
                    href={selectedReg.prototypeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0F19] border border-white/10 rounded-[6px] font-mono text-xs text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  >
                    <span>Prototype Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedReg.demoVideoLink && (
                  <a
                    href={selectedReg.demoVideoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0F19] border border-white/10 rounded-[6px] font-mono text-xs text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  >
                    <span>Demo Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedReg(null)}
              >
                Close Details
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <Modal
          isOpen={!!deletingId}
          onClose={() => setDeletingId(null)}
          title="Confirm Registration Removal"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-[8px] flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-300">Permanent Record Deletion</p>
                <p className="text-rose-200/80 mt-0.5">
                  Are you certain you want to remove registration <strong className="font-mono text-white">{deletingId}</strong>? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(deletingId)}
                isLoading={isDeleting}
              >
                Delete Entry
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
