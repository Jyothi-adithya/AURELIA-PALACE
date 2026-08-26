const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Protect all admin routes
router.use(authMiddleware);

router.get('/stats', adminController.getDashboardStats);
router.get('/enquiries', adminController.getEnquiries);
router.get('/enquiries/:id', adminController.getEnquiryById);
router.patch('/enquiries/:id/status', adminController.updateEnquiryStatus);

module.exports = router;
