const storyService = require('../services/storyService');
const { successResponse, errorResponse } = require('../utils/response');

const getAllStories = async (req, res, next) => {
  try {
    const stories = await storyService.getAllStories();
    return successResponse(res, stories);
  } catch (error) {
    next(error);
  }
};

const getStoryBySlug = async (req, res, next) => {
  try {
    const story = await storyService.getStoryBySlug(req.params.slug);
    if (!story) {
      return errorResponse(res, 'Story not found', [], 404);
    }
    return successResponse(res, story);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStories,
  getStoryBySlug,
};
