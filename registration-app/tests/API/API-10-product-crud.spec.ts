import { test, expect } from '@playwright/test';

test('API-10: Product CRUD', async ({ request }) => {

  // CREATE
  const createResponse = await request.post(
    'http://localhost:8081/api/products',
    {
      data: {
        name: 'Playwright Test Product',
        category: 'Testing',
        price: 500,
        quantity: 10
      }
    }
  );

  expect(createResponse.status()).toBe(200);

  const createdProduct =
    await createResponse.json();

  expect(createdProduct.id).toBeTruthy();
  expect(createdProduct.name).toBe(
    'Playwright Test Product'
  );
  expect(createdProduct.category).toBe(
    'Testing'
  );
  expect(createdProduct.price).toBe(500);
  expect(createdProduct.quantity).toBe(10);

  const productId = createdProduct.id;


  // GET ALL
  const getAllResponse = await request.get(
    'http://localhost:8081/api/products'
  );

  expect(getAllResponse.status()).toBe(200);

  const products =
    await getAllResponse.json();

  expect(Array.isArray(products)).toBeTruthy();


  // GET BY ID
  const getResponse = await request.get(
    `http://localhost:8081/api/products/${productId}`
  );

  expect(getResponse.status()).toBe(200);

  const product =
    await getResponse.json();

  expect(product.id).toBe(productId);
  expect(product.name).toBe(
    'Playwright Test Product'
  );


  // UPDATE
  const updateResponse = await request.put(
    `http://localhost:8081/api/products/${productId}`,
    {
      data: {
        name: 'Updated Test Product',
        category: 'Updated Category',
        price: 750,
        quantity: 20
      }
    }
  );

  expect(updateResponse.status()).toBe(200);

  const updatedProduct =
    await updateResponse.json();

  expect(updatedProduct.name).toBe(
    'Updated Test Product'
  );
  expect(updatedProduct.category).toBe(
    'Updated Category'
  );
  expect(updatedProduct.price).toBe(750);
  expect(updatedProduct.quantity).toBe(20);


  // DELETE
  const deleteResponse = await request.delete(
    `http://localhost:8081/api/products/${productId}`
  );

  expect(deleteResponse.status()).toBe(200);


  // VERIFY DELETE
  const verifyResponse = await request.get(
    `http://localhost:8081/api/products/${productId}`
  );

  expect(verifyResponse.status()).toBe(404);

});