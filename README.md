# 🌲 Cypress E2E Test Automation Framework

[![Cypress Tests](https://github.com/danieldf9/cypress-e2e-framework/actions/workflows/cypress.yml/badge.svg)](https://github.com/danieldf9/cypress-e2e-framework/actions)
[![Cypress](https://img.shields.io/badge/Cypress-13.6-green.svg)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-grade **End-to-End Test Automation Framework** built with **Cypress** and **TypeScript**, showcasing Page Object Model, custom commands, API testing, data-driven testing, and CI/CD integration with GitHub Actions.

---

## 🏗️ Architecture

```
cypress-e2e-framework/
├── cypress/
│   ├── e2e/                          # Test specifications
│   │   ├── smoke/                    # Smoke test suite
│   │   │   ├── login.cy.ts           # Login smoke tests
│   │   │   └── home.cy.ts            # Home page smoke tests
│   │   ├── regression/               # Regression test suite
│   │   │   ├── article.cy.ts         # Article management tests
│   │   │   └── settings.cy.ts        # Settings page tests
│   │   └── api/                      # API test suite
│   │       ├── users-api.cy.ts       # Users API tests
│   │       └── articles-api.cy.ts    # Articles API tests
│   ├── pages/                        # Page Object Model classes
│   │   ├── BasePage.ts               # Base page with shared methods
│   │   ├── LoginPage.ts              # Login page interactions
│   │   ├── HomePage.ts               # Home/feed page interactions
│   │   ├── ArticlePage.ts            # Article CRUD page
│   │   └── SettingsPage.ts           # Settings page
│   ├── support/
│   │   ├── commands.ts               # Custom Cypress commands
│   │   └── e2e.ts                    # Global test configuration
│   └── fixtures/                     # Test data files
│       ├── users.json                # User test data
│       └── articles.json             # Article test data
├── .github/workflows/
│   └── cypress.yml                   # GitHub Actions CI/CD
├── cypress.config.ts                 # Cypress configuration
└── package.json
```

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Page Object Model** | Clean abstraction of UI interactions |
| **Custom Commands** | Reusable `cy.login()`, `cy.loginViaApi()`, `cy.createArticleViaApi()` |
| **API Testing** | Full REST API test coverage using `cy.request()` |
| **Data-Driven Tests** | JSON fixtures for test data management |
| **Test Tagging** | `@smoke`, `@regression`, `@api` tag-based execution |
| **Cross-Browser** | Chrome, Firefox, Edge support |
| **CI/CD Pipeline** | GitHub Actions with staged execution (smoke → regression) |
| **API Login Bypass** | Fast auth via API to skip UI login |
| **Network Interception** | `cy.intercept()` for API mocking/stubbing |
| **Rich Reporting** | Mochawesome HTML reports with embedded screenshots |
| **Auto-Retries** | Configurable retry strategy for flaky tests |
| **Video Recording** | Full test execution video capture |

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/danieldf9/cypress-e2e-framework.git
cd cypress-e2e-framework
npm install
```

### Running Tests

```bash
npm run cy:open              # Interactive Test Runner
npm run cy:run               # Run all tests headlessly
npm run cy:run:chrome        # Chrome only
npm run cy:run:firefox       # Firefox only
npm run cy:run:edge          # Edge only
npm run cy:run:smoke         # Smoke tests
npm run cy:run:regression    # Regression tests
npm run cy:run:api           # API tests
```

## 🧪 Test Coverage

### Smoke Tests
- **Login** — Valid/invalid credentials, empty fields, navigation
- **Home Page** — Feed display, tag filtering, article previews

### Regression Tests
- **Articles** — Create with/without tags, comments, favorites
- **Settings** — Profile updates, logout functionality

### API Tests
- **Users API** — Registration, login, profile updates
- **Articles API** — CRUD, comments, favorites, tags

## 🔧 Custom Commands

```typescript
cy.login('user@email.com', 'password');           // Login via UI
cy.loginViaApi('user@email.com', 'password');     // Login via API (faster)
cy.createArticleViaApi('Title', 'Desc', 'Body');  // Create article via API
cy.deleteArticleViaApi('article-slug');            // Delete article via API
```

## 📊 Reporting

- **Mochawesome Reports**: `cypress/reports/` — HTML reports with charts
- **Screenshots**: Captured on failure in `cypress/screenshots/`
- **Videos**: Full run recordings in `cypress/videos/`

## 📝 License

This project is licensed under the MIT License.
