import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private selectors = {
    globalFeedTab: '.feed-toggle a:contains("Global Feed")',
    yourFeedTab: '.feed-toggle a:contains("Your Feed")',
    articlePreviews: '.article-preview',
    articleTitles: '.article-preview h1',
    popularTags: '.sidebar .tag-list .tag-pill',
    navBar: 'nav.navbar',
    newArticleLink: 'a[href="/editor"]',
    settingsLink: 'a[href="/settings"]',
    pagination: '.pagination .page-item',
    favoriteButtons: '.article-preview .btn-outline-primary',
  };

  goto(): void {
    this.visit('/');
  }

  switchToGlobalFeed(): void {
    cy.contains('Global Feed').click();
  }

  switchToYourFeed(): void {
    cy.contains('Your Feed').click();
  }

  getArticlePreviews(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.articlePreviews);
  }

  getArticleTitles(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.articleTitles);
  }

  getPopularTags(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.popularTags);
  }

  clickTag(tagName: string): void {
    cy.get(this.selectors.popularTags).contains(tagName).click();
  }

  verifyUserLoggedIn(username: string): void {
    cy.get(this.selectors.navBar).should('contain.text', username);
  }

  navigateToNewArticle(): void {
    cy.get(this.selectors.newArticleLink).click();
  }

  navigateToSettings(): void {
    cy.get(this.selectors.settingsLink).click();
  }

  clickFirstArticle(): void {
    cy.get(this.selectors.articleTitles).first().click();
  }

  navigateToPage(pageNumber: number): void {
    cy.get(this.selectors.pagination).eq(pageNumber - 1).click();
  }

  getFavoriteButtons(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.favoriteButtons);
  }
}
