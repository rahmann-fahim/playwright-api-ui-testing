import { test, expect } from '@playwright/test';

test('TC-15 - Sales CRUD', async ({ page }) => {

  // ==========================================
  // STEP 1: Login
  // ==========================================

  await page.goto('/login');

  await page.getByRole('textbox', {
    name: 'Enter your email'
  }).fill('fahim@gmail.com');

  await page.getByRole('textbox', {
    name: 'Enter password'
  }).fill('fahim123');

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  // ==========================================
  // STEP 2: Verify Dashboard
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Dashboard',
      exact: true
    })
  ).toBeVisible();

  // ==========================================
  // STEP 3: Go to Sales
  // ==========================================

  await page.getByRole('link', {
    name: /sales/i
  }).click();

  // ==========================================
  // STEP 4: Verify Sales Page
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Sales',
      exact: true
    })
  ).toBeVisible();

  // ==========================================
  // STEP 5: SELECT AVAILABLE PRODUCT
  // ==========================================

  const productSelect = page.locator('#product');

  await expect(productSelect).toBeVisible();

  const availableProduct = productSelect.locator(
    'option:not([disabled])'
  ).filter({
    hasNotText: 'Select a product'
  }).first();

  const productValue =
    await availableProduct.getAttribute('value');

  const productText =
    await availableProduct.textContent();

  expect(productValue).not.toBeNull();

  console.log(
    'Selected Product:',
    productText
  );

  await productSelect.selectOption(
    productValue!
  );

  await expect(
    productSelect
  ).not.toHaveValue('');

  // ==========================================
  // STEP 6: ENTER SALE QUANTITY
  // ==========================================

  await page.locator('#quantity').fill('1');

  // ==========================================
  // STEP 7: CREATE SALE
  // ==========================================

  await page.getByRole('button', {
    name: 'Create Sale',
    exact: true
  }).click();

  // ==========================================
  // STEP 8: VERIFY SALE CREATED
  // ==========================================

  await expect(
    page.getByText(
      'Sale created successfully',
      { exact: true }
    )
  ).toBeVisible();

  // ==========================================
  // STEP 9: VERIFY SALES TABLE
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Sales Transactions',
      exact: true
    })
  ).toBeVisible();

  // ==========================================
  // STEP 10: IDENTIFY CREATED SALE
  // ==========================================

  const salesRows =
    page.locator('tbody tr');

  const createdSaleRow =
    salesRows.last();

  await expect(
    createdSaleRow
  ).toBeVisible();

  // ==========================================
  // STEP 11: GET CREATED SALE ID
  // ==========================================

  const saleIdText =
    await createdSaleRow
      .locator('.sale-id')
      .textContent();

  expect(saleIdText).not.toBeNull();

  console.log(
    'Created Sale ID:',
    saleIdText
  );

  // ==========================================
  // STEP 12: VERIFY CREATED SALE QUANTITY
  // ==========================================

  await expect(
    createdSaleRow
      .locator('td')
      .nth(2)
  ).toHaveText('1');

  // ==========================================
  // STEP 13: EDIT SALE
  // ==========================================

  await createdSaleRow
    .getByRole('button', {
      name: 'Edit',
      exact: true
    })
    .click();

  // ==========================================
  // STEP 14: VERIFY UPDATE MODE
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Update Sale',
      exact: true
    })
  ).toBeVisible();

  await expect(
    page.getByRole('button', {
      name: 'Update Sale',
      exact: true
    })
  ).toBeVisible();

  // ==========================================
  // STEP 15: UPDATE SALE QUANTITY
  // ==========================================

  await page.locator('#quantity').fill('1');

  // ==========================================
  // STEP 16: SAVE UPDATED SALE
  // ==========================================

  await page.getByRole('button', {
    name: 'Update Sale',
    exact: true
  }).click();

  // ==========================================
  // STEP 17: VERIFY SALE UPDATED
  // ==========================================

  await expect(
    page.getByText(
      'Sale updated successfully',
      { exact: true }
    )
  ).toBeVisible();

  // ==========================================
// STEP 18: VERIFY UPDATED QUANTITY
// ==========================================

const updatedSaleRow =
  page.locator('tbody tr').filter({
    hasText: saleIdText?.trim() || ''
  });

await expect(
  updatedSaleRow
).toBeVisible();

await expect(
  updatedSaleRow
    .locator('td')
    .nth(2)
).toHaveText('1');

  // ==========================================
  // STEP 19: DELETE SALE
  // ==========================================

  const saleRowBeforeDelete =
    page.locator('tbody tr').filter({
      hasText: saleIdText?.trim() || ''
    });

  await expect(
    saleRowBeforeDelete
  ).toBeVisible();

  await saleRowBeforeDelete
    .getByRole('button', {
      name: 'Delete',
      exact: true
    })
    .click();

  // ==========================================
  // STEP 20: VERIFY DELETE MODAL
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Delete Sale?',
      exact: true
    })
  ).toBeVisible();

  await expect(
    page.getByText(
      'Are you sure you want to delete this sale?',
      { exact: false }
    )
  ).toBeVisible();

  // ==========================================
  // STEP 21: CONFIRM DELETE
  // ==========================================

  await page.getByRole('button', {
    name: 'Delete Sale',
    exact: true
  }).click();

  // ==========================================
  // STEP 22: VERIFY DELETE SUCCESS
  // ==========================================

  await expect(
    page.getByText(
      'Sale deleted successfully',
      { exact: true }
    )
  ).toBeVisible();

  // ==========================================
  // STEP 23: VERIFY SALE REMOVED
  // ==========================================

  await expect(
    page.locator('tbody tr').filter({
      hasText: saleIdText?.trim() || ''
    })
  ).not.toBeVisible();

});