/// <reference types="Cypress" />

context.skip('Checkboxes', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/checkbox-default');
  });

  it('selects and unselect 3 checkboxes', () => {
    // TODO get selections from the store
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > label > em')
      .click()
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > label > em')
      .click()
      .get('#table > tbody > tr:nth-child(3) > td:nth-child(1) > label > em')
      .click()
      .get('#selected');
    // .contains('Selected: 3');
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > label > em')
      .click()
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > label > em')
      .click()
      .get('#table > tbody > tr:nth-child(3) > td:nth-child(1) > label > em')
      .click()
      .get('#selected');
    // .contains('Selected: 0');
  });
  // TODO it should select visible checkboxes, not all of them
  // it('select all button selects all 41 checkboxes', () => {
  //   cy.get('#selectAllCheckbox').click().get('#selected').contains('Selected: 41');
  // });
});
