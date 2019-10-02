/// <reference types="Cypress" />

context('Bootstrap', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/bootstrap');
    },
  );
  it('sets table styles to Bootstrap', () => {
    cy
      .get('#buttonSetBootstrap').click()
      .get('#table').should('have.class', 'table table-bordered table-striped table-sm')
      .get('#buttonSetMaterial').click()
      .get('#table').should('have.class', 'ngx-table__table--material')
      .get('#buttonSetSpectre').click()
      .get('#table').should('have.class', 'ngx-table')
      .get('#buttonSetBootstrapRow').click()
      .get('#table > tbody > tr:nth-child(1)').should('have.class', 'table-primary')
    ;
  });
});
