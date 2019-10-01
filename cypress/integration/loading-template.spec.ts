/// <reference types="Cypress" />

context('Loading template', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/loading-template');
    },
  );

  it('gets custom loading template', () => {
    cy
      .get('#table > tbody > tr > td > div')
      .should('have.class', 'loader')
    ;
  });
});
