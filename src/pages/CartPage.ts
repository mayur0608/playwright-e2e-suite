import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private cartItems: Locator;
  private checkoutButton: Locator;
  private continueShoppingButton: Locator;
  private pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems              = page.locator('.cart_item');
    this.checkoutButton         = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.pageTitle              = page.locator('.title');
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(this.pageTitle);
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getCartItemName(index = 0): Promise<string> {
    return this.getText(
      this.cartItems.nth(index).locator('.inventory_item_name')
    );
  }

  async removeItem(index = 0): Promise<void> {
    await this.clickElement(
      this.cartItems.nth(index).locator('button:has-text("Remove")')
    );
  }

  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }

  async continueShopping(): Promise<void> {
    await this.clickElement(this.continueShoppingButton);
  }
}
