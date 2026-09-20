import { test, expect } from '@playwright/test';

test('TC-12: Protected Users Page redirects unauthenticated user', async ({ page }) => {

  // Open Login page
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

  // Dashboard should appear
  await expect(
    page.getByRole('heading', {
      name: 'Dashboard'
    })
  ).toBeVisible();

  // Logout
  await page
    .getByRole('button', {
      name: /Logout/
    })
    .click();

  // Login page should appear
  await expect(
    page.getByRole('heading', {
      name: 'Login'
    })
  ).toBeVisible();

  // Try to access protected Users page
  await page.goto('/users');

  // Should be redirected to Login
  await expect(
    page.getByRole('heading', {
      name: 'Login'
    })
  ).toBeVisible();

});