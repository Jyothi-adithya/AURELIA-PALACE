const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { enquiryLimiter } = require('../middleware/rateLimiter');

router.post('/', enquiryLimiter, enquiryController.createEnquiry);

module.exports = router;
