import { test, expect } from '@playwright/test';

test('API-02: Duplicate Email', async ({ request }) => {

  const email =
    'duplicate' + Date.now() + '@example.com';

  // First registration
  const registerResponse = await request.post(
    'http://localhost:8081/api/auth/register',
    {
      data: {
        name: 'Duplicate Test User',
        email: email,
        password: 'Test@123'
      }
    }
  );

  expect(registerResponse.status()).toBe(200);

  // Verify OTP to actually create the user
  const otpResponse = await request.post(
    'http://localhost:8081/api/auth/verify-otp',
    {
      data: {
        name: 'Duplicate Test User',
        email: email,
        password: 'Test@123',
        otp: '123456'
      }
    }
  );

  expect(otpResponse.status()).toBe(200);

  // Second registration with same email
  const duplicateResponse = await request.post(
    'http://localhost:8081/api/auth/register',
    {
      data: {
        name: 'Duplicate Test User',
        email: email,
        password: 'Test@123'
      }
    }
  );

  expect(duplicateResponse.status()).toBe(400);

  const body = await duplicateResponse.json();

  expect(body.message).toBe(
    'Email already registered'
  );

});