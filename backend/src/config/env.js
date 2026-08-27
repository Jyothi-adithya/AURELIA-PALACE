require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'fallback-secret-key') {
    throw new Error('FATAL ERROR: JWT_SECRET is missing or using fallback in production.');
  }
}

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

module.exports = env;
