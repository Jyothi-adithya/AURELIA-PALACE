const { errorResponse } = require('../utils/response');
const { ZodError } = require('zod');
const { Prisma } = require('@prisma/client');
const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Validation Errors (Zod)
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return errorResponse(res, 'Validation failed', errors, 400);
  }

  // Prisma Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return errorResponse(res, 'A record with this value already exists', [], 409);
    }
    if (err.code === 'P2025') {
      return errorResponse(res, 'Record not found', [], 404);
    }
    return errorResponse(res, 'Database error occurred', [], 400);
  }

  // Authentication Errors (Custom or JWT)
  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Unauthorized access', [], 401);
  }

  // General Error
  const statusCode = err.statusCode || 500;
  const message = env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred' 
    : err.message || 'Internal Server Error';

  return errorResponse(res, message, [], statusCode);
};

module.exports = { errorHandler };
