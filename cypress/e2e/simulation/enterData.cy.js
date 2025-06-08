describe('Energy Simulation Flow - Datos válidos', () => {

beforeEach(() => {
  cy.visit('https://localhost:5174/login');

  cy.get('#username').type('daniel@gmail.com');
  cy.get('#password').type('daniel');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard/user');
});


it('Debe permitir ingresar datos válidos y mostrar resultados correctos', () => {
  cy.get('form').should('be.visible');

  cy.get('#location').type('Gijón');
  cy.get('#energyConsumption').type('100');
  cy.get('#energyType').select('solar');

  cy.get('button[type="submit"]').click();
  cy.contains('h3', 'Simulation Results').should('be.visible');
  cy.contains('Energia Generada al Año').should('be.visible');
  cy.contains('Ahorros Estimados').should('be.visible');
  cy.contains('Retorno de Inversión').should('be.visible');
});






});


