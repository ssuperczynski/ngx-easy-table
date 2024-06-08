/// <reference types="Cypress" />

context('Summary footer', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/summary-footer');
  });

  it('Shows correct tfoot content', () => {
    cy.get('#table1 > tfoot > tr > th').contains('Total items: 41 limit: 10 page: 1 Summary: 1231');
  });
});
