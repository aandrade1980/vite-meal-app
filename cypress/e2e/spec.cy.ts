const baseUrl = Cypress.env('host') || 'http://127.0.0.1:5173';

describe('home page', () => {
  it('should go to the home page', () => {
    cy.visit(baseUrl);

    cy.contains('Welcome to Meal App');
  });
});
