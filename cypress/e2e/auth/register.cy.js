
describe('Register Flow', () => {
    beforeEach(() => {
        cy.visit('/register');
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('should show browser validation for empty fields', () => {

        cy.get('button[type="submit"]').should('be.visible').click();

        cy.get('input[name="name"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
        });

        cy.get('input[name="email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
        });

        cy.get('input[name="password"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
        });

        cy.get('input[name="confirmPassword"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
        });
    });

    it('should show error with invalid email format', () => {
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');

        cy.get('button[type="submit"]').click();

        cy.get('input[name="email"]')
            .invoke('prop', 'validationMessage')
            .should('not.be.empty');
    });

    it('should register successfully and redirect to dashboard', () => {
        const randomEmail = `user${Date.now()}@example.com`;

        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type(randomEmail);
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');

        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });
    it('should show error if email is already taken', () => {
        const existingEmail = 'daniel@gmail.com';

        cy.get('input[name="name"]').type('Daniel User');
        cy.get('input[name="email"]').type(existingEmail);
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.contains('Error del servidor. Inténtalo más tarde.').should('be.visible');
    });

});




