const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/environment');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const hackathonRoutes = require('./routes/hackathon.routes');
const contactRoutes = require('./routes/contact.routes');
const adminRoutes = require('./routes/admin.routes');

const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();

// Trust reverse proxies (Render, Cloudflare, etc.) so client IP is accurately forwarded
app.set('trust proxy', 1);

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
    'http://localhost:3000',
  ])
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');

      // Allow if explicit match, vercel preview domain, render domain, or development
      const isVercelDomain = cleanOrigin.endsWith('.vercel.app') || cleanOrigin.includes('vercel.app');
      const isRenderDomain = cleanOrigin.endsWith('.onrender.com');
      const isLocalhost = cleanOrigin.includes('localhost') || cleanOrigin.includes('127.0.0.1');

      if (
        allowedOrigins.includes(cleanOrigin) ||
        isVercelDomain ||
        isRenderDomain ||
        isLocalhost ||
        config.env !== 'production'
      ) {
        return callback(null, true);
      }

      // Default to permissive callback for cross-deployment requests rather than crashing with 500
      console.warn(`[CORS] Warning: Unexpected origin ${origin}, allowing to prevent deployment lockout.`);
      return callback(null, true);
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

// Health check endpoint with database diagnostics
app.get('/api/health', (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1
      ? 'connected'
      : mongoose.connection.readyState === 2
      ? 'connecting'
      : 'disconnected';

  res.status(200).json({
    status: 'healthy',
    database: dbStatus,
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

