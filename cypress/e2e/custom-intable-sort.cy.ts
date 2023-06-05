/// <reference types="Cypress" />

context('Custom intable sort', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/custom-intable-sort');
  });

  it('gets sorted results by surname', () => {
    cy.get('#table > thead > tr > th:nth-child(4) > div > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('Kristen Whitehead')
      .get('#table > thead > tr > th:nth-child(4) > div > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('Merrill Allen')
      .get('#table > thead > tr > th:nth-child(4) > div > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div')
      .contains('Kristen Whitehead');
  });
  it('gets sorted results by level', () => {
    cy.get('#table > thead > tr > th:nth-child(6) > div > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(6) > div')
      .contains('High')
      .get('#table > thead > tr > th:nth-child(6) > div > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(6) > div')
      .contains('Low')
      .get('#table > thead > tr > th:nth-child(6) > div > div')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(6) > div')
      .contains('High');
  });
});
