import { test, expect } from '@playwright/test';

test('TC-03: Duplicate Email', async ({ page }) => {

  await page.goto('/');

  // Use an email that already exists in the database
  await page.getByPlaceholder('Enter your name')
    .fill('Duplicate Email User');

  await page.getByPlaceholder('Enter your email')
    .fill('fahim@gmail.com');

  await page.getByPlaceholder('Enter password')
    .fill('Test@123');

  // Click Register
  await page.getByRole('button', { name: 'Register' })
    .click();

  // Duplicate email message should appear
  await expect(
    page.getByText('Email already registered')
  ).toBeVisible();

});