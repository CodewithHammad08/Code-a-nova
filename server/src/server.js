const app = require('./app');
const config = require('./config/environment');
const connectDB = require('./config/database');
const { getTransporter } = require('./config/mail');
const EventConfig = require('./models/EventConfig');

const startServer = async () => {
  try {
    // 1. Start HTTP Server immediately so Render/Vercel health checks succeed instantly
    const server = app.listen(config.port, () => {
      console.log(`====================================================`);
      console.log(`  CODE-A-NOVA API Server`);
      console.log(`  Environment : ${config.env}`);
      console.log(`  Listening on: http://localhost:${config.port}`);
      console.log(`  Client Origin: ${config.clientUrl}`);
      console.log(`====================================================`);
    });

    // 2. Connect to Database asynchronously without blocking server readiness
    connectDB()
      .then(async () => {
        try {
          const existingConfig = await EventConfig.findOne();
          if (!existingConfig) {
            await EventConfig.create({});
            console.log('[Setup] Seeded default event configuration.');
          }
        } catch (cfgErr) {
          console.warn('[Setup] Note on event config seed:', cfgErr.message);
        }
      })
      .catch((err) => console.error('[Setup] DB bootstrap notice:', err.message));

    // 3. Initialize Mail Transporter in background
    getTransporter().catch((err) => console.warn('[Setup] Mail bootstrap notice:', err.message));

    server.on('error', async (err) => {
      if (err.code === 'EADDRINUSE') {
        try {
          // Check if an existing Code-a-Nova server is already active on this port
          const healthCheck = await fetch(`http://localhost:${config.port}/api/health`, {
            signal: AbortSignal.timeout(1500),
          });
          if (healthCheck.ok) {
            console.log(`\n====================================================`);
            console.log(`  [Notice] Code-a-Nova API is already running on port ${config.port}.`);
            console.log(`  Active service is healthy. Ready at ${config.clientUrl}`);
            console.log(`====================================================\n`);
            // Keep process idling peacefully so nodemon/concurrently does not report a crash
            setInterval(() => {}, 1000 * 60 * 60);
            return;
          }
        } catch {
          // Fall through to error
        }

        console.error(`\n[Server Startup Error] Port ${config.port} is already in use by another process.`);
        console.error(`Kill conflicting process or set PORT=5001 in server/.env.\n`);
        process.exit(1);
      } else {
        console.error('[Server Startup Error]:', err);
        process.exit(1);
      }
    });

    // Graceful Shutdown
    const handleShutdown = (signal) => {
      console.log(`\n[Server] Received ${signal}. Closing HTTP server...`);
      server.close(() => {
        console.log('[Server] Process terminated cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  } catch (error) {
    console.error('[Server Fatal Error]:', error);
    process.exit(1);
  }
};

startServer();

