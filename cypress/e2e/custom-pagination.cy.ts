/// <reference types="Cypress" />

context('Custom pagination', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/custom-pagination');
  });

  it('goes to the second page', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('KONGENE')
      .get(
        '#content > div > app-custom-pagination > mat-paginator > div > div > div.mat-mdc-paginator-range-actions > button.mat-mdc-tooltip-trigger.mat-mdc-paginator-navigation-next.mdc-icon-button.mat-mdc-icon-button._mat-animation-noopable.mat-unthemed.mat-mdc-button-base'
      )
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('CALCULA');
  });
});
