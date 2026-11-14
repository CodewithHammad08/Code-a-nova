const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const { authenticate, adminOnly } = require('../middleware/auth.middleware');

router.use(authenticate);
router.use(adminOnly);

router.get('/stats', adminController.getStats);
router.get('/registrations', adminController.listRegistrations);
router.get('/export-csv', adminController.exportCsv);
router.delete('/clear-clutter', adminController.clearClutter);

module.exports = router;

