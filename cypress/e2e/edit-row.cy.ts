/// <reference types="Cypress" />

context('Edit row', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4202/#/inline-row');
  });

  it('Inline edit row works', () => {
    cy.get(':nth-child(1) > :nth-child(5) > .btn').contains('Edit');
    cy.get(':nth-child(1) > :nth-child(5) > .btn').click();
    cy.get(':nth-child(2) > div > .form-label').type('{backspace}{backspace} 32');
    cy.get(':nth-child(1) > :nth-child(5) > .btn').click();
    cy.get('tbody > :nth-child(1) > :nth-child(2) > div').contains('32');
  });
});
