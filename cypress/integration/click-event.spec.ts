/// <reference types="Cypress" />

context('Click event', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/click-event');
  });

  it('shows click event when pagination clicked', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#eventArea')
      .contains('{"event":"onPagination","value":{"page":2,"limit":10}}');
  });
});
