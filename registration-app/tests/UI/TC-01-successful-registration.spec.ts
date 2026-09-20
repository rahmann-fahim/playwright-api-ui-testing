import { test, expect } from '@playwright/test';

test('TC-01: Successful Registration and Login', async ({ page }) => {

  // Generate a unique email for every test run
  const email =
    'ui' + Date.now() + '@example.com';


  // =========================================
  // 1. Open Registration Page
  // =========================================

  await page.goto('/');


  // =========================================
  // 2. Registration
  // =========================================

  await page
    .getByPlaceholder('Enter your name')
    .fill('Playwright Test User');

  await page
    .getByPlaceholder('Enter your email')
    .fill(email);

  await page
    .getByPlaceholder('Enter password')
    .fill('Test@123');

  await page
    .getByRole('button', { name: 'Register' })
    .click();


  // =========================================
  // 3. OTP Verification
  // =========================================

  await expect(
    page.getByRole('heading', {
      name: 'Verify OTP'
    })
  ).toBeVisible();

  await page
    .getByPlaceholder('Enter 6 digit OTP')
    .fill('123456');

  await page
    .getByRole('button', {
      name: 'Verify OTP'
    })
    .click();


  // =========================================
  // 4. Login Page
  // =========================================

  await expect(
    page.getByRole('heading', {
      name: 'Login'
    })
  ).toBeVisible();

  await page
    .getByPlaceholder('Enter your email')
    .fill(email);

  await page
    .getByPlaceholder('Enter password')
    .fill('Test@123');

  await page
    .getByRole('button', {
      name: 'Login'
    })
    .click();


  // =========================================
  // 5. Dashboard
  // =========================================

  await expect(
    page.getByRole('heading', {
      name: 'Dashboard'
    })
  ).toBeVisible();


  // Verify logged-in user's name
  // .first() avoids duplicate name matches
  await expect(
    page.getByText(
      'Playwright Test User',
      { exact: true }
    ).first()
  ).toBeVisible();


  // =========================================
  // 6. Navigate to Registered Users
  // =========================================

  await page
    .getByRole('link', {
      name: /Registered Users/
    })
    .click();


  // =========================================
  // 7. Users Page
  // =========================================

  await expect(
    page.getByRole('heading', {
      name: 'Registered Users'
    })
  ).toBeVisible();


  // =========================================
  // 8. Verify Newly Registered User
  // =========================================
  // Email is unique, so use email instead
  // of duplicate user name.

  await expect(
    page.getByText(
      email,
      { exact: true }
    )
  ).toBeVisible();

});