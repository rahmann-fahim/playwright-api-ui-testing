import { test, expect } from '@playwright/test';

test('TC-11: User Logout', async ({ page }) => {

  // Open Login page directly
  await page.goto('/login');

  await expect(
    page.getByRole('heading', {
      name: 'Login'
    })
  ).toBeVisible();

  // Login
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

  // Verify JWT token exists
  const tokenBeforeLogout = await page.evaluate(() => {
    return localStorage.getItem('token');
  });

  expect(tokenBeforeLogout).toBeTruthy();

  // Logout
  await page
    .getByRole('button', {
      name: /Logout/
    })
    .click();

  // Verify Login Page
  await expect(
    page.getByRole('heading', {
      name: 'Login'
    })
  ).toBeVisible();

  // Verify JWT token has been removed
  const tokenAfterLogout = await page.evaluate(() => {
    return localStorage.getItem('token');
  });

  expect(tokenAfterLogout).toBeNull();

});