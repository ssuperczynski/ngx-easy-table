/// <reference types="Cypress" />

context('Summary footer', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/summary-footer');
  });

  it('Shows correct tfoot content', () => {
    cy.get('#table1 > tfoot > tr > th > span:nth-child(1)').contains('Total items: 41');
    cy.get('#table1 > tfoot > tr > th > span:nth-child(2)').contains('limit: 10');
    cy.get('#table1 > tfoot > tr > th > span:nth-child(3)').contains('page: 0');
    cy.get('#table1 > tfoot > tr > th > span:nth-child(4)').contains('Summary: 1231');
  });
});
