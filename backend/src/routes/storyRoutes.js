const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

router.get('/', storyController.getAllStories);
router.get('/:slug', storyController.getStoryBySlug);

module.exports = router;
