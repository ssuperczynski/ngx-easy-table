/// <reference types="Cypress" />

context('Persist state', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4202/#/persist-state');
  });
  it('opens 2 page when clicked ... in the menu and came back', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (902) 500-3665')
      .goToMenuSort()
      .goToMenuPersistState()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (902) 500-3665');
  });
});
