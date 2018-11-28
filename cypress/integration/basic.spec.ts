/// <reference types="Cypress" />

context('Basic config', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/basic');
    },
  );

  it('gets correct row data when no config', () => {
    cy
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (949) 527-2108')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(2) > div').contains('36')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('KONGENE')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div').contains('Deanne Contreras')
    ;
  });
});
