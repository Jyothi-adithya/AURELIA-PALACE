const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 login requests per hour
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.',
  },
});

const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 enquiry submissions per hour
  message: {
    success: false,
    message: 'You have submitted too many enquiries. Please try again later.',
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
  enquiryLimiter,
};
