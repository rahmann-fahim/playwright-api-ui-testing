import { test, expect } from '@playwright/test';

test('TC-02: Wrong OTP', async ({ page }) => {

  const email = 'wrongotp' + Date.now() + '@example.com';

  // Open registration page
  await page.goto('/');

  // Enter registration information
  await page.getByPlaceholder('Enter your name')
    .fill('Wrong OTP Test User');

  await page.getByPlaceholder('Enter your email')
    .fill(email);

  await page.getByPlaceholder('Enter password')
    .fill('Test@123');

  // Click Register
  await page.getByRole('button', { name: 'Register' })
    .click();

  // OTP page should appear
  await expect(
    page.getByRole('heading', { name: 'Verify OTP' })
  ).toBeVisible();

  // Enter wrong OTP
  await page.getByPlaceholder('Enter 6 digit OTP')
    .fill('111111');

  // Click Verify OTP
  await page.getByRole('button', { name: 'Verify OTP' })
    .click();

  // Invalid OTP message should appear
  await expect(
    page.getByText('Invalid OTP')
  ).toBeVisible();
});