import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private selectors = {
    emailInput: 'input[placeholder="Email"]',
    passwordInput: 'input[placeholder="Password"]',
    signInButton: 'button:contains("Sign in")',
    errorMessages: '.error-messages li',
    signUpLink: 'a[href="/register"]',
    pageHeader: 'h1',
  };

  goto(): void {
    this.visit('/login');
  }

  fillEmail(email: string): void {
    this.typeText(this.selectors.emailInput, email);
  }

  fillPassword(password: string): void {
    this.typeText(this.selectors.passwordInput, password);
  }

  clickSignIn(): void {
    cy.get('button').contains('Sign in').click();
  }

  login(email: string, password: string): void {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSignIn();
  }

  verifyLoginPageLoaded(): void {
    this.shouldBeVisible(this.selectors.emailInput);
    this.shouldBeVisible(this.selectors.passwordInput);
  }

  getErrorMessages(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.errorMessages);
  }

  verifyErrorDisplayed(): void {
    cy.get(this.selectors.errorMessages).should('exist').and('be.visible');
  }

  navigateToSignUp(): void {
    cy.get(this.selectors.signUpLink).click();
  }
}
