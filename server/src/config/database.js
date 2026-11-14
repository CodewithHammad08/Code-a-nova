const mongoose = require('mongoose');
const config = require('./environment');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      dbName: 'code_a_nova',
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database] MongoDB Connection Error: ${error.message}`);
    console.warn('[Database] Verify MongoDB Atlas Network Access IP Whitelist (0.0.0.0/0) and MONGO_URI.');
    // Do not crash immediately so HTTP health checks and diagnostics remain responsive
    setTimeout(() => {
      console.log('[Database] Retrying MongoDB connection...');
      connectDB().catch(() => {});
    }, 5000);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[Database] MongoDB disconnected. Attempting reconnection...');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Database] MongoDB runtime error: ${err.message}`);
});

module.exports = connectDB;

