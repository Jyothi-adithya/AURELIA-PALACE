const serviceService = require('../services/serviceService');
const { successResponse, errorResponse } = require('../utils/response');

const getAllServices = async (req, res, next) => {
  try {
    const services = await serviceService.getAllServices();
    return successResponse(res, services);
  } catch (error) {
    next(error);
  }
};

const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceBySlug(req.params.slug);
    if (!service) {
      return errorResponse(res, 'Service not found', [], 404);
    }
    return successResponse(res, service);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllServices,
  getServiceBySlug,
};
