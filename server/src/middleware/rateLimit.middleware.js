const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/apiResponse');

const createLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      return errorResponse(res, 429, message);
    },
  });
};

// Rate limiter for login / signup attempts: 20 per 15 mins
const authLimiter = createLimiter(
  15 * 60 * 1000,
  25,
  'Too many authentication requests from this IP. Please try again after 15 minutes.'
);

// Rate limiter for OTP requests: 6 per 10 mins
const otpLimiter = createLimiter(
  10 * 60 * 1000,
  10,
  'Too many OTP verification requests. Please wait a few moments before trying again.'
);

// Rate limiter for contact submissions: 5 per hour
const contactLimiter = createLimiter(
  60 * 60 * 1000,
  10,
  'Too many inquiries submitted from this connection. Please try again later.'
);

module.exports = {
  authLimiter,
  otpLimiter,
  contactLimiter,
};

