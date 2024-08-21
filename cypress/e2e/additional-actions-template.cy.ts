/// <reference types="Cypress" />

context('Additional actions template', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/additional-actions-template');
  });

  it('checks if additional actions menu works', () => {
    cy.get('#search_phone')
      .should('not.be.visible')
      .get('#additional-actions')
      .click()
      .get('#enableSearch')
      .click()
      .get('#search_phone')
      .should('be.visible');
  });
  it('checks if clicking outside table closes additional actions menu', () => {
    cy.get('#additional-actions')
      .click()
      .get('#enableSearch')
      .should('exist')
      .get('body > app-table > div > div > div.col-10 > div > h3')
      .click()
      .get('#table > tbody > ul > ul > li > div:nth-child(1)')
      .should('not.exist');
  });
});
