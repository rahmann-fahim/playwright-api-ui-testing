import { test, expect } from '@playwright/test';

test('API-03: Empty Fields', async ({ request }) => {

  const response = await request.post(
    'http://localhost:8081/api/auth/register',
    {
      data: {
        name: '',
        email: '',
        password: ''
      }
    }
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.message).toBe(
    'All fields are required'
  );

});