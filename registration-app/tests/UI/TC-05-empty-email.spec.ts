import { test, expect } from '@playwright/test';

test('TC-05: Empty Email', async ({ page }) => {

  await page.goto('/');

  // Enter name
  await page.getByPlaceholder('Enter your name')
    .fill('Empty Email User');

  // Leave Email empty

  // Enter password
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