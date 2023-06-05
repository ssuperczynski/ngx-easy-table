/// <reference types="Cypress" />

context('Column class', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/column-class');
  });
  it('by default "Company" column has class "blue"', () => {
    cy.get('#table > thead > tr:nth-child(1) > th:nth-child(3)')
      .should('not.have.class', 'blue')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3)')
      .should('have.class', 'blue');
  });
  it('by default "Level" column has class "pink" including header', () => {
    cy.get('#table > thead > tr:nth-child(1) > th:nth-child(4)')
      .should('have.class', 'pink')
      .get('#table > thead > tr:nth-child(2) > th:nth-child(4)')
      .should('have.class', 'pink')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4)')
      .should('have.class', 'pink');
  });
});
