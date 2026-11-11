const ContactMessage = require('../models/ContactMessage');
const EventConfig = require('../models/EventConfig');
const { successResponse } = require('../utils/apiResponse');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const savedMessage = await ContactMessage.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      ipAddress,
    });

    return successResponse(
      res,
      201,
      'Your inquiry has been received. The Code-a-Nova team will respond promptly.',
      { id: savedMessage._id }
    );
  } catch (error) {
    next(error);
  }
};

const getContactInfo = async (req, res, next) => {
  try {
    const config = await EventConfig.findOne();
    const contactEmail = config?.contactEmail || 'contact@codeanova.org';
    return successResponse(res, 200, 'Contact info retrieved', {
      contactEmail,
      socialLinks: config?.socialLinks || {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContactInfo,
};

