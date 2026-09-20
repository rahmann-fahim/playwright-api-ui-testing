import { test, expect } from '@playwright/test';

test('TC-07: Existing User Login', async ({ page }) => {

  // Open Registration Page
  await page.goto('/');


  // Go to Login Page
  await page
    .getByRole('button', { name: 'Login' })
    .click();


  // Verify Login Page
  await expect(
    page.getByRole('heading', {
      name: 'Login'
    })
  ).toBeVisible();


  // Login with existing user
  await page
    .getByPlaceholder('Enter your email')
    .fill('fahim@gmail.com');

  await page
    .getByPlaceholder('Enter password')
    .fill('fahim123');


  await page
    .getByRole('button', {
      name: 'Login'
    })
    .click();


  // Verify Dashboard
  await expect(
    page.getByRole('heading', {
      name: 'Dashboard'
    })
  ).toBeVisible();


  // Verify logged-in user's name
  await expect(
    page.getByText(
      'fahim',
      { exact: true }
    ).first()
  ).toBeVisible();


  // Verify Registered Users navigation
  await expect(
    page.getByRole('link', {
      name: /Registered Users/
    })
  ).toBeVisible();

});