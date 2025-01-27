/// <reference types="Cypress" />

context('Dynamic configuration', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/dynamic-configuration');
  });

  it('collapses details row', () => {
    const collapseRowSelector = '#collapse';
    cy.get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > div')
      .contains('+1 (878) 515-3653')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(2) > div')
      .contains('32')
      .get(collapseRowSelector)
      .click()
      .get('#table > tbody > tr:nth-child(4) > td > div > h2')
      .contains('+1 (878) 515-3653')
      .get('#table > tbody > tr:nth-child(4) > td > div > h5')
      .contains('Peggy Burke - 32')
      .get(collapseRowSelector)
      .click();
  });
  it('enables loading mode', () => {
    const loadingModeSelector = '#checkbox-is-loading';
    cy.get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > div')
      .contains('+1 (878) 515-3653')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(2) > div')
      .contains('32')
      .get(loadingModeSelector)
      .click()
      .get('#table > tbody > tr > td > div > div')
      .should('have.class', 'ngx-table__table-loader')
      .get(loadingModeSelector)
      .click()
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > div')
      .contains('+1 (878) 515-3653')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(2) > div')
      .contains('32');
  });
});
