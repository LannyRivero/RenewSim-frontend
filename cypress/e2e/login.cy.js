describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should show validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('El email es obligatorio').should('be.visible');
    cy.contains('La contraseña es obligatoria').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.get('input[name="email"]').type('usuario@ejemplo.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
