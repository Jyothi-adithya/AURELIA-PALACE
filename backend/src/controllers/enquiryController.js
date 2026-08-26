const enquiryService = require('../services/enquiryService');
const { successResponse } = require('../utils/response');
const { enquirySchema } = require('../validators/enquiryValidator');

const createEnquiry = async (req, res, next) => {
  try {
    const validatedData = enquirySchema.parse(req.body);
    const enquiry = await enquiryService.createEnquiry(validatedData);
    return successResponse(res, enquiry, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
};
