require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'production') {
  const missing = [];
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'fallback-secret-key') {
    missing.push('JWT_SECRET');
  }
  if (!process.env.CLIENT_URL) {
    missing.push('CLIENT_URL');
  }
  if (!process.env.DATABASE_URL) {
    missing.push('DATABASE_URL');
  }
  if (missing.length > 0) {
    throw new Error(
      `FATAL ERROR: Missing required environment variables in production: ${missing.join(', ')}`
    );
  }
} else {
  // Development warning for insecure JWT fallback
  if (!process.env.JWT_SECRET) {
    console.warn('[env] WARNING: JWT_SECRET not set. Using insecure fallback. Set it in your .env file.');
  }
}

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV: nodeEnv,
};

module.exports = env;
