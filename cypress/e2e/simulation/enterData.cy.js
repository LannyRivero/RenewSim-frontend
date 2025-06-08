describe('Energy Simulation Flow - Datos válidos', () => {

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
  
});



