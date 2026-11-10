const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/apiResponse');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorList = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
    }));

    const primaryMessage = errorList[0]?.message || 'Input validation failed';
    return errorResponse(res, 400, primaryMessage, errorList);
  }
  next();
};

module.exports = validate;
