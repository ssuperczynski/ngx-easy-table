/// <reference types="Cypress" />

context('Dynamic row', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/dynamic-row');
  });

  it('creates 6th and 7th row', () => {
    cy.get('#add-row-button')
      .click()
      .click()
      .get('#table > tbody > tr:nth-child(6) > td:nth-child(1) > div')
      .contains('ACTIVE')
      .get('#table > tbody > tr:nth-child(7) > td:nth-child(1) > div')
      .contains('ACTIVE');
  });
});
