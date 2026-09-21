import { test, expect } from '@playwright/test';

test('TC-13 - Product CRUD', async ({ page }) => {

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
      name: 'Dashboard'
    })
  ).toBeVisible();


  // ==========================================
  // STEP 3: Go to Products
  // ==========================================

  await page.getByRole('link', {
    name: /products/i
  }).click();


  // ==========================================
  // STEP 4: Verify Products Page
  // ==========================================

  await expect(
  page.getByRole('heading', {
    name: 'Products',
    exact: true
  })
).toBeVisible();


 // ==========================================
// STEP 5: CREATE PRODUCT
// ==========================================

const productName =
  `Playwright UI Product ${Date.now()}`;

const productCategory = 'Automation';
const productPrice = '500';
const productQuantity = '10';

await page.getByPlaceholder(
  'e.g. Wireless Mouse'
).fill(productName);

await page.getByPlaceholder(
  'e.g. Electronics'
).fill(productCategory);

await page.getByPlaceholder(
  '0.00'
).fill(productPrice);

await page.getByPlaceholder(
  '0'
).last().fill(productQuantity);

await page.getByRole('button', {
  name: '+ Add Product'
}).click();


 // ==========================================
// STEP 6: VERIFY PRODUCT CREATED
// ==========================================

const productRow = page.locator('tr').filter({
  hasText: productName
}).first();

await expect(productRow).toBeVisible();

await expect(
  productRow.getByText(productCategory, {
    exact: true
  })
).toBeVisible();


  // ==========================================
// STEP 7: EDIT PRODUCT
// ==========================================

await productRow.getByTitle(
  'Edit product'
).click();


  // ==========================================
  // STEP 8: Update Product Information
  // ==========================================

  const updatedProductName =
    'Playwright UI Product Updated';

  const updatedCategory =
    'Automation';

  await page.getByPlaceholder(
    'e.g. Wireless Mouse'
  ).fill(updatedProductName);

  await page.getByPlaceholder(
    'e.g. Electronics'
  ).fill(updatedCategory);

  await page.getByPlaceholder(
    '0.00'
  ).fill('750');

  await page.getByPlaceholder(
    '0'
  ).last().fill('15');


  // ==========================================
  // STEP 9: Update Product
  // ==========================================

  await page.getByRole('button', {
    name: '✓ Update Product'
  }).click();


  // ==========================================
  // STEP 10: VERIFY PRODUCT UPDATED
  // ==========================================

  await expect(
    page.getByText(updatedProductName, {
      exact: true
    })
  ).toBeVisible();

  await expect(
    page.getByText(updatedCategory, {
      exact: true
    })
  ).toBeVisible();


  // ==========================================
  // STEP 11: DELETE PRODUCT
  // ==========================================

  const updatedProductRow =
    page.locator('tr').filter({
      hasText: updatedProductName
    });

  await updatedProductRow.getByTitle(
    'Delete product'
  ).click();


  // ==========================================
  // STEP 12: Verify Delete Modal
  // ==========================================

  await expect(
    page.getByRole('heading', {
      name: 'Delete Product?'
    })
  ).toBeVisible();


  // ==========================================
  // STEP 13: Confirm Delete
  // ==========================================

  await page.getByRole('button', {
    name: 'Delete',
    exact: true
  }).click();


  // ==========================================
  // STEP 14: VERIFY PRODUCT DELETED
  // ==========================================

  await expect(
    page.getByText(updatedProductName, {
      exact: true
    })
  ).not.toBeVisible();

});