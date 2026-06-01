import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { TEST_USERS, INVENTORY } from '../data/testData';

test.describe('Inventory Tests', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
  });

  test('@smoke inventory page loads with correct item count', async () => {
    expect(await inventoryPage.isLoaded()).toBeTruthy();
    expect(await inventoryPage.getItemCount()).toBe(INVENTORY.expectedItemCount);
  });

  test('@regression add item to cart updates badge', async () => {
    await inventoryPage.addItemToCart(0);

    expect(await inventoryPage.getCartBadgeCount()).toBe('1');
  });

  test('@regression add multiple items updates badge count', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    await inventoryPage.addItemToCart(2);

    expect(await inventoryPage.getCartBadgeCount()).toBe('3');
  });

  test('@regression item name and price are displayed', async () => {
    const name  = await inventoryPage.getItemName(0);
    const price = await inventoryPage.getItemPrice(0);

    expect(name).toBeTruthy();
    expect(price).toMatch(/^\$\d+\.\d{2}$/);
  });

  test('@regression sort products by name A-Z', async () => {
    await inventoryPage.sortBy('az');
    const firstName = await inventoryPage.getItemName(0);
    expect(firstName).toBeTruthy();
  });

  test('@regression sort products by price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    const firstPrice  = await inventoryPage.getItemPrice(0);
    const secondPrice = await inventoryPage.getItemPrice(1);
    const first  = parseFloat(firstPrice.replace('$', ''));
    const second = parseFloat(secondPrice.replace('$', ''));
    expect(first).toBeLessThanOrEqual(second);
  });

  test('@smoke navigate to cart from inventory', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
    expect(await cartPage.isLoaded()).toBeTruthy();
  });
});
