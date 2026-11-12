const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const result = await authService.signup({ fullName, email, password });
    return successResponse(res, 201, result.message, {
      email: result.email,
      user: result.user,
      devOtp: result.devOtp,
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
    return successResponse(res, 200, result.message, {
      devOtp: result.devOtp,
    });
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

const User = require('../models/User');

const getMe = async (req, res) => {
  return successResponse(res, 200, 'Current session retrieved', {
    user: req.user,
  });
};

const promoteAdmin = async (req, res, next) => {
  try {
    const { email, adminSecret } = req.body;
    const configuredSecret = process.env.ADMIN_SECRET || 'codeanova_admin_secret_2026';

    if (!email) {
      return errorResponse(res, 400, 'User email is required.');
    }

    if (adminSecret !== configuredSecret) {
      return errorResponse(res, 403, 'Invalid administrative authorization secret.');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return errorResponse(res, 404, 'User account not found.');
    }

    user.role = 'admin';
    await user.save();

    return successResponse(res, 200, `User ${user.email} promoted to administrative role successfully.`, {
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  verifyOtp,
  resendOtp,
  login,
  logout,
  getMe,
  promoteAdmin,
};

