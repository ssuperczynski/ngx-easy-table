/// <reference types="Cypress" />

context('Mobile resolution', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/mobile');
      cy.viewport('iphone-6');
    },
  );

  it('collapses row if mobile resolution detected', () => {
    cy
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1)').contains('KONGENE')
      .get('#expandButton-0').should('exist')
      .click()
      .get('#table > tbody > tr:nth-child(2) > td > div > h2').contains('+1 (949) 527-2108')
    ;
  });
});
