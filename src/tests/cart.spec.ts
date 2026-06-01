import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { TEST_USERS } from '../data/testData';

test.describe('Cart Tests', () => {

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

  test('@smoke added item appears in cart', async () => {
    const itemName = await inventoryPage.getItemName(0);
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();

    expect(await cartPage.getCartItemCount()).toBe(1);
    expect(await cartPage.getCartItemName(0)).toBe(itemName);
  });

  test('@regression remove item from cart', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();

    await cartPage.removeItem(0);
    expect(await cartPage.getCartItemCount()).toBe(0);
  });

  test('@regression cart persists multiple items', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    await inventoryPage.goToCart();

    expect(await cartPage.getCartItemCount()).toBe(2);
  });

  test('@regression continue shopping returns to inventory', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
    await cartPage.continueShopping();

    expect(await inventoryPage.isLoaded()).toBeTruthy();
  });

  test('@regression proceed to checkout from cart', async ({ page }) => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });
});
