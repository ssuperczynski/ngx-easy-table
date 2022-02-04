/// <reference types="Cypress" />

context('Context menu', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/context-menu');
  });

  it('checks if custom context menu works', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .trigger('contextmenu')
      .get('#table > tbody > ul > ul > li > div:nth-child(1)')
      .contains('Edit cell')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div > input')
      .should('exist');
  });
  it('checks if clicking outside table closes context menu', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .trigger('contextmenu')
      .get('#table > tbody > ul > ul > li > div:nth-child(1)')
      .contains('Edit cell')
      .get('#content > div > div > h3')
      .click()
      .get('#table > tbody > ul > ul > li > div:nth-child(1)')
      .should('not.exist');
  });
});
