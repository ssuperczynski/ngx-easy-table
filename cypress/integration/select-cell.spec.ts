/// <reference types="Cypress" />
context('Select cell', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4202/#/select-cell');
  });
  it('checks cell selection on click', () => {
    const secondColFirstRow = '#table > tbody > tr:nth-child(1) > td:nth-child(2)';
    const secondColSecondRow = '#table > tbody > tr:nth-child(2) > td:nth-child(2)';
    cy.get(secondColFirstRow).click().should('have.class', 'ngx-table__table-cell--selected');
    cy.get(secondColSecondRow)
      .click()
      .should('have.class', 'ngx-table__table-cell--selected')
      .get(secondColFirstRow)
      .should('not.have.class', 'ngx-table__table-cell--selected');
  });
});
