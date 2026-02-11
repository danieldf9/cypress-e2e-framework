import { BasePage } from './BasePage';

export class ArticlePage extends BasePage {
  private selectors = {
    titleInput: 'input[placeholder="Article Title"]',
    descriptionInput: 'input[placeholder="What\'s this article about?"]',
    bodyInput: 'textarea[placeholder="Write your article (in markdown)"]',
    tagsInput: 'input[placeholder="Enter tags"]',
    publishButton: 'button:contains("Publish Article")',
    articleTitle: '.article-page h1',
    articleBody: '.article-content',
    editButton: 'a:contains("Edit Article")',
    deleteButton: 'button:contains("Delete Article")',
    commentInput: 'textarea[placeholder="Write a comment..."]',
    postCommentButton: 'button:contains("Post Comment")',
    comments: '.card',
    favoriteButton: '.btn-outline-primary',
  };

  gotoNewArticle(): void {
    this.visit('/editor');
  }

  fillTitle(title: string): void {
    this.typeText(this.selectors.titleInput, title);
  }

  fillDescription(description: string): void {
    this.typeText(this.selectors.descriptionInput, description);
  }

  fillBody(body: string): void {
    this.typeText(this.selectors.bodyInput, body);
  }

  addTag(tag: string): void {
    cy.get(this.selectors.tagsInput).type(`${tag}{enter}`);
  }

  clickPublish(): void {
    cy.get('button').contains('Publish Article').click();
  }

  createArticle(title: string, description: string, body: string, tags?: string[]): void {
    this.fillTitle(title);
    this.fillDescription(description);
    this.fillBody(body);
    if (tags) {
      tags.forEach((tag) => this.addTag(tag));
    }
    this.clickPublish();
  }

  verifyArticleContent(title: string, body: string): void {
    cy.get(this.selectors.articleTitle).should('contain.text', title);
    cy.get(this.selectors.articleBody).should('contain.text', body);
  }

  verifyArticlePageLoaded(): void {
    cy.get(this.selectors.articleTitle).should('be.visible');
    cy.get(this.selectors.articleBody).should('be.visible');
  }

  addComment(comment: string): void {
    this.typeText(this.selectors.commentInput, comment);
    cy.get('button').contains('Post Comment').click();
  }

  deleteArticle(): void {
    cy.get('button').contains('Delete Article').first().click();
  }

  toggleFavorite(): void {
    cy.get(this.selectors.favoriteButton).first().click();
  }

  getComments(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.comments);
  }
}
