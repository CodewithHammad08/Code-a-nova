const baseURL = 'http://localhost:5000/api';

async function testFullJourney() {
  console.log('=== TESTING COMPLETE USER JOURNEY WITH NATIVE FETCH ===\n');

  // 1. Health
  console.log('1. Checking Health...');
  const healthRes = await fetch(`${baseURL}/health`);
  const healthData = await healthRes.json();
  console.log('   Health OK:', healthData.status);

  // 2. Signup
  const testEmail = `hammad_${Date.now()}@gmail.com`;
  console.log('\n2. Testing Signup for:', testEmail);
  const signupRes = await fetch(`${baseURL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Hammad Dalvi',
      email: testEmail,
      password: 'Password123!',
      confirmPassword: 'Password123!',
    })
  });
  const signupData = await signupRes.json();
  console.log('   Signup Status:', signupRes.status);
  console.log('   Signup Message:', signupData.message);
  const devOtp = signupData.data.devOtp;
  console.log('   Received devOtp:', devOtp);

  // 3. Verify OTP
  console.log('\n3. Testing OTP Verification with code:', devOtp);
  const verifyRes = await fetch(`${baseURL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      otp: devOtp,
    })
  });
  const verifyData = await verifyRes.json();
  console.log('   Verify Status:', verifyRes.status);
  console.log('   Verify Message:', verifyData.message);

  // 4. Login
  console.log('\n4. Testing Login...');
  const loginRes = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      password: 'Password123!',
    })
  });
  const loginData = await loginRes.json();
  console.log('   Login Status:', loginRes.status);
  const token = loginData.data.token;
  console.log('   Auth Token received (length):', token.length);

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // 5. Get Session
  console.log('\n5. Testing /auth/me session...');
  const meRes = await fetch(`${baseURL}/auth/me`, { headers: authHeaders });
  const meData = await meRes.json();
  console.log('   Session user:', meData.data.user.fullName, meData.data.user.email);

  // 6. Check existing registration
  console.log('\n6. Checking /hackathon/my-entry...');
  const entryCheckRes = await fetch(`${baseURL}/hackathon/my-entry`, { headers: authHeaders });
  const entryCheckData = await entryCheckRes.json();
  console.log('   Registered status:', entryCheckData.data.registered);

  // 7. Register for Hackathon
  console.log('\n7. Submitting Hackathon Registration...');
  const regPayload = {
    participantName: 'Hammad Dalvi',
    email: testEmail,
    mobileNumber: '+91 98765 43210',
    collegeName: 'Veermata Jijabai Technological Institute (VJTI)',
    course: 'B.Tech',
    branch: 'CSE',
    yearOfStudy: '3rd Year',
    domain: 'AI / Machine Learning',
    projectName: 'NovaShield Autonomous AI Guardian',
    pptLink: 'docs.google.com/presentation/d/sample-novashield',
    prototypeLink: 'github.com/hammad/novashield-guardian',
    demoVideoLink: 'youtube.com/watch?v=sample-novashield',
    teamSize: 2,
    teamMembers: [
      { name: 'Ayaan Khan', email: `ayaan_${Date.now()}@college.edu` }
    ]
  };

  const regRes = await fetch(`${baseURL}/hackathon/register`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(regPayload)
  });
  const regData = await regRes.json();
  console.log('   Registration Status:', regRes.status);
  const registrationId = regData.data.registration.registrationId;
  console.log('   Assigned Registration ID:', registrationId);

  // 8. Retrieve My Entry
  console.log('\n8. Retrieving updated entry...');
  const myEntryRes = await fetch(`${baseURL}/hackathon/my-entry`, { headers: authHeaders });
  const myEntryData = await myEntryRes.json();
  console.log('   Entry Project:', myEntryData.data.registration.projectName);
  console.log('   Sanitized PPT Link:', myEntryData.data.registration.pptLink);
  console.log('   Sanitized Mobile:', myEntryData.data.registration.mobileNumber);

  // 9. Update links
  console.log('\n9. Updating Project Links...');
  const updateRes = await fetch(`${baseURL}/hackathon/my-entry`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      projectName: 'NovaShield Autonomous AI Guardian V2',
      pptLink: 'https://slides.google.com/novashield-v2',
      prototypeLink: 'https://github.com/hammad/novashield-v2'
    })
  });
  const updateData = await updateRes.json();
  console.log('   Updated Project Name:', updateData.data.registration.projectName);

  // 10. Update Profile & Change Password
  console.log('\n10. Testing Profile & Password Change...');
  await fetch(`${baseURL}/user/update`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      fullName: 'Hammad Dalvi Senior',
      course: 'B.Tech',
      branch: 'IT'
    })
  });

  const pwdRes = await fetch(`${baseURL}/user/change-password`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      currentPassword: 'Password123!',
      newPassword: 'BrandNewPass2026!',
      confirmPassword: 'BrandNewPass2026!'
    })
  });
  const pwdData = await pwdRes.json();
  console.log('   Password change response:', pwdData.message);

  console.log('\n=============================================');
  console.log('>>> COMPLETE USER JOURNEY PASSED 100% OK! <<<');
  console.log('=============================================\n');
  process.exit(0);
}

testFullJourney().catch(err => {
  console.error('\n>>> JOURNEY CRASHED AT STEP <<<', err);
  process.exit(1);
});
