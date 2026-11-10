const HackathonRegistration = require('../models/HackathonRegistration');
const User = require('../models/User');
const generateRegistrationId = require('../utils/generateRegistrationId');
const { sendConfirmationEmail } = require('./email.service');

/**
 * Creates a new hackathon registration for the authenticated user
 */
const createRegistration = async (user, data) => {
  // Prevent duplicate registration for the same user
  const existing = await HackathonRegistration.findOne({ userId: user._id });
  if (existing) {
    const error = new Error('You have already submitted a hackathon registration.');
    error.statusCode = 409;
    error.existingRegistrationId = existing.registrationId;
    throw error;
  }

  // Generate unique registration ID
  let registrationId = generateRegistrationId();
  let collisionCheck = await HackathonRegistration.findOne({ registrationId });
  while (collisionCheck) {
    registrationId = generateRegistrationId();
    collisionCheck = await HackathonRegistration.findOne({ registrationId });
  }

  const teamSize = parseInt(data.teamSize, 10);
  const teamMembers = teamSize > 1 ? (data.teamMembers || []) : [];

  const registration = new HackathonRegistration({
    registrationId,
    userId: user._id,
    participantName: data.participantName || user.fullName,
    email: user.email,
    mobileNumber: data.mobileNumber,
    collegeName: data.collegeName,
    course: data.course,
    branch: data.branch,
    yearOfStudy: data.yearOfStudy,
    domain: data.domain,
    projectName: data.projectName,
    pptLink: data.pptLink,
    prototypeLink: data.prototypeLink,
    demoVideoLink: data.demoVideoLink || '',
    teamSize,
    teamMembers,
    status: 'submitted',
    emailStatus: 'pending',
  });

  await registration.save();

  // Sync profile data to User model for convenience
  await User.findByIdAndUpdate(user._id, {
    college: data.collegeName,
    course: data.course,
    branch: data.branch,
    year: data.yearOfStudy,
    mobileNumber: data.mobileNumber,
  }).catch((err) => console.warn('Non-critical profile sync error:', err.message));

  // Trigger confirmation email asynchronously (does NOT rollback on failure)
  sendConfirmationEmail(registration).catch((err) =>
    console.error('[Registration Service] Async email dispatch error:', err.message)
  );

  return registration;
};

/**
 * Retrieves the registration entry for a specific user
 */
const getUserRegistration = async (userId) => {
  return HackathonRegistration.findOne({ userId });
};

/**
 * Updates submission links for an existing registration
 */
const updateRegistrationLinks = async (userId, updateData) => {
  const registration = await HackathonRegistration.findOne({ userId });
  if (!registration) {
    const error = new Error('Registration not found.');
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = ['projectName', 'pptLink', 'prototypeLink', 'demoVideoLink'];
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      registration[field] = updateData[field];
    }
  });

  await registration.save();
  return registration;
};

/**
 * Deletes a registration (admin or owner with validation)
 */
const deleteRegistration = async (registrationId, user) => {
  const query = { registrationId };
  // If not admin, verify ownership
  if (user.role !== 'admin') {
    query.userId = user._id;
  }

  const registration = await HackathonRegistration.findOne(query);
  if (!registration) {
    const error = new Error('Registration not found or unauthorized to delete.');
    error.statusCode = 404;
    throw error;
  }

  await HackathonRegistration.deleteOne({ _id: registration._id });
  return { message: 'Registration deleted successfully.' };
};

/**
 * Retrieves all registrations with filtering and pagination (for Admin)
 */
const getAllRegistrations = async ({ domain, search, page = 1, limit = 50 }) => {
  const query = {};

  if (domain && domain !== 'All') {
    query.domain = domain;
  }

  if (search) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [
      { projectName: searchRegex },
      { participantName: searchRegex },
      { email: searchRegex },
      { registrationId: searchRegex },
      { collegeName: searchRegex },
    ];
  }

  const skip = (page - 1) * limit;

  const [registrations, total] = await Promise.all([
    HackathonRegistration.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10)),
    HackathonRegistration.countDocuments(query),
  ]);

  return {
    registrations,
    pagination: {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  createRegistration,
  getUserRegistration,
  updateRegistrationLinks,
  deleteRegistration,
  getAllRegistrations,
};
