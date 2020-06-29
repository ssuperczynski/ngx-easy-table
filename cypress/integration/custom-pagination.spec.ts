/// <reference types="Cypress" />

context('Custom pagination', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4201/#/custom-pagination');
  });

  it('goes to the second page', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('KONGENE')
      .get(
        '#content > div > app-custom-pagination > mat-paginator > div > div > div.mat-paginator-range-actions > button.mat-paginator-navigation-next.mat-icon-button.mat-button-base._mat-animation-noopable'
      )
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('CALCULA');
  });
});
