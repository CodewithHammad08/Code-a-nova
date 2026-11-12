const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function seedHammad() {
  await mongoose.connect(process.env.MONGO_URI);
  const User = require('../src/models/User');

  const existing = await User.findOne({ email: 'hammaddalvi08@gmail.com' });
  if (existing) {
    console.log('User already exists in Atlas:', existing.email, 'verified:', existing.isEmailVerified);
    existing.isEmailVerified = true;
    await existing.save();
    console.log('Marked verified.');
  } else {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Password123!', salt);
    const user = new User({
      fullName: 'Hammad',
      email: 'hammaddalvi08@gmail.com',
      passwordHash,
      isEmailVerified: true,
      college: 'Veermata Jijabai Technological Institute (VJTI)',
      course: 'B.Tech',
      branch: 'CSE',
      year: '3rd Year',
      mobileNumber: '9876543210',
      role: 'admin', // Give admin access so they can test both Participant and Admin portals!
    });
    await user.save();
    console.log('Successfully created Hammad as verified admin in MongoDB Atlas!');
  }
  process.exit(0);
}

seedHammad().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});

