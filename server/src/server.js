const app = require('./app');
const config = require('./config/environment');
const connectDB = require('./config/database');
const { getTransporter } = require('./config/mail');
const EventConfig = require('./models/EventConfig');

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Initialize Mail Transporter
    await getTransporter();

    // 3. Ensure Default Event Config exists in DB
    try {
      const existingConfig = await EventConfig.findOne();
      if (!existingConfig) {
        await EventConfig.create({});
        console.log('[Setup] Seeded default event configuration.');
      }
    } catch (cfgErr) {
      console.warn('[Setup] Note on event config seed:', cfgErr.message);
    }

    // 4. Start HTTP Server
    const server = app.listen(config.port, () => {
      console.log(`====================================================`);
      console.log(`  CODE-A-NOVA API Server`);
      console.log(`  Environment : ${config.env}`);
      console.log(`  Listening on: http://localhost:${config.port}`);
      console.log(`  Client Origin: ${config.clientUrl}`);
      console.log(`====================================================`);
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
