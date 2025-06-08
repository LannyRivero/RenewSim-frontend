// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginViaUI', (email, password) => {
  cy.visit('/login');

  cy.get('input[name="username"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();

  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('register', (name, email, password) => {
  cy.request({
    method: 'POST',
    url: '/api/v1/auth/register',
    body: {
      name,
      email,
      password,
      confirmPassword: password
    },
    failOnStatusCode: false
  }).then((response) => {

    cy.log('Status:', response.status);

    if (response.status === 201) {
      cy.log('✅ Registro exitoso');
    } else {
      cy.log('⚠️ Registro falló con código:', response.status);
    }
  });
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




