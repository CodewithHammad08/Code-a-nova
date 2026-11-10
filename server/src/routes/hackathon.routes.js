const express = require('express');
const router = express.Router();

const hackathonController = require('../controllers/hackathon.controller');
const { registrationValidator } = require('../validators/registration.validator');
const validate = require('../middleware/validate.middleware');
const { authenticate } = require('../middleware/auth.middleware');

// Public route to get event configuration (domains, timeline, etc.)
router.get('/config', hackathonController.getEventConfig);

// Protected routes
router.post('/register', authenticate, registrationValidator, validate, hackathonController.register);
router.get('/my-entry', authenticate, hackathonController.getMyEntry);
router.put('/my-entry', authenticate, hackathonController.updateMyEntry);
router.delete('/:id', authenticate, hackathonController.deleteEntry);

module.exports = router;
