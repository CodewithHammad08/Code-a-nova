const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const User = require('../src/models/User');
  const HackathonRegistration = require('../src/models/HackathonRegistration');

  const users = await User.find({});
  console.log('=== USERS IN MONGO ATLAS === (' + users.length + ')');
  for (const u of users) {
    console.log(`- ${u.fullName} | ${u.email} | verified: ${u.isEmailVerified} | role: ${u.role}`);
  }

  const registrations = await HackathonRegistration.find({});
  console.log('\n=== REGISTRATIONS IN MONGO ATLAS === (' + registrations.length + ')');
  for (const r of registrations) {
    console.log(`- ${r.registrationId} | ${r.projectName} | ${r.participantName} | ${r.email} | teamSize: ${r.teamSize}`);
  }
  process.exit(0);
}

check().catch(e => { console.error(e); process.exit(1); });
