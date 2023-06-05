/// <reference types="Cypress" />

context('Template', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/template');
  });

  it('shows row template', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1)')
      .contains('Deanne Contreras')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('Company: KONGENE')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(5) > span')
      .contains('Phone: +1 (949) 527-2108');
  });
  it('shows additional row when "Expand" button clicked', () => {
    cy.get('#expandButton-0')
      .click()
      .get('#table > tbody > tr:nth-child(2) > td > div')
      .contains('Deanne Contreras - 36');
  });
});
