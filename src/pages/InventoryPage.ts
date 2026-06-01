import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private pageTitle: Locator;
  private inventoryItems: Locator;
  private cartIcon: Locator;
  private cartBadge: Locator;
  private sortDropdown: Locator;
  private burgerMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle      = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon       = page.locator('.shopping_cart_link');
    this.cartBadge      = page.locator('.shopping_cart_badge');
    this.sortDropdown   = page.locator('[data-test="product_sort_container"]');
    this.burgerMenu     = page.locator('#react-burger-menu-btn');
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(this.pageTitle);
  }

  async getPageTitle(): Promise<string> {
    return this.getText(this.pageTitle);
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async addItemToCart(itemIndex = 0): Promise<void> {
    const addButton = this.inventoryItems.nth(itemIndex)
      .locator('button:has-text("Add to cart")');
    await this.clickElement(addButton);
  }

  async getItemName(itemIndex = 0): Promise<string> {
    return this.getText(
      this.inventoryItems.nth(itemIndex).locator('.inventory_item_name')
    );
  }

  async getItemPrice(itemIndex = 0): Promise<string> {
    return this.getText(
      this.inventoryItems.nth(itemIndex).locator('.inventory_item_price')
    );
  }

  async getCartBadgeCount(): Promise<string> {
    return this.getText(this.cartBadge);
  }

  async goToCart(): Promise<void> {
    await this.clickElement(this.cartIcon);
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }
}
