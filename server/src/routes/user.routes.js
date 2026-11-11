const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/me', authenticate, userController.getProfile);
router.put('/update', authenticate, userController.updateProfile);

module.exports = router;

