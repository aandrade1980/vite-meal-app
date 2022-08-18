const baseUrl = Cypress.env('host') || 'http://127.0.0.1:5173';

describe('search for a meal', () => {
  it('should go to the home page and make a search', () => {
    cy.visit(baseUrl);
  });
});
