/// <reference types="Cypress" />

context('Edit row', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4202/#/inline-cell');
  });

  it('Inline edit row works', () => {
    cy.get(':nth-child(1) > :nth-child(1) > .phone').contains('Phone: +1 (949) 527-2108');
    cy.get(':nth-child(1) > :nth-child(1) > .phone').dblclick();
    cy.get(':nth-child(1) > :nth-child(1) > div > .form-label').type('99');
    cy.get('tbody > :nth-child(1) > :nth-child(3) > div').click();
    cy.get(':nth-child(1) > :nth-child(1) > .phone').contains('Phone: +1 (949) 527-210899');
  });
});
