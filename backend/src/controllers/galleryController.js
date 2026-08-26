const galleryService = require('../services/galleryService');
const { successResponse } = require('../utils/response');

const getGalleryItems = async (req, res, next) => {
  try {
    const filters = {
      category: req.query.category,
      eventTypeId: req.query.eventTypeId,
    };
    const items = await galleryService.getGalleryItems(filters);
    return successResponse(res, items);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGalleryItems,
};
