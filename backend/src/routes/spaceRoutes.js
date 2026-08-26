const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');

router.get('/', spaceController.getAllSpaces);
router.get('/:slug', spaceController.getSpaceBySlug);

module.exports = router;
