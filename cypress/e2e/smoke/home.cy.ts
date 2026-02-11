import { HomePage } from '../../pages/HomePage';

describe('Home Page - Smoke Tests', { tags: ['@smoke'] }, () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.loginViaApi(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'));
    homePage.goto();
  });

  it('should load home page successfully', () => {
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });

  it('should display global feed with articles', () => {
    homePage.switchToGlobalFeed();
    homePage.getArticlePreviews().should('have.length.greaterThan', 0);
  });

  it('should display popular tags in sidebar', () => {
    homePage.getPopularTags().should('have.length.greaterThan', 0);
  });

  it('should filter articles by clicking a tag', () => {
    homePage.getPopularTags().first().then(($tag) => {
      const tagName = $tag.text().trim();
      homePage.clickTag(tagName);
      cy.get('.feed-toggle').should('contain.text', tagName);
    });
  });

  it('should display article titles in feed', () => {
    homePage.switchToGlobalFeed();
    homePage.getArticleTitles().should('have.length.greaterThan', 0);
    homePage.getArticleTitles().each(($title) => {
      expect($title.text().trim()).to.not.be.empty;
    });
  });

  it('should navigate to article detail on click', () => {
    homePage.switchToGlobalFeed();
    homePage.clickFirstArticle();
    cy.get('.article-page').should('be.visible');
  });
});
