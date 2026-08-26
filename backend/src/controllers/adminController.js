const adminService = require('../services/adminService');
const { successResponse, errorResponse } = require('../utils/response');
const { statusUpdateSchema } = require('../validators/statusValidator');

const getEnquiries = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      status: req.query.status,
      search: req.query.search,
    };

    const result = await adminService.getEnquiries(filters, page, limit);
    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await adminService.getEnquiryById(req.params.id);
    if (!enquiry) {
      return errorResponse(res, 'Enquiry not found', [], 404);
    }
    return successResponse(res, enquiry);
  } catch (error) {
    next(error);
  }
};

const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = statusUpdateSchema.parse(req.body);
    const enquiry = await adminService.updateEnquiryStatus(req.params.id, status);
    return successResponse(res, enquiry);
  } catch (error) {
    // If Prisma throws RecordNotFound
    if (error.code === 'P2025') {
      return errorResponse(res, 'Enquiry not found', [], 404);
    }
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    return successResponse(res, stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  getDashboardStats,
};
