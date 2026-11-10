const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.controller');
const { contactValidator } = require('../validators/contact.validator');
const validate = require('../middleware/validate.middleware');
const { contactLimiter } = require('../middleware/rateLimit.middleware');

router.get('/info', contactController.getContactInfo);
router.post('/', contactLimiter, contactValidator, validate, contactController.submitContact);

module.exports = router;
