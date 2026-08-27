const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const routes = require('./routes');
const env = require('./config/env');

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging — 'combined' (Apache format) in production for log aggregators, 'dev' locally
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// API Routes
app.use('/api', routes);

// 404 handler for unknown /api/* routes — Express 5 requires named wildcard
app.use('/api/{*path}', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

// General 404 handler
app.use(notFound);

// Centralised error handler
app.use(errorHandler);

module.exports = app;
