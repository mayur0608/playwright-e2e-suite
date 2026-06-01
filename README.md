# Playwright E2E Suite

![CI](https://github.com/mayur0608/playwright-e2e-suite/actions/workflows/playwright-ci.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs)

End-to-end test automation suite built with **Playwright + TypeScript** using the Page Object Model pattern. Tests run across Chromium, Firefox, and mobile viewports with full CI/CD integration.

---

## Project Structure

```
playwright-e2e-suite/
├── src/
│   ├── pages/                  # Page Object Model
│   │   ├── BasePage.ts         # Base class with shared utilities
│   │   ├── LoginPage.ts        # Login page interactions
│   │   ├── InventoryPage.ts    # Product inventory page
│   │   └── CartPage.ts         # Shopping cart page
│   ├── tests/                  # Test suites
│   │   ├── login.spec.ts       # Login test scenarios
│   │   ├── inventory.spec.ts   # Inventory/product tests
│   │   └── cart.spec.ts        # Cart management tests
│   └── data/
│       └── testData.ts         # Test data and constants
├── playwright.config.ts        # Playwright configuration
├── package.json
└── .github/workflows/
    ├── playwright-ci.yml       # CI pipeline
    └── daily_commit.yml        # Daily activity agent
```

---

## Test Coverage

| Module | Tests | Tags |
|---|---|---|
| Login | Valid login, locked user, invalid creds, empty fields | @smoke @regression |
| Inventory | Item count, add to cart, sorting, navigation | @smoke @regression |
| Cart | Add items, remove items, checkout, continue shopping | @smoke @regression |

---

## Running Tests

### Install
```bash
npm install
npx playwright install
```

### Run all tests
```bash
npm test
```

### Run smoke tests only
```bash
npm run test:smoke
```

### Run with UI mode
```bash
npm run test:ui
```

### Run specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### View report
```bash
npm run report
```

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Playwright | ^1.40 | Browser automation |
| TypeScript | ^5.3 | Type safety |
| Node.js | 20 | Runtime |
| GitHub Actions | — | CI/CD pipeline |
