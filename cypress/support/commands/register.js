
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
