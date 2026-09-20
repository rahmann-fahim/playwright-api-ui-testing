import { test, expect } from '@playwright/test';

test('API-05: Wrong OTP', async ({ request }) => {

  const email = 'wrongotp' + Date.now() + '@example.com';

  // Registration request
  const registerResponse = await request.post(
    'http://localhost:8081/api/auth/register',
    {
      data: {
        name: 'API Wrong OTP User',
        email: email,
        password: 'Test@123'
      }
    }
  );

  expect(registerResponse.status()).toBe(200);

  // Verify with wrong OTP
  const verifyResponse = await request.post(
    'http://localhost:8081/api/auth/verify-otp',
    {
      data: {
        name: 'API Wrong OTP User',
        email: email,
        password: 'Test@123',
        otp: '111111'
      }
    }
  );

  expect(verifyResponse.status()).toBe(400);

  const body = await verifyResponse.json();

  expect(body.message).toBe('Invalid OTP');

});