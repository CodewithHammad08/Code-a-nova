const HackathonRegistration = require('../models/HackathonRegistration');
const registrationService = require('../services/registration.service');
const { successResponse } = require('../utils/apiResponse');

const getStats = async (req, res, next) => {
  try {
    const [totalRegistrations, domainStats, teamSizeStats] = await Promise.all([
      HackathonRegistration.countDocuments(),
      HackathonRegistration.aggregate([
        { $group: { _id: '$domain', count: { $sum: 1 } } },
      ]),
      HackathonRegistration.aggregate([
        { $group: { _id: '$teamSize', count: { $sum: 1 } } },
      ]),
    ]);

    const totalParticipants = await HackathonRegistration.aggregate([
      { $group: { _id: null, total: { $sum: '$teamSize' } } },
    ]);

    return successResponse(res, 200, 'Admin statistics retrieved', {
      totalRegistrations,
      totalParticipants: totalParticipants[0]?.total || 0,
      domainBreakdown: domainStats,
      teamSizeBreakdown: teamSizeStats,
    });
  } catch (error) {
    next(error);
  }
};

const listRegistrations = async (req, res, next) => {
  try {
    const { domain, search, page, limit } = req.query;
    const result = await registrationService.getAllRegistrations({
      domain,
      search,
      page,
      limit,
    });
    return successResponse(res, 200, 'Registrations retrieved', result);
  } catch (error) {
    next(error);
  }
};

const exportCsv = async (req, res, next) => {
  try {
    const registrations = await HackathonRegistration.find().sort({ createdAt: -1 });

    const headers = [
      'Registration ID',
      'Leader Name',
      'Leader Email',
      'Mobile Number',
      'College Name',
      'Course',
      'Branch',
      'Year',
      'Domain',
      'Project Name',
      'Team Size',
      'Team Members',
      'PPT Link',
      'Prototype Link',
      'Status',
      'Submitted At',
    ];

    const rows = registrations.map((r) => {
      const membersStr = (r.teamMembers || [])
        .map((m) => `${m.name} (${m.email})`)
        .join('; ');

      return [
        `"${r.registrationId}"`,
        `"${r.participantName.replace(/"/g, '""')}"`,
        `"${r.email}"`,
        `"${r.mobileNumber}"`,
        `"${(r.collegeName || '').replace(/"/g, '""')}"`,
        `"${r.course}"`,
        `"${r.branch}"`,
        `"${r.yearOfStudy}"`,
        `"${r.domain}"`,
        `"${(r.projectName || '').replace(/"/g, '""')}"`,
        r.teamSize,
        `"${membersStr.replace(/"/g, '""')}"`,
        `"${r.pptLink}"`,
        `"${r.prototypeLink}"`,
        `"${r.status}"`,
        `"${r.submittedAt ? r.submittedAt.toISOString() : ''}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="code-a-nova-registrations-${Date.now()}.csv"`
    );
    return res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  listRegistrations,
  exportCsv,
};
