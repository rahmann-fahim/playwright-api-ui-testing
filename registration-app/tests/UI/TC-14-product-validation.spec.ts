import { test, expect } from '@playwright/test';

test('TC-14 - Product Validation', async ({ page }) => {

  // ==========================================
  // STEP 1: LOGIN
  // ==========================================

  await page.goto('/login');

  await page
    .getByRole('textbox', { name: 'Enter your email' })
    .fill('fahim@gmail.com');

  await page
    .getByRole('textbox', { name: 'Enter password' })
    .fill('fahim123');

  await page
    .getByRole('button', { name: 'Login' })
    .click();


  // ==========================================
  // STEP 2: VERIFY DASHBOARD
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Dashboard',
      exact: true
    })
  ).toBeVisible();


  // ==========================================
  // STEP 3: OPEN PRODUCTS PAGE
  // ==========================================

  await page
    .getByRole('link', { name: /products/i })
    .click();


  // ==========================================
  // STEP 4: VERIFY PRODUCTS PAGE
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Products',
      exact: true
    })
  ).toBeVisible();


  // ==========================================
  // STEP 5: EMPTY PRODUCT NAME
  // ==========================================

  await page
    .getByPlaceholder('e.g. Electronics')
    .fill('Automation');

  await page
    .getByPlaceholder('0.00')
    .fill('500');

  await page
    .getByPlaceholder('0')
    .last()
    .fill('10');

  await page
    .getByRole('button', {
      name: '+ Add Product',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 6: VERIFY PRODUCT NAME ERROR
  // ==========================================

  const errorMessage = page.locator('.error-message');

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Product name is required'
  );


  // ==========================================
  // STEP 7: EMPTY CATEGORY
  // ==========================================

  await page
    .getByPlaceholder('e.g. Wireless Mouse')
    .fill('Validation Test Product');

  await page
    .getByPlaceholder('e.g. Electronics')
    .fill('');

  await page
    .getByPlaceholder('0.00')
    .fill('500');

  await page
    .getByPlaceholder('0')
    .last()
    .fill('10');

  await page
    .getByRole('button', {
      name: '+ Add Product',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 8: VERIFY CATEGORY ERROR
  // ==========================================

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Category is required'
  );


  // ==========================================
  // STEP 9: INVALID PRICE
  // ==========================================

  await page
    .getByPlaceholder('e.g. Electronics')
    .fill('Automation');

  await page
    .getByPlaceholder('0.00')
    .fill('-100');

  await page
    .getByPlaceholder('0')
    .last()
    .fill('10');

  await page
    .getByRole('button', {
      name: '+ Add Product',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 10: VERIFY PRICE VALIDATION
  // ==========================================

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Valid price is required'
  );


  // ==========================================
  // STEP 11: INVALID QUANTITY
  // ==========================================

  await page
    .getByPlaceholder('0.00')
    .fill('500');

  await page
    .getByPlaceholder('0')
    .last()
    .fill('-5');

  await page
    .getByRole('button', {
      name: '+ Add Product',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 12: VERIFY QUANTITY VALIDATION
  // ==========================================

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Valid quantity is required'
  );

});