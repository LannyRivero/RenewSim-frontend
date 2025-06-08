Cypress.Commands.add('loginViaUI', (email, password) => {
  cy.visit('/login');

  cy.get('input[name="username"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();

  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('loginByApi', (username, password) => {

  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/v1/auth/login',
    body: { username, password },
  }).then((response) => {
    expect(response.status).to.eq(200);

    // Guarda el token en localStorage
    const token = response.body.token;
    window.localStorage.setItem('authToken', token);
  });
});
