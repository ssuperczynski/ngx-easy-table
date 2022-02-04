/// <reference types="Cypress" />

context('Async', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4202/#/async');
  });

  it('gets correct row data when async call', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (949) 527-2108')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(2) > div')
      .contains('36')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('KONGENE')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('Deanne Contreras');
  });
});
