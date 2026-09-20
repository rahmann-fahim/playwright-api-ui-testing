import { test, expect } from '@playwright/test';

test('TC-04: Empty Name', async ({ page }) => {

  await page.goto('/');

  // Leave Name empty
  await page.getByPlaceholder('Enter your email')
    .fill('emptyname' + Date.now() + '@example.com');

  await page.getByPlaceholder('Enter password')
    .fill('Test@123');

  // Click Register
  await page.getByRole('button', { name: 'Register' })
    .click();

  // Required field validation should appear
  await expect(
    page.getByText('All fields are required')
  ).toBeVisible();

});