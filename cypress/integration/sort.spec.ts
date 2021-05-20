/// <reference types="Cypress" />

context('Sort', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/sort');
  });

  it('gets correct default order by "Age" descending when nothing clicked', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (948) 492-2881')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('CENTICE')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > div')
      .contains('+1 (835) 551-3617')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(3) > div')
      .contains('CORPORANA');
  });

  it('gets correct company name when "Company" clicked', () => {
    cy.get('#table > thead > tr > th:nth-child(3) > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (934) 551-2224')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('ZILLANET')
      .get('#table > thead > tr > th:nth-child(3) > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (873) 421-3625')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('ARCHITAX')
      .get('#table > thead > tr > th:nth-child(3) > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (948) 492-2881')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
      .contains('CENTICE');
  });
  it('gets correct name sorted by locale when "Name" clicked', () => {
    cy.get('#table > thead > tr > th:nth-child(4) > div')
      .click()
      .get('#table > thead > tr > th:nth-child(4) > div')
      .click()
      .get('#pagination-controls > ul > li:nth-child(5)')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('Merrill Allen')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(4) > div')
      .contains('Monica Frazier')
      .get('#table > tbody > tr:nth-child(3) > td:nth-child(4) > div')
      .contains('Mónica Glover')
      .get('#table > tbody > tr:nth-child(4) > td:nth-child(4) > div')
      .contains('Moody Blevins')
      .get('#table > tbody > tr:nth-child(5) > td:nth-child(4) > div')
      .contains('Myles Blair');
  });
});
