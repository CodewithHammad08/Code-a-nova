const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getProfile = async (req, res) => {
  return successResponse(res, 200, 'Profile retrieved successfully', {
    user: req.user,
  });
};

const updateProfile = async (req, res, next) => {
  try {
    const { fullName, college, course, branch, year, mobileNumber } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    if (fullName && fullName.trim().length >= 3) {
      user.fullName = fullName.trim();
    }
    if (college !== undefined) user.college = college.trim();
    if (course !== undefined) user.course = course.trim();
    if (branch !== undefined) user.branch = branch.trim();
    if (year !== undefined) user.year = year.trim();
    if (mobileNumber !== undefined) user.mobileNumber = mobileNumber.trim();

    await user.save();

    return successResponse(res, 200, 'Profile updated successfully', {
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorResponse(res, 400, 'Current and new passwords are required.');
    }

    if (newPassword !== confirmPassword) {
      return errorResponse(res, 400, 'New password and confirmation do not match.');
    }

    if (newPassword.length < 8) {
      return errorResponse(res, 400, 'New password must be at least 8 characters long.');
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      return errorResponse(
        res,
        400,
        'New password must contain at least one uppercase letter, one lowercase letter, and one number.'
      );
    }

    const user = await User.findById(req.user._id).select('+passwordHash');
    if (!user) {
      return errorResponse(res, 404, 'User not found.');
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return errorResponse(res, 400, 'Current password is incorrect.');
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    return successResponse(res, 200, 'Password updated successfully.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};

