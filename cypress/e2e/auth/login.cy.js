
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
 
});
