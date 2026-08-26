const { errorResponse } = require('../utils/response');

const notFound = (req, res, next) => {
  return errorResponse(res, `Route not found: ${req.originalUrl}`, [], 404);
};

module.exports = notFound;
