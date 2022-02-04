/// <reference types="Cypress" />

context('No results template', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4202/#/no-results-template');
  });

  it('show custom "no-results-template"', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1)').contains(
      "I didn't find any results for you :("
    );
  });
});
