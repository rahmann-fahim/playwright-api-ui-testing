import { test, expect } from '@playwright/test';

test('API-04: Correct OTP', async ({ request }) => {

  const email =
    'correctotp' + Date.now() + '@example.com';

  // Registration
  const registerResponse = await request.post(
    'http://localhost:8081/api/auth/register',
    {
      data: {
        name: 'Correct OTP User',
        email: email,
        password: 'Test@123'
      }
    }
  );

  expect(registerResponse.status()).toBe(200);

  // Verify correct OTP
  const otpResponse = await request.post(
    'http://localhost:8081/api/auth/verify-otp',
    {
      data: {
        name: 'Correct OTP User',
        email: email,
        password: 'Test@123',
        otp: '123456'
      }
    }
  );

  expect(otpResponse.status()).toBe(200);

  const body = await otpResponse.json();

  expect(body.message).toBe(
    'Registration successful'
  );

});