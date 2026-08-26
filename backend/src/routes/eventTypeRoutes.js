const express = require('express');
const router = express.Router();
const eventTypeController = require('../controllers/eventTypeController');

router.get('/', eventTypeController.getAllEventTypes);
router.get('/:slug', eventTypeController.getEventTypeBySlug);

module.exports = router;
