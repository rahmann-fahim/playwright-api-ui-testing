import { test, expect } from '@playwright/test';

test('TC-16 - Sales Validation', async ({ page }) => {

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
  // STEP 3: OPEN SALES PAGE
  // ==========================================

  await page
    .getByRole('link', { name: /sales/i })
    .click();


  // ==========================================
  // STEP 4: VERIFY SALES PAGE
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Sales',
      exact: true
    })
  ).toBeVisible();


  const productSelect = page.locator('#product');
  const quantityInput = page.locator('#quantity');

  // ==========================================
  // STEP 5: PRODUCT NOT SELECTED
  // ==========================================

  await quantityInput.fill('1');

  await page
    .getByRole('button', {
      name: 'Create Sale',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 6: VERIFY PRODUCT REQUIRED ERROR
  // ==========================================

  const errorMessage = page.locator('.error-message');

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Please select a product and enter a valid quantity'
  );


  // ==========================================
  // STEP 7: SELECT AVAILABLE PRODUCT
  // ==========================================

  const availableProduct = productSelect
    .locator('option:not([disabled])')
    .filter({
      hasNotText: 'Select a product'
    })
    .first();

  const productValue =
    await availableProduct.getAttribute('value');

  expect(productValue).not.toBeNull();

  await productSelect.selectOption(productValue!);


  // ==========================================
  // STEP 8: EMPTY QUANTITY
  // ==========================================

  await quantityInput.fill('');

  await page
    .getByRole('button', {
      name: 'Create Sale',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 9: VERIFY EMPTY QUANTITY ERROR
  // ==========================================

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Please select a product and enter a valid quantity'
  );


  // ==========================================
  // STEP 10: ZERO QUANTITY
  // ==========================================

  await quantityInput.fill('0');

  await page
    .getByRole('button', {
      name: 'Create Sale',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 11: VERIFY ZERO QUANTITY ERROR
  // ==========================================

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Please select a product and enter a valid quantity'
  );


  // ==========================================
  // STEP 12: NEGATIVE QUANTITY
  // ==========================================

  await quantityInput.fill('-1');

  await page
    .getByRole('button', {
      name: 'Create Sale',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 13: VERIFY NEGATIVE QUANTITY ERROR
  // ==========================================

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Please select a product and enter a valid quantity'
  );


  // ==========================================
  // STEP 14: EXCEED AVAILABLE STOCK
  // ==========================================

  const selectedProduct =
    productSelect.locator('option:checked');

  const selectedProductText =
    await selectedProduct.textContent();

  const stockMatch =
    selectedProductText?.match(/Stock:\s*(\d+)/);

  const stock =
    stockMatch ? Number(stockMatch[1]) : 0;

  expect(stock).toBeGreaterThan(0);

  await quantityInput.fill(
    String(stock + 1)
  );

  await page
    .getByRole('button', {
      name: 'Create Sale',
      exact: true
    })
    .click();


  // ==========================================
  // STEP 15: VERIFY INSUFFICIENT STOCK ERROR
  // ==========================================

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Insufficient product stock'
  );

});