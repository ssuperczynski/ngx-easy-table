/// <reference types="Cypress" />

context('Additional actions template', () => {
  beforeEach(() => {
      cy.visit('http://127.0.0.1:4201/#/additional-actions-template');
    },
  );

  it('checks if additional actions menu works', () => {
    cy
      .get('#search_phone')
      .should('not.exist')
      .get('#table > thead > tr > th.ngx-table__header-cell-additional-actions > div > a')
      .click()
      .get('#table > thead > tr > th.ngx-table__header-cell-additional-actions > div > ul > ul > li:nth-child(2)')
      .click()
      .get('#search_phone')
      .should('exist')
    ;
  });
  it('checks if clicking outside table closes additional actions menu', () => {
    cy
      .get('#table > thead > tr > th.ngx-table__header-cell-additional-actions > div > a')
      .click()
      .get('#table > thead > tr > th.ngx-table__header-cell-additional-actions > div > ul > ul > li:nth-child(2)')
      .should('exist')
      .get('#content > div > div > h3').click()
      .get('#table > tbody > ul > ul > li > div:nth-child(1)')
      .should('not.exist')
    ;
  });
});
