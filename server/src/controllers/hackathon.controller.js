const registrationService = require('../services/registration.service');
const EventConfig = require('../models/EventConfig');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const registration = await registrationService.createRegistration(req.user, req.body);
    return successResponse(
      res,
      201,
      'Hackathon registration submitted successfully! A confirmation email has been sent.',
      { registration }
    );
  } catch (error) {
    next(error);
  }
};

const getMyEntry = async (req, res, next) => {
  try {
    const registration = await registrationService.getUserRegistration(req.user._id);
    if (!registration) {
      return successResponse(res, 200, 'No active registration found for this user', {
        registered: false,
        registration: null,
      });
    }
    return successResponse(res, 200, 'Registration retrieved successfully', {
      registered: true,
      registration,
    });
  } catch (error) {
    next(error);
  }
};

const updateMyEntry = async (req, res, next) => {
  try {
    const updated = await registrationService.updateRegistrationLinks(req.user._id, req.body);
    return successResponse(res, 200, 'Registration details updated successfully', {
      registration: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await registrationService.deleteRegistration(id, req.user);
    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const getEventConfig = async (req, res, next) => {
  try {
    let config = await EventConfig.findOne();
    if (!config) {
      config = await EventConfig.create({});
    }
    return successResponse(res, 200, 'Event configuration retrieved', { config });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getMyEntry,
  updateMyEntry,
  deleteEntry,
  getEventConfig,
};
