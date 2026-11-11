/**
 * Uniform API response structure conforming to PRD specifications
 */

const successResponse = (res, statusCode = 200, message = 'Operation completed successfully', data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, statusCode = 500, message = 'An unexpected error occurred', errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};

