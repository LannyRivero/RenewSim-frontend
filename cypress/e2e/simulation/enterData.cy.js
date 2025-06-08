

describe('Energy Simulation Flow ', () => {

  beforeEach(() => {
    cy.fixture('users').then((users) => {
      const user = users.daniel;
      cy.loginViaUI(user.email, user.password);
    });
  });

  it('should allow entering valid data and display correct results', () => {

    cy.fixture('simulationData').then((data) => {
      const { location, consumption, energyType } = data.validSimulation;

      cy.get('form').should('be.visible');
      cy.fillSimulationForm(location, consumption, energyType);
      cy.contains('h3', 'Simulation Results').should('be.visible');

      const expectedResults = [
        'Energia Generada al Año',
        'Ahorros Estimados',
        'Retorno de Inversión'
      ];

      expectedResults.forEach((resultText) => {
        cy.contains(resultText).should('be.visible');
      });

      cy.log('✅ Flujo de simulación completado con éxito y resultados verificados');
    });
  });

it('should show validation errors with invalid data', () => {
  cy.fixture('simulationData').then((data) => {
    const { location, consumption, energyType } = data.invalidSimulation;

    cy.get('form').should('be.visible');
    cy.fillSimulationForm(location, consumption, energyType);

    cy.contains('La ubicación es obligatoria').should('be.visible');
    cy.contains('Debe estar entre 50 y 100000 kWh/mes.').should('be.visible');

    cy.log('⚠️ Errores correctamente mostrados para datos inválidos');
  });
});

it('should handle high budget simulation data', () => {
    cy.fixture('simulationData').then((data) => {
      const { location, consumption, energyType } = data.highBudgetSimulation;

      cy.get('form').should('be.visible');
      cy.fillSimulationForm(location, consumption, energyType);

      cy.contains('h3', 'Simulation Results').should('be.visible');
      cy.contains('Ahorros Estimados').should('be.visible');

      cy.log('💰 Flujo con alto presupuesto verificado');
    });
  });


});



