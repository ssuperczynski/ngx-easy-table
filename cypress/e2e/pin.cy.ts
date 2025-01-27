/// <reference types="Cypress" />

context.skip('Pinned column', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/pinned');
  });
  it('by default first column is pinned', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1)').should(
      'have.class',
      'pinned-left'
    );
  });
  it('first column is pinned when using pagination', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1)')
      .should('have.class', 'pinned-left');
  });
  it('first column is pinned when search enabled', () => {
    cy.getInput('company')
      .type('COLAIRE')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1)')
      .should('have.class', 'pinned-left');
  });
});
