/// <reference types="Cypress" />

context('Column template', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/col-template');
  });

  it('renders custom template for Phone column', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)')
      .should('have.class', 'phone')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2)')
      .contains('rowIndex: 0')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div:nth-child(3)')
      .contains('column: Phone');
  });
});
