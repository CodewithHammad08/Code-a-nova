const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const result = await authService.signup({ fullName, email, password });
    return successResponse(res, 201, result.message, {
      email: result.email,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyUserEmail({ email, otp });
    return successResponse(res, 200, result.message, { verified: true });
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.resendUserOtp({ email });
    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });

    // Set secure HTTP-only cookie
    res.cookie('token', token, authService.getCookieOptions());

    return successResponse(res, 200, 'Login successful', {
      user,
      token, // Also return token in body for clients/testing
    });
  } catch (error) {
    if (error.unverified) {
      return errorResponse(res, 403, error.message, [{ email: error.email, unverified: true }]);
    }
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie('token', authService.getCookieOptions());
  return successResponse(res, 200, 'Logged out successfully');
};

const getMe = async (req, res) => {
  return successResponse(res, 200, 'Current session retrieved', {
    user: req.user,
  });
};

module.exports = {
  signup,
  verifyOtp,
  resendOtp,
  login,
  logout,
  getMe,
};

