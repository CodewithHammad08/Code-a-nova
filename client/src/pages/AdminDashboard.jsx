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
    <div className="space-y-8 py-4">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#17243A] text-white text-[10px] font-bold uppercase tracking-wider rounded-[3px] font-mono mb-2">
            <ShieldAlert className="w-3 h-3 text-[#D6A64F]" />
            Administrative Command
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] tracking-tight font-display">
            Registrations &amp; Participant Console
          </h1>
          <p className="text-xs text-[#6B7280]">
            Global participant records &bull; Real-time domain breakdown &bull; One-click CSV export
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleExportCsv}
            className="gap-2 bg-[#21845B] hover:bg-[#1b6b49] font-bold shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export All Entries (CSV)
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 space-y-1 bg-white border-[#E5E7EB] shadow-sm">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280] font-mono">
            Total Team Projects
          </div>
          <div className="text-3xl font-extrabold text-[#17243A] font-display">
            {stats ? stats.totalRegistrations : '--'}
          </div>
          <div className="text-xs text-[#6B7280]">Verified MongoDB entries</div>
        </Card>

        <Card className="p-5 space-y-1 bg-white border-[#E5E7EB] shadow-sm">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280] font-mono">
            Total Enrolled Innovators
          </div>
          <div className="text-3xl font-extrabold text-[#17243A] font-display">
            {stats ? stats.totalParticipants : '--'}
          </div>
          <div className="text-xs text-[#6B7280]">Leaders + team members count</div>
        </Card>

        <Card className="p-5 space-y-1 bg-white border-[#E5E7EB] shadow-sm">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280] font-mono">
            Active Domains
          </div>
          <div className="text-3xl font-extrabold text-[#D6A64F] font-display">
            {stats?.domainBreakdown?.length || 5} / 5
          </div>
          <div className="text-xs text-[#6B7280]">All competition tracks active</div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 shadow-sm border-[#E5E7EB]">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search candidate name, project title, email, ref ID, or college..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-[5px] border border-[#E5E7EB] pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#20242B] focus:outline-none focus:ring-1 focus:ring-[#17243A]"
              />
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-2.5" />
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
              className="w-full rounded-[5px] border border-[#E5E7EB] px-3 py-2 text-xs sm:text-sm text-[#20242B] bg-white focus:outline-none focus:ring-1 focus:ring-[#17243A]"
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
      <div className="bg-white border border-[#E5E7EB] rounded-[7px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#17243A] text-white uppercase font-mono text-[11px]">
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
            <tbody className="divide-y divide-[#E5E7EB] text-[#4B5563]">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="py-10 text-center">
                    <Skeleton className="h-6 w-48 mx-auto" />
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-10 text-center text-[#6B7280]">
                    No registrations found matching the specified search parameters.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-[#F7F7F4] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#17243A]">
                      {reg.registrationId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#17243A]">
                        {reg.participantName}
                      </div>
                      <div className="text-[11px] text-[#6B7280] font-mono">{reg.email}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#17243A] max-w-xs truncate">
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
                    <td className="py-3 px-4 text-[#6B7280] max-w-xs truncate">
                      {reg.collegeName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {reg.pptLink && (
                          <a
                            href={reg.pptLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#17243A] hover:underline font-mono text-[11px]"
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
                            className="text-[#17243A] hover:underline font-mono text-[11px]"
                            title="Code Link"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-[#6B7280] font-mono whitespace-nowrap">
                      {new Date(reg.submittedAt || reg.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedReg(reg)}
                          className="p-1.5 text-[#6B7280] hover:text-[#17243A] hover:bg-[#E5E7EB]/50 rounded-[4px] transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(reg.registrationId)}
                          className="p-1.5 text-[#C44545] hover:bg-[#C44545]/10 rounded-[4px] transition-colors"
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
        <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280] bg-[#FAFAFA]">
          <div>
            Displaying{' '}
            <strong className="text-[#17243A] font-semibold">
              {registrations.length}
            </strong>{' '}
            of <strong className="text-[#17243A]">{pagination.total}</strong> total entries
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
            <span className="font-mono">
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
          <div className="space-y-5 text-xs text-[#4B5563]">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E5E7EB]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9CA3AF]">Project Title</span>
                <p className="text-sm font-bold text-[#17243A]">{selectedReg.projectName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9CA3AF]">Domain / Track</span>
                <p className="font-semibold text-[#17243A]">{selectedReg.domain}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-4 border-b border-[#E5E7EB]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9CA3AF]">Team Leader</span>
                <p className="font-semibold text-[#17243A]">{selectedReg.participantName}</p>
                <p className="font-mono text-[11px] text-[#6B7280]">{selectedReg.email}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9CA3AF]">Contact Number</span>
                <p className="font-mono text-[#17243A]">{selectedReg.mobileNumber}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9CA3AF]">Institution</span>
                <p className="font-medium text-[#17243A]">{selectedReg.collegeName}</p>
                <p className="text-[11px] text-[#6B7280]">{selectedReg.course} &bull; {selectedReg.branch} ({selectedReg.yearOfStudy})</p>
              </div>
            </div>

            {/* Team Roster */}
            <div>
              <span className="text-[10px] uppercase font-bold text-[#9CA3AF] block mb-2">
                Team Roster ({selectedReg.teamSize} Member{selectedReg.teamSize > 1 ? 's' : ''})
              </span>
              <div className="bg-[#F7F7F4] rounded-[5px] p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#17243A]">{selectedReg.participantName} (Leader)</span>
                  <span className="font-mono text-[#6B7280]">{selectedReg.email}</span>
                </div>
                {selectedReg.teamMembers && selectedReg.teamMembers.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs border-t border-[#E5E7EB] pt-1.5">
                    <span className="text-[#17243A]">Member {idx + 2}: {m.name}</span>
                    <span className="font-mono text-[#6B7280]">{m.email}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
              <span className="text-[10px] uppercase font-bold text-[#9CA3AF] block">Submission Links</span>
              <div className="flex flex-wrap gap-3">
                {selectedReg.pptLink && (
                  <a
                    href={selectedReg.pptLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[4px] font-mono text-xs text-[#17243A] hover:bg-[#E5E7EB] transition-colors"
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[4px] font-mono text-xs text-[#17243A] hover:bg-[#E5E7EB] transition-colors"
                  >
                    <span>Code Repository / Prototype</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedReg.demoVideoLink && (
                  <a
                    href={selectedReg.demoVideoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[4px] font-mono text-xs text-[#17243A] hover:bg-[#E5E7EB] transition-colors"
                  >
                    <span>Demo Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <Modal
          isOpen={!!deletingId}
          onClose={() => setDeletingId(null)}
          title="Confirm Registration Deletion"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs text-[#4B5563]">
            <div className="flex items-start gap-3 p-3 bg-[#C44545]/10 border border-[#C44545]/20 rounded-[5px]">
              <AlertTriangle className="w-5 h-5 text-[#C44545] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#C44545]">Irreversible Administrative Action</p>
                <p className="text-[#C44545]/90 mt-0.5">
                  Are you sure you want to permanently delete registration <strong>{deletingId}</strong>? This cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
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
                isLoading={isDeleting}
                onClick={() => handleDelete(deletingId)}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
