
Cypress.Commands.add('fillSimulationForm', (location, consumption, energyType) => {
  cy.get('#location')
    .should('be.visible')
    .clear()
    .type(location);

  cy.get('#energyConsumption')
    .should('be.visible')
    .clear()
    .type(consumption);

  cy.get('#energyType')
    .should('be.visible')
    .select(energyType);

  cy.get('button[type="submit"]')
    .should('be.enabled')
    .click();
});
