describe('Articles API Tests', { tags: ['@api'] }, () => {
  const apiUrl = Cypress.env('apiUrl') || 'https://api.realworld.io/api';
  const uniqueId = Date.now().toString().slice(-8);
  let authToken: string;

  before(() => {
    const email = `articles_${uniqueId}@test.com`;
    cy.request('POST', `${apiUrl}/users`, {
      user: { username: `articles_${uniqueId}`, email, password: 'Password123!' },
    }).then((response) => {
      authToken = response.body.user.token;
    });
  });

  it('GET /articles - should return list of articles', () => {
    cy.request({ method: 'GET', url: `${apiUrl}/articles`, qs: { limit: 10 } }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.articles).to.be.an('array');
      expect(response.body).to.have.property('articlesCount');
    });
  });

  it('POST /articles - should create a new article', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/articles`,
      headers: { Authorization: `Token ${authToken}` },
      body: {
        article: {
          title: `API Test Article ${uniqueId}`,
          description: 'Created via Cypress API test',
          body: 'This article was created through automated API testing.',
          tagList: ['cypress', 'api-testing'],
        },
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body.article.title).to.eq(`API Test Article ${uniqueId}`);
      expect(response.body.article.tagList).to.include('cypress');
    });
  });

  it('DELETE /articles/:slug - should delete an article', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/articles`,
      headers: { Authorization: `Token ${authToken}` },
      body: { article: { title: `Delete Test ${uniqueId}`, description: 'To be deleted', body: 'This will be deleted' } },
    }).then((createResponse) => {
      const slug = createResponse.body.article.slug;
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/articles/${slug}`,
        headers: { Authorization: `Token ${authToken}` },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 204]);
      });
    });
  });

  it('POST /articles/:slug/comments - should add comment', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/articles`,
      headers: { Authorization: `Token ${authToken}` },
      body: { article: { title: `Comment Test ${uniqueId}`, description: 'Test', body: 'Body' } },
    }).then((createResponse) => {
      const slug = createResponse.body.article.slug;
      cy.request({
        method: 'POST',
        url: `${apiUrl}/articles/${slug}/comments`,
        headers: { Authorization: `Token ${authToken}` },
        body: { comment: { body: 'Automated test comment' } },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body.comment.body).to.eq('Automated test comment');
      });
    });
  });

  it('GET /tags - should return list of tags', () => {
    cy.request(`${apiUrl}/tags`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.tags).to.be.an('array');
    });
  });

  it('POST /articles/:slug/favorite - should favorite article', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/articles`,
      headers: { Authorization: `Token ${authToken}` },
      body: { article: { title: `Favorite Test ${uniqueId}`, description: 'Test', body: 'Body' } },
    }).then((createResponse) => {
      const slug = createResponse.body.article.slug;
      cy.request({
        method: 'POST',
        url: `${apiUrl}/articles/${slug}/favorite`,
        headers: { Authorization: `Token ${authToken}` },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body.article.favorited).to.be.true;
      });
    });
  });
});
