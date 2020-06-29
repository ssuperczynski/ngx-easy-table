/// <reference types="Cypress" />

context('Row details template', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/row-template');
  });

  it('gets first row details', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(6) > span')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('KONGENE')
      .get('#table > tbody > tr:nth-child(2) > td > div > h2')
      .contains('+1 (949) 527-2108');
  });
});
