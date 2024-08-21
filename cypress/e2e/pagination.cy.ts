/// <reference types="cypress" />

context('Pagination', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/pagination');
  });

  it('gets correct phone when NEXT/PREV buttons clicked', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (949) 527-2108')
      .get('.mat-mdc-paginator-navigation-next > .mat-mdc-button-touch-target')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (902) 500-3665')
      .get('.mat-mdc-paginator-navigation-next > .mat-mdc-button-touch-target')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (882) 527-2652')
      .get('.mat-mdc-paginator-navigation-previous > .mat-mdc-button-touch-target')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (902) 500-3665')
      .get('.mat-mdc-paginator-navigation-previous > .mat-mdc-button-touch-target')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (949) 527-2108')
      .get('.mat-mdc-paginator-touch-target')
      .click()
      .get('#mat-option-2')
      .click()
      .get('#table > tbody > tr:nth-child(21) > td:nth-child(1) > div')
      .contains('+1 (882) 527-2652');
  });
});
