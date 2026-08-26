const express = require('express');
const router = express.Router();

const eventTypeRoutes = require('./eventTypeRoutes');
const spaceRoutes = require('./spaceRoutes');
const serviceRoutes = require('./serviceRoutes');
const galleryRoutes = require('./galleryRoutes');
const storyRoutes = require('./storyRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');

const { apiLimiter } = require('../middleware/rateLimiter');

// Apply general API rate limiter to all routes
router.use(apiLimiter);

// Public Routes
router.use('/event-types', eventTypeRoutes);
router.use('/spaces', spaceRoutes);
router.use('/services', serviceRoutes);
router.use('/gallery', galleryRoutes);
router.use('/stories', storyRoutes);
router.use('/enquiries', enquiryRoutes);

// Auth & Admin Routes
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
