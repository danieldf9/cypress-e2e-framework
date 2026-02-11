import { SettingsPage } from '../../pages/SettingsPage';

describe('Settings Page - Regression Tests', { tags: ['@regression'] }, () => {
  const settingsPage = new SettingsPage();

  beforeEach(() => {
    cy.loginViaApi(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'));
    settingsPage.goto();
  });

  it('should load settings page with all fields', () => {
    settingsPage.verifySettingsPageLoaded();
  });

  it('should update user bio', () => {
    const newBio = `QA Engineer - Updated ${Date.now()}`;
    settingsPage.updateBio(newBio);
    settingsPage.clickUpdate();
    cy.url().should('include', '/@');
  });

  it('should logout successfully', () => {
    settingsPage.logout();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.get('nav.navbar').should('contain.text', 'Sign in');
  });
});
