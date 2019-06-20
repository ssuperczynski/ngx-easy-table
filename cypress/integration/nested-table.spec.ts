/// <reference types="Cypress" />

context('Nested table', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/nested-table');
    },
  );

  it('shows row template', () => {
    cy
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1)').contains('Deanne Contreras')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('KONGENE')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(5) > span').contains('+1 (949) 527-2108')
    ;
  });
  it('shows additional nested table when "Show nested table" button clicked', () => {
    cy
      .get('#expandButton-0').click()
      .get('#nested-table > tbody > tr:nth-child(2) > td:nth-child(1) > div').contains('Peggy Burke')
      .get('#nested-table > tbody > tr:nth-child(2) > td:nth-child(2) > div').contains('32')
    ;
  });
});
