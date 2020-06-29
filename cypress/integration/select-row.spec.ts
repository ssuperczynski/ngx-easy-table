/// <reference types="Cypress" />
context('Select row', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/select-row');
  });
  it('checks row selection on click', () => {
    const secondColFirstRow = '#table > tbody > tr:nth-child(1) > td:nth-child(2)';
    const thirdColSecondRow = '#table > tbody > tr:nth-child(2) > td:nth-child(3)';
    const firstRow = '#table > tbody > tr:nth-child(1)';
    const secondRow = '#table > tbody > tr:nth-child(2)';
    cy.get(secondColFirstRow)
      .click()
      .get(firstRow)
      .should('have.class', 'ngx-table__table-row--selected');
    cy.get(thirdColSecondRow)
      .click()
      .get(secondRow)
      .should('have.class', 'ngx-table__table-row--selected')
      .get(firstRow)
      .should('not.have.class', 'ngx-table__table-col--selected');
  });
});
