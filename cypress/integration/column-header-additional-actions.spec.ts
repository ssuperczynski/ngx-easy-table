/// <reference types="Cypress" />

context('Column template', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4201/#/filter-header-template');
  });

  it('shows "Level" menu, and filter list using checkboxes', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('Low')
      .get('#table > thead > tr > th:nth-child(3) > div.ngx-dropdown > a')
      .click()
      .get(
        '#table > thead > tr > th:nth-child(3) > div.ngx-dropdown > div > div > label:nth-child(3)'
      )
      .contains('Low')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('Medium');
  });
  it('shows "Company" menu, and filter list using input', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('Low')
      .get('#table > thead > tr > th:nth-child(4) > div.ngx-dropdown > a')
      .click()
      .get('#filterHeaderSearch')
      .click()
      .type('iso')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('Medium')
      .get('#table > tbody > tr > td:nth-child(4) > div')
      .contains('ISOSWITCH');
  });
});
