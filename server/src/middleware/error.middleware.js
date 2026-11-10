const { errorResponse } = require('../utils/apiResponse');
const config = require('../config/environment');

const errorHandler = (err, req, res, next) => {
  console.error('[Unhandled Error]:', err);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return errorResponse(res, 409, `An account or record with this ${field} already exists.`);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
    return errorResponse(res, 400, 'Validation failed for the submitted data', errors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 401, 'Invalid authentication token');
  }

  const statusCode = err.statusCode || 500;
  const message =
    config.env === 'production' && statusCode === 500
      ? 'An unexpected error occurred on the server. Please try again later.'
      : err.message || 'Internal Server Error';

  return errorResponse(res, statusCode, message);
};

const notFoundHandler = (req, res) => {
  return errorResponse(res, 404, `Endpoint ${req.method} ${req.originalUrl} not found`);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
