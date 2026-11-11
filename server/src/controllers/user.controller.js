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

module.exports = {
  getProfile,
  updateProfile,
};

