import { test, expect } from '@playwright/test';

test('TC-06: Empty Password', async ({ page }) => {

  await page.goto('/');

  // Enter name
  await page.getByPlaceholder('Enter your name')
    .fill('Empty Password User');

  // Enter email
  await page.getByPlaceholder('Enter your email')
    .fill('emptypassword' + Date.now() + '@example.com');

  // Leave Password empty

  // Click Register
  await page.getByRole('button', { name: 'Register' })
    .click();

  // Required field validation should appear
  await expect(
    page.getByText('All fields are required')
  ).toBeVisible();

});