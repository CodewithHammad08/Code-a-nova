import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import { registrationService } from '../services/registration.service';
import { DOMAINS } from '../utils/constants';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [page, setPage] = useState(1);

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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#17243A] text-white text-[10px] font-bold uppercase tracking-wider rounded-[3px] mb-2">
            <ShieldAlert className="w-3 h-3 text-[#D6A64F]" />
            Administrative Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] tracking-tight">
            Participant & Registration Management
          </h1>
          <p className="text-xs text-[#6B7280]">
            Review all submitted hackathon registrations, filter tracks, and export CSV reports.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleExportCsv}
            className="gap-2 bg-[#21845B] hover:bg-[#1b6b49]"
          >
            <Download className="w-4 h-4" />
            Export Registrations (CSV)
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280]">
            Total Team Entries
          </div>
          <div className="text-3xl font-extrabold text-[#17243A] font-display">
            {stats ? stats.totalRegistrations : '--'}
          </div>
          <div className="text-xs text-[#6B7280]">Distinct project submissions</div>
        </Card>

        <Card className="p-5 space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280]">
            Total Participants
          </div>
          <div className="text-3xl font-extrabold text-[#17243A] font-display">
            {stats ? stats.totalParticipants : '--'}
          </div>
          <div className="text-xs text-[#6B7280]">Enrolled leaders + team members</div>
        </Card>

        <Card className="p-5 space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280]">
            Tracks Represented
          </div>
          <div className="text-3xl font-extrabold text-[#17243A] font-display">
            {stats?.domainBreakdown?.length || 5} / 5
          </div>
          <div className="text-xs text-[#6B7280]">Across all engineering categories</div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by candidate name, project, email, ID, or college..."
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

          {/* Domain Dropdown */}
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
            <thead className="bg-[#FAFAFA] border-b border-[#E5E7EB] text-[#17243A] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Team Leader</th>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Links</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#4B5563]">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center">
                    <Skeleton className="h-6 w-48 mx-auto" />
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-[#6B7280]">
                    No registrations found matching the specified query.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-[#F7F7F4]/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#17243A]">
                      {reg.registrationId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#17243A]">
                        {reg.participantName}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">{reg.email}</div>
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
                            className="text-[#17243A] hover:underline"
                            title="PPT"
                          >
                            PPT
                          </a>
                        )}
                        {reg.prototypeLink && (
                          <a
                            href={reg.prototypeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#17243A] hover:underline"
                            title="Code"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-[#6B7280] whitespace-nowrap">
                      {new Date(reg.submittedAt).toLocaleDateString()}
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
            Showing{' '}
            <strong className="text-[#17243A] font-semibold">
              {registrations.length}
            </strong>{' '}
            of <strong className="text-[#17243A]">{pagination.total}</strong> entries
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
            <span>
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
    </div>
  );
};

export default AdminDashboard;
