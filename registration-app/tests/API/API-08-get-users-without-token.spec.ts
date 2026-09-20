import { test, expect } from '@playwright/test';

test('API-08: Get Users Without Token', async ({ request }) => {

  const response = await request.get(
    'http://localhost:8081/api/auth/users'
  );

  expect(response.status()).toBe(401);

  const body = await response.json();

  expect(body.message).toBe(
    'Authentication token required'
  );

});