import { ArticlePage } from '../../pages/ArticlePage';
import { HomePage } from '../../pages/HomePage';

describe('Article Management - Regression Tests', { tags: ['@regression'] }, () => {
  const articlePage = new ArticlePage();
  const homePage = new HomePage();
  const uniqueId = Date.now().toString().slice(-6);

  beforeEach(() => {
    cy.loginViaApi(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'));
  });

  it('should create a new article with tags', () => {
    articlePage.gotoNewArticle();
    cy.fixture('articles').then((articles) => {
      const title = `${articles.validArticle.title} ${uniqueId}`;
      articlePage.createArticle(
        title,
        articles.validArticle.description,
        articles.validArticle.body,
        articles.validArticle.tags
      );
      articlePage.verifyArticleContent(title, articles.validArticle.body);
    });
  });

  it('should create article without tags', () => {
    articlePage.gotoNewArticle();
    cy.fixture('articles').then((articles) => {
      const title = `${articles.articleWithoutTags.title} ${uniqueId}`;
      articlePage.createArticle(
        title,
        articles.articleWithoutTags.description,
        articles.articleWithoutTags.body
      );
      articlePage.verifyArticlePageLoaded();
    });
  });

  it('should add a comment to an article', () => {
    homePage.goto();
    homePage.switchToGlobalFeed();
    homePage.clickFirstArticle();
    articlePage.addComment(`Test comment ${uniqueId}`);
  });

  it('should toggle favorite on an article', () => {
    homePage.goto();
    homePage.switchToGlobalFeed();
    homePage.getFavoriteButtons().first().then(($btn) => {
      const initialCount = $btn.text().trim();
      homePage.getFavoriteButtons().first().click();
      cy.wait(1000);
      homePage.getFavoriteButtons().first().should('not.have.text', initialCount);
    });
  });

  it('should navigate to article detail and verify content', () => {
    homePage.goto();
    homePage.switchToGlobalFeed();
    homePage.getArticleTitles().first().invoke('text').then((title) => {
      homePage.clickFirstArticle();
      articlePage.verifyArticlePageLoaded();
      cy.get('.article-page h1').should('contain.text', title.trim());
    });
  });
});
