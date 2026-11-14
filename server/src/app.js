const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config/environment');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const hackathonRoutes = require('./routes/hackathon.routes');
const contactRoutes = require('./routes/contact.routes');
const adminRoutes = require('./routes/admin.routes');

const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS Configuration
const rawClientUrls = (config.clientUrl || '')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

const allowedOrigins = Array.from(
  new Set([
    ...rawClientUrls,
    'https://code-a-nova-kappa.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ])
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');
      if (
        allowedOrigins.includes(cleanOrigin) ||
        config.env === 'development'
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS Policy: Request origin ${origin} not allowed.`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsing middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Cookie parsing middleware
app.use(cookieParser(config.cookieSecret));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Code-a-Nova API',
    environment: config.env,
  });
});

// Mount modular API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

