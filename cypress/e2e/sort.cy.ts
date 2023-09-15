/// <reference types="Cypress" />

context('Sort', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/sort');
  });
  it('gets correct default order by "Age" descending when nothing clicked', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(2) > div').should('contain', '40');
    cy.get('#table > tbody > tr:nth-child(4) > td:nth-child(2) > div').should('contain', '37');
    cy.get('#table > tbody > tr:nth-child(10) > td:nth-child(2) > div').should('contain', '35');
    cy.get('#pagination-controls > ul > li:nth-child(5) > a > span:nth-child(2)').click();
    cy.get('#table > tbody > tr:nth-child(10) > td:nth-child(2) > div').should('contain', '26');
  });
  it('gets default order by "Company" when nothing clicked', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains(/centice/i);
    cy.get('#table > tbody > tr:nth-child(6) > td:nth-child(3) > div').contains(/kongene/i);
    cy.get('#pagination-controls > ul > li:nth-child(5) > a > span:nth-child(2)').click();
    cy.get('#table > tbody > tr:nth-child(7) > td:nth-child(3) > div').contains(/comcubine/i);
  });
  it('gets descending order by "Company" when clicked 1st time "Company"', () => {
    cy.get('#table > thead > tr.ngx-table__header > th:nth-child(3) > div > div').click();
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains(/zillanet/i);
    cy.get('#table > tbody > tr:nth-child(7) > td:nth-child(3) > div').contains(/suremax/i);
  });
  it('gets ascending order by "Company" when clicked "Company" 2 times', () => {
    cy.get('#table > thead > tr.ngx-table__header > th:nth-child(3) > div > div').dblclick();
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains(/architax/i);
    cy.get('#table > tbody > tr:nth-child(7) > td:nth-child(3) > div').contains(/comcubine/i);
  });
  it('gets descending order by "Name" when clicked 1st time "Name"', () => {
    cy.get('#table > thead > tr.ngx-table__header > th:nth-child(4) > div > div').click();
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div').contains(/wilson hatfield/i);
    cy.get('#table > tbody > tr:nth-child(7) > td:nth-child(4) > div').contains(/serena graves/i);
  });
  it('gets ascending order by "Name" when clicked "Name" 2 times', () => {
    cy.get('#table > thead > tr.ngx-table__header > th:nth-child(4) > div > div').dblclick();
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div').contains(/claudia sawyer/i);
    cy.get('#table > tbody > tr:nth-child(7) > td:nth-child(4) > div').contains(/fanny swanson/i);
  });
});
