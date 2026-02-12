/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    loginViaApi(email: string, password: string): Chainable<void>;
    createArticleViaApi(title: string, description: string, body: string, tags?: string[]): Chainable<any>;
    deleteArticleViaApi(slug: string): Chainable<void>;
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    shouldBeVisible(selector: string): Chainable<JQuery<HTMLElement>>;
    waitForApi(alias: string): Chainable<any>;
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[placeholder="Email"]').clear().type(email);
  cy.get('input[placeholder="Password"]').clear().type(password);
  cy.get('button').contains('Sign in').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('loginViaApi', (email: string, password: string) => {
  const apiUrl = Cypress.env('apiUrl') || 'https://api.realworld.show/api';
  cy.request({
    method: 'POST',
    url: `${apiUrl}/users/login`,
    body: { user: { email, password } },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200 || response.status === 201) {
      const token = response.body.user.token;
      const user = response.body.user;
      window.localStorage.setItem('jwtToken', token);
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('auth_token', token);
    }
  });
});

Cypress.Commands.add('createArticleViaApi', (title: string, description: string, body: string, tags: string[] = []) => {
  const token = window.localStorage.getItem('jwtToken');
  const apiUrl = Cypress.env('apiUrl') || 'https://api.realworld.show/api';
  return cy.request({
    method: 'POST',
    url: `${apiUrl}/articles`,
    headers: { Authorization: `Token ${token}` },
    body: { article: { title, description, body, tagList: tags } },
  });
});

Cypress.Commands.add('deleteArticleViaApi', (slug: string) => {
  const token = window.localStorage.getItem('jwtToken');
  const apiUrl = Cypress.env('apiUrl') || 'https://api.realworld.show/api';
  cy.request({
    method: 'DELETE',
    url: `${apiUrl}/articles/${slug}`,
    headers: { Authorization: `Token ${token}` },
  });
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('shouldBeVisible', (selector: string) => {
  return cy.get(selector).should('be.visible');
});

Cypress.Commands.add('waitForApi', (alias: string) => {
  return cy.wait(`@${alias}`);
});
