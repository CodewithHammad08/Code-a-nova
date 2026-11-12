const mongoose = require('mongoose');
const http = require('http');
const config = require('../src/config/environment');
const User = require('../src/models/User');
const HackathonRegistration = require('../src/models/HackathonRegistration');
const app = require('../src/app');

// Simple fetch/request helper for local server testing
const makeRequest = (options, postData = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: parsed, raw: data });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
};

const runAllTests = async () => {
  console.log('====================================================');
  console.log('  RUNNING CODE-A-NOVA END-TO-END TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, description) => {
    if (condition) {
      console.log(`  [PASS] ${description}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${description}`);
      failed++;
    }
  };

  // Connect directly to DB for inspection & test teardown
  await mongoose.connect(config.mongoUri);

  // Clean up existing test accounts
  await User.deleteMany({ email: /.*@codeanova\.test/ });
  await HackathonRegistration.deleteMany({ email: /.*@codeanova\.test/ });

  const port = 5001; // separate test port
  const server = app.listen(port);
  console.log(`[Test Harness] Test server running on http://localhost:${port}\n`);

  try {
    // TEST 1: Health Check
    console.log('--- TEST 1: API Health Check ---');
    const healthRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/health',
      method: 'GET',
    });
    assert(healthRes.status === 200 && healthRes.body.status === 'healthy', 'Health check returns 200 & healthy');

    // TEST 2: Event Configuration (Public)
    console.log('\n--- TEST 2: Event Config ---');
    const configRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/hackathon/config',
      method: 'GET',
    });
    assert(configRes.status === 200 && configRes.body.data.config.eventName === 'Code-a-Nova', 'Event config retrieved');

    // TEST 3: Contact Form Submission
    console.log('\n--- TEST 3: Contact Form ---');
    const contactRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/contact',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        name: 'Rohan Verma',
        email: 'rohan.contact@codeanova.test',
        subject: 'Hardware tracks',
        message: 'Are custom embedded boards permitted in the IoT track?',
      }
    );
    assert(contactRes.status === 201 && contactRes.body.success, 'Contact inquiry submitted successfully');

    // TEST 4: Signup Validation Failure (weak password)
    console.log('\n--- TEST 4: Signup Validation ---');
    const weakSignupRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        fullName: 'Al',
        email: 'invalid-email',
        password: 'weak',
        confirmPassword: 'weak',
      }
    );
    assert(weakSignupRes.status === 400 && !weakSignupRes.body.success, 'Rejects invalid signup inputs');

    // TEST 5: Successful Signup & OTP Generation
    console.log('\n--- TEST 5: Valid Signup & OTP Generation ---');
    const testEmail1 = 'alex.lead@codeanova.test';
    const testPass = 'SecurePass123!';

    const signupRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        fullName: 'Alex Developer',
        email: testEmail1,
        password: testPass,
        confirmPassword: testPass,
      }
    );
    assert(signupRes.status === 201 && signupRes.body.success, 'Signup creates unverified user and returns 201');

    // Check DB User state: isEmailVerified should be false
    const dbUser1 = await User.findOne({ email: testEmail1 }).select('+otpHash +otpExpiresAt');
    assert(dbUser1 && !dbUser1.isEmailVerified, 'User saved in MongoDB with isEmailVerified = false');
    assert(dbUser1.otpHash && dbUser1.otpExpiresAt, 'User has hashed OTP and expiry timestamp');
    assert(dbUser1.passwordHash !== testPass, 'Password is salted and hashed (never plaintext)');

    // TEST 6: Login Before Verification (Must be rejected)
    console.log('\n--- TEST 6: Unverified Login Block ---');
    const preVerifyLoginRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        email: testEmail1,
        password: testPass,
      }
    );
    assert(preVerifyLoginRes.status === 403, 'Unverified account login rejected with 403');

    // TEST 7: OTP Verification with Wrong Code
    console.log('\n--- TEST 7: Incorrect OTP Rejection ---');
    const wrongOtpRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/verify-otp',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        email: testEmail1,
        otp: '000000',
      }
    );
    assert(wrongOtpRes.status === 400, 'Incorrect OTP code rejected with 400');

    // TEST 8: Successful OTP Verification
    console.log('\n--- TEST 8: Valid OTP Verification ---');
    // Generate known OTP directly or verify with test logic
    const bcrypt = require('bcryptjs');
    const testOtp = '123456';
    dbUser1.otpHash = await bcrypt.hash(testOtp, 10);
    dbUser1.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await dbUser1.save();

    const verifyRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/verify-otp',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        email: testEmail1,
        otp: testOtp,
      }
    );
    assert(verifyRes.status === 200 && verifyRes.body.success, 'Valid OTP verifies user account');

    // Verify DB user is now verified and OTP is cleared (single use)
    const verifiedUser1 = await User.findOne({ email: testEmail1 }).select('+otpHash');
    assert(verifiedUser1.isEmailVerified, 'isEmailVerified marked true in MongoDB');
    assert(!verifiedUser1.otpHash, 'OTP hash purged from database after single-use verification');

    // TEST 9: Authenticated Login
    console.log('\n--- TEST 9: Verified User Login ---');
    const loginRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        email: testEmail1,
        password: testPass,
      }
    );
    assert(loginRes.status === 200 && loginRes.body.data.token, 'Login issues JWT token');

    const authToken1 = loginRes.body.data.token;
    const cookieHeader = loginRes.headers['set-cookie'];
    assert(cookieHeader && cookieHeader.some((c) => c.includes('token=')), 'Sets secure HTTP-only session cookie');

    // TEST 10: Authenticated /auth/me
    console.log('\n--- TEST 10: Authenticated Session Retrieval ---');
    const meRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/auth/me',
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken1}` },
    });
    assert(meRes.status === 200 && meRes.body.data.user.email === testEmail1, 'Auth session validated via Bearer token');

    // TEST 11: Profile Update
    console.log('\n--- TEST 11: Profile Updates ---');
    const profileUpdateRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/user/update',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken1}`,
          'Content-Type': 'application/json',
        },
      },
      {
        college: 'Indian Institute of Technology (IIT) Delhi',
        course: 'B.Tech',
        branch: 'CSE',
        year: '4th Year',
        mobileNumber: '9876543210',
      }
    );
    assert(profileUpdateRes.status === 200 && profileUpdateRes.body.data.user.college.includes('Delhi'), 'User profile updated successfully');

    // TEST 12: Hackathon Registration (Solo)
    console.log('\n--- TEST 12: Hackathon Registration (Solo) ---');
    const regPayload1 = {
      participantName: 'Alex Developer',
      mobileNumber: '9876543210',
      collegeName: 'Indian Institute of Technology (IIT) Delhi',
      course: 'B.Tech',
      branch: 'CSE',
      yearOfStudy: '4th Year',
      domain: 'AI / Machine Learning',
      projectName: 'Aegis: Real-Time Decentralized Threat Detection',
      pptLink: 'https://drive.google.com/file/d/test-presentation-deck/view',
      prototypeLink: 'https://github.com/codeanova/aegis-core',
      demoVideoLink: 'https://youtube.com/watch?v=mockdemo',
      teamSize: 1,
      teamMembers: [],
    };

    const regRes1 = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/hackathon/register',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken1}`,
          'Content-Type': 'application/json',
        },
      },
      regPayload1
    );
    assert(regRes1.status === 201 && regRes1.body.data.registration.registrationId, 'Registration submitted and unique ID generated');

    const createdRegId = regRes1.body.data.registration.registrationId;
    console.log(`    Generated Reference ID: ${createdRegId}`);

    // TEST 13: Duplicate Registration Prevention
    console.log('\n--- TEST 13: Duplicate Registration Guard ---');
    const dupRegRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/hackathon/register',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken1}`,
          'Content-Type': 'application/json',
        },
      },
      regPayload1
    );
    assert(dupRegRes.status === 409, 'Duplicate participant registration blocked with 409');

    // TEST 14: Get Own Registration Entry
    console.log('\n--- TEST 14: Retrieve Own Registration ---');
    const getEntryRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/hackathon/my-entry',
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken1}` },
    });
    assert(getEntryRes.status === 200 && getEntryRes.body.data.registered === true, 'My registration retrieved successfully');

    // TEST 15: Update Registration Links
    console.log('\n--- TEST 15: Update Submission Links ---');
    const updateLinksRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/hackathon/my-entry',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken1}`,
          'Content-Type': 'application/json',
        },
      },
      {
        projectName: 'Aegis 2.0: Real-Time Decentralized Threat Detection',
        prototypeLink: 'https://github.com/codeanova/aegis-v2',
      }
    );
    assert(updateLinksRes.status === 200 && updateLinksRes.body.data.registration.projectName.includes('2.0'), 'Registration links updated successfully');

    // TEST 16: Multi-Member Dynamic Team Registration
    console.log('\n--- TEST 16: Multi-Member Team Registration ---');
    const testEmail2 = 'lead.team2@codeanova.test';
    await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        fullName: 'Sarah Team Leader',
        email: testEmail2,
        password: testPass,
        confirmPassword: testPass,
      }
    );

    const dbUser2 = await User.findOne({ email: testEmail2 });
    dbUser2.isEmailVerified = true;
    await dbUser2.save();

    const loginRes2 = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        email: testEmail2,
        password: testPass,
      }
    );
    const authToken2 = loginRes2.body.data.token;

    // Test Duplicate Member Email Rejection
    const dupMemberPayload = {
      participantName: 'Sarah Team Leader',
      mobileNumber: '9123456780',
      collegeName: 'BITS Pilani',
      course: 'B.Tech',
      branch: 'IT',
      yearOfStudy: '3rd Year',
      domain: 'Web Development',
      projectName: 'NovaCloud: Edge Orchestrator',
      pptLink: 'https://onedrive.live.com/testppt',
      prototypeLink: 'https://github.com/novacloud/core',
      teamSize: 3,
      teamMembers: [
        { name: 'Member A', email: 'member.a@codeanova.test' },
        { name: 'Member B', email: 'member.a@codeanova.test' }, // Duplicate email!
      ],
    };

    const dupMemberRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/hackathon/register',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken2}`,
          'Content-Type': 'application/json',
        },
      },
      dupMemberPayload
    );
    assert(dupMemberRes.status === 400, 'Duplicate team member emails rejected with 400');

    // Valid Multi-Member Team Submission
    dupMemberPayload.teamMembers[1].email = 'member.b@codeanova.test';
    const validTeamRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/hackathon/register',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken2}`,
          'Content-Type': 'application/json',
        },
      },
      dupMemberPayload
    );
    assert(validTeamRes.status === 201 && validTeamRes.body.data.registration.teamSize === 3, 'Multi-member team of 3 registered successfully');

    // TEST 17: Administrative Functions & CSV Export
    console.log('\n--- TEST 17: Administrative Functions & CSV Export ---');
    // Promote user 1 to admin
    await User.findByIdAndUpdate(dbUser1._id, { role: 'admin' });

    const statsRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/admin/stats',
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken1}` },
    });
    assert(statsRes.status === 200 && statsRes.body.data.totalRegistrations >= 2, 'Admin stats retrieves aggregated counts');

    const listRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/admin/registrations',
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken1}` },
    });
    assert(listRes.status === 200 && listRes.body.data.registrations.length >= 2, 'Admin registrations table lists entries');

    const csvRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/admin/export-csv',
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken1}` },
    });
    assert(csvRes.status === 200 && csvRes.raw.includes('Registration ID,Leader Name'), 'Admin CSV export generates valid spreadsheet format');

    // TEST 18: User Password Change
    console.log('\n--- TEST 18: Password Change ---');
    const pwdChangeRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/user/change-password',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken1}`,
          'Content-Type': 'application/json',
        },
      },
      {
        currentPassword: 'SecurePass123!',
        newPassword: 'NewPassword2026!',
        confirmPassword: 'NewPassword2026!',
      }
    );
    assert(pwdChangeRes.status === 200 && pwdChangeRes.body.success, 'User password changed successfully');

    // TEST 19: Administrative Promotion Endpoint
    console.log('\n--- TEST 19: Admin Promotion Endpoint ---');
    const promoteRes = await makeRequest(
      {
        hostname: 'localhost',
        port,
        path: '/api/auth/promote-admin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        email: 'lead.team2@codeanova.test',
        adminSecret: 'codeanova_admin_secret_2026',
      }
    );
    assert(promoteRes.status === 200 && promoteRes.body.data.role === 'admin', 'Administrative promotion endpoint functions properly');

  } catch (err) {
    console.error('Test runner fatal error:', err);
    failed++;
  } finally {
    server.close();
    await mongoose.disconnect();
    console.log('\n====================================================');
    console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');
    process.exit(failed > 0 ? 1 : 0);
  }
};

runAllTests();
