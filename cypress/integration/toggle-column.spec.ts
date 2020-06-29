/// <reference types="Cypress" />

context('Toggle column config', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/toggle-column');
  });

  it('hides "Age column"', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (949) 527-2108')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(2) > div')
      .contains('36')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('KONGENE')
      .get('#content > div > app-toggle-column > div:nth-child(1) > div > div > label:nth-child(2)')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (949) 527-2108')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(2) > div')
      .contains('KONGENE')
      .get('#content > div > app-toggle-column > div:nth-child(1) > div > div > label:nth-child(2)')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (949) 527-2108')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(2) > div')
      .contains('36')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('KONGENE');
  });
});
