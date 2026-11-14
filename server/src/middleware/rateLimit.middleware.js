const rateLimit = require('express-rate-limit');
const config = require('../config/environment');
const { errorResponse } = require('../utils/apiResponse');

const isDev = config.env === 'development' || config.env === 'test';

const createLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    // Generous threshold to accommodate shared cloud proxies and load balancers
    max: isDev ? 1000 : max,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
    handler: (req, res) => {
      return errorResponse(res, 429, message);
    },
    skip: () => config.env === 'test',
  });
};

// Rate limiter for login / signup attempts: 500 per 15 mins (prevents proxy lockout)
const authLimiter = createLimiter(
  15 * 60 * 1000,
  500,
  'Too many authentication requests from this connection. Please try again after 15 minutes.'
);

// Rate limiter for OTP requests: 120 per 10 mins
const otpLimiter = createLimiter(
  10 * 60 * 1000,
  120,
  'Too many OTP requests. Please wait a few moments before trying again.'
);

// Rate limiter for contact submissions: 60 per hour
const contactLimiter = createLimiter(
  60 * 60 * 1000,
  60,
  'Too many inquiries submitted from this connection. Please try again later.'
);

module.exports = {
  authLimiter,
  otpLimiter,
  contactLimiter,
};

