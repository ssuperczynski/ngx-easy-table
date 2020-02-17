/// <reference types="Cypress" />
context('Select cell', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/select-col');
    },
  );
  it('checks col selection on click', () => {
    const secondColFirstRow = '#table > tbody > tr:nth-child(1) > td:nth-child(2)';
    const thirdColSecondRow = '#table > tbody > tr:nth-child(2) > td:nth-child(3)';
    cy
      .get(secondColFirstRow)
      .click()
      .should('have.class', 'ngx-table__table-col--selected');
    cy
      .get(thirdColSecondRow)
      .click()
      .should('have.class', 'ngx-table__table-col--selected')
      .get(secondColFirstRow)
      .should('not.have.class', 'ngx-table__table-col--selected')
    ;
  });
});
