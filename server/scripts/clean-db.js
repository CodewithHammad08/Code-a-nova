require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const HackathonRegistration = require('../src/models/HackathonRegistration');
const ContactMessage = require('../src/models/ContactMessage');
const User = require('../src/models/User');

const cleanDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('Error: MONGO_URI is missing in environment.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      dbName: 'code_a_nova',
      serverSelectionTimeoutMS: 15000,
    });
    console.log('Connected to MongoDB successfully.');

    // 1. Delete all hackathon registrations
    const regResult = await HackathonRegistration.deleteMany({});
    console.log(`[Clean] Deleted ${regResult.deletedCount} hackathon registrations.`);

    // 2. Delete all contact inquiries
    const contactResult = await ContactMessage.deleteMany({});
    console.log(`[Clean] Deleted ${contactResult.deletedCount} contact messages.`);

    // 3. Delete non-admin test users (keep admin accounts safe)
    const userResult = await User.deleteMany({
      role: { $ne: 'admin' },
      email: { $ne: 'hammaddalvi08@gmail.com' },
    });
    console.log(`[Clean] Deleted ${userResult.deletedCount} non-admin test user accounts.`);

    console.log('--------------------------------------------------');
    console.log('All database clutter successfully purged!');
    console.log('Remaining admin users:');
    const remainingUsers = await User.find({}, 'fullName email role isEmailVerified');
    console.table(remainingUsers.map(u => ({
      ID: u._id.toString(),
      Name: u.fullName,
      Email: u.email,
      Role: u.role,
      Verified: u.isEmailVerified
    })));
    console.log('--------------------------------------------------');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Database clean error:', error.message);
    process.exit(1);
  }
};

cleanDatabase();

