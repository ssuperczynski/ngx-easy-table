/// <reference types="Cypress" />

context('Group rows', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/group-rows');
  });

  it('group rows by "Active" status', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1)')
      .contains('Total items: 16')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3)')
      .contains('Debit summary: 4800')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4)')
      .contains('Grouped value: false')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1)')
      .contains('Total items: 15')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(3)')
      .contains('Debit summary: 4500')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(4)')
      .contains('Grouped value: true');
  });
  it('group rows by "Active" status and filter status by "false"', () => {
    cy.getInput('isActive')
      .type('false')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1)')
      .contains('Total items: 16')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3)')
      .contains('Debit summary: 4800')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4)')
      .contains('Grouped value: false')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1)')
      .contains('Total items: 0')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(3)')
      .contains('Debit summary: 0');
  });
  it('group rows by "Active" status and go to pagination 2 step', () => {
    cy.get('#selectors > label:nth-child(1)')
      .click()
      .get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#table > tbody > tr:nth-child(1)')
      .should('be.visible')
      .get('#table > tbody > tr:nth-child(2)')
      .should('be.visible');
  });
});
