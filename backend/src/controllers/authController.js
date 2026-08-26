const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');
const { loginSchema } = require('../validators/authValidator');

const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    try {
      const result = await authService.login(email, password);
      return successResponse(res, result);
    } catch (err) {
      return errorResponse(res, 'Invalid credentials', [], 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
