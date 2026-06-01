import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { TEST_USERS, EXPECTED_MESSAGES, INVENTORY } from '../data/testData';

test.describe('Login Tests', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('@smoke valid user can log in successfully', async () => {
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);

    expect(await inventoryPage.isLoaded()).toBeTruthy();
    expect(await inventoryPage.getPageTitle()).toBe(INVENTORY.expectedTitle);
  });

  test('@regression locked out user sees error message', async () => {
    await loginPage.login(TEST_USERS.locked.username, TEST_USERS.locked.password);

    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain(EXPECTED_MESSAGES.lockedError);
  });

  test('@regression invalid credentials show error', async () => {
    await loginPage.login(TEST_USERS.invalid.username, TEST_USERS.invalid.password);

    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain(EXPECTED_MESSAGES.invalidError);
  });

  test('@regression empty username shows validation error', async () => {
    await loginPage.login('', TEST_USERS.standard.password);

    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain(EXPECTED_MESSAGES.emptyUsername);
  });

  test('@regression empty password shows validation error', async () => {
    await loginPage.login(TEST_USERS.standard.username, '');

    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain(EXPECTED_MESSAGES.emptyPassword);
  });

  test('@smoke login page is visible on load', async () => {
    expect(await loginPage.isLoginPageVisible()).toBeTruthy();
  });
});
