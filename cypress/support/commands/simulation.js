
Cypress.Commands.add('fillSimulationForm', (location, consumption, energyType) => {

  if (location) {
    cy.get('#location')
      .should('be.visible')
      .clear()
      .type(location);
  }
  if (consumption) {
    cy.get('#energyConsumption')
      .should('be.visible')
      .clear()
      .type(consumption);
  }
  if (energyType) {
    cy.get('#energyType')
      .should('be.visible')
      .select(energyType);
  }
  cy.get('button[type="submit"]')
    .should('be.enabled')
    .click();
});

