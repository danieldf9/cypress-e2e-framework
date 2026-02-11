import { LoginPage } from '../../pages/LoginPage';

describe('Login Feature - Smoke Tests', { tags: ['@smoke'] }, () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.goto();
  });

  it('should display login page with all elements', () => {
    loginPage.verifyLoginPageLoaded();
    cy.contains('Sign in').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.validUser.email, users.validUser.password);
      cy.url().should('not.include', '/login');
      cy.get('nav.navbar').should('be.visible');
    });
  });

  it('should show error message for invalid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.invalidUser.email, users.invalidUser.password);
      loginPage.verifyErrorDisplayed();
    });
  });

  it('should show error for empty email', () => {
    loginPage.fillPassword('Password123!');
    loginPage.clickSignIn();
    loginPage.verifyErrorDisplayed();
  });

  it('should show error for empty password', () => {
    loginPage.fillEmail('test@example.com');
    loginPage.clickSignIn();
    loginPage.verifyErrorDisplayed();
  });

  it('should navigate to sign up page', () => {
    loginPage.navigateToSignUp();
    cy.url().should('include', '/register');
  });
});
