const spaceService = require('../services/spaceService');
const { successResponse, errorResponse } = require('../utils/response');

const getAllSpaces = async (req, res, next) => {
  try {
    const spaces = await spaceService.getAllSpaces();
    return successResponse(res, spaces);
  } catch (error) {
    next(error);
  }
};

const getSpaceBySlug = async (req, res, next) => {
  try {
    const space = await spaceService.getSpaceBySlug(req.params.slug);
    if (!space) {
      return errorResponse(res, 'Space not found', [], 404);
    }
    return successResponse(res, space);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSpaces,
  getSpaceBySlug,
};
