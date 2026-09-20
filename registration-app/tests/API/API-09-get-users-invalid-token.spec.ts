import { test, expect } from '@playwright/test';

test('API-09: Get Users with Invalid JWT Token', async ({ request }) => {

  const response = await request.get(
    'http://localhost:8081/api/auth/users',
    {
      headers: {
        Authorization: 'Bearer invalid-token-123456'
      }
    }
  );

  expect(response.status()).toBe(401);

  const body = await response.json();

  expect(body.message).toBe(
    'Invalid or expired token'
  );

});