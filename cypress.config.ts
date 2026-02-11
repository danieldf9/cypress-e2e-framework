import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://demo.realworld.io',
    specPattern: 'cypress/e2e/**/*.cy.{ts,js}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    env: {
      apiUrl: 'https://conduit.productionready.io/api',
      testUserEmail: 'testuser@example.com',
      testUserPassword: 'Password123!',
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Cypress E2E Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  },
});
