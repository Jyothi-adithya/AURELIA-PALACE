const eventTypeService = require('../services/eventTypeService');
const { successResponse, errorResponse } = require('../utils/response');

const getAllEventTypes = async (req, res, next) => {
  try {
    const eventTypes = await eventTypeService.getAllEventTypes();
    return successResponse(res, eventTypes);
  } catch (error) {
    next(error);
  }
};

const getEventTypeBySlug = async (req, res, next) => {
  try {
    const eventType = await eventTypeService.getEventTypeBySlug(req.params.slug);
    if (!eventType) {
      return errorResponse(res, 'Event type not found', [], 404);
    }
    return successResponse(res, eventType);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEventTypes,
  getEventTypeBySlug,
};
