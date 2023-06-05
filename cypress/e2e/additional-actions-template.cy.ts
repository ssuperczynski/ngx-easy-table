/// <reference types="Cypress" />

context('Additional actions template', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/additional-actions-template');
  });

  it('checks if additional actions menu works', () => {
    cy.get('#search_phone')
      .should('not.be.visible')
      .get('#table > thead > tr > th.ngx-table__header-cell-additional-actions > div > a')
      .click()
      .get('#enableSearch')
      .click()
      .get('#search_phone')
      .should('be.visible');
  });
  it('checks if clicking outside table closes additional actions menu', () => {
    cy.get('#table > thead > tr > th.ngx-table__header-cell-additional-actions > div > a')
      .click()
      .get('#enableSearch')
      .should('exist')
      .get('#content > div > div > h3')
      .click()
      .get('#table > tbody > ul > ul > li > div:nth-child(1)')
      .should('not.exist');
  });
});
