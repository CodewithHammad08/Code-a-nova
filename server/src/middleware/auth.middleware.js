const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

const authenticate = async (req, res, next) => {
  try {
    let token = null;

    // Check HTTP-only cookie first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Fall back to Authorization Bearer header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return errorResponse(
        res,
        401,
        'Authentication required. Please log in to continue.'
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 401, 'Your session has expired. Please log in again.');
      }
      return errorResponse(res, 401, 'Invalid authentication token.');
    }

    // Fetch user from database
    const user = await User.findById(decoded.id);
    if (!user) {
      return errorResponse(res, 401, 'User account associated with this session no longer exists.');
    }

    if (!user.isEmailVerified) {
      return errorResponse(
        res,
        403,
        'Your email address is not yet verified. Please verify your account.'
      );
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('[Auth Middleware Error]:', err.message);
    return errorResponse(res, 500, 'Internal authentication error.');
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return errorResponse(res, 403, 'Access denied. Administrative privileges required.');
  }
  next();
};

module.exports = {
  authenticate,
  adminOnly,
};
