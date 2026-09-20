import { test, expect } from '@playwright/test';

test('TC-10: User Search by Email', async ({ page }) => {

  // Open Registration Page
  await page.goto('/');


  // Go to Login Page
  await page
    .getByRole('button', { name: 'Login' })
    .click();


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


  // Go to Registered Users
  await page
    .getByRole('link', {
      name: /Registered Users/
    })
    .click();


  // Verify Users Page
  await expect(
    page.getByRole('heading', {
      name: 'Registered Users'
    })
  ).toBeVisible();


  // Search by email
  const searchBox = page.getByPlaceholder(
    'Search by name or email...'
  );

  await searchBox.fill('fahim@gmail.com');


  // Verify searched user is visible
  await expect(
    page.getByText(
      'fahim@gmail.com',
      { exact: true }
    )
  ).toBeVisible();


  // Verify User Directory shows 1 matching user
  await expect(
    page.getByText(
      '1 users found',
      { exact: true }
    )
  ).toBeVisible();

});