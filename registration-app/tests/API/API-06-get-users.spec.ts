import { test, expect } from '@playwright/test';

test('API-06: Get Users with JWT Authentication', async ({ request }) => {

  // Login first to get JWT token
  const loginResponse = await request.post(
    'http://localhost:8081/api/auth/login',
    {
      data: {
        email: 'fahim@gmail.com',
        password: 'fahim123'
      }
    }
  );

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  expect(loginBody.token).toBeTruthy();

  // Get users using JWT token
  const usersResponse = await request.get(
    'http://localhost:8081/api/auth/users',
    {
      headers: {
        Authorization: `Bearer ${loginBody.token}`
      }
    }
  );

  expect(usersResponse.status()).toBe(200);

  const users = await usersResponse.json();

  expect(Array.isArray(users)).toBeTruthy();

});