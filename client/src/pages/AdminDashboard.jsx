import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Trash2,
  AlertTriangle,
  ExternalLink,
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

  const [isPurging, setIsPurging] = useState(false);

  const handleClearClutter = async () => {
    if (!window.confirm('Are you sure you want to purge all test registrations, contact inquiries, and non-admin test users from the database? This cannot be undone.')) {
      return;
    }
    setIsPurging(true);
    try {
      const res = await registrationService.clearDatabaseClutter();
      toast.success(res?.message || 'Database clutter successfully cleared!');
      fetchStats();
      fetchRegistrations();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to clear database clutter.');
    } finally {
      setIsPurging(false);
    }
  };

  const handleExportCsv = () => {
    window.open(registrationService.getExportCsvUrl(), '_blank');
  };

  return (
    <div className="space-y-8 py-4 text-slate-900">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-md font-mono mb-2">
            <img src="/logo.png" alt="Logo" className="w-3.5 h-3.5 rounded-sm object-contain" />
            <ShieldAlert className="w-3.5 h-3.5 text-slate-700" />
            Administrative Command
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Registrations &amp; Participant Console
          </h1>
          <p className="text-xs text-slate-500">
            Global participant records &bull; Real-time domain breakdown &bull; One-click CSV export
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearClutter}
            disabled={isPurging}
            className="gap-2 text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300 font-semibold shadow-xs"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            {isPurging ? 'Purging Clutter...' : 'Purge Test Clutter'}
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={handleExportCsv}
            className="gap-2 font-bold shadow-xs"
          >
            <Download className="w-4 h-4" />
            Export All Entries (CSV)
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 space-y-1 bg-white border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 font-mono">
            Total Team Projects
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {stats ? stats.totalRegistrations : '--'}
          </div>
          <div className="text-xs text-slate-500">Verified MongoDB entries</div>
        </Card>

        <Card className="p-5 space-y-1 bg-white border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 font-mono">
            Total Enrolled Innovators
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {stats ? stats.totalParticipants : '--'}
          </div>
          <div className="text-xs text-slate-500">Leaders + team members count</div>
        </Card>

        <Card className="p-5 space-y-1 bg-white border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 font-mono">
            Active Domains
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display font-mono">
            {stats?.domainBreakdown?.length || 5} / 5
          </div>
          <div className="text-xs text-slate-500">All competition tracks active</div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 shadow-xs border-slate-200 bg-white">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search candidate name, project title, email, ref ID, or college..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10"
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
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-slate-800"
            >
              <option value="All">All Competition Tracks</option>
              {DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Registrations Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-mono text-[11px] border-b border-slate-200">
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
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="py-10 text-center">
                    <Skeleton className="h-6 w-48 mx-auto" />
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-10 text-center text-slate-500">
                    No registrations found matching the specified search parameters.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {reg.registrationId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">
                        {reg.participantName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">{reg.email}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 max-w-xs truncate">
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
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                      {reg.collegeName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {reg.pptLink && (
                          <a
                            href={reg.pptLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-900 hover:underline font-mono text-[11px]"
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
                            className="text-slate-900 hover:underline font-mono text-[11px]"
                            title="Code Link"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-500 font-mono whitespace-nowrap">
                      {new Date(reg.submittedAt || reg.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedReg(reg)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(reg.registrationId)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <div>
            Displaying{' '}
            <strong className="text-slate-900 font-semibold">
              {registrations.length}
            </strong>{' '}
            of <strong className="text-slate-900">{pagination.total}</strong> total entries
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
            <span className="font-mono text-slate-700">
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
          <div className="space-y-5 text-xs text-slate-700">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Project Title</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedReg.projectName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Domain / Track</span>
                <p className="font-semibold text-slate-900 mt-0.5">{selectedReg.domain}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Team Leader</span>
                <p className="font-semibold text-slate-900 mt-0.5">{selectedReg.participantName}</p>
                <p className="font-mono text-[11px] text-slate-600">{selectedReg.email}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Contact Number</span>
                <p className="font-mono text-slate-800 mt-0.5">{selectedReg.mobileNumber}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Institution</span>
                <p className="font-medium text-slate-900 mt-0.5">{selectedReg.collegeName}</p>
                <p className="text-[11px] text-slate-500">{selectedReg.course} &bull; {selectedReg.branch} ({selectedReg.yearOfStudy})</p>
              </div>
            </div>

            {/* Team Roster */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-900 font-mono block mb-2">
                Team Roster ({selectedReg.teamSize} Member{selectedReg.teamSize > 1 ? 's' : ''})
              </span>
              <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{selectedReg.participantName} (Leader)</span>
                  <span className="font-mono text-slate-700">{selectedReg.email}</span>
                </div>
                {selectedReg.teamMembers && selectedReg.teamMembers.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs border-t border-slate-200 pt-1.5">
                    <span className="text-slate-700">Member {idx + 2}: {m.name}</span>
                    <span className="font-mono text-slate-600">{m.email}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-500 font-mono block">Submission Links</span>
              <div className="flex flex-wrap gap-3">
                {selectedReg.pptLink && (
                  <a
                    href={selectedReg.pptLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-900 hover:bg-slate-100 transition-colors"
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-900 hover:bg-slate-100 transition-colors"
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-900 hover:bg-slate-100 transition-colors"
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
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-800">Permanent Record Deletion</p>
                <p className="text-rose-700 mt-0.5">
                  Are you certain you want to remove registration <strong className="font-mono text-slate-900">{deletingId}</strong>? This action cannot be undone.
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
