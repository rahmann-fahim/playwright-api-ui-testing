import { test, expect } from '@playwright/test';

test('API-11: Sales CRUD with Stock Management', async ({ request }) => {

  // =========================
  // CREATE PRODUCT
  // =========================

  const productResponse = await request.post(
    'http://localhost:8081/api/products',
    {
      data: {
        name: 'Sales Test Product',
        category: 'Testing',
        price: 1000,
        quantity: 20
      }
    }
  );

  expect(productResponse.status()).toBe(200);

  const product =
    await productResponse.json();

  const productId = product.id;

  expect(product.quantity).toBe(20);


  // =========================
  // CREATE SALE
  // =========================

  const saleResponse = await request.post(
    'http://localhost:8081/api/sales',
    {
      data: {
        productId: productId,
        quantity: 3
      }
    }
  );

  expect(saleResponse.status()).toBe(200);

  const sale =
    await saleResponse.json();

  const saleId = sale.id;

  expect(sale.id).toBeTruthy();
  expect(sale.quantity).toBe(3);
  expect(sale.unitPrice).toBe(1000);
  expect(sale.totalPrice).toBe(3000);


  // =========================
  // VERIFY STOCK
  // =========================

  const productAfterSaleResponse =
    await request.get(
      `http://localhost:8081/api/products/${productId}`
    );

  expect(
    productAfterSaleResponse.status()
  ).toBe(200);

  const productAfterSale =
    await productAfterSaleResponse.json();

  expect(productAfterSale.quantity).toBe(17);


  // =========================
  // GET ALL SALES
  // =========================

  const getSalesResponse =
    await request.get(
      'http://localhost:8081/api/sales'
    );

  expect(
    getSalesResponse.status()
  ).toBe(200);

  const sales =
    await getSalesResponse.json();

  expect(
    Array.isArray(sales)
  ).toBeTruthy();


  // =========================
  // GET SALE BY ID
  // =========================

  const getSaleResponse =
    await request.get(
      `http://localhost:8081/api/sales/${saleId}`
    );

  expect(
    getSaleResponse.status()
  ).toBe(200);

  const saleById =
    await getSaleResponse.json();

  expect(saleById.id).toBe(saleId);
  expect(saleById.quantity).toBe(3);


  // =========================
  // UPDATE SALE
  // =========================

  const updateSaleResponse =
    await request.put(
      `http://localhost:8081/api/sales/${saleId}`,
      {
        data: {
          productId: productId,
          quantity: 5
        }
      }
    );

  expect(
    updateSaleResponse.status()
  ).toBe(200);

  const updatedSale =
    await updateSaleResponse.json();

  expect(updatedSale.quantity).toBe(5);
  expect(updatedSale.unitPrice).toBe(1000);
  expect(updatedSale.totalPrice).toBe(5000);


  // =========================
  // VERIFY UPDATED STOCK
  // =========================

  const productAfterUpdateResponse =
    await request.get(
      `http://localhost:8081/api/products/${productId}`
    );

  const productAfterUpdate =
    await productAfterUpdateResponse.json();

  expect(
    productAfterUpdate.quantity
  ).toBe(15);


  // =========================
  // DELETE SALE
  // =========================

  const deleteSaleResponse =
    await request.delete(
      `http://localhost:8081/api/sales/${saleId}`
    );

  expect(
    deleteSaleResponse.status()
  ).toBe(200);


  // =========================
  // VERIFY STOCK RESTORED
  // =========================

  const productAfterDeleteResponse =
    await request.get(
      `http://localhost:8081/api/products/${productId}`
    );

  const productAfterDelete =
    await productAfterDeleteResponse.json();

  expect(
    productAfterDelete.quantity
  ).toBe(20);


  // =========================
  // VERIFY SALE DELETED
  // =========================

  const verifyDeleteResponse =
    await request.get(
      `http://localhost:8081/api/sales/${saleId}`
    );

  expect(
    verifyDeleteResponse.status()
  ).toBe(404);


  // =========================
  // CLEANUP PRODUCT
  // =========================

  const deleteProductResponse =
    await request.delete(
      `http://localhost:8081/api/products/${productId}`
    );

  expect(
    deleteProductResponse.status()
  ).toBe(200);

});