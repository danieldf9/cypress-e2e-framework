describe('Users API Tests', { tags: ['@api'] }, () => {
  const apiUrl = Cypress.env('apiUrl') || 'https://api.realworld.show/api';
  const uniqueId = Date.now().toString().slice(-8);

  it('POST /users - should register a new user', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/users`,
      body: {
        user: {
          username: `testuser_${uniqueId}`,
          email: `testuser_${uniqueId}@test.com`,
          password: 'Password123!',
        },
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body.user).to.have.property('email');
      expect(response.body.user).to.have.property('username');
      expect(response.body.user).to.have.property('token');
    });
  });

  it('POST /users/login - should login with valid credentials', () => {
    const email = `login_${uniqueId}@test.com`;
    const password = 'Password123!';
    cy.request('POST', `${apiUrl}/users`, {
      user: { username: `login_${uniqueId}`, email, password },
    }).then(() => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/users/login`,
        body: { user: { email, password } },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body.user.email).to.eq(email);
        expect(response.body.user.token).to.not.be.empty;
      });
    });
  });

  it('POST /users/login - should fail with invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/users/login`,
      body: { user: { email: 'nonexistent@test.com', password: 'wrong' } },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403, 422]);
    });
  });

  it('PUT /user - should update user profile', () => {
    const email = `update_${uniqueId}@test.com`;
    const password = 'Password123!';
    cy.request('POST', `${apiUrl}/users`, {
      user: { username: `update_${uniqueId}`, email, password },
    }).then((createResponse) => {
      const token = createResponse.body.user.token;
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/user`,
        headers: { Authorization: `Token ${token}` },
        body: { user: { bio: 'Updated bio via API test' } },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body.user.bio).to.eq('Updated bio via API test');
      });
    });
  });
});
