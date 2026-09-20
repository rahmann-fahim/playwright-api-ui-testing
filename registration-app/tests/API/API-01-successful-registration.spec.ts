import { test, expect } from '@playwright/test';

test('API-01: Successful Registration', async ({ request }) => {

  const email =
    'api' + Date.now() + '@example.com';

  const response = await request.post(
    'http://localhost:8081/api/auth/register',
    {
      data: {
        name: 'API Test User',
        email: email,
        password: 'Test@123'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.message).toBe(
    'OTP sent successfully'
  );

  expect(body.otp).toBe('123456');

});