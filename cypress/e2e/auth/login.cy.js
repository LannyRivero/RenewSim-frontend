
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.clearCookies();
    cy.clearLocalStorage();    
  });

  it('should show error with incorrect credentials', () => {  
    cy.get('input[name=username]').type('wrong@example.com');
    cy.get('input[name=password]').type('wrongPassword');
    cy.get('button[type=submit]').click();
    cy.contains('Error del servidor. Inténtalo más tarde.').should('be.visible');   
  })

  it('should show browser validation for empty fields', () => {
 
  cy.get('button[type="submit"]').click();
  
  cy.get('input[name="username"]').then(($emailInput) => {
    expect($emailInput[0].checkValidity()).to.be.false;
  });

  cy.get('input[name="username"]').type('lannyrivero288@gmail.com');

  cy.get('button[type="submit"]').click();

  cy.get('input[name="password"]').then(($passwordInput) => {
    expect($passwordInput[0].checkValidity()).to.be.false;
  });
});

 
});
