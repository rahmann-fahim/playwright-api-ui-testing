import { test, expect } from '@playwright/test';

test('API-07: Login with JWT Token', async ({ request }) => {

  const response = await request.post(
    'http://localhost:8081/api/auth/login',
    {
      data: {
        email: 'fahim@gmail.com',
        password: 'fahim123'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  // Response message
  expect(body.message).toBe(
    'Login successful'
  );

  // User information
  expect(body.name).toBeTruthy();
  expect(body.email).toBe(
    'fahim@gmail.com'
  );

  // JWT token
  expect(body.token).toBeTruthy();
  expect(typeof body.token).toBe('string');

});