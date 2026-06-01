import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;
  private loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput  = page.locator('[data-test="username"]');
    this.passwordInput  = page.locator('[data-test="password"]');
    this.loginButton    = page.locator('[data-test="login-button"]');
    this.errorMessage   = page.locator('[data-test="error"]');
    this.loginLogo      = page.locator('.login_logo');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillField(this.usernameInput, username);
    await this.fillField(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async isLoginPageVisible(): Promise<boolean> {
    return this.isVisible(this.loginLogo);
  }

  async isErrorDisplayed(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }
}
