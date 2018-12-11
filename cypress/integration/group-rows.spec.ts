/// <reference types="Cypress" />

context('Group rows', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/group-rows');
    },
  );

  it('group rows by "Active" status', () => {
    cy
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1)').contains('Total items: 16 (false)')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3)').contains('SUM: 4800')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1)').contains('Total items: 15 (true)')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(3)').contains('SUM: 4500')
    ;
  });
});
