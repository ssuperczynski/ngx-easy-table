/// <reference types="Cypress" />

context('Checkboxes', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/checkbox-default');
    },
  );

  it('selects 3 checkboxes', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > label > em')
      .click()
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > label > em')
      .click()
      .get('#table > tbody > tr:nth-child(3) > td:nth-child(1) > label > em')
      .click()
      .get('#selected')
      .contains('Selected: 3');
  });
  it('unselect all selected checkboxes', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > label > em')
      .click()
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > label > em')
      .click()
      .get('#table > tbody > tr:nth-child(3) > td:nth-child(1) > label > em')
      .click()
      .get('#selected')
      .contains('Selected: 0');
  });
  it('select all button selects 10 checkboxes', () => {
    cy.get('#selectAllCheckbox')
      .click()
      .get('#selected')
      .contains('Selected: 41');
  });
});
