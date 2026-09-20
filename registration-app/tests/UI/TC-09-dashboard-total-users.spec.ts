import { test, expect } from '@playwright/test';

test('TC-09: Dashboard displays total user count', async ({ page }) => {

  // Open Registration Page
  await page.goto('/');


  // Go to Login Page
  await page
    .getByRole('button', { name: 'Login' })
    .click();


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


  // Get Total Users card
  const totalUsersCard = page
    .locator('.stat-card')
    .filter({
      hasText: 'Total Users'
    });


  // Verify Total Users card
  await expect(
    totalUsersCard
  ).toBeVisible();


  // Verify numeric user count
  await expect(
    totalUsersCard.locator('h2')
  ).toHaveText(/^\s*\d+\s*$/);

});