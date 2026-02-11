export class BasePage {
  visit(path: string): void {
    cy.visit(path);
  }

  getElement(selector: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(selector);
  }

  clickElement(selector: string): void {
    cy.get(selector).should('be.visible').click();
  }

  typeText(selector: string, text: string): void {
    cy.get(selector).should('be.visible').clear().type(text);
  }

  getText(selector: string): Cypress.Chainable<string> {
    return cy.get(selector).invoke('text');
  }

  shouldBeVisible(selector: string): void {
    cy.get(selector).should('be.visible');
  }

  shouldContainText(selector: string, text: string): void {
    cy.get(selector).should('contain.text', text);
  }

  shouldHaveLength(selector: string, length: number): void {
    cy.get(selector).should('have.length', length);
  }

  waitForElement(selector: string, timeout = 10000): void {
    cy.get(selector, { timeout }).should('exist');
  }

  getElementCount(selector: string): Cypress.Chainable<number> {
    return cy.get(selector).its('length');
  }

  scrollToElement(selector: string): void {
    cy.get(selector).scrollIntoView();
  }

  interceptApi(method: string, url: string, alias: string): void {
    cy.intercept(method, url).as(alias);
  }

  waitForApiResponse(alias: string): void {
    cy.wait(`@${alias}`);
  }

  takeScreenshot(name: string): void {
    cy.screenshot(name);
  }

  verifyUrl(expectedUrl: string | RegExp): void {
    cy.url().should('match', typeof expectedUrl === 'string' ? new RegExp(expectedUrl) : expectedUrl);
  }
}
